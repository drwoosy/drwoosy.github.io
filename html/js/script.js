document.addEventListener('DOMContentLoaded', function() {
    const nodes = document.querySelectorAll('.timeline-node');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    nodes.forEach(node => {
        observer.observe(node);
    });
});