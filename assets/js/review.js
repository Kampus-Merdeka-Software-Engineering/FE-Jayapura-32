const allStar = document.querySelectorAll(".rating .star");
const ratingValue = document.querySelector(".rating input");
var messageError = document.getElementById('message-error');
var submitError = document.getElementById('submit-error');

allStar.forEach((item, idx) => {
    item.addEventListener("click", function() {
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

function validateMessage() {
    var message = document.getElementById('review-message').value;
    var required = 30;
    var left = required - message.length;

    if (left > 0) {
        messageError.innerHTML = left + 'more characters required';
        return false;
    }

    messageError.innerHTML = '<i class="bx bx-check check"></i>';
    return true;

}

function validateForm() {
    if (!validateMessage()) {
        submitError.style.display = 'block';
        submitError.innerHTML = 'Please fix error to submit';
        setTimeout(function() { submitError.style.display = 'none'; }, 3000);
        return false;
    }
}
