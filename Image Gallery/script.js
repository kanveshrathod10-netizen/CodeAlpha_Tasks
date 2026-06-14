const images = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let currentIndex = 0;

function openLightbox(index){

    currentIndex = index;

    lightbox.style.display = "flex";

    lightboxImg.src = images[currentIndex].src;
}

function closeLightbox(){

    lightbox.style.display = "none";
}

function changeImage(step){

    currentIndex += step;

    if(currentIndex < 0){
        currentIndex = images.length - 1;
    }

    if(currentIndex >= images.length){
        currentIndex = 0;
    }

    lightboxImg.src = images[currentIndex].src;
}

function filterImages(category){

    images.forEach(img => {

        if(category === "all" || img.classList.contains(category)){
            img.style.display = "block";
        }
        else{
            img.style.display = "none";
        }
    });
}