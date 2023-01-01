import './pages/index.css';
import Inputmask from "../inputmask.es6.js";

const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const header = document.querySelector('.header');
const headerBlock = document.querySelector('.header__block');
const footer = document.querySelector('.footer');
const copyright = document.querySelector('.copyright');
const headerCall = document.querySelector('.header__call');
const footerCall = document.querySelector('.footer__call');
const sections = document.querySelectorAll('.section');
const contacts = document.querySelector('.contacts');
const formArea = document.querySelector('.form-area');
const main = document.querySelector('.main');
const photo = document.querySelector('.photo');
const plan = document.querySelector('.plan');
const politics = document.querySelector('.politics');
const technical = document.querySelector('.technical');
const thanksPopup = document.getElementById('#thanksPopup');

//отправка формы
document.getElementById("main__form").addEventListener("submit", function (event) {
  event.preventDefault();

  const serviceID = "service_odiwnjj";
  const templateID = "template_46z28h3";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      document.querySelector(".main__input").value = "";
    },
    (err) => {
      alert(JSON.stringify(err));
    }
  );
});

document.getElementById("popup-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const serviceID = "service_odiwnjj";
  const templateID = "template_46z28h3";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      document.querySelector(".popup__input").value = "";
    },
    (err) => {
      alert(JSON.stringify(err));
    }
  );
});

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const serviceID = "service_odiwnjj";
  const templateID = "template_46z28h3";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      document.querySelector("#name").value = "";
      document.querySelector("#email").value = "";
      document.querySelector("#message").value = "";
    },
    (err) => {
      alert(JSON.stringify(err));
    }
  );
});

//маска телефона
let selector = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(selector);

//опасити хэдера при скролле
window.addEventListener('scroll', () => {
  if (window.scrollHeight !== window.innerHeight && window.scrollY !== 0) {
    // Если прокрутка есть, то делаем блок прозрачным
    header.classList.add('header_scroll');
  } else {
		header.classList.remove('header_scroll');
	}
  // if (burgerButton.onclick) {
	// 	header.classList.remove('header_scroll');
  // }
})

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

//валидация инпута
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const inputEmail = document.querySelector('input[type="email"]');

function isEmailValid(value) {
 	return EMAIL_REGEXP.test(value);
}

function onInput() {
	if (isEmailValid(inputEmail.value)) {
		inputEmail.classList.remove('form__input_wrong');
	} else {
    inputEmail.classList.add('form__input_wrong');
  }
}

//обработчики событий
closeButton.addEventListener('mousedown', closePopup);
popup.addEventListener('mousedown', closePopupClickOverlay);
headerCall.addEventListener('click', openPopup);
footerCall.addEventListener('click', openPopup);
inputEmail.addEventListener('input', onInput);

// выделение активного меню
window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;

	if (window.innerWidth > 768) {
		sections.forEach((el, i) => {
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

//бургер меню
function burger() {
	const burgerButton = document.querySelector('.header__burger-btn');
  const headerBurgerType = document.querySelector('.header__burger-type');
	
	burgerButton.addEventListener('click', function() {
		burgerButton.classList.toggle('header__burger-btn_active');
    headerBurgerType.classList.toggle('header__burger-type_active');
    footer.classList.toggle('footer_hidden');
		copyright.classList.toggle('copyright_hidden');
    if (headerBlock) {
      headerBlock.classList.toggle('header__block_hidden');
    }
    if (contacts) {
      contacts.classList.toggle('contacts_hidden');
    }
    if (formArea) {
      formArea.classList.toggle('form-area_hidden');
    }
    if (main) {
      main.classList.toggle('main_hidden');
    }
    if (photo) {
      photo.classList.toggle('photo_hidden');
    }
    if (plan) {
      plan.classList.toggle('plan_hidden');
    }
    if (technical) {
      technical.classList.toggle('technical_hidden');
    }
    if (politics) {
      politics.classList.toggle('politics_hidden');
    }
	});
}

burger();

//слайдер фото
const images = document.querySelectorAll('.photo .photo__slider img');
const sliderLine = document.querySelector('.photo .photo__slider');
let count = 0;
let width;

function init() {
    width = document.querySelector('.photo').offsetWidth;
    sliderLine.style.width = width * images.length + 'px';
    images.forEach(item => {
        item.style.width = width + 'px';
        item.style.height = 'auto';
    });
    rollSlider();
}

init();
window.addEventListener('resize', init);

document.querySelector('.photo__arrow-right').addEventListener('click', function () {
    count++;
    if (count >= images.length) {
        count = 0;
    }
    rollSlider();
});

document.querySelector('.photo__arrow-left').addEventListener('click', function () {
    count--;
    if (count < 0) {
        count = images.length - 1;
    }
    rollSlider();
});

function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
}

//слайдер плана
const planImages = document.querySelectorAll('.plan .plan__slider img');
const planSliderLine = document.querySelector('.plan .plan__slider');
let planCount = 0;
let planWidth;

function planInit() {
  planWidth = document.querySelector('.plan').offsetWidth;
  planSliderLine.style.width = planWidth * planImages.length + 'px';
  planImages.forEach(item => {
        item.style.width = planWidth + 'px';
        item.style.height = 'auto';
    });
    planRollSlider();
}

planInit();
window.addEventListener('resize', planInit);

document.querySelector('.plan__arrow-right').addEventListener('click', function () {
  planCount++;
    if (planCount >= planImages.length) {
        planCount = 0;
    }
    planRollSlider();
});

document.querySelector('.plan__arrow-left').addEventListener('click', function () {
  planCount--;
    if (planCount < 0) {
        planCount = planImages.length - 1;
    }
    planRollSlider();
});

function planRollSlider() {
  planSliderLine.style.transform = 'translate(-' + planCount * planWidth + 'px)';
}