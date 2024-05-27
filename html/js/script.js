document.addEventListener('DOMContentLoaded', () => {
    const entries = document.querySelectorAll('.entry');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.5 
    });

    entries.forEach(entry => {
        observer.observe(entry);
    });
});