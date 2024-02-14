// burger menu
const body = document.querySelector("body")
const headerMenu = document.querySelector(".header-menu")
const headerMenuBtn = document.querySelector(".header__menu-btn")

headerMenuBtn.addEventListener('click', () => {
  headerMenuBtn.classList.toggle('active')
  headerMenu.classList.toggle('active')
  body.classList.toggle('lock')
})
// burger menu -- ends



// dropdown in form
    const customSelect = document.getElementById('customSelect')
    const selectedOption = document.getElementById('selectedOption')
    const optionsList = document.getElementById('optionsList')
    const countryCodeInput = document.getElementById('countryCodeInput')

    let isOpen = false
    selectedOption.addEventListener('click', function () {
      isOpen = !isOpen
      if (isOpen) {
        optionsList.style.display = 'block'
      } else {
        optionsList.style.display = 'none'
      }
    })

    optionsList.addEventListener('click', function (event) {
      if (event.target.tagName === 'LI') {
        const selectedValue = event.target.getAttribute('data-value')
        selectedOption.textContent = event.target.textContent
        countryCodeInput.placeholder = `Код страны(${selectedValue})`;
        isOpen = false
        optionsList.style.display = 'none'
      }
    })
// dropdown in form -- ends


// accrodio in section FAQ

const accordionTop = document.querySelectorAll('.accordion__top');
const accordionContent = document.querySelectorAll('.accordion__content');

accordionTop.forEach(function (accordionTop, index) {
  accordionTop.addEventListener('click', function () {
    accordionContent[index].classList.toggle('active');
    for (let i = 0; i < accordionContent.length; i++) {
      if (i !== index) {
        accordionContent[i].classList.remove('active');
      }
    }
    for (let i = 0; i < accordionTop.length; i++) {
      if (i !== index) {
        accordionTop[i].classList.remove('active');
      }
    }
  });
});


// accrodio in section FAQ -- ends