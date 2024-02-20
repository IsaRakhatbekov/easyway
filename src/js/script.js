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
//  document.addEventListener('DOMContentLoaded', function () {
//     const resetButtons = document.querySelectorAll('.reset-btn');

//     resetButtons.forEach(function (button) {
//       button.addEventListener('click', function () {
//         const input = this.parentNode.querySelector('input');
//         input.value = ''; // Сбрасываем значение инпута
//       });
//     });
//   });
// dropdown in form -- ends ------------------------------------------------------------------------------------------------------


// accrodion in section FAQ ------------------------------------------------

// const accordionTop = document.querySelectorAll('.accordion__top');
// const accordionContent = document.querySelectorAll('.accordion__content');

// accordionTop.forEach(function (accordionTop, index) {
//   accordionTop.addEventListener('click', function () {
//     accordionContent[index].classList.toggle('active');
//     for (let i = 0; i < accordionContent.length; i++) {
//       if (i !== index) {
//         accordionContent[i].classList.remove('active');
//       }
//     }
//     for (let i = 0; i < accordionTop.length; i++) {
//       if (i !== index) {
//         accordionTop[i].classList.remove('active');
//       }
//     }
//   });
// });


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
            console.log("ghjtik")
            return true
        }
    } catch (error) {
        console.log(error)
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
        const formMessage = document.createElement('div');
        const form = document.querySelector('.appliaction__content');

        formMessage.style.color = '#fff';
        formMessage.style.backgroundColor = "#F63235";
        formMessage.style.width = '546px';
        formMessage.style.height = '92px';
        formMessage.style.borderRadius = '15px';
        formMessage.style.marginTop = '30px';
        formMessage.style.border = '1px solid #FEA9A9';

        const formMessageIcon = document.createElement('div');
        formMessageIcon.style.width = '44px';
        formMessageIcon.style.height = '44px';
        formMessageIcon.style.borderRadius = '8px';
        formMessageIcon.style.backgroundColor = '#fff';
        formMessageIcon.style.display = 'flex';
        formMessageIcon.style.justifyContent = 'center';
        formMessageIcon.style.alignItems = 'center';
        formMessageIcon.style.margin= '0 16px 0 13px';

        const img = document.createElement('img');

        img.src = './src/images/icon-check.svg';
        img.style.width = '23.33px';
        img.style.height = '23.33px';

        const formMessageWrapper = document.createElement('div');
        const formMessageText = document.createElement('p');

        formMessageText.innerText = 'Ваша заявка успешно отправлена! Наши менеджеры свяжутся с вами в ближайшее время.'
        formMessageText.style.color = '#fff';
        formMessageText.style.fontSize = '16px';
        formMessageText.style.lineHeight = '1.3em';
        formMessageText.style.width = '418px';
        formMessageText.style.height = '44px';

        formMessageWrapper.style.width = '100%';
        formMessageWrapper.style.height = '100%';
        formMessageWrapper.style.display = 'flex';
        formMessageWrapper.style.justifyContent = 'center';
        formMessageWrapper.style.alignItems = 'center';

        const btnClose = document.createElement('button');
        const btnCloseImg = document.createElement('img');
        btnCloseImg.src = './src/images/x-icon.svg';
        btnClose.style.borderRadius = '29px';
        btnClose.style.backgroundColor = '#fff';
        btnClose.style.width = '24px';
        btnClose.style.height = '24px';
        btnClose.style.margin = '10px 10px 58px 15px  ';

        btnCloseImg.style.width = '10px';
        btnCloseImg.style.height = '10px';

        form.appendChild(formMessage)
        formMessage.appendChild(formMessageWrapper)
        formMessageWrapper.appendChild(formMessageIcon)
        formMessageIcon.appendChild(img)
        formMessageWrapper.appendChild(formMessageText)
        formMessageWrapper.appendChild(btnClose)
        btnClose.appendChild(btnCloseImg)
    }
});
