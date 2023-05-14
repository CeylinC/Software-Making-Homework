const toggleButton = document.querySelector(".btn-toggle"),
    signInButton = document.querySelector(".btn-sign-in"),
    signUpButton = document.querySelector(".btn-sign-up"),
    signInForm = document.querySelector(".sign-in"),
    signUpForm = document.querySelector(".sign-up");

signInButton.addEventListener("click", swipeLeft);
signUpButton.addEventListener("click", swipeRight);

function swipeLeft(){
    toggleButton.classList.remove("right");
    toggleButton.classList.add("left");
    toggleButton.style.left = "0px";
    toggleButton.innerHTML = "Giriş Yap";
    signInForm.style.transform = "translateX(0%)";
    signUpForm.style.transform = "translateX(200%)";
    document.title = "Giriş Yap - sesQ";
}

function swipeRight(){
    toggleButton.classList.remove("left");
    toggleButton.classList.add("right");
    toggleButton.style.left = "113px";
    toggleButton.innerHTML = "Üye Ol";
    signInForm.style.transform = "translateX(-200%)";
    signUpForm.style.transform = "translateX(0%)";
    document.title = "Üye Ol - sesQ";
}
