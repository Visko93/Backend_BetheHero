import React, { useState } from 'react';
//Fornece um link que não recarrega a pagina ataves do router-dom (yarn add react-router-dom)
import { Link, useHistory } from 'react-router-dom';
// necessário baixar o yarn add react-icons
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
 
import logoImg from '../../assets/logo.svg';




export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ong_id = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident (e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };
        try {
        
            const response = await api.post('incidents', data, {
                headers: {
                    Authorization: ong_id,
                }
            });
                alert(`Seu caso foi registrado com a ID: ${response.data.id}`);
            
            history.push('/profile');
    
            } catch (err) {
                alert('Erro no cadastro, tente novamente.');
            }
    }

    return (
        <div className="NewIncident-container">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="Logo"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente e
                        encontre um herói para ajudar.
                    </p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                    placeholder="Titulo do caso"
                    value={title}
                    onChange = {e => setTitle(e.target.value)}
                    />
                    <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange = {e => setDescription(e.target.value)}
                    />
                    <input
                    placeholder="Valor em reais"
                    value={value}
                    onChange = {e => setValue(e.target.value)}
                    />
                    <div>
                        <Link className="button" id="cancel_bt" to="/profile">Cancelar</Link>
                        <button className="button" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}