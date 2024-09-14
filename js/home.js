const apikey = "2WaBnWotWvC3YvUW4VkzXv2SKB31iIT1K9hCQaRTKEgoG2IWBLT4RiaR";
const input = document.getElementById("inp");
const generate_btn = document.getElementById("generateButton");
const imagesContainer = document.getElementById("imgs");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.querySelector(".modal-close");
let search_text = "";

input.addEventListener("input", (event) => {
    search_text = event.target.value;
    if (search_text === "") {
        showPlaceholders();
    }
});

generate_btn.addEventListener("click", () => {
    if (input.value === "") {
        alert("Please enter some text");
        return;
    }
    cleargallery();
    SearchPhotos(search_text);
    input.value = "";
    search_text = "";
});

function showPlaceholders() {
    imagesContainer.classList.remove('visible');
    imagesContainer.classList.add('hidden');
    imagesContainer.innerHTML =
        `<div class="placeholder"></div>
                <div class="placeholder"></div>
                <div class="placeholder"></div>`;
}

function cleargallery() {
    imagesContainer.innerHTML = "";
}

async function SearchPhotos(query) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=3`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: apikey
            }
        });
        const data = await response.json();
        display_images(data);
    } catch (error) {
        console.error("Error searching photos:", error);
    }
}

function display_images(response) {
    imagesContainer.classList.remove('hidden');
    imagesContainer.classList.add('visible');

    imagesContainer.innerHTML = '';

    response.photos.slice(0, 4).forEach((image) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add('image-container');

        imageContainer.innerHTML =
            `<img src="${image.src.portrait}" alt="${image.alt}" class="rounded">
                    <div class="overlay d-flex justify-content-between">
                        <div class="btn btn-primary rounded-pill p-2 pe-3 bg-transparent button text-white mt-2 save-button" data-url="${image.src.portrait}">
                            <i class="fa-regular fa-bookmark"></i> SAVE
                        </div>
                        <div class="btn btn-primary rounded-pill p-2 pe-3 bg-transparent button text-white mt-2 view-button" data-url="${image.src.portrait}">
                            <i class="fa-regular fa-eye"></i> VIEW
                        </div>
                    </div>`;

        imagesContainer.appendChild(imageContainer);
    });

    document.querySelectorAll('.view-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const imageUrl = event.target.closest('.view-button').dataset.url;
            openModal(imageUrl);
        });
    });

    document.querySelectorAll('.save-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const imageUrl = event.target.closest('.save-button').dataset.url;
            saveImage(imageUrl);
        })
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

function saveImage(url) {
    let savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    if (!savedImages.includes(url)) {
        savedImages.push(url);
        localStorage.setItem('savedImages', JSON.stringify(savedImages));
    }
}

function loadLastSearch() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (searchHistory.length > 0) {
        search_text = searchHistory[0];
        SearchPhotos(search_text);
    }
}

function saveLastSearch(query) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory = [query, ...searchHistory].slice(0, 3);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

modalClose.addEventListener('click', closeModal);

imageModal.addEventListener('click', (event) => {
    if (event.target === imageModal) {
        closeModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = 1;
    setTimeout(() => {
        imagesContainer.classList.remove('hidden');
        imagesContainer.classList.add('visible');
    }, 100); 
    loadLastSearch();
});