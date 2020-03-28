import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
 import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    //como serão retornados varios itens o useState começa como um array []
    const [incidents, setIncidents] = useState([]);
//Recupera o item salvo no localStorage na pagina de Logon
    const ong_id = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();
    /**
     * /para retornar algo assim que a pagina for carregada utilizando useEffect
     * primeiro a arrow function que sera executada e apos qual item será utilizado para disparar
     * essa função em forma de array, caso seja deixada em branco irá executar apenas uma vez
     * */    
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ong_id,
            } //Usar then para ler a resposta do banco de dados. estilo async/await mais rápido
        }).then(res => {
            setIncidents(res.data);
        })
    }, [ong_id]);
    //criar uma função para delettar os casos, primeiro cria a rota com o metodo de delção do back
    //depois verifica a autprização de ongId
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                     Authorization: ong_id,
                }
            });
            //função para filtrar somente os incidentes que não sejam o deletado, excluindo ele da pagina
            setIncidents(incidents.filter(incident => incident.id !== id))

        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    } 

    // função de logout
    function handleLogout () {
        //limpoa os dados do local storage
        localStorage.clear();

        history.push('/');
    }



    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo"/>
    <span>Bem vinda, { ongName }</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                    <button onClick={handleLogout} type="button">
                        <Link to="/"><FiPower size={18} color="#E02041"/></Link>
                    </button>
                
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        {/* notar que pode utilizar a função Intl para formatação de moeda */}
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        {/* cria-se uma arrow funciton para que não seja pasado o retorno para o 
                        onClick e sem uma função que só será executada realmente ao clique */}
                        <button onClick={() => handleDeleteIncident(incident.id)} type='button'>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}