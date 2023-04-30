import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { makeFetch } from './request';
import refs from './refs';
import { createMarkup } from './markup';

let pageNumber = 1;



refs.searchFormEl.addEventListener('submit', onSearchFormEl);
refs.loadMoreBtn.addEventListener('click', onLoadMore)




async function onSearchFormEl(event) {
  refs.galleryListEl.innerHTML = '';
  event.preventDefault();
  const input = event.currentTarget.searchQuery.value.trim();
  const arr = await makeFetch(input,pageNumber);
  const markup = await createMarkup(arr);
  if (!markup || !input) {
    refs.galleryListEl.innerHTML = '';
    return;
  }
  const lightbox = new SimpleLightbox('.gallery__link');
refs.galleryListEl.insertAdjacentHTML('beforeend', markup);
lightbox.refresh();
refs.loadMoreBtn.style.display = 'block';
 } 


 async function onLoadMore() {
  pageNumber += 1;
  const input = refs.searchFormEl.searchQuery.value.trim();
  const arr = await makeFetch(input, pageNumber);
  const markup = await createMarkup(arr);
  refs.galleryListEl.insertAdjacentHTML('beforeend', createMarkup(arr));
}
