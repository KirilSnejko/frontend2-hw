document.addEventListener("DOMContentLoaded", () => {
  const url = "https://jsonplaceholder.typicode.com/photos";
  const defaultImage = "https://images.app.goo.gl/hS6X5t55kZGpuXaA6";
  const data = (url) => {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return createAlbum(data);
      })
      .then((createdAlbum) => {
        printAlbum(createdAlbum);
      })
      .catch((e) => console.error(e));
  };
  const createAlbum = (dataFetch) => {
    const album = dataFetch.reduce((acc, img) => {
      const { albumId, thumbnailUrl, url: fullSizeUrl } = img;
      if (!acc[albumId]) {
        acc[albumId] = [];
      }
      acc[albumId].push({ thumbnailUrl, fullSizeUrl });
      return acc;
    }, {});

    console.log(album);
    return album;
  };
  const printAlbum = (createdAlbum) => {
    const gallery = document.querySelector("#gallery");

    gallery.innerHTML = "";

    Object.keys(createdAlbum).forEach((albumId) => {
      const albumDiv = document.createElement("div");
      albumDiv.className = "album";
      albumDiv.innerHTML = `<h2>Album ${albumId}</h2>`;

      createdAlbum[albumId].forEach(({ thumbnailUrl, fullSizeUrl }) => {
        const imgElement = document.createElement("img");
        imgElement.src = thumbnailUrl;
        imgElement.alt = `Thumbnail of album ${albumId}`;
        imgElement.className = "thumbnail";

        imgElement.onerror = () => {
          imgElement.src = defaultImage;
        };

        imgElement.onclick = () => openModal(fullSizeUrl);

        albumDiv.appendChild(imgElement);
      });

      gallery.appendChild(albumDiv);
    });
  };
  const openModal = (imageUrl) => {
    const modal = document.createElement("div");
    modal.className = "modal";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.className = "full-image";

    const closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.innerHTML = "&times;";
    closeBtn.onclick = () => document.body.removeChild(modal);

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(img);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
  };
  data(url);
});
