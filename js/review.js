const allStar = document.querySelectorAll(".rating .star");
const ratingValue = document.querySelector(".rating input");
var nameError = document.getElementById("name-error");
var emailError = document.getElementById("email-error");
var messageError = document.getElementById("message-error");
var submitError = document.getElementById("submit-error");

allStar.forEach((item, idx) => {
  item.addEventListener("click", function () {
    let click = 0;
    ratingValue.value = idx + 1;
    console.log(ratingValue.value);

    allStar.forEach((i) => {
      i.classList.replace("bxs-star", "bx-star");
      i.classList.remove("active");
    });
    for (let i = 0; i < allStar.length; i++) {
      if (i <= idx) {
        allStar[i].classList.replace("bx-star", "bxs-star");
        allStar[i].classList.add("active");
      } else {
        allStar[i].style.setProperty("--i", click);
        click++;
      }
    }
  });
});

// Submit

function validateName() {
  var full_name = document.getElementById("review-full_name").value;

  if (full_name.length == 0) {
    nameError.innerHTML = "Name is required";
    return false;
  }

  if (!full_name.match(/^[A-Za-z]*\s{1}[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = "Write full name";
    return false;
  }

  nameError.innerHTML = '<i class="bx bx-check check"></i>';
  return true;
}

function validateEmail() {
  var email = document.getElementById("review-email").value;

  if (email.length == 0) {
    emailError.innerHTML = "Email is required";
    return false;
  }

  if (!email.match(/^[A-Za-z\\._\-[0-9]*[@][A-Za-z]*[\\.][a-z]{2,4}$/)) {
    emailError.innerHTML = "Email Invalid";
    return false;
  }

  emailError.innerHTML = '<i class="bx bx-check check"></i>';
  return true;
}

function validateMessage() {
  var message = document.getElementById("review-message").value;
  var required = 10;
  var left = required - message.length;

  if (left > 0) {
    messageError.innerHTML = left + "more characters required";
    return false;
  }

  messageError.innerHTML = '<i class="bx bx-check check"></i>';
  return true;
}

// eslint-disable-next-line no-unused-vars
function validateForm() {
  if (!(!validateName() || !validateEmail() || !validateMessage())) {
    return;
  }
  submitError.style.display = "block";
  submitError.innerHTML = "Please fix error to submit";
  setTimeout(function () {
    submitError.style.display = "none";
  }, 3000);
  return false;
}

// post data from review html
function postReviewFormData(event) {
  event.preventDefault();

  // taking data from form
  const form = event.target;
  const email = (email = document.getElementById("review-email").value);
  const full_name = (full_name =
    document.getElementById("review-full_name").value);
  const message = document.getElementById("review-message").value;
  const star = (ratingValue = document.querySelector(".rating input"));

  // making object data
  const data = {
    email: email,
    full_name: full_name,
    message: message,
    star: star,
  };

  alert(data);

  // send data as json
  fetch(
    "https://be-jayapura-32-production.up.railway.app/api/user_review/add",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Terima kasih! Feedback Anda telah terkirim.");
        form.reset();
      } else {
        alert("Maaf, terjadi kesalahan. Silakan coba lagi.");
      }
    })
    .catch((error) => console.error("Error sending contact data:", error));
}

// event listener for form submission
document
  .querySelector(".review-form form")
  .addEventListener("submit", postContactFormData);

// call the function when the page is created
document.addEventListener("DOMContentLoaded", fetchHeaderData);
