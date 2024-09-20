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
    const createdCard = createCard(cardInfo, deleteCard. openBigImagePopup);
    placesList.append(createdCard);
    });   

// ________________________________________________________________________________________________________________

// @todo: Открытие модального окна - общая функция

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
}

// @todo: Открытие модального окна "Редактировать"

const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

profileEditButton.addEventListener('click', function () {
  openPopup(popupTypeEdit);
});

// @todo: Открытие модального окна "+"
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

profileAddButton.addEventListener('click', function () {
  openPopup(popupTypeNewCard);
});

// @todo: Открытие модального окна "Картинка"
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

function openBigImagePopup(cardInfo) {
  console.log('ФУНКЦИЯ НОВАЯ')
  popupImage.src = cardInfo.link;
  popupImage.alt = cardInfo.name;
  popupImageCaption.textContent = cardInfo.name;
  openPopup(popupTypeImage);
}

cardPicture.addEventListener('click', function () {
  openBigImagePopup(cardInfo);
});

// @todo: Закрытие модальных окон - функция

function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}

// @todo: Закрытие модального окна кликом на крестик
const buttonClose = document.querySelectorAll(".popup__close");

buttonClose.forEach((button) => {
  button.addEventListener('click', function() {
    closePopup(popupTypeEdit);
    closePopup(popupTypeNewCard);
    closePopup(popupTypeImage);
    })
})

// @todo: Закрытие модального окна по оверлею
const modalOverlay = document.querySelectorAll(".popup");
function keyHandler(evt) {
  if (evt.key === "Esc") {
    closePopup(popupTypeEdit);
    closePopup(popupTypeNewCard);
    closePopup(popupTypeImage);
  };
};

modalOverlay.addEventListener('keydown', keyHandler);

