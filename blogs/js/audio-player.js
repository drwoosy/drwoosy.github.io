const waveCanvas = document.getElementById('wave-visualizer');
const startText = document.getElementById('start-text');
const audio = document.getElementById('audio');
const ctx = waveCanvas.getContext('2d');

let isPlaying = false;
let audioContext, analyser, dataArray, bufferLength;
let animationFrameId; // Keep track of the requestAnimationFrame ID

function createVisualizer() {
    if (!audioContext) {
      // Create an AudioContext if it doesn't exist yet
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaElementSource(audio);
      analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.connect(audioContext.destination);
  
      analyser.fftSize = 1024; // Higher fftSize for smoother waves
      analyser.smoothingTimeConstant = 0.8; // Smooth the changes over time
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
  
      // Improve canvas resolution based on device pixel ratio
      const devicePixelRatio = window.devicePixelRatio || 1;
      waveCanvas.width = waveCanvas.clientWidth * devicePixelRatio;
      waveCanvas.height = waveCanvas.clientHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }
  }
  

  function drawVisualizer() {
    animationFrameId = requestAnimationFrame(drawVisualizer); // Continue the loop
  
    analyser.getByteFrequencyData(dataArray); // Get frequency data
  
    ctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height); // Clear the canvas
    ctx.lineWidth = 1; // Thinner line for smoother look
    ctx.strokeStyle = 'white'; // Set wave color to white
    ctx.beginPath();
  
    // Use the clientWidth and clientHeight for centering
    const centerX = waveCanvas.clientWidth / 2; // X-center based on CSS size
    const centerY = waveCanvas.clientHeight / 2; // Y-center based on CSS size
    const radius = waveCanvas.clientWidth / 2; // Keep the radius based on CSS width
  
    const sliceWidth = (Math.PI * 2) / bufferLength;
    let angle = 0;
  
    for (let i = 0; i < bufferLength; i++) {
      const amplitude = dataArray[i];
      const normalizedAmplitude = amplitude / 255; // Normalize amplitude
  
      const y = normalizedAmplitude * radius;
  
      const x = centerX + y * Math.cos(angle);
      const yCoord = centerY + y * Math.sin(angle);
  
      if (i === 0) {
        ctx.moveTo(x, yCoord);
      } else {
        ctx.lineTo(x, yCoord);
      }
  
      angle += sliceWidth;
    }
  
    ctx.closePath();
    ctx.stroke(); // Draw the waveform
  }
  

waveCanvas.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play().then(() => {
      startText.style.display = 'none'; // Hide "Start" text when playing
      createVisualizer(); // Initialize the audio context and analyser
      drawVisualizer(); // Start the drawing loop
      isPlaying = true;
    }).catch((error) => {
      console.error('Audio play error:', error); // Catch any play errors
    });
  } else {
    audio.pause();
    cancelAnimationFrame(animationFrameId); // Stop the drawing loop
    isPlaying = false;
  }
});

audio.addEventListener('ended', () => {
  cancelAnimationFrame(animationFrameId); // Stop the animation when audio ends
  isPlaying = false;
  startText.style.display = 'block'; // Show "Start" text again when audio ends
});
