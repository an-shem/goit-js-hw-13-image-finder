import './styls.css';
import 'material-design-icons';
import CreateGallery from './js/apiService';

import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

defaultModules.set(PNotifyMobile, {});

// --------------
// const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
formRef.addEventListener('submit', onSubmit);

let searchQuery = '';
const gallery = new CreateGallery();

function onSubmit(event) {
  event.preventDefault();
  let newSearchQuery = event.currentTarget.elements.query.value.trim();
  if (newSearchQuery === '') {
    error({
      title: 'ERROR!',
      text: 'Wrong request.',
      animateSpeed: 'normal',
      delay: 2000,
    });
  } else if (searchQuery === newSearchQuery) {
    return;
  } else {
    searchQuery = newSearchQuery;
    gallery.reset();
    gallery.display(searchQuery);
  }
}
