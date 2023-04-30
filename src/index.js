import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { makeFetch } from './request';
import { createMarkup } from './markup';
import refs from './refs';

refs.searchFormEl.addEventListener('submit', onSearchFormEl);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let pageNumber = 1;

async function onSearchFormEl(event) {
  resetMarkup ()
  event.preventDefault();
  const input = event.currentTarget.searchQuery.value.trim();
  const imgObj = await makeFetch(input, 1);
  const markup = await createMarkup(imgObj.hits);
 

 if (!markup || !input) {
  resetMarkup ()
    return;
  }
  else {
    Notiflix.Notify.success(`Hooray! We found ${imgObj.totalHits} images.`);
  }
const lightbox = new SimpleLightbox('.gallery__link');
  refs.galleryListEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  refs.loadMoreBtn.style.display = 'block';
}



async function onLoadMore() {
  pageNumber += 1;
  const input = refs.searchFormEl.searchQuery.value.trim();
  const imgObj = await makeFetch(input, pageNumber);
  const markup = await createMarkup(imgObj.hits);
  refs.galleryListEl.insertAdjacentHTML('beforeend', markup);
  if (pageNumber * imgObj.hits.length >= imgObj.totalHits) {
    refs.loadMoreBtn.style.display = 'none';
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }

}


function resetMarkup () {
  refs.galleryListEl.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';
}