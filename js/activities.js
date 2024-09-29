import { interiors } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery");
  const numberOfItems = 12; // Number of items in the wheel
  const radius = 1000; // Radius of the circular layout
  const centerX = window.innerWidth / 2.3   ; // X center of the wheel
  const centerY = window.innerHeight / 2; // Y center of the wheel
  const angleIncrement = (2 * Math.PI) / numberOfItems; // Angle between each item

  // Create and position each item in the wheel
  for (let i = 0; i < numberOfItems; i++) {
    const item = document.createElement("div");
    item.className = "item";
      
    item.id = interiors[i].id;
    
    // Create text element
    const p = document.createElement("p");
    const count = document.createElement("span");
    p.textContent = interiors[i].name;
    count.textContent = `(${Math.floor(Math.random() * 50) + 1})`; // Random count for demo
    item.appendChild(p);
    p.appendChild(count);
    gallery.appendChild(item);

    // Calculate the position of each item in the wheel
    const angle = i * angleIncrement;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const rotation = (angle * 180) / Math.PI;

    // Use GSAP to position and rotate each item
    gsap.set(item, {
      x: `${x}px`,
      y: `${y}px`,
      rotation: rotation,
    });
  }

  // Function to update the position of the items when scrolling
  function updatePosition() {
    const scrollAmount = window.scrollY * 0.0005; // Adjust the speed of the scroll effect
    document.querySelectorAll(".item").forEach(function (item, index) {
      const angle = index * angleIncrement + scrollAmount;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const rotation = (angle * 180) / Math.PI;

      gsap.to(item, {
        duration: 0.05,
        x: `${x}px`,
        y: `${y}px`,
        rotation: rotation,
        ease: "elastic.out(1,0.3)",
      });
    });
  }

  // Initial positioning and event listeners for scroll updates
  updatePosition();
  document.addEventListener("scroll", updatePosition);
});

