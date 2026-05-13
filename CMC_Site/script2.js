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