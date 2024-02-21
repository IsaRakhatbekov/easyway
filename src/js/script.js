// burger menu ------------------------------------------------------------------------
const body = document.querySelector("body");
const headerMenu = document.querySelector(".header-menu");
const headerMenuBtn = document.querySelector(".header__menu-btn");
const mobileMenuLinks = document.querySelectorAll(".header-menu__links");

headerMenuBtn.addEventListener('click', () => {
    headerMenuBtn.classList.toggle('active');
    headerMenu.classList.toggle('active');
    body.classList.toggle('lock');
});

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        headerMenuBtn.classList.remove('active');
        headerMenu.classList.remove('active');
        body.classList.remove('lock');
    });
});
// burger menu -- ends ------------------------------------------------------------

// dropdown in form ------------------------------------------------------------------------------------------------
const customSelectInput = document.querySelector('.custom-select__input');
const customSelectWrapper = document.querySelector('.custom-select__wrapper');
const customSelectOptions = document.querySelectorAll('.custom-select__options');
const customSelectSpan = document.querySelectorAll('.custom-select__span');

customSelectInput.addEventListener('click', () => {
    customSelectInput.classList.toggle('active');
    customSelectWrapper.classList.toggle('active');
});

customSelectOptions.forEach((option, index) => {
    option.addEventListener('click', (event) => {
        customSelectInput.classList.remove('active');
        customSelectWrapper.classList.remove('active');

        // Получаем текст выбранного элемента из custom-select__options
        const innerTextOption = event.target.innerText;

        // Получаем текст соответствующего элемента из custom-select__span и удаляем пробелы
        const innerTextSpan = customSelectSpan[index].innerText.replace(/\s/g, '');

        // Соединяем тексты и устанавливаем в custom-select__input
        const combinedText = `${innerTextOption} ${innerTextSpan}`;
        customSelectInput.placeholder = combinedText;
    });
});
// THIS IS FOR RESET INPUTS VALUE
 document.addEventListener('DOMContentLoaded', function () {
    const resetButtons = document.querySelectorAll('.reset-btn');

    resetButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const input = this.parentNode.querySelector('input');
        input.value = ''; // Сбрасываем значение инпута
      });
    });
  });
// dropdown in form -- ends ------------------------------------------------------------------------------------------------------


// accrodion in section FAQ ------------------------------------------------

const accordionTops = document.querySelectorAll('.accordion__top');
const accordionContents = document.querySelectorAll('.accordion__content');

accordionTops.forEach(function (accordionTop, index) {
    accordionTop.addEventListener('click', function () {
        const isActive = accordionContents[index].classList.contains('active');

        accordionContents.forEach(content => content.classList.remove('active'));
        accordionTops.forEach(top => top.classList.remove('active'));

        if (!isActive) {
            accordionContents[index].classList.add('active');
            accordionTop.classList.add('active');
        }
    });
});


// accrodio in section FAQ -- ends------------------------------------------


// SWIPER ------------------------------

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 2,
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const swiperBtnPrev = document.querySelector('.swiper-button-prev')
const swiperBtnNext = document.querySelector('.swiper-button-next')

swiperBtnPrev.addEventListener('click', () => {
    swiperBtnPrev.classList.add('active')
    swiperBtnNext.classList.remove('active')
})
swiperBtnNext.addEventListener('click', () => {
    swiperBtnNext.classList.add('active')
    swiperBtnPrev.classList.remove('active')
})

// SWIPER -- ends ---------------------

// VALIDATION FORM ------------------------
const nameValue = document.getElementById('form__name');
const phoneValue = document.getElementById('phone');
const emailValue = document.getElementById('form__email');
const nameError = document.getElementById('form__name__error');
const phoneError = document.getElementById('form__phone__error');
const formBtn = document.getElementById('submitBtn');
const formSuccessfully = document.querySelector('.form-successfully')
const formSuccessfullyCloseBtn  = document.querySelector('.form-successfully__close')

const isOnlyLetters = (name) => {
    return /^[a-zA-Z]+$/.test(name);
};

const validateForm = () => {
    let checkError = true;

    if (!nameValue.value.trim()) {
        nameError.innerHTML = 'Пожалуйста, введите ваше имя';
        nameError.style.color = 'red';
        checkError = false;
    } else if (!isOnlyLetters(nameValue.value)) {
        nameError.innerHTML = 'Имя должно содержать только буквы';
        nameError.style.color = 'red';
        checkError = false;
    } else if (nameValue.value.length > 25) {
        nameError.innerHTML = 'Имя должно содержать не более 24 символов';
        nameError.style.color = 'red';
        checkError = false;
    } else {
        nameError.innerHTML = 'Имя *';
        nameError.style.color = '';
    }

    // Проверка номера телефона
    if (!phoneValue.value.trim()) {
        phoneError.innerHTML = 'Пожалуйста, введите номер телефона';
        phoneError.style.color = 'red';
        checkError = false;
    } else {
        // Удаление всех символов и пробелов
        const phoneDigits = phoneValue.value.replace(/[^0-9]/g, '');
        console.log(phoneDigits)

        // Проверка длины
        if (phoneDigits.length > 13) {
            phoneError.innerHTML = 'Номер телефона не должен превышать 12 цифр';
            phoneError.style.color = 'red';
            checkError = false;
        } else if (!phoneDigits.length) {
            phoneError.innerHTML = 'Введите корректный номер телефона';
            phoneError.style.color = 'red';
            checkError = false;
        } else if (/[a-zA-Z]/g.test(phoneValue.value)) {
            phoneError.innerHTML = 'В номере телефона не должно быть букв';
            phoneError.style.color = 'red';
            checkError = false;
        } else {
            phoneError.innerHTML = 'Номер телефона *';
            phoneError.style.color = '';
        }
    }


    return checkError;
};

const sendInfo = async (form) => {
    try {
        const data = await fetch('https://metalabs.kg:8084/api/telegramBot/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
        const resp = await data.text()
        if (resp === 'OK') {
            return true
        }
    } catch (error) {
        alert('Ошибка при отправке данных', error)
    }
}

formBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const formData = {
        name: nameValue.value,
        phone: phoneValue.value.replace(/[^0-9]/g, ''),
        mail: emailValue.value || 'Не указано',
    };

    if (sendInfo(formData)) {
      formSuccessfully.classList.add('active')
      formSuccessfullyCloseBtn.addEventListener('click', () => {
        formSuccessfully.classList.remove('active')
      })
    }
});