import axios from 'axios';

//base da url: https://api.themoviedb.org/3/ 
//URL da Api: /movie/now_playing?api_key=6fa29a59d0d9290236c4f0bcf1688eeb

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;