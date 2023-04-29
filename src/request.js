import { instance } from './api';
import Notiflix from 'notiflix';

export async function makeFetch(request) {
  try {
    const API_KEY = '35894589-4c2095b258176c0c5d326f57a';
    const OPTIONS =
      'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
    const respons = await instance.get(
      `?key=${API_KEY}&q=${request}&${OPTIONS}&page=1`
    );
    if (!respons.data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.');
   
    }
    return respons.data.hits;
  } catch (error) {
    console.log(error);
  }
}
