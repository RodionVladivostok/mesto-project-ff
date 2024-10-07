import {nameInput, jobInput} from './index'

// Функция открытия модального окна
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
	document.addEventListener('keyup', closeModalOnEsc);
}

// Функция закрытия модального окна
export function closeModal(popupElement) {
	popupElement.classList.remove('popup_is-opened');
	document.removeEventListener('keyup', closeModalOnEsc);
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
}

// Функция закрытия модального окна кликом на Esc
function closeModalOnEsc(evt) {
	if (evt.keyCode === 27) {
		const openedPopup = document.querySelector('.popup_is-opened');
		closeModal(openedPopup);
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
	}
}

// Функция закрытия модального окна кликом на оверлэй
export function closeModalOnOverlay() {
	document.querySelectorAll('.popup').forEach(function(popup) {
    popup.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('popup')) {
          closeModal(evt.target)
          nameInput.value = document.querySelector('.profile__title').textContent;
          jobInput.value = document.querySelector('.profile__description').textContent;
      }
    })
	})
}
