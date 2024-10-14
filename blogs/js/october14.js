let interval;

function scrambleTextWithMessages(element, words, scrambleSpeed = 50, chance = 0.1) {
  let originalText = element.innerHTML;
  let length = originalText.length;

  function randomChar() {
    return String.fromCharCode(33 + Math.random() * 94); // Generates random characters
  }

  // Clear any previous interval
  clearInterval(interval);

  // Start scrambling indefinitely
  interval = setInterval(() => {
    let scrambledText = '';

    // Random chance to display a full subliminal word instead of random characters
    if (Math.random() < chance && words.length > 0) {
      let randomWord = words[Math.floor(Math.random() * words.length)];
      
      // Apply red color to all subliminal words
      element.style.color = '#FF000D';
      scrambledText = randomWord; // Display the subliminal word
    } else {
      // Scramble with random characters if no subliminal word is chosen
      for (let i = 0; i < length; i++) {
        scrambledText += randomChar();
      }
      element.style.color = 'white'; // Reset to white color during scramble
    }

    element.innerHTML = scrambledText;
  }, scrambleSpeed);
}

// Add hover event to start scrambling with subliminal messages
const scrambleElement = document.getElementById('scramble-text');
const subliminalWords = ["love", "hope", "joy", "live", "free", "ZAYAN"]; // List of subliminal words
scrambleElement.addEventListener('mouseover', () => {
  scrambleTextWithMessages(scrambleElement, subliminalWords, 100, 0.12); // Adjust speed and chance as needed
});

// Add mouseleave event to stop scrambling immediately
scrambleElement.addEventListener('mouseleave', () => {
  clearInterval(interval); // Stop the interval immediately
  scrambleElement.innerHTML = '[pbl]'; // Reset to original text
  scrambleElement.style.color = 'white'; // Reset to default color
});

