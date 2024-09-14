document.addEventListener('DOMContentLoaded', () => {
    const savedImagesContainer = document.getElementById("savedImagesContainer");
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    const imageModal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalClose = document.querySelector(".modal-close");

    function renderImages() {
        savedImagesContainer.innerHTML = '';

        savedImages.forEach((url, index) => {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('saved-image-container');
            imageContainer.style.animationDelay = `${index * 0.1}s`; 

            const imgElement = document.createElement('img');
            imgElement.src = url;
            imgElement.classList.add('saved-image');

            const overlay = document.createElement('div');
            overlay.classList.add('saved-overlay');

            const viewButton = document.createElement('div');
            viewButton.classList.add('view-button'); 
            viewButton.dataset.url = url;
            viewButton.innerHTML = '<i class="fa-regular fa-eye"></i> VIEW';
            
            viewButton.addEventListener('click', () => {
                openModal(url);
            });

            const deleteButton = document.createElement('div');
            deleteButton.classList.add('button');
            deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i> DELETE';
            deleteButton.addEventListener('click', () => {
                deleteImage(url);
            });

            overlay.appendChild(viewButton);
            overlay.appendChild(deleteButton);
            imageContainer.appendChild(imgElement);
            imageContainer.appendChild(overlay);

            savedImagesContainer.appendChild(imageContainer);
        });
    }

    function openModal(url) {
        modalImage.src = url;
        imageModal.classList.remove('d-none');
        imageModal.classList.add('fade-in');
    }
    
    function closeModal() {
        imageModal.classList.remove('fade-in');
        imageModal.classList.add('d-none');
    }

    function deleteImage(url) {
        const index = savedImages.indexOf(url);
        if (index > -1) {
            savedImages.splice(index, 1);
            localStorage.setItem('savedImages', JSON.stringify(savedImages));
            renderImages(); 
        }
    }

    modalClose.addEventListener('click', closeModal);

    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            closeModal();
        }
    });

    renderImages();
});
