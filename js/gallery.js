"use strict";
import * as galleryItems from "./gallery-items.js";

const galleryList = galleryItems.default;

const galleryRef = document.querySelector(".js-gallery");

// const getGalleryList = galleryList.map((galleryList) => {
// const liRef = document.createElement("li");
// liRef.classList.add("gallery__item");
// const aRef = document.createElement("a");
// aRef.classList.add("gallery__link");
// aRef.href = galleryList.original;
// const imgRef = document.createElement("img");
// imgRef.classList.add("gallery__image");
// imgRef.src = galleryList.preview;
// imgRef.dataset.source = galleryList.original;
// imgRef.alt = galleryList.description;
// liRef.append(aRef);
// aRef.append(imgRef);
// return liRef;
// });
const getGalleryList = galleryList
  .map((galleryList) => {
    return ` <li class='gallery__item'><a class='gallery__link' href='${galleryList.original}'><img class='gallery__image' alt='${galleryList.description}' src="${galleryList.preview}" data-source="${galleryList.original}"></a></li > `;
  })
  .join("");
galleryRef.insertAdjacentHTML("afterbegin", getGalleryList);

// galleryRef.append(...getGalleryList);

const lightBoxRef = document.querySelector(".js-lightbox");
const lightBoxOverlayRef = document.querySelector(".lightbox__overlay");
const modalImageRef = document.querySelector(".lightbox__image");
const closelightBoxBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);

galleryRef.addEventListener("click", onTagsClick);

function onTagsClick(event) {
  event.preventDefault();

  const imagesRef = event.target;
  const largeImgUrl = imagesRef.dataset.source;

  if (imagesRef.nodeName !== "IMG") {
    return;
  }
  lightBoxRef.classList.add("is-open");
  modalImageRef.setAttribute("src", largeImgUrl);
  window.addEventListener("keydown", closeLightBoxByEsc);
  lightBoxOverlayRef.addEventListener("click", closelightBoxByClick);
  closelightBoxBtn.addEventListener("click", closeLightBoxByBtn);
}

function closeLightBoxByBtn() {
  lightBoxRef.classList.remove("is-open");
  modalImageRef.setAttribute("src", "");
  window.removeEventListener("keydown", closeLightBoxByEsc);
  lightBoxOverlayRef.removeEventListener("click", closelightBoxByClick);
  closelightBoxBtn.removeEventListener("click", closeLightBoxByBtn);
}

function closeLightBoxByEsc(event) {
  if (event.code === "Escape") {
    closeLightBoxByBtn();
  }
}

function closelightBoxByClick(event) {
  if (event.target === event.currentTarget) {
    closeLightBoxByBtn();
  }
}
