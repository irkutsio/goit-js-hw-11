import { makeFetch } from './request';
import refs from './refs';
import { createMarkup } from './markup';

refs.searchFormEl.addEventListener('submit', onImageSearch);

async function onImageSearch(event) {
  event.preventDefault();
  const input = event.currentTarget.searchQuery.value;
  const arr = await makeFetch(input);
  const markup = await createMarkup(arr);
  if (!markup || !input) {
    refs.galleryListEl.innerHTML = '';
    return;
  }
  refs.galleryListEl.insertAdjacentHTML('beforeend', markup);
 }
