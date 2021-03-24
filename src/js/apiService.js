const API_KEY = '20832523-2bf34066ca306390d6c2fd3bb';
const BASE_URL = `https://pixabay.com/api/`;

const galleryRef = document.querySelector('.gallery');

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.hits = [];
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  async fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw response;
    }
    const { hits } = await response.json();
    this.incrementPage();
    console.log(hits, this.page);
    return hits;
  }

  reset() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
