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
new Swiper(".swiper", {
    // slidesPerView: 4, // Number of slides per view
    // slidesPerRow: 2, // Number of slides per column
    // grid: {
    //     rows: 1,
    // },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});
