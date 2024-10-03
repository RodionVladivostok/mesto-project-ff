// @todo: Открытие модальных окон - общая функция
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
	document.addEventListener('keyup', closeModalOnEsc);
}

// @todo: Закрытие модальных окон - общая функция
export function closeModal(popupElement) {
	popupElement.classList.remove('popup_is-opened');
	document.removeEventListener('keyup', closeModalOnEsc);
}

function closeModalOnEsc(evt) {
	if (evt.keyCode === 27) {
		const openedPopup = document.querySelector('.popup_is-opened');
		closeModal(openedPopup);
	}
}

// @todo: Закрытие модальных окон кликом на оверлэй
export function closeModalsClickOverlay() {
	document.querySelectorAll('.popup').forEach(function(popup) {
    popup.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('popup')) {
          closeModal(evt.target)
      }
    })
	})
}

export function openBigImagePopup(cardInfo, popupTypeImage) {
	const popupImage = popupTypeImage.querySelector(".popup__image");
	const popupImageCaption = popupTypeImage.querySelector(".popup__caption");
  popupImage.src = cardInfo.link;
  popupImage.alt = cardInfo.name;
  popupImageCaption.textContent = cardInfo.name;
  openModal(popupTypeImage);
}
