document.addEventListener('DOMContentLoaded', () => {
    const entries = document.querySelectorAll('.entry');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: stop observing once visible
            }
        });
    }, {
        threshold: 0.5 // Adjust this value to control when the animation starts
    });

    entries.forEach(entry => {
        observer.observe(entry);
    });
});