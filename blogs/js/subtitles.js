const subtitleAudio = document.getElementById('audio'); // Reference to the audio element
const timestampDisplay = document.getElementById('timestamp-display'); // Reference to the timestamp display

const subtitleLines = {
    line1: document.getElementById('line1'),
    line2: document.getElementById('line2'),
    line3: document.getElementById('line3')
};

let currentIndex = 0;
let lastSubtitleIndex = -1; // To track the last shown subtitle

// Function to clear classes before applying new ones
function clearSubtitleClasses() {
    subtitleLines.line1.classList.remove('active', 'fade-out', 'fade-in');
    subtitleLines.line2.classList.remove('active', 'fade-out', 'fade-in');
    subtitleLines.line3.classList.remove('active', 'fade-out', 'fade-in');
}

// Array of subtitles with start and end times
const subtitles = [
    { text: "recently i've been engaged to the idea of <i>doing</i>", start: 1, end: 3.4 },
    { text: "the other day, i watched the movie <i>Good Will Hunting</i>", start: 3.6, end: 5.5 },
    { text: "and i realized books, conversations, and video essays on", start: 5.6, end: 8.2 },
    { text: "youtube could only teach me so much.", start: 8.3, end: 11 },
    { text: "if i wanted to learn how to code, the only way to do so", start: 11.1, end: 14.5 },
    { text: "was .... <i>to do so</i>", start: 14.5, end: 16.0 },
    { text: "and with doing in mind, i made a website,", start: 16.1, end: 18 },
    { text: "this website, <b>zayanislam.com</b>,", start: 18.1, end: 19.9 },
    { text: "and it has become my very own digital diary.", start: 20, end: 23.4 },
    { text: "now i want to try something new, <b>again</b>", start: 24, end: 26.5 },
    { text: "i want to create a digital assistant of myself,", start: 26.7, end: 29 },
    { text: "one with my own voice and personality imbued into it", start: 29.1, end: 32 },
    { text: "it'd be an engram of myself, an <i>(albeit narcissistic)</i>", start: 32.2, end: 36 },
    { text: "attempt at my own self-preservation.", start: 36.1, end: 37.5 },
    { text: "in other news, my school has adopted a new system", start: 39.3, end: 41.6 },
    { text: "called <i>project-based learning</i> (<b>pbl</b>).", start: 41.7, end: 43.4 },
    { text: "students are forced into teams they didn't chose", start: 43.5, end: 46.1 },
    { text: "on topics they don't like. it's so bad that", start: 45.2, end: 49.2 },
    { text: "mondays have been dethroned by tuesday as", start: 49.3, end: 51.4 },
    { text: "the unofficial <i>'best day to skip'</i>.", start: 51.5, end: 54 },
    { text: "i don't think the school deserves as much", start: 54.1, end: 56 },
    { text: "shade as it gets though. the road to hell", start: 56.4, end: 58.4 },
    { text: "is paved with many good intentions, and the", start: 58.5, end: 60.7 },
    { text: "school's issue lies in its <i>execution</i>.", start: 61.2, end: 63.2 },
    { text: "students will <i>relentlessly</i> pursue their", start: 63.3, end: 65.6 },
    { text: "curiosity if they're curious, but", start: 65.7, end: 67.4 },
    { text: "zombie apocalypses just aren't their thing.", start: 67.5, end: 70.2 },
    { text: "this is my first try at a script, and", start: 70.3, end: 72.2 },
    { text: "a website, and a whole host of things.", start: 72.3, end: 74.9 },
    { text: "if any of my words have touched your soul, or", start: 75, end: 77 },
    { text: "<i>infuriated</i> it, let me know.", start: 77.1, end: 78.8 },
    { text: "my email's <i>somewhere</i> on the website", start: 79.1, end: 80.8 },
    { text: "and i'd love to hear from <i>you.</i>", start: 80.9, end: 83 }
];

// Function to update the subtitles and timestamp in sync with the audio
function updateSubtitles() {
    const currentTime = subtitleAudio.currentTime.toFixed(2); // Get current time from audio and show hundredths of a second

    // Update the timestamp display
    timestampDisplay.innerText = currentTime;

    // Check if we need to update subtitles based on the audio time
    if (currentIndex < subtitles.length) {
        const subtitle = subtitles[currentIndex];

        // Check if the current time is within the start and end time of the current subtitle
        if (currentTime >= subtitle.start && currentTime <= subtitle.end) {
            
            // Ensure we only update the subtitle once per index
            if (currentIndex !== lastSubtitleIndex) {
                
                // Fade out the current active line (if any)
                if (currentIndex > 0) {
                    subtitleLines.line2.classList.add('fade-out');
                }

                // Wait for the fade-out to complete before replacing the text
                setTimeout(() => {
                    // Show the new active subtitle
                    subtitleLines.line1.innerHTML = subtitleLines.line2.innerHTML;  // Top line moves up and disappears
                    subtitleLines.line2.innerHTML = subtitle.text;   // New active line

                    // Clear old classes before applying new transitions
                    clearSubtitleClasses();

                    // Apply the "active" class to the middle line
                    subtitleLines.line2.classList.add('active'); // The middle line becomes visible

                    lastSubtitleIndex = currentIndex; // Update the last shown subtitle index
                }, 500); // 0.5s delay to match the fade-out duration
            }
        }
        
        // Move to the next subtitle after the end time has passed
        if (currentTime > subtitle.end) {
            currentIndex++; // Increment the index only after the subtitle ends
        }
    }
}

// Sync the subtitles and timestamp with the audio playback
subtitleAudio.addEventListener('timeupdate', updateSubtitles);
subtitleAudio.addEventListener('play', updateSubtitles);
subtitleAudio.addEventListener('pause', () => clearInterval(updateSubtitles));
