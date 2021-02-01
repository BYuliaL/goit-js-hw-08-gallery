"use strict";
import * as galleryItems from "./gallery-items.js";

const galleryList = galleryItems.default;

const refs = {
  galleryRef: document.querySelector(".js-gallery"),
  lightBoxRef: document.querySelector(".js-lightbox"),
  lightBoxOverlayRef: document.querySelector(".lightbox__overlay"),
  lightBoxImageRef: document.querySelector(".lightbox__image"),
  closeLightBoxBtn: document.querySelector(
    'button[data-action="close-lightbox"]'
  ),
};

const getGalleryList = galleryList
  .map((galleryList) => {
    return ` <li class='gallery__item'>
    <a class='gallery__link' href='${galleryList.original}'>
    <img class='gallery__image' alt='${galleryList.description}' src="${galleryList.preview}" data-source="${galleryList.original}">
    </a></li > `;
  })
  .join("");

refs.galleryRef.insertAdjacentHTML("afterbegin", getGalleryList);

refs.galleryRef.addEventListener("click", onImageClick);

function onImageClick(event) {
  event.preventDefault();

  const imagesRef = event.target;
  const largeImgUrl = imagesRef.dataset.source;

  if (imagesRef.nodeName !== "IMG") {
    return;
  }
  refs.lightBoxRef.classList.add("is-open");
  refs.lightBoxImageRef.setAttribute("src", largeImgUrl);
  window.addEventListener("keydown", closeLightBoxByEsc);
  refs.lightBoxOverlayRef.addEventListener("click", closelightBoxByClick);
  refs.closeLightBoxBtn.addEventListener("click", closeLightBoxByBtn);
}

function closeLightBoxByBtn() {
  refs.lightBoxRef.classList.remove("is-open");
  refs.lightBoxImageRef.setAttribute("src", "");
  window.removeEventListener("keydown", closeLightBoxByEsc);
  refs.lightBoxOverlayRef.removeEventListener("click", closelightBoxByClick);
  refs.closeLightBoxBtn.removeEventListener("click", closeLightBoxByBtn);
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
