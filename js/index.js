document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('start-btn');
    button.addEventListener('click', function(event) {
        event.preventDefault(); 

        document.body.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = this.getAttribute('href');
        }, 500); 
    });
});
