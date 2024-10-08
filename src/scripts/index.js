import '../pages/index.css';
import {initialCards} from './cards';
import {createCard, deleteCard, clickLikeButton} from './card';
import {closeModal, closeModalOnOverlay, openModal} from './modal';

const cardsContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const buttonsClose = document.querySelectorAll('.popup__close');

const editProfileFormElement = document.forms.edit_profile;
const nameInput = editProfileFormElement.elements.name;
const jobInput = editProfileFormElement.elements.description;
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeDescription = document.querySelector('.popup__input_type_description');

const newPlaceFormElement = document.forms.new_place;
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');

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
});

// Открытие модального окна "Картинка"
function openBigImagePopup(cardInfo, popupTypeImage) {
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
})

// Закрытие модального окна кликом на оверлэй
closeModalOnOverlay();

// Редактирование имени и информации о себе
function handleProfileFormSubmit(evt, popupTypeEdit) {
  evt.preventDefault();

  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;

  closeModal(popupTypeEdit);
}

editProfileFormElement.addEventListener('submit', function (evt) {
  handleProfileFormSubmit(evt, popupTypeEdit);
});

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
}

newPlaceFormElement.addEventListener('submit', addNewCardSubmit);

// Плавное открытие и закрытие попапов
document.querySelectorAll('.popup').forEach(function (popup) {
  popup.classList.add('popup_is-animated');
})