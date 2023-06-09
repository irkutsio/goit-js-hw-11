export function createMarkup(arr) {
  const markup = arr
    .map(
      ({
          downloads,
          comments,
          views,
          likes,
          tags,
          webformatURL,
          largeImageURL,
       
      }) => `
      <a class="gallery__link" href="${largeImageURL}">
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${views}
            </p>
            </div>
            <div class="info">
            <p class="info-item">
              <b>Comments</b>
              ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${downloads}
            </p>
            </div>
        </div>
      </a>`
    )
    .join('');
  return markup;
}
