import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { makeFetch } from './request';
import { createMarkup } from './markup';
import refs from './refs';

refs.searchFormEl.addEventListener('submit', onSearchFormEl);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let pageNumber = 0;

const lightbox = new SimpleLightbox('.gallery__link');

async function onSearchFormEl(event) {
  event.preventDefault();
  pageNumber = 1;
  resetMarkup();
  const input = event.currentTarget.searchQuery.value.trim();
  const imgObj = await makeFetch(input, 1);
  const markup = await createMarkup(imgObj.hits);

  if (!markup || !input) {
    resetMarkup();
    return;
  } else {
    Notiflix.Notify.success(`Hooray! We found ${imgObj.totalHits} images.`);
  }

  refs.galleryListEl.insertAdjacentHTML('beforeend', markup);
  refs.loadMoreBtn.style.display = 'block';

  if (imgObj.hits.length < 40) {
    refs.loadMoreBtn.style.display = 'none';
  } else {
    refs.loadMoreBtn.style.display = 'block';
  }
  lightbox.refresh();
}

async function onLoadMore() {
  pageNumber += 1;
  const input = refs.searchFormEl.searchQuery.value.trim();
  const imgObj = await makeFetch(input, pageNumber);
  const markup = await createMarkup(imgObj.hits);
  refs.galleryListEl.insertAdjacentHTML('beforeend', markup);
  if (pageNumber * 40 >= imgObj.totalHits) {
    refs.loadMoreBtn.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
  lightbox.refresh();
}

function resetMarkup() {
  refs.galleryListEl.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';
}
