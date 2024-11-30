// Keep track of all images that can be viewed in the modal
const getGalleryImages = () => {
    return Array.from(document.querySelectorAll('.image-container img')).map(img => ({
        src: img.src,
        alt: img.alt
    }));
};

let currentImageIndex = 0;
let images = [];

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    images = getGalleryImages();
    
    // Set up navigation button click handlers
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    prevButton.addEventListener('click', function(e) {
        e.stopPropagation();  // Prevent modal from closing
        navigateImage(-1);
    });
    
    nextButton.addEventListener('click', function(e) {
        e.stopPropagation();  // Prevent modal from closing
        navigateImage(1);
    });
    
    // Prevent modal close when clicking on the image
    document.getElementById('modalImage').addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

function openModal(src, alt) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    // Find the index of the clicked image
    currentImageIndex = images.findIndex(img => img.src === src);
    
    modalImg.src = src;
    modalImg.alt = alt;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show/hide navigation buttons based on position
    updateNavigationButtons();
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateImage(direction) {
    currentImageIndex += direction;
    
    // Ensure we stay within bounds
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    
    const modalImg = document.getElementById('modalImage');
    modalImg.src = images[currentImageIndex].src;
    modalImg.alt = images[currentImageIndex].alt;
    
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    // Always show both buttons if we have more than 1 image
    if (images.length > 1) {
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
    } else {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    } else if (event.key === 'ArrowLeft') {
        navigateImage(-1);
    } else if (event.key === 'ArrowRight') {
        navigateImage(1);
    }
});