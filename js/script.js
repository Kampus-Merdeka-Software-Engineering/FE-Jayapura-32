"use strict";

/**
 * addEvent on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  navbarToggler.classList.toggle("active");
};

addEventOnElem(navbarToggler, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  navbarToggler.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNav);

/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbzP_fB7ZNFsvIppxkTguhGtZv5V69fPhb175-AR8GVxyUquJmyW1eUyHdZgk59jeAmOdg/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    // eslint-disable-next-line no-unused-vars
    .then((response) => {
      msg.innerHTML = "Thank You For Subscribing!";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 3000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});

function postEmail(event) {
  event.preventDefault();

  // taking data from form
  const form = event.target;
  const email = form.querySelector('[name="email"]').value;

  // making object data
  const data = {
    email: email,
  };

  // send data as json
  fetch("https://be-jayapura-32-production.up.railway.app/api/email_cb/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        msg.innerHTML = "Thank You For Subscribing!";
        setTimeout(function () {
          msg.innerHTML = "";
        }, 3000);
        form.reset();
      } else {
        alert("Maaf, terjadi kesalahan. Silakan coba lagi.");
      }
    })
    .catch((error) => console.error("Error sending email data:", error));
}

function getReview(event) {
  function fetchReviewData() {
    fetch("https://be-jayapura-32-production.up.railway.app/api/user_review")
      .then((response) => response.json())
      .then((data) => {
        const testimonialElement = document.querySelector(
          "testimonial .testimonial-box-container"
        );
        testimonialElement.querySelector("profile").textContent =
          data.description;
        testimonialElement.querySelector("reviews").textContent =
          data.description;
        testimonialElement.querySelector("client-comment").textContent =
          data.description;
      })
      .catch((error) => console.error("Error fetching header data:", error));
  }
}

document
  .querySelector('.section.hero form[name="submit-to-google-sheet"]')
  .addEventListener("submit", postEmail);
document.addEventListener("DOMContentLoaded", getReview);
