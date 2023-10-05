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
  var name = document.getElementById("review-name").value;

  if (name.length == 0) {
    nameError.innerHTML = "Name is required";
    return false;
  }

  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = "Write full name";
    return false;
  }

  nameError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
  return true;
}

function validateEmail() {
  var email = document.getElementById("review-email").value;

  if (email.length == 0) {
    emailError.innerHTML = "Email is required";
    return false;
  }

  if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailError.innerHTML = "Email Invalid";
    return false;
  }

  emailError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
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

function validateForm() {
 if (!validateName() || !validateEmail() || !validateMessage()) {
    submitError.style.display = "block";
    submitError.innerHTML = "Please fix error to submit";
    setTimeout(function () {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
}
