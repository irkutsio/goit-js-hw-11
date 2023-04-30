import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { makeFetch } from './request';
import refs from './refs';
import { createMarkup } from './markup';

let pageNumber = 1;



refs.searchFormEl.addEventListener('submit', onImageSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore)


async function onImageSearch(event) {
  refs.galleryListEl.innerHTML = '';
  event.preventDefault();
  const input = event.currentTarget.searchQuery.value.trim();
  const arr = await makeFetch(input);
  const markup = await createMarkup(arr, pageNumber);
  if (!markup || !input) {
    refs.galleryListEl.innerHTML = '';
    return;
  }
  const lightbox = new SimpleLightbox('.gallery__link');
refs.galleryListEl.insertAdjacentHTML('beforeend', markup);
lightbox.refresh();
refs.loadMoreBtn.style.display = 'block';
 } 


 function onLoadMore () {
  pageNumber += 1;
 }