/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const icon = menuToggle.querySelector("i");

  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

/* =========================================
   CLOSE MOBILE MENU AFTER CLICKING LINK
========================================= */

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");

    const icon = menuToggle.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

/* =========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", (event) => {
  const clickedInsideMenu = navLinks.contains(event.target);

  const clickedMenuButton = menuToggle.contains(event.target);

  if (
    !clickedInsideMenu &&
    !clickedMenuButton &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");

    const icon = menuToggle.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

/* =========================================
   HEADER SHADOW ON SCROLL
========================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.25)";
  } else {
    header.style.boxShadow = "none";
  }
});

/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.1,
  },
);

sections.forEach((section) => {
  section.classList.add("hidden");

  observer.observe(section);
});

/* =========================================
   CONTACT FORM
========================================= */
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const contactForm = document.querySelector(".contact-form");

const sendEmail = async () => {
  const keys = {
    serviceID: "service_gt6qh5i",
    templateID: "template_xa52ivd",
  };

  const name = contactForm.querySelector('input[type="text"]').value;

  const email = contactForm.querySelector('input[type="email"]').value;

  const message = contactForm.querySelector("textarea").value;

  const templateParams = {
    senderName: name,
    senderEmail: email,
    subject: "Contact Us email",
    message: message,
  };

  try {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!re.test(email)) {
      alert("Email is not valid email");
      setLoading(false);
      return;
    }

    await emailjs.send(keys.serviceID, keys.templateID, templateParams);
    alert(`Thank you, ${name}! Your message has been received.`);
  } catch (error) {
    console.error(error);
  }
};

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = contactForm.querySelector('input[type="text"]').value;

  const email = contactForm.querySelector('input[type="email"]').value;

  const message = contactForm.querySelector("textarea").value;
  if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
    alert("Please fill in all fields.");

    return;
  }

  await sendEmail();

  contactForm.reset();
});
