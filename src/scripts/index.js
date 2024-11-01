import '../pages/index.css';
import {initialCards} from './cards';
import {createCard, deleteCard, clickLikeButton} from './card';
import {closeModal, closeModalOnOverlay, openModal} from './modal';
import {enableValidation} from './validation';

const cardsContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const popupTypeImage = document.querySelector('.popup_type_image');

const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const buttonsClose = document.querySelectorAll('.popup__close');

const editProfileFormElement = document.forms.edit_profile;
const nameInput = editProfileFormElement.elements.name;
const jobInput = editProfileFormElement.elements.description;
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeDescription = document.querySelector('.popup__input_type_description');

const newPlaceFormElement = document.forms.new_place;
const newPlaceSubmitButton = newPlaceFormElement.querySelector('.popup__button');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Вывод карточек на страницу
initialCards.forEach(cardInfo => {
  const createdCard = createCard(cardInfo, deleteCard, openBigImagePopup, clickLikeButton);
  cardsContainer.append(createdCard);
});

// Открытие модального окна "Редактировать"
profileEditButton.addEventListener('click', function () {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Открытие модального окна "+"
profileAddButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
  clearValidation(validationConfig)
});

function clearValidation(validationConfig) {
  newPlaceSubmitButton.disabled = true;
  newPlaceSubmitButton.classList.add(validationConfig.inactiveButtonClass);
  // newPlaceFormElement.reset()
}

// Открытие модального окна "Картинка"
function openBigImagePopup(cardInfo) {
  popupImage.src = cardInfo.link;
  popupImage.alt = cardInfo.name;
  popupImageCaption.textContent = cardInfo.name;
  openModal(popupTypeImage);
}

// Закрытие модального окна кликом на крестик
buttonsClose.forEach(button => {
  button.addEventListener('click', function(evt) {
    const popup = evt.target.closest('.popup');
		closeModal(popup);
  })
});

// Закрытие модального окна кликом на оверлэй
closeModalOnOverlay();

// Редактирование имени и информации о себе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;

  closeModal(popupTypeEdit);
}

editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Добавление новой карточки в начало списка
function addNewCardSubmit (evt) {
  evt.preventDefault();

  const cardInfo = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeUrl.value
  }

  const createdCard = createCard(cardInfo, deleteCard, openBigImagePopup, clickLikeButton);
  cardsContainer.prepend(createdCard);

  closeModal(popupTypeNewCard);
  newPlaceFormElement.reset();

  clearValidation(validationConfig)
}

newPlaceFormElement.addEventListener('submit', addNewCardSubmit);

// Плавное открытие и закрытие попапов
document.querySelectorAll('.popup').forEach(function (popup) {
  popup.classList.add('popup_is-animated');
});

// Включение валидации форм
enableValidation(validationConfig);
