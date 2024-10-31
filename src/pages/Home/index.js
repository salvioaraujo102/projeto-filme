
import { useEffect,  useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './home.css';

// url da api https://api.themoviedb.org/3/movie/now_playing?api_key=1a56989b2739121b8935cd2b1269303e&language=pt-BR

function Home(){

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    // execulta quando a aplicação é carregada.. useEffect
    useEffect(() => {
     
      async function loadFilmes() {
        const response = await api.get("movie/now_playing", {
            params:{
                api_key: "1a56989b2739121b8935cd2b1269303e",
                language: "pt-BR",
                page: 1,

            }
        })

       // console.log(response.data.results.slice(0,10));
       setFilmes(response.data.results.slice(0,10));
       
       // depois que carrega os filmes
       setLoading(false);
      }

      loadFilmes();


    },[])
    
    if(loading){
      return(
        <div className="loading" >
          <h2>Carregando filmes...</h2>
        </div>
      )
    }



    return(
        <div className="container">
            <div className="lista-filmes" >
              {filmes.map( (filme) =>{
                return(
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img  src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} />
                        <Link to={`/filme/${filme.id}`} >acessar</Link>
                    </article> 
                )
              } )}      
            </div>
            
        </div>
    )
}

export default Home;