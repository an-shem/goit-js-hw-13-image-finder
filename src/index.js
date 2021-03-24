import 'material-design-icons';
import CreateGallery from './js/apiService';

// --------------
const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
formRef.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.query.value.trim();

  const gallery = new CreateGallery(searchQuery);
  gallery.display();
}
