// Функция создания карточки
export function createCard(cardInfo, deleteCard, onImageClick, clickLikeButton) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardPicture = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const buttonDeleteCard = cardElement.querySelector('.card__delete-button');
  buttonDeleteCard.addEventListener('click', deleteCard);

  const popupTypeImage = document.querySelector('.popup_type_image');
  cardPicture.addEventListener('click', function () {
    onImageClick(cardInfo, popupTypeImage);
  });

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', clickLikeButton);

  cardPicture.src = cardInfo.link;
  cardPicture.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(event) {
  const cardDelete = event.target.closest('.places__item');
  cardDelete.remove();
}

// Функция - лайк карточки
export function clickLikeButton(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

