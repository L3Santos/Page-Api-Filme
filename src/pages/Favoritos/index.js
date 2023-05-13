import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos(){
    const [filmes,  setFilme] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeflix")
        setFilme(JSON.parse(minhaLista) || [])
    }, []);

    function excluir(id){
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilme(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
        toast.success(id + " Filme Excluido De Favoritos Com Sucesso");
    }

    return(
        <div className="meus-filmes">
            <h1>MINHA LISTA DE FILMES FAVORITOS</h1>

            {filmes.length ===0 && <span>Você não possuí nenhum filme salvo</span>}
            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button className='excluir' onClick={()=> excluir(item.id)}>Excluir</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Favoritos;