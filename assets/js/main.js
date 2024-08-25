// const homeName = new Typed('.home__name', {
//   strings: ['Sahil ^1000 Saini_'],
//   typeSpeed: 200,
//   cursorChar: '',
// });

const homeWork = new Typed('.home__work', {
  strings: ['Full Stack | Blockchain | Freelancer'],
  typeSpeed: 50,
  cursorChar: '',
});




/*=============== Active Link =============== */
// const navlink = document.querySelectorAll(".nav__link");

// function activeLink() {
//   navlink.forEach((n) => n.classList.remove("active-link"));
//   this.classList.add("active-link");
// }

// navlink.forEach((n) => n.addEventListener("click", activeLink));

/*=============== Background Header =============== */
// function scrollHeader() {
//   const header = document.getElementById("header");

//   if (this.scrollY >= 50) header.classList.add("scroll-header");
//   else header.classList.remove("scroll-header");
// }

// window.addEventListener("scroll", scrollHeader);

/*=============== Active Work =============== */
// const linkWork = document.querySelectorAll(".category__btn");

// function activeWork() {
//   linkWork.forEach((n) => n.classList.remove("active-work"));
//   this.classList.add("active-work");
// }

// linkWork.forEach((n) => n.addEventListener("click", activeWork));

/*=============== Mixitup Filter =============== */
// let mixerProjects = mixitup(".projects__container", {
//   selectors: {
//     target: ".project__item",
//   },
//   animation: {
//     duration: 300,
//   },
// });

/*=============== Testimonials Swiper =============== */
// var testSwiper = new Swiper(".testimonial__container", {
//   loop: true,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//   },
//   mousewheel: true,
//   keyboard: true,
// });

/*=============== Email Js =============== */
// const contactForm = document.getElementById("contact__form"),
//   contactName = document.getElementById("contact-name"),
//   contactEmail = document.getElementById("contact-email"),
//   Message = document.getElementById("message"),
//   contactMessage = document.getElementById("contact-message");

// const sendEmail = (e) => {
//   e.preventDefault();

//   if (
//     contactName.value === "" ||
//     contactEmail.value === "" ||
//     Message.value === ""
//   ) {
//     contactMessage.classList.remove("color-light");
//     contactMessage.classList.add("color-dark");

//     contactMessage.textContent = "Write all the fields";
//   } else {
//     emailjs.sendForm("", "", "", "");
//   }
// };

// contactForm.addEventListener("submit", sendEmail);
