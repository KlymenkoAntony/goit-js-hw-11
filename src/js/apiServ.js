import axios from "axios";
export default apiServ;

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '29846165-8209d049b83027064d12954c4';

async function apiServ(query, page, perPage) {
    const response = await axios.get (`?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,)
    return response;
}