const waveCanvas = document.getElementById('wave-visualizer');
const startText = document.getElementById('start-text');
const audio = document.getElementById('audio');
const ctx = waveCanvas.getContext('2d');

let isPlaying = false;
let audioContext, analyser, dataArray, bufferLength;
let animationFrameId; 

function createVisualizer() {
    if (!audioContext) {
     
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaElementSource(audio);
      analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.connect(audioContext.destination);
  
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.8;
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
  
      const devicePixelRatio = window.devicePixelRatio || 1;
      waveCanvas.width = waveCanvas.clientWidth * devicePixelRatio;
      waveCanvas.height = waveCanvas.clientHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }
  }
  

  function drawVisualizer() {
    animationFrameId = requestAnimationFrame(drawVisualizer); 
  
    analyser.getByteFrequencyData(dataArray); 
  
    ctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height); 
    ctx.lineWidth = 1; 
    ctx.strokeStyle = 'white'; 
    ctx.beginPath();
  
   
    const centerX = waveCanvas.clientWidth / 2; 
    const centerY = waveCanvas.clientHeight / 2; 
    const radius = waveCanvas.clientWidth / 2; 
  
    const sliceWidth = (Math.PI * 2) / bufferLength;
    let angle = 0;
  
    for (let i = 0; i < bufferLength; i++) {
      const amplitude = dataArray[i];
      const normalizedAmplitude = amplitude / 255; 
  
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
    ctx.stroke(); 
  }
  

waveCanvas.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play().then(() => {
      startText.style.display = 'none'; 
      createVisualizer(); 
      drawVisualizer();
      isPlaying = true;
    }).catch((error) => {
      console.error('Audio play error:', error); 
    });
  } else {
    audio.pause();
    cancelAnimationFrame(animationFrameId); 
    isPlaying = false;
  }
});

audio.addEventListener('ended', () => {
  cancelAnimationFrame(animationFrameId); 
  isPlaying = false;
  startText.style.display = 'block'; 
});
