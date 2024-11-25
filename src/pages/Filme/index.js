import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import './filme-info.css';

import api from '../../services/api';
import { wait } from "@testing-library/user-event/dist/utils";

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);



    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "1a56989b2739121b8935cd2b1269303e",
                    language: "pt-BR",
                }
            } )
            .then((response)=>{
               setFilme(response.data);
               setLoading(false);
            })
            .catch(()=>{
                console.log("Filme nao encontrado");
                navigate("/", {replace: true});
                return;
            }
            )
        }

        loadFilme();

       return () =>{
        console.log("COMPONENTE DESMONTADO");
       }

    },[navigate, id])



    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmeSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvos.some( (filmeSalvo)=> filmeSalvo.id === filme.id );

        if(hasFilme){
          alert('Esse filme jpa estar na lista');
          return
        }

        filmeSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmeSalvos));
        alert("Filme Salvo com Sucesso ! ");
    }


    if(loading){
        return(
            <div className="filme-info" >
            <h1>Carregando filme ...</h1>
         </div>
        )
        
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img  src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_avarage} / 10</strong>

            <div className="area-buttons" >
              <button onClick={salvarFilme} >Salvar</button>
              <button >
                <a  target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`} >Trailer</a>
              </button>
            </div>

        </div>
    )
}

export default Filme;