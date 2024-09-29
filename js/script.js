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

});



window.addEventListener("scroll", function () {
  var scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
  var scrollTop = window.scrollY;

  var linkedinIconLeft = document.querySelector(".linkedin-icon");
  var linkedinIconRight = document.querySelector(".linkedin-icon-right");

    console.log("Scroll Position: ", scrollTop, " / Total: ", scrollTotal);
  
  if (scrollTop >= scrollTotal - 300) {
    linkedinIconLeft.style.opacity = 1;
    linkedinIconRight.style.opacity = 1;
  } else {
    linkedinIconLeft.style.opacity = 0; 
    linkedinIconRight.style.opacity = 0; 
  }
});

