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
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

// Функция закрытия модального окна кликом на оверлэй
export function closeModalOnOverlay() {
	document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        closeModal(evt.target)
      }
    })
	})
}
