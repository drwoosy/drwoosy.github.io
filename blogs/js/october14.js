let interval;

function scrambleTextWithMessages(element, words, scrambleSpeed = 50, chance = 0.1) {
  let originalText = element.innerHTML;
  let length = originalText.length;

  function randomChar() {
    return String.fromCharCode(33 + Math.random() * 94); 
  }

  clearInterval(interval);


  interval = setInterval(() => {
    let scrambledText = '';

    if (Math.random() < chance && words.length > 0) {
      let randomWord = words[Math.floor(Math.random() * words.length)];
      
      element.style.color = '#FF000D';
      scrambledText = randomWord; 
    } else {
     
      for (let i = 0; i < length; i++) {
        scrambledText += randomChar();
      }
      element.style.color = 'white'; 
    }

    element.innerHTML = scrambledText;
  }, scrambleSpeed);
}

const scrambleElement = document.getElementById('scramble-text');
const subliminalWords = ["love", "hope", "joy", "live", "free", "ZAYAN"]; 
scrambleElement.addEventListener('mouseover', () => {
  scrambleTextWithMessages(scrambleElement, subliminalWords, 100, 0.12); 
});

scrambleElement.addEventListener('mouseleave', () => {
  clearInterval(interval); 
  scrambleElement.innerHTML = '[pbl]'; 
  scrambleElement.style.color = 'white'; 
});

