import {removeCard, likeCard, unlikeCard} from "./api.js";

// Функция создания карточки
export function createCard(cardInfo, deleteCard, onImageClick, clickLikeButton, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardPicture = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const buttonDeleteCard = cardElement.querySelector('.card__delete-button');
  const cardLikesCount = cardElement.querySelector('.card__like-count');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  
  if (cardInfo.owner._id === userId) {
    buttonDeleteCard.addEventListener('click', (evt) => {
      deleteCard(evt, cardInfo._id)
    });
  } else {
    buttonDeleteCard.remove()
  }

  cardPicture.addEventListener('click', () => {
    onImageClick(cardInfo);
  });

  cardLikeButton.addEventListener('click', (evt) => {
    clickLikeButton(evt, cardInfo._id);
  });
  const isLikeActive = cardInfo.likes.some((user) => {
    return user._id === userId;
  })
  if (isLikeActive) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardPicture.src = cardInfo.link;
  cardPicture.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;
  if (cardInfo.likes.length > 0) {
    cardLikesCount.textContent = cardInfo.likes.length;
  }

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(evt, id) {
  removeCard(id)
    .then(() => {
      const cardDelete = evt.target.closest('.places__item');
      cardDelete.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция - лайк карточки
export function clickLikeButton(evt, id) {
  const likesCountElement = evt.target.parentNode.querySelector('.card__like-count');
  if (evt.target.classList.contains('card__like-button_is-active')) {
    unlikeCard(id)
      .then(cardInfo => {
        evt.target.classList.remove('card__like-button_is-active');
        if (cardInfo.likes.length === 0) {
          likesCountElement.textContent = '';
        } else {
          likesCountElement.textContent = cardInfo.likes.length;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(id)
      .then(cardInfo => {
        evt.target.classList.add('card__like-button_is-active');
        likesCountElement.textContent = cardInfo.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

