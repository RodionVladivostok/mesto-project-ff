import '../pages/index.css';
import {initialCards} from './cards';
import {createCard, deleteCard, clickLikeButton} from './card';
import {closeModal, closeModalOnOverlay, openModal} from './modal';

const placesList = document.querySelector('.places__list');

// Вывод карточек на страницу
initialCards.forEach(cardInfo => {
    const createdCard = createCard(cardInfo, deleteCard, openBigImagePopup, clickLikeButton);
    placesList.append(createdCard);
});

// Открытие модального окна "Редактировать"
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');

profileEditButton.addEventListener('click', function () {
  openModal(popupTypeEdit);
});

// Открытие модального окна "+"
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

profileAddButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
});

// Открытие модального окна "Картинка"
function openBigImagePopup(cardInfo, popupTypeImage) {
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
  popupImage.src = cardInfo.link;
  popupImage.alt = cardInfo.name;
  popupImageCaption.textContent = cardInfo.name;
  openModal(popupTypeImage);
}

// Закрытие модального окна кликом на крестик
const buttonClose = document.querySelectorAll('.popup__close');

buttonClose.forEach(button => {
  button.addEventListener('click', function(evt) {
    const popup = evt.target.closest('.popup');
		closeModal(popup);
  })
})

// Закрытие модального окна кликом на оверлэй
closeModalOnOverlay();

// Редактирование имени и информации о себе
const editProfileFormElement = document.forms.edit_profile;

export const nameInput = editProfileFormElement.elements.name;
export const jobInput = editProfileFormElement.elements.description;

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

function handleProfileFormSubmit(evt, popupTypeEdit) {
  evt.preventDefault();

  const nameValue = document.querySelector('.popup__input_type_name').value
  document.querySelector('.profile__title').textContent = nameValue;

  const jobValue = document.querySelector('.popup__input_type_description').value
  document.querySelector('.profile__description').textContent = jobValue;

  closeModal(popupTypeEdit);
}

editProfileFormElement.addEventListener('submit', function (evt) {
  handleProfileFormSubmit(evt, popupTypeEdit);
});

// Добавление новой карточки в начало списка
const newPlaceFormElement = document.forms.new_place;

function addNewCardSubmit (evt) {
  evt.preventDefault();

  const cardInfo = {
    name: document.querySelector('.popup__input_type_card-name').value,
    link: document.querySelector('.popup__input_type_url').value
  }

  const createdCard = createCard(cardInfo, deleteCard, openBigImagePopup, clickLikeButton);
  placesList.prepend(createdCard);

  closeModal(popupTypeNewCard);
  newPlaceFormElement.reset();
}

newPlaceFormElement.addEventListener('submit', addNewCardSubmit);

// Плавное открытие и закрытие попапов
document.querySelectorAll('.popup').forEach(function (popup) {
  popup.classList.add('popup_is-animated');
})