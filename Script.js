// script.js
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

// Function to handle mousemove event
function handleMouseMove(e) {
    const shouldShowNavbar = e.clientX < threshold;
    if (shouldShowNavbar !== isNavbarVisible) {
        toggleNavbar(shouldShowNavbar);
    }
}

// Add event listener for mousemove
document.addEventListener('mousemove', handleMouseMove);

// Add event listener for mouseleave (resetting when the mouse leaves the screen)
document.addEventListener('mouseleave', () => {
    if (isNavbarVisible) {
        toggleNavbar(false);
    }
});
