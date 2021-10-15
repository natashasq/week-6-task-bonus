const url = "https://api.unsplash.com/photos/random/";
const key = "lk332OPOYLEgOkadI8HCOgqEXT7iYQmC1tHwP5mvXpY";
const instagramUrl = "https://www.instagram.com/";
const twitterUrl = "https://twitter.com/";

const photos = document.querySelector("#photos");
const photoPreview = document.querySelector("#photo-preview-anchor");
const photoPreviewInner = document.querySelector("#photo-preview-anchor-inner");
const wrapper = document.querySelector(".wrapper");
const loader = document.createElement("div");

const createPhotoCard = (
  photoUrl,
  userPhotoUrl,
  portfolio,
  username,
  instagram,
  twitter,
  paypal,
  likes,
  downloads,
  photoLink,
  alt
) => {
  return `
  <div class="photos__photo-img-wrapper">
    <img class="photos__photo-img" id="photo" src="${photoUrl}" alt="${
    alt || "photo from unsplash"
  }" />
  </div>
    <div class="photos__link">
    <a class="photos__link-url" href="${photoLink}">
     <img class="photos__link-icon" src="assets/icons/link.svg" />
    </a>
    </div>
    <div class="photos__photo-info">
      <div class="photos__user">
        <img class="photos__user-img" src="${userPhotoUrl}" />
        <div class="photos__user-wrapper">
        <a class="photos__user-portfolio" href="${portfolio}" 
        <h4 class="photos__user-username">${username}</h4></a>
        <div class="photos__user-social">
          <a class="photos__user-social-link" href="${instagram}">
          <img class="photos__user-social-icon" src="assets/icons/instagram.svg"
          /></a>
          <a class="photos__user-social-link" href="${twitter}"
            ><img class="photos__user-social-icon" src="assets/icons/twitter.svg"
          /></a>
          <a class="photos__user-social-link" href="${paypal}"
            ><img class="photos__user-social-icon" src="assets/icons/paypal.svg"
          /></a>
          </div>
        </div>
      </div>
      <div class="photos__details">
      <div class="photos__details-wrapper">
        <img class="photos__icon -margin" src="assets/icons/heart-regular.svg"/>
        <p class="photos__likes-count">${likes}</p>
      </div>
      <div class="photos__details-wrapper">
      <img class="photos__icon -margin" src="assets/icons/download-outline.svg"/>
      <p class="photos__likes-count">${downloads}</p>
    </div>
      </div>
    </div>`;
};

const createPhotoCardGrid = (
  photoUrl,
  userPhotoUrl,
  portfolio,
  username,
  instagram,
  twitter,
  paypal,
  likes,
  downloads,
  photoLink,
  alt
) => {
  return `
  <div class="photos__photo-img-wrapper -photo-wrapper-grid"">
    <img class="photos__photo-img-grid" id="photo" src="${photoUrl}" alt="${
    alt || "photo from unsplash"
  }"/>
  </div>
    <div class="photos__link -photo-link-grid">
    <a class="photos__link-url" href="${photoLink}">
     <img class="photos__link-icon" src="assets/icons/link.svg" />
    </a>
    </div>
    <div class="photos__photo-info">
      <div class="photos__user">
        <img class="photos__user-img" src="${userPhotoUrl}" />
        <div class="photos__user-wrapper">
        <a class="photos__user-portfolio" href="${portfolio}" 
        <h4 class="photos__user-username">${username}</h4></a>
        <div class="photos__user-social">
          <a class="photos__user-social-link" href="${instagram}">
          <img class="photos__user-social-icon" src="assets/icons/instagram.svg"
          /></a>
          <a class="photos__user-social-link" href="${twitter}"
            ><img class="photos__user-social-icon" src="assets/icons/twitter.svg"
          /></a>
          <a class="photos__user-social-link" href="${paypal}"
            ><img class="photos__user-social-icon" src="assets/icons/paypal.svg"
          /></a>
          </div>
        </div>
      </div>
      <div class="photos__details">
      <div class="photos__details-wrapper">
        <img class="photos__icon -margin" src="assets/icons/heart-regular.svg"/>
        <p class="photos__likes-count">${likes}</p>
      </div>
      <div class="photos__details-wrapper">
      <img class="photos__icon -margin" src="assets/icons/download-outline.svg"/>
      <p class="photos__likes-count">${downloads}</p>
    </div>
      </div>
    </div>`;
};

