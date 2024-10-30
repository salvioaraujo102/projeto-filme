 
 // url da api https://api.themoviedb.org/3/movie/now_playing?api_key=1a56989b2739121b8935cd2b1269303e&language=pt-BR
 // url base https://api.themoviedb.org/3/

 import axios from "axios";

 const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
 });


 export default api;