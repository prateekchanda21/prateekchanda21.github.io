document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.getElementById("trip-photo-viewer");
  if (!viewer || typeof viewer.showModal !== "function") return;

  const viewerImage = viewer.querySelector(".trip-viewer-image");
  const caption = viewer.querySelector(".trip-viewer-caption");
  const previousButton = viewer.querySelector(".trip-viewer-previous");
  const nextButton = viewer.querySelector(".trip-viewer-next");
  const closeButton = viewer.querySelector(".trip-viewer-close");
  let photos = [];
  let currentIndex = 0;
  let opener;

  const showPhoto = (index) => {
    currentIndex = (index + photos.length) % photos.length;
    const photo = photos[currentIndex];
    const album = photo.closest(".trip-album");
    const title = album.querySelector(".trip-album-title");
    const destination = title.firstChild.textContent.trim();

    viewerImage.src = photo.href;
    viewerImage.alt = photo.querySelector("img").alt;
    caption.textContent = `${destination} - ${currentIndex + 1} of ${photos.length}`;
  };

  document.querySelectorAll(".trip-photo-grid a").forEach((link) => {
    link.removeAttribute("target");
    link.removeAttribute("rel");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      opener = link;
      photos = Array.from(link.closest(".trip-photo-grid").querySelectorAll("a"));
      showPhoto(photos.indexOf(link));
      viewer.showModal();
    });
  });

  document.querySelectorAll("a.image-preview").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      opener = link;
      viewer.classList.add("single-image");
      viewerImage.src = link.href;
      viewerImage.alt = link.textContent.trim();
      caption.textContent = link.textContent.trim();
      viewer.showModal();
    });
  });

  previousButton.addEventListener("click", () => showPhoto(currentIndex - 1));
  nextButton.addEventListener("click", () => showPhoto(currentIndex + 1));
  closeButton.addEventListener("click", () => viewer.close());

  viewer.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPhoto(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(currentIndex + 1);
    } else if (event.key === "Escape") {
      event.preventDefault();
      viewer.close();
    }
  });

  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) viewer.close();
  });

  viewer.addEventListener("close", () => opener?.focus());

  viewer.addEventListener("close", () => viewer.classList.remove("single-image"));
});