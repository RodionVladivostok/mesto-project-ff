import '../pages/index.css';
import {initialCards} from './cards';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardInfo, deleteCard, onImageClick) {
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    const cardPicture = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const buttonDeleteCard = cardElement.querySelector(".card__delete-button");
    buttonDeleteCard.addEventListener("click", deleteCard);
  
//ПР-6 start______________________________________________________
    cardPicture.addEventListener('click', function () {
      onImageClick(cardInfo);
    });

//ПР-6 finish__________________________________________________________
    cardPicture.src = cardInfo.link;
    cardPicture.alt = cardInfo.name;
    cardTitle.textContent = cardInfo.name;

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    const cardDelete = event.target.closest(".places__item");
    cardDelete.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardInfo => {  
    const createdCard = createCard(cardInfo, deleteCard, openBigImagePopup);
    placesList.append(createdCard);
});

// ________________________________________________________________________________________________________________

// @todo: Открытие модального окна - общая функция

function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
}

// @todo: Открытие модального окна "Редактировать"

const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

profileEditButton.addEventListener('click', function () {
  openModal(popupTypeEdit);
});

// @todo: Открытие модального окна "+"
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

profileAddButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
});

// @todo: Открытие модального окна "Картинка"
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

function openBigImagePopup(cardInfo) {
  popupImage.src = cardInfo.link;
  popupImage.alt = cardInfo.name;
  popupImageCaption.textContent = cardInfo.name;
  openModal(popupTypeImage);
}

// @todo: Закрытие модальных окон - функция

function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}

// @todo: Закрытие модального окна кликом на крестик
const buttonClose = document.querySelectorAll(".popup__close");

function closeAllModals() {
  closeModal(popupTypeEdit);
  closeModal(popupTypeNewCard);
  closeModal(popupTypeImage);
}

buttonClose.forEach(button => {
  button.addEventListener('click', function() {
    closeAllModals();
  })
  
})

// @todo: Закрытие модальных окон кликом на оверлэй

document.querySelectorAll('.popup').forEach(function(popup) {
  popup.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup')) {
      closeModal(evt.target)
    }
  })
})

// @todo: Закрытие модального окна нажатием на Esc

document.addEventListener('keyup', function (evt) {
  if (evt.keyCode === 27) {
    closeAllModals();
  }
});

// @todo: Редактирование имени и информации о себе

// Находим форму в DOM
const formElement = document.forms.edit_profile; // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.elements.name;// Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.elements.description;// Воспользуйтесь инструментом .querySelector()

nameInput.value = document.querySelector(".profile__title").textContent;
jobInput.value = document.querySelector(".profile__description").textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
     

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    const nameInput = document.querySelector('.popup__input_type_name').value
    document.querySelector(".profile__title").textContent = nameInput;
    
    const jobInput = document.querySelector('.popup__input_type_description').value
    document.querySelector(".profile__description").textContent = jobInput;
    
    closeModal(popupTypeEdit)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//__________________________________________________________________________________
// @todo: Добавление карточки в начало списка
const newPlaceFormElement = document.forms.new_place;

function addNewCardSubmit(evt) {
  evt.preventDefault();

  const cardInfo = {
    name: document.querySelector('.popup__input_type_card-name').value,
    link: document.querySelector('.popup__input_type_url').value
  }
  
  const createdCard = createCard(cardInfo, deleteCard, openBigImagePopup);
  placesList.prepend(createdCard);
 
  closeModal(popupTypeNewCard);
}

newPlaceFormElement.addEventListener('submit', addNewCardSubmit);