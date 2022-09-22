import './sass/index.scss';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import refs from './js/refs';
import createImgCollection from './js/createImgCollection';
import apiServ from './js/apiServ'; 
import { scroll } from './js/scroll'; 

let query = '';
let page = 1;
let simpleLightBox = new SimpleLightbox('.gallery a');
const perPage = 40;

refs.searchForm.addEventListener('submit', onSearchForm);
refs.btnLoad.addEventListener('click', onBtnLoad);

function onSearchForm(evt) {
    evt.preventDefault();

    page = 1;
    query = evt.currentTarget.searchQuery.value.trim();
    refs.gallery.innerHTML = '';
    refs.btnLoad.classList.add('is-hidden');
  
    if (!query) {
        Notify.failure('The search string cannot be empty. Please specify your search query.');
        return;
    }

    apiServ(query, page, perPage)
        .then(({ data }) => {
            if (data.totalHits === 0) {
                Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                createImgCollection(data.hits);
                simpleLightBox.refresh();
                Notify.success(`Hooray! We found ${data.totalHits} images.`);

                if (data.totalHits > perPage) {
                    refs.btnLoad.classList.remove('is-hidden');
                }
            }
        })
    
        .catch(error => console.log(error));
}

function onBtnLoad() {
  page += 1

    apiServ(query, page, perPage)
        .then(({ data }) => {
            createImgCollection(data.hits);
            simpleLightBox.refresh();

            const totalPages = Math.floor(data.totalHits / perPage)
            if (page > totalPages) {
                refs.btnLoad.classList.add('is-hidden');
                Notify.failure("We're sorry, but you've reached the end of search results.");
            }
            scroll();
        })
        .catch(error => console.log(error));
} 