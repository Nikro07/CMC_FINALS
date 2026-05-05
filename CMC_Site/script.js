window.addEventListener("load", () => {
    const logo = document.querySelector(".intro-logo");
    const bg = document.querySelector(".intro-bg");
    const cmc = document.querySelector(".intro-text");

    // Step 1: show background + logo
    setTimeout(() => {
        bg.classList.add("show");
        logo.classList.add("show");
        cmc.classList.add("show");
        
    }, 100);

    // Step 2: wait, then move logo
    setTimeout(() => {
        logo.classList.add("move");
        
    }, 2200);

    // Step 3: fade out background + show site
    setTimeout(() => {
        bg.classList.add("hide");
        cmc.classList.add("hide");
        document.body.classList.add(    "loaded");
    }, 3400);

    // Step 4: remove intro logo
    setTimeout(() => {
        logo.classList.add("hide");
    }, 4200);
});

let lastScroll = window.pageYOffset;
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        nav.classList.remove("hide");
        return;
    }

    if (currentScroll > lastScroll + 5) {
        // scrolling down → hide nav
        nav.classList.add("hide");
    } else if (currentScroll < lastScroll - 5) {
        // scrolling up → show nav
        nav.classList.remove("hide");
    }

    lastScroll = currentScroll;
});