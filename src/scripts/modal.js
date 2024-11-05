// Функция открытия модального окна
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keyup', closeModalOnEsc);
}

// Функция закрытия модального окна
export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closeModalOnEsc);
}

// Функция закрытия модального окна кликом на Esc
function closeModalOnEsc(evt) {
  if (evt.keyCode === 27) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

// Функция закрытия модального окна кликом на оверлэй
export function closeModalOnOverlay() {
	document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        closeModal(evt.target)
      }
    })
	})
}
