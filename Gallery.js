const galleryItems = document.getElementsByClassName("gallery-item");
const lightboxContainer = document.createElement("div");
const lightboxContent = document.createElement("div");
const lightboxImg = document.createElement("img");
const lightboxDescription = document.createElement('div');
const lightboxPrev = document.createElement("div");
const lightboxNext = document.createElement("div");

lightboxContainer.classList.add('lightbox');
lightboxContent.classList.add('lightbox-content');
lightboxPrev.classList.add("fa", "fa-angle-left", "lightbox-prev");
lightboxNext.classList.add("fa", "fa-angle-right", "lightbox-next");
lightboxDescription.classList.add('lightbox-description');

lightboxContent.appendChild(lightboxImg);
lightboxContent.appendChild(lightboxDescription);
lightboxContent.appendChild(lightboxPrev);
lightboxContent.appendChild(lightboxNext);
lightboxContainer.appendChild(lightboxContent);
document.body.appendChild(lightboxContainer);

let index = 1;

function showLightbox(n) {
    if (n > galleryItems.length) {
        index = 1;
    } else if (n < 1) {
        index = galleryItems.length;
    }
    const imageLocation = galleryItems[index - 1].children[0].getAttribute("src");
    const imageDescription = galleryItems[index - 1].getAttribute("data-description");
    lightboxImg.setAttribute("src", imageLocation);
    lightboxDescription.textContent = imageDescription;
}

function currentImage() {
    lightboxContainer.style.display = "block";
    index = parseInt(this.getAttribute("data-index"));
    showLightbox(index);
}

function sliderImage(n) {
    showLightbox(index += n);
}

function prevImage() {
    sliderImage(-1);
}

function nextImage() {
    sliderImage(1);
}

function closeLightbox(event) {
    if (event.target === lightboxContainer) {
        lightboxContainer.style.display = "none";
    }
}
function handleKeyboard(event) {
    if (lightboxContainer.style.display === "block") {
        if (event.key === "ArrowLeft") {
            prevImage();
        } else if (event.key === "ArrowRight") {
            nextImage();
        }
    }
}

for (let i = 0; i < galleryItems.length; i++) {
    galleryItems[i].addEventListener("click", currentImage);
}

lightboxPrev.addEventListener("click", prevImage);
lightboxNext.addEventListener("click", nextImage);

lightboxContainer.addEventListener("click", closeLightbox);
document.addEventListener("keydown", handleKeyboard);