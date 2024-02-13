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
new Swiper('.swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 2, // Number of slides per view
    slidesPerColumn: 2, // Number of slides per column

});
