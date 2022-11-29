import './pages/index.css';

//плавная прокрутка
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();
		const blockID = anchor.getAttribute('href');
		document.querySelector('' + blockID).scrollIntoView({
			behavior: "smooth",
			block: "start"
		})
	})
}

const popupFullSizeImage = document.querySelector('#imagePopup');
const popupImage = popupFullSizeImage.querySelector('.popup__image');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const image = document.querySelectorAll('.photo__img');

//функция открытия попапов
function openPopup() {
  popup.classList.add('popup_opened');
	// burgerButton.classList.remove('header__burger-btn_active');
	// headerBurger.classList.remove('header__burger-type_active');
  document.addEventListener('keydown', closePopupEsc);
};

//закрытие попапа
const closePopup = function () {
  const popupOpened = document.querySelector('.popup_opened');
  if (popupOpened) {
    popupOpened.classList.remove('popup_opened');
  }
  document.removeEventListener('keydown', closePopupEsc);
};

//закрытие попапа нажатием Esc
const closePopupEsc = function (event) {
  if(event.key === "Escape") {
		closePopup();
  };
};

//закрытие попапа кликом на оверлей 
const closePopupClickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

//открытие попапа полной картинки
function openImagePopup(imageValue, titleValue) {
  popupImage.src = imageValue;
  popupImage.alt = titleValue;
  openPopup(popupFullSizeImage);
};

//обработчики событий
closeButton.addEventListener('mousedown', closePopup);
popup.addEventListener('mousedown', closePopupClickOverlay);
image.forEach(el => {
	el.addEventListener("click", openImagePopup);
});

// выделение активного меню
window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;

	if (window.innerWidth > 768) {
		document.querySelectorAll('.section').forEach((el, i) => {
			if (el.offsetTop - document.querySelector('.header__nav').clientHeight <= scrollDistance) {
				document.querySelectorAll('.header__nav a').forEach((el) => {
					if (el.classList.contains('header__item_active')) {
						el.classList.remove('header__item_active');
					}
				});

				document.querySelectorAll('.header__item')[i].classList.add('header__item_active');
			}
		});
	}
});