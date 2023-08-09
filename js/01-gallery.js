import { galleryItems } from "./gallery-items.js";
// Change code below this line

const refs = {
  gallery: document.querySelector(".gallery"),
};

function makeGalleryListMarkup(images) {
  return images
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
    </li>`
    )
    .join("");
}

refs.gallery.insertAdjacentHTML(
  "beforeend",
  makeGalleryListMarkup(galleryItems)
);

refs.gallery.addEventListener("click", onGalleryImageClick);

function onGalleryImageClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") return;

  const instance = basicLightbox.create(
    `<img src="${evt.target.dataset.source}">`,
    {
      onShow: (instance) => {
        refs.gallery.addEventListener("keydown", onEscapeKeyDown);
      },

      onclose: (instance) =>
        refs.gallery.removeEventListener("keydown", onEscapeKeyDown),
    }
  );

  instance.show();

  function onEscapeKeyDown(evt) {
    if (evt.code === "Escape") instance.close();
  }
}
