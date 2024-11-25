import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./favoritos.css";

function Favoritos(){

    const [filmes, setFilmes] = useState([]);

    useEffect( ()=>{
     
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [] );



    } ,[] )

   function excluirFilme(){
     alert("teste");
   }

    return(
        <div className="meus-filmes">
            <h1>Meus filmes</h1>

           <ul>
            {filmes.map( (filme)=>{
                return(
                    <li key={filme.id}>
                        <span>{filme.title}</span>
                        <div>
                            <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
                            <button onClick={excluirFilme} > Excluir </button>
                        </div>

                    </li>
                )
            } ) }
           </ul>

        </div>
    )
}

export default Favoritos