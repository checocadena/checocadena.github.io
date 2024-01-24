document.addEventListener("DOMContentLoaded", function() {
    // This code will run when the HTML document is fully loaded
    const navbar = document.getElementById('navbar');
    const content = document.getElementById('content');
    const threshold = 200; // Adjust the threshold for triggering the hover effect

    let isNavbarVisible = false;

    // Function to toggle the visibility of the navbar
    function toggleNavbar(visible) {
        isNavbarVisible = visible;
        const leftPosition = isNavbarVisible ? 0 : -250;
        navbar.style.left = `${leftPosition}px`;
        content.style.marginLeft = isNavbarVisible ? '250px' : '0';
    }

    // Event listener for the hover effect
    content.addEventListener('mousemove', (event) => {
        if (event.clientX < threshold && !isNavbarVisible) {
            toggleNavbar(true);
        } else if (event.clientX >= threshold && isNavbarVisible) {
            toggleNavbar(false);
        }
    });
});
