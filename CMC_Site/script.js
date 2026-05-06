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

const container = document.querySelector(".top-arts");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

function getSlideWidth() {
    return container.querySelector("img").clientWidth + 16; 
    // 16 = your gap (1rem ≈ 16px)
}

next.addEventListener("click", () => {
    container.scrollBy({
        left: getSlideWidth(),
        behavior: "smooth"
    });
});

prev.addEventListener("click", () => {
    container.scrollBy({
        left: -getSlideWidth(),
        behavior: "smooth"
    });
});


const track = document.querySelector(".carousel-track");
const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".carousel-item");
const total = slides.length;

let index = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
let moveX = 0;

setInterval(() => {
    index++;

    if(index >= total){
        index = 0; // go back to first
    }

    track.style.transform = `translateX(-${index * 100}%)`;
}, 3000); // 3 seconds

function updateSlide(){
    track.style.transform = `translateX(${-index * 100}%)`;
}

// start drag
carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
});

// move drag
carousel.addEventListener("mousemove", (e) => {
    if(!isDragging) return;

    currentX = e.clientX;
    moveX = currentX - startX;

    track.style.transition = "none";
    track.style.transform = `translateX(calc(${-index * 100}% + ${moveX}px))`;
});

// end drag
carousel.addEventListener("mouseup", () => {
    if(!isDragging) return;
    isDragging = false;

    track.style.transition = "transform 0.4s ease";

    // swipe threshold
    if(moveX < -100 && index < slides.length - 1){
        index++;
    } 
    else if(moveX > 100 && index > 0){
        index--;
    }

    updateSlide();
});

// safety: if mouse leaves container
carousel.addEventListener("mouseleave", () => {
    if(isDragging){
        isDragging = false;
        track.style.transition = "transform 0.4s ease";
        updateSlide();
    }
});