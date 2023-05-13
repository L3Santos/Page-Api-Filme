import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from 'react-router-dom';
import './home.css';

function Home(){
    ///movie/now_playing?api_key=6fa29a59d0d9290236c4f0bcf1688eeb
    // 6fa29a59d0d9290236c4f0bcf1688eeb
    const [filmes, setFilmes] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "6fa29a59d0d9290236c4f0bcf1688eeb",
                    language: "pt-BR",
                    page: 1,
                }
            })
           // console.log(response.data.results.slice(0,10));
           setFilmes(response.data.results.slice(0,10))
           setloading(false)
        }

        loadFilmes();
    })


    if(loading){
        return(
            <div className="loading">
                <h2>Carregando Filmes....</h2>
            </div>
        ); 
    }

    return(
        <div className="cotainer">
            <div className="lista-filmes">
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`} >Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;