const displayPhoto = () => {
  const allPhotos = document.querySelectorAll("#photo");

  allPhotos.forEach(photo => {
    photo.addEventListener("click", e => {
      console.log(e);
      e.preventDefault();
      e.stopPropagation();
      document.querySelector("html").style.overflow = "hidden";
      const fullPhotoWrapper = document.createElement("div");
      fullPhotoWrapper.classList.add("full__photo-wrapper");
      const fullPhoto = document.createElement("img");
      fullPhoto.src = photo.src;
      fullPhoto.classList.add("full__photo");

      fullPhotoWrapper.appendChild(fullPhoto);
      photoPreviewInner.appendChild(fullPhotoWrapper);
      photoPreview.classList.add("preview");

      photoPreview.addEventListener("click", () => {
        fullPhotoWrapper.remove();
        photoPreview.classList.remove("preview");

        document.querySelector("html").style.overflow = "auto";
      });
    });
  });
};

const fetchData = async (count, type) => {
  try {
    loader.classList.add("loader");
    photos.appendChild(loader);

    const data = await fetch(`${url}?count=${count}`, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${key}`
      }
    });

    const jsonData = await data.json();
    console.log(jsonData);

    jsonData.forEach(data => {
      const photoUrl = data.urls.regular;
      const userPhotoUrl = data.user.profile_image.medium;
      const portfolio = data.user.portfolio_url;
      const username = data.user.username;
      const instagramName = data.user.social.instagram_username;
      const instagram = `${instagramUrl}${instagramName}`;
      const twitterName = data.user.social.twitter_username;
      const twitter = `${twitterUrl}${twitterName}`;
      const paypal = data.user.social.paypal_email;
      const likes = data.likes;
      const downloads = data.downloads;
      const alt = data.alt_description;

      if (type === "column") {
        const photoCard = createPhotoCard(
          photoUrl,
          userPhotoUrl,
          portfolio,
          username,
          instagram,
          twitter,
          paypal,
          likes,
          downloads,
          photoUrl,
          alt
        );
        const photoCardWrapper = document.createElement("div");
        photoCardWrapper.classList.add("photos__photo");
        //photoCardWrapper.classList.add("-photo-grid"); //grid
        photoCardWrapper.innerHTML = photoCard;

        loader.remove();
        photos.appendChild(photoCardWrapper);

        changeLayout();
      } else if (type === "grid") {
        const photoCard = createPhotoCardGrid(
          photoUrl,
          userPhotoUrl,
          portfolio,
          username,
          instagram,
          twitter,
          paypal,
          likes,
          downloads,
          photoUrl
        );
        const photoCardWrapper = document.createElement("div");
        photos.classList.add("-display-grid");
        photoCardWrapper.classList.add("photos__photo");
        photoCardWrapper.classList.add("-photo-grid"); //grid
        photoCardWrapper.innerHTML = photoCard;

        loader.remove();
        photos.appendChild(photoCardWrapper);

        changeLayout();
      }
    });

    displayPhoto();
  } catch (err) {
    console.log(err);
  }
};

fetchData(9, "column");

const changeLayout = () => {
  const layoutGrid = document.querySelector("#layout-grid");
  const layoutColumn = document.querySelector("#layout-column");
  const photoContainer = document.querySelectorAll(".photos__photo");
  const photoContainerArr = Array.from(photoContainer);
  const photo = document.querySelectorAll("#photo");
  const photoArr = Array.from(photo);
  const photoLink = document.querySelectorAll(".photos__link");
  const photoLinkArr = Array.from(photoLink);
  const photoCardWrapper = document.querySelectorAll(
    ".photos__photo-img-wrapper"
  );
  const photoCardWrapperArr = Array.from(photoCardWrapper);

  layoutGrid.addEventListener("click", () => {
    layoutGrid.classList.add("-display-none");
    layoutColumn.classList.remove("-display-none");
    photos.classList.add("-display-grid");
    photoContainerArr.forEach(element => {
      element.classList.add("-photo-grid");
    });
    photoCardWrapperArr.forEach(element => {
      element.classList.add("-photo-wrapper-grid");
    });

    photoArr.forEach(element => {
      element.classList.remove("photos__photo-img");
      element.classList.add("photos__photo-img-grid");
    });
    photoLinkArr.forEach(element => {
      element.classList.add("-photo-link-grid");
    });
  });

  layoutColumn.addEventListener("click", () => {
    layoutColumn.classList.add("-display-none");
    layoutGrid.classList.remove("-display-none");
    photos.classList.remove("-display-grid");
    photoContainerArr.forEach(element => {
      element.classList.remove("-photo-grid");
    });
    photoCardWrapperArr.forEach(element => {
      element.classList.remove("-photo-wrapper-grid");
    });

    photoArr.forEach(element => {
      element.classList.remove("photos__photo-img-grid");
      element.classList.add("photos__photo-img");
    });
    photoLinkArr.forEach(element => {
      element.classList.remove("-photo-link-grid");
    });
  });
};

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight > scrollHeight - 5) {
    if (photos.classList.contains("-display-grid")) {
      fetchData(3, "grid");
    } else {
      fetchData(3, "column");
    }
  }
});
