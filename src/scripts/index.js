import '../pages/index.css';
import {createCard, deleteCard, clickLikeButton} from './card.js';
import {closeModal, closeModalOnOverlay, openModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getProfileInfo, getCards, updateProfileInfo, addNewCard, updateUserAvatar} from './api.js';

const cardsContainer = document.querySelector('.places__list');

const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const editAvatarFormElement = document.forms.avatar_edit;
const avatarInput = editAvatarFormElement.elements.avatar_link

const editAvatarSubmitButton = editAvatarFormElement.querySelector('.popup__button');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');


const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const popupTypeImage = document.querySelector('.popup_type_image');

const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const buttonsClose = document.querySelectorAll('.popup__close');

const editProfileFormElement = document.forms.edit_profile;
const editProfileSubmitButton = editProfileFormElement.querySelector('.popup__button');
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
Promise.all([getCards(), getProfileInfo()])
  .then(([cards, user]) => {
    cards.forEach(cardInfo => {
      const createdCard = createCard(cardInfo, deleteCard, openBigImagePopup, clickLikeButton, user._id);
      cardsContainer.append(createdCard);
    });
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  });

// Открытие модального окна "Редактировать"
profileEditButton.addEventListener('click', () => {
  openModal(popupTypeEdit);
  clearValidation(editProfileFormElement, validationConfig);
  editProfileSubmitButton.disabled = false;
  editProfileSubmitButton.classList.remove(validationConfig.inactiveButtonClass);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
})

// Открытие модального окна "+"
profileAddButton.addEventListener('click', () => {
  openModal(popupTypeNewCard);
  clearValidation(newPlaceFormElement, validationConfig);
  newPlaceSubmitButton.disabled = true;
  newPlaceSubmitButton.classList.add(validationConfig.inactiveButtonClass);
  newPlaceFormElement.reset();
});

// Открытие модального окна "Обновить аватар"
profileImage.addEventListener('click', () => {
  openModal(popupTypeAvatar);
  clearValidation(editAvatarFormElement, validationConfig);
  avatarInput.value = '';
  editAvatarSubmitButton.disabled = true;
  editAvatarSubmitButton.classList.add(validationConfig.inactiveButtonClass);
})

// Открытие модального окна "Картинка"
function openBigImagePopup(cardInfo) {
  popupImage.src = cardInfo.link;
  popupImage.alt = cardInfo.name;
  popupImageCaption.textContent = cardInfo.name;
  openModal(popupTypeImage);
}

// Закрытие модального окна кликом на крестик
buttonsClose.forEach(button => {
  button.addEventListener('click', (evt) => {
    const popup = evt.target.closest('.popup');
		closeModal(popup);
  })
});

// Закрытие модального окна кликом на оверлэй
closeModalOnOverlay();

// Редактирование имени и информации о себе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  editProfileSubmitButton.textContent = 'Сохранение...'
  updateProfileInfo(popupInputTypeName.value, popupInputTypeDescription.value)
    .then(res => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupTypeEdit);
      editProfileSubmitButton.textContent = 'Сохранить'
    })
    .catch((err) => {
      console.log(err);
    });
}

editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Добавление новой карточки в начало списка
function addNewCardSubmit (evt) {
  evt.preventDefault();

  newPlaceSubmitButton.textContent = 'Сохранение...'
  addNewCard(popupInputTypeCardName.value, popupInputTypeUrl.value)
    .then(cardInfo => {
      const createdCard = createCard(cardInfo, deleteCard, openBigImagePopup, clickLikeButton, cardInfo.owner._id);
      cardsContainer.prepend(createdCard);

      closeModal(popupTypeNewCard);
      newPlaceFormElement.reset();
      newPlaceSubmitButton.textContent = 'Сохранить'
    })
    .catch((err) => {
      console.log(err);
    });
}

newPlaceFormElement.addEventListener('submit', addNewCardSubmit);

// Обновление аватара пользователя
function editAvatar (evt) {
  evt.preventDefault();

  editAvatarSubmitButton.textContent = 'Сохранение...';
  updateUserAvatar(avatarInput.value)
    .then(user => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      closeModal(popupTypeAvatar);
      editAvatarFormElement.reset();
      editAvatarSubmitButton.textContent = 'Сохранить';
    })
    .catch((err) => {
      console.log(err);
    });
}

editAvatarFormElement.addEventListener('submit', editAvatar)

// Плавное открытие и закрытие попапов
document.querySelectorAll('.popup').forEach(popup => {
  popup.classList.add('popup_is-animated');
});

// Включение валидации форм
enableValidation(validationConfig);
