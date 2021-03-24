const API_KEY = '20832523-2bf34066ca306390d6c2fd3bb';
const BASE_URL = `https://pixabay.com/api/`;

import templatesCards from '../templates/templates-card.hbs';

const galleryRef = document.querySelector('.gallery');

// -------------------
export default class CreateGallery {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const URL = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    const response = await fetch(URL);

    if (!response.ok) {
      throw response;
    }

    return response
      .json()
      .then(({ hits }) => hits)
      .catch(err => {
        console.warn(err);
      });
  }

  render(dataForTemplate) {
    const arrCards = templatesCards(dataForTemplate);
    return arrCards;
  }

  markupGallery(arr) {
    galleryRef.insertAdjacentHTML('beforeend', arr);
  }

  display(searchQuery) {
    this.searchQuery = searchQuery;
    this.fetchImages().then(this.render).then(this.markupGallery);
  }

  reset() {
    galleryRef.innerHTML = '';
    this.page = 1;
  }
}
