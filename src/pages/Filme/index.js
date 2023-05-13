import { useEffect, useState} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './filme.css';

import api from '../../services/api';

function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    

    useEffect(()=>{
        async function loadFilmes(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "6fa29a59d0d9290236c4f0bcf1688eeb",
                    language: "pt-BR",
                }
            })
            .then((Response)=>{
                setFilme(Response.data);
                setLoading(false)
            })
            .catch(()=>{
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilmes();

        return () => {
            console.log('')
        }
    }, [navigate, id]);


    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");
        
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme){
            toast.warn("[ERRO], Esse Filme Já Está Na Lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme Salvo Com Sucesso");
    }

    
    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando Detalhes...</h1>
            </div>
        );
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img  src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>


            <div className='area-buttons'>
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target="black" rel="external"  href={`https:youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
            </button>
            <button><Link to='/'>Pagina Home</Link></button>
            </div>
        </div>
    );
}

export default Filme;