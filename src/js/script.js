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