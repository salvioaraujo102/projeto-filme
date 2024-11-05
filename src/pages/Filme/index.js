import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Filme(){
    const { id } = useParams();
    return(
        <div>
            <h1>Acessando filme {id} </h1>
        </div>
    )
}

export default Filme;