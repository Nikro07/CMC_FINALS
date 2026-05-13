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

document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.15 // Triggers when 15% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Optional: Stop observing after it reveals once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Tell the observer to watch every section with the 'reveal' class
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach(el => observer.observe(el));
});




document.addEventListener('DOMContentLoaded', function() {
  const role = localStorage.getItem('userRole');
  const dashContainer = document.getElementById('dashboard-links');
  const logoutBtn = document.getElementById('logoutBtn');

  if (role) {
    logoutBtn.style.display = 'block';
    
    // Create Dashboard links based on role
    if (role === "Admin" || role === "Super Admin") {
      let adminLink = document.createElement('a');
      adminLink.href = "admin-dash.html";
      adminLink.innerHTML = `<i class="fa-solid fa-gauge"></i> Admin Panel`;
      adminLink.style.color = "#E1CF8B";
      dashContainer.appendChild(adminLink);
    }

    if (role === "Super Admin") {
      let superLink = document.createElement('a');
      superLink.href = "super-dash.html";
      superLink.innerHTML = `<i class="fa-solid fa-shield-halved"></i> Super Control`;
      superLink.style.color = "#E1CF8B";
      superLink.style.marginLeft = "15px";
      dashContainer.appendChild(superLink);
    }
  }

  // Logout Functionality
  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('userRole');
    window.location.reload(); // Refresh to hide restricted areas
  });
});