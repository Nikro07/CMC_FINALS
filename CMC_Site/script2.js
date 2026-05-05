const logo2 = document.querySelector(".intro-logo2");
const bg = document.querySelector(".intro-bg");
const cmc = document.querySelector(".intro-text");

window.addEventListener("load", () => {

    setTimeout(() => {
        bg.classList.add("show");
        logo2.classList.add("show");
        cmc.classList.add("show");
    }, 100);

    
    setTimeout(() => {
        bg.classList.add("hide");
        cmc.classList.add("hide");
        document.body.classList.add("loaded");
    }, 3000);

    setTimeout(() => {
        logo2.classList.add("hide");
    }, 3600);
});