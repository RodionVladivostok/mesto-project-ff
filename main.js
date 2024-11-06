(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-25",headers:{authorization:"3db43119-f3e1-469d-994a-10157145774d","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function n(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__image"),i=c.querySelector(".card__title"),u=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-count"),s=c.querySelector(".card__like-button");return e.owner._id===r?u.addEventListener("click",(function(n){t(n,e._id)})):u.remove(),a.addEventListener("click",(function(){n(e)})),s.addEventListener("click",(function(t){o(t,e._id)})),e.likes.some((function(e){return e._id===r}))&&s.classList.add("card__like-button_is-active"),a.src=e.link,a.alt=e.name,i.textContent=e.name,e.likes.length>0&&(l.textContent=e.likes.length),c}function o(n,o){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(o).then((function(){n.target.closest(".places__item").remove()})).catch((function(e){console.log(e)}))}function r(n,o){var r=n.target.parentNode.querySelector(".card__like-count");n.target.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(o).then((function(e){n.target.classList.remove("card__like-button_is-active"),0===e.likes.length?r.textContent="":r.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}(o).then((function(e){n.target.classList.add("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keyup",i)}function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keyup",i)}function i(e){"Escape"===e.key&&a(document.querySelector(".popup_is-opened"))}var u=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},l=function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){u(e,n,t)}))},s=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var p=document.querySelector(".places__list"),f=document.querySelector(".popup_type_avatar"),_=document.forms.avatar_edit,m=_.elements.avatar_link,v=_.querySelector(".popup__button"),y=document.querySelector(".profile__edit-button"),h=document.querySelector(".popup_type_edit"),b=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),g=document.querySelector(".profile__image"),C=document.querySelector(".profile__add-button"),q=document.querySelector(".popup_type_new-card"),L=document.querySelector(".popup_type_image"),E=document.querySelector(".popup__image"),k=document.querySelector(".popup__caption"),x=document.querySelectorAll(".popup__close"),A=document.forms.edit_profile,U=A.querySelector(".popup__button"),w=A.elements.name,B=A.elements.description,T=document.querySelector(".popup__input_type_name"),j=document.querySelector(".popup__input_type_description"),O=document.forms.new_place,D=O.querySelector(".popup__button"),P=document.querySelector(".popup__input_type_card-name"),I=document.querySelector(".popup__input_type_url"),N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function M(e){E.src=e.link,E.alt=e.name,k.textContent=e.name,c(L)}Promise.all([fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t)]).then((function(e){var t,c,a=(c=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(t,c)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];i.forEach((function(e){var t=n(e,o,M,r,u._id);p.append(t)})),b.textContent=u.name,S.textContent=u.about,g.style.backgroundImage="url(".concat(u.avatar,")")})).catch((function(e){console.log(e)})),y.addEventListener("click",(function(){c(h),l(A,N),U.disabled=!1,U.classList.remove(N.inactiveButtonClass),w.value=b.textContent,B.value=S.textContent})),C.addEventListener("click",(function(){c(q),l(O,N),D.disabled=!0,D.classList.add(N.inactiveButtonClass),O.reset()})),g.addEventListener("click",(function(){c(f),l(_,N),m.value="",v.disabled=!0,v.classList.add(N.inactiveButtonClass)})),x.forEach((function(e){e.addEventListener("click",(function(e){a(e.target.closest(".popup"))}))})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",(function(e){e.target.classList.contains("popup")&&a(e.target)}))})),A.addEventListener("submit",(function(n){var o,r;n.preventDefault(),U.textContent="Сохранение...",(o=T.value,r=j.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o,about:r})}).then(t)).then((function(e){b.textContent=e.name,S.textContent=e.about,a(h),U.textContent="Сохранить"})).catch((function(e){console.log(e)}))})),O.addEventListener("submit",(function(c){var i,u;c.preventDefault(),D.textContent="Сохранение...",(i=P.value,u=I.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:i,link:u})}).then(t)).then((function(e){var t=n(e,o,M,r,e.owner._id);p.prepend(t),a(q),O.reset(),D.textContent="Сохранить"})).catch((function(e){console.log(e)}))})),_.addEventListener("submit",(function(n){var o;n.preventDefault(),v.textContent="Сохранение...",(o=m.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then(t)).then((function(e){g.style.backgroundImage="url(".concat(e.avatar,")"),a(f),_.reset(),v.textContent="Сохранить"})).catch((function(e){console.log(e)}))})),document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),s(n,o,t)}))}))}(t,e)}))}(N)})();