gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  const cards = [
    { id: "#card-1", endTranslateX: -2000, rotate: 45 },
    { id: "#card-2", endTranslateX: -1000, rotate: -30 },
    { id: "#card-3", endTranslateX: -2000, rotate: 45 },
    { id: "#card-4", endTranslateX: -1500, rotate: -30 },
  ];

  ScrollTrigger.create({
    trigger: ".wrapper-404",
    start: "top top",
    end: "+=900vh",
    scrub: 1,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      gsap.to(".wrapper-404", {
        x: `${-350 * self.progress}vw`,
        duration: 0.5,
        ease: "power3.out",
        y: `${-20 * self.progress}vh`,
      });
    },
  });

  cards.forEach((card) => {
    ScrollTrigger.create({
      trigger: "card.id",
      start: "top top",
      end: "+=1200vh",
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(card.id, {
          x: `${card.endTranslateX * self.progress}px`,
          rotate: `${card.rotate * self.progress * 2}`,
          duration: 0.5,
          ease: "power3.out",
        });
      },
    });
  });

  window.onscroll = function () {
    var progressBar = document.getElementById("progress-bar");
    var scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = (window.scrollY / scrollTotal) * 100;
    progressBar.style.width = scrollPercent + "%";
  };

  // Modal functionality: Make card-3 the trigger
  const modal = document.getElementById("modal");
  const card3 = document.getElementById("card-3");
  const closeModal = document.querySelector(".close");
  const container = document.querySelector('.container');
  const progressBar = document.getElementById("progress-bar");

  // When card-3 is clicked
  card3.addEventListener("click", () => {
    // Fade everything else out smoothly
    container.classList.add('faded-out');
    progressBar.classList.add('faded-out');
    modal.style.display = "flex"; // Show the modal
    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  });

  // When close button or outside of the modal is clicked
  closeModal.addEventListener("click", () => {
    gsap.to(modal, { opacity: 0, duration: 0.5, onComplete: () => {
      modal.style.display = "none";
      // Fade everything back in smoothly
      container.classList.remove('faded-out');
      progressBar.classList.remove('faded-out');
    }});
  });

  window.onclick = function (event) {
    if (event.target == modal) {
      gsap.to(modal, { opacity: 0, duration: 0.5, onComplete: () => {
        modal.style.display = "none";
        // Fade everything back in smoothly
        container.classList.remove('faded-out');
        progressBar.classList.remove('faded-out');
      }});
    }
  };
});

window.addEventListener("scroll", function () {
  var scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
  var scrollTop = window.scrollY;

  // Select the LinkedIn icon div
  var linkedinIcon = document.querySelector(".linkedin-icon");

  // Show the icon when the user scrolls near the bottom of the page
  if (scrollTop >= scrollTotal - 100) { // Adjust 100px as per your preference
    linkedinIcon.style.display = "block"; // Show the LinkedIn icon
  } else {
    linkedinIcon.style.display = "none"; // Hide the LinkedIn icon when not at the bottom
  }
});

window.addEventListener("scroll", function () {
  var scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
  var scrollTop = window.scrollY;

  // Select both LinkedIn icon divs
  var linkedinIconLeft = document.querySelector(".linkedin-icon");
  var linkedinIconRight = document.querySelector(".linkedin-icon-right");

  // Show both icons when the user scrolls to the bottom
  if (scrollTop >= scrollTotal - 100) {
    linkedinIconLeft.style.display = "block";
    linkedinIconRight.style.display = "block";
  } else {
    linkedinIconLeft.style.display = "none";
    linkedinIconRight.style.display = "none";
  }
});
