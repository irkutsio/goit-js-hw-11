import { instance } from './api';
import Notiflix from 'notiflix';
import refs from './refs';
import { createMarkup } from './markup';




export async function makeFetch(request, pages) {
  const API_KEY = '35894589-4c2095b258176c0c5d326f57a';
  const OPTIONS = new URLSearchParams({
    safesearch: true,
    orientation: 'horizontal',
    image_type: 'photo',
    per_page: 40,
  });
  try {
    const respons = await instance.get(
      `?key=${API_KEY}&q=${request}&${OPTIONS}&${pages}`
    );
    if (!respons.data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  // console.log( respons.data.totalHits)
  console.log( respons)
    return respons.data.hits;
  } catch (error) {
    console.log(error);
  }
}

