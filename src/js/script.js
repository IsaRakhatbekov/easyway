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