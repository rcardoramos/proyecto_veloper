// Referencias DOM
const form = document.getElementById("contactForm");
const toastSuccess = document.getElementById("toastSuccess");
const toastError = document.getElementById("toastError");

function showToast(toastElement) {
    toastElement.classList.remove("hidden");
    toastElement.style.opacity = "1";

    // Ocultar después de 4 segundos
    setTimeout(() => {
        toastElement.style.opacity = "0";
        // Esperar animación de opacidad (0.5s) para ocultar
        setTimeout(() => toastElement.classList.add("hidden"), 500);
    }, 4000);
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
    })
        .then(response => {
            if (response.ok) {
                form.reset();
                window.scrollTo({ top: form.offsetTop, behavior: "smooth" });
                showToast(toastSuccess);
            } else {
                showToast(toastError);
            }
        })
        .catch(() => {
            showToast(toastError);
        });
});

// Smooth scroll para enlaces ancla
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
    });
});

// Animación con IntersectionObserver
const observer = new IntersectionObserver(
    (entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-fade-in");
                obs.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll("section").forEach(section => observer.observe(section));

// Actualiza el año automáticamente
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

document.getElementById("year").textContent = new Date().getFullYear();

const swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 2500,
    },
    breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
    }
});

