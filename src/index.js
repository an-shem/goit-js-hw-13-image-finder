import './styls.css';
import ApiService from './js/apiService';

import templatesCards from './templates/templates-card.hbs';

import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

defaultModules.set(PNotifyMobile, {});

const sentinelRef = document.querySelector('#js-sentinel');
const observer = new IntersectionObserver(loadMore, options);
const options = {};

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
formRef.addEventListener('submit', onSubmit);

const apiService = new ApiService();

async function onSubmit(event) {
  event.preventDefault();
  let newSearchQuery = event.currentTarget.elements.query.value.trim();
  if (newSearchQuery === '') {
    error({
      title: 'ERROR!',
      text: 'Wrong request.',
      animateSpeed: 'normal',
      delay: 2000,
    });
    return;
  } else if (apiService.query === newSearchQuery) {
    return;
  } else {
    apiService.query = newSearchQuery;
    //
    galleryRef.innerHTML = '';
    apiService.reset();
    await fetchImages();
    observer.observe(sentinelRef);
  }
}

async function loadMore(entries) {
  await entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchImages();
    }
  });
}

async function fetchImages() {
  const images = await apiService.fetchImages();
  renderGallery(images);
}

function renderGallery(images) {
  const markupGallery = templatesCards(images);
  galleryRef.insertAdjacentHTML('beforeend', markupGallery);
}
