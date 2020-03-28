import React, { useState } from 'react';
//Fornece um link que não recarrega a pagina ataves do router-dom (yarn add react-router-dom)
import { Link, useHistory } from 'react-router-dom';
// necessário baixar o yarn add react-icons
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

import logoImg from '../../assets/logo.svg';

export default function Register() {
    //Utilizar o Usestate
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();
    //criar a função que vai fazer o handle de cadastros atraves do axios
    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        
        try {
        
        const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
        
        history.push('/');

        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
        
    }
    // Criar o retor de HTML que vai gerar o front end
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos 
                        da sua ONG.
                    </p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color={"#E02041"} />
                        Voltar a tela inicial.
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        value={ name } 
                        placeholder="Nome da ONG"
                        onChange = {e => setName(e.target.value)}
                    />
                    <input 
                        value={ email } type="email" 
                        placeholder="E-mail"
                        onChange = {e => setEmail(e.target.value)}
                    />
                    <input 
                        value={ whatsapp } 
                        placeholder="WhatsApp"
                        onChange = {e => setWhatsApp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                            value={ city } 
                            placeholder="Cidade"
                            onChange = {e => setCity(e.target.value)}
                        />
                        <input 
                            value={ uf } 
                            placeholder="UF" 
                            style={{width: 80 }}
                            onChange = {e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
