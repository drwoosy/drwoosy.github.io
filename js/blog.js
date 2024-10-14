const months = [
    { name: 'July', year: 2024, days: 31 },
    { name: 'August', year: 2024, days: 31 },
    { name: 'September', year: 2024, days: 30 },
    { name: 'October', year: 2024, days: 31 }
];

const blogDates = {
    '2024-10-14': '/blogs/october14.html'
};

let currentMonthIndex = months.findIndex(month => {
    const now = new Date();
    return now.getMonth() === (month.year === now.getFullYear() ? now.getMonth() : -1);
});

if (currentMonthIndex === -1) currentMonthIndex = 3; // Default to October 2024 if today is not in the range

function loadCalendar() {
    const month = months[currentMonthIndex];
    const monthYearHeader = document.getElementById('month-year');
    monthYearHeader.textContent = `${month.name} ${month.year}`;

    const daysContainer = document.getElementById('calendar-days');
    daysContainer.innerHTML = '';

    for (let day = 1; day <= month.days; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        const dateStr = `${month.year}-${String(currentMonthIndex + 7).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (blogDates[dateStr]) {
            dayElement.classList.add('blog');
            dayElement.addEventListener('click', () => {
                window.location.href = blogDates[dateStr];
            });
        }

        daysContainer.appendChild(dayElement);
    }

    // Disable buttons when at the bounds
    document.getElementById('prev-month').disabled = currentMonthIndex === 0;
    document.getElementById('next-month').disabled = currentMonthIndex === months.length - 1;
}

document.getElementById('prev-month').addEventListener('click', () => {
    if (currentMonthIndex > 0) {
        currentMonthIndex--;
        loadCalendar();
    }
});

document.getElementById('next-month').addEventListener('click', () => {
    if (currentMonthIndex < months.length - 1) {
        currentMonthIndex++;
        loadCalendar();
    }
});

loadCalendar();

// Add confetti and special effects for July 27
const confettiConfig = {
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#bb0000', '#ffffff']
};

if (dateStr === '2024-07-27') {
    console.log('July 27 element found');
    dayElement.classList.add('birthday');
    dayElement.addEventListener('mouseover', () => {
        // Trigger confetti on hover
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#bb0000', '#ffffff']
        });
        
        // Add any other special effects (e.g., glow or pulse)
        dayElement.style.animation = 'pulse 1s infinite';
    });

    dayElement.addEventListener('mouseleave', () => {
        // Remove special effects on mouse leave
        dayElement.style.animation = '';
    });
}

