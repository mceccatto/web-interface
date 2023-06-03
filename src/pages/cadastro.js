import React, { useState } from 'react';
import './inputs.css';
import Title from './../components/Title/index';

function Cadastro() {

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [avatar, setAvatar] = useState('');
    const [extensao, setExtensao] = useState('');
    const extensoes = ["jpg", "jpeg", "png", "bmp"];
    const status = true;

    function handleNome(e) {
        setNome(e.target.value);
    }

    function handleSobrenome(e) {
        setSobrenome(e.target.value);
    }

    function handleNascimento(e) {
        setNascimento(e.target.value);
    }

    function handleTelefone(e) {
        if (e.target.value.length > e.target.maxLength){
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
        setTelefone(e.target.value);
    }

    function handleEndereco(e) {
        setEndereco(e.target.value);
    }

    function handleCidade(e) {
        setCidade(e.target.value);
    }

    function handleEstado(e) {
        setEstado(e.target.value);
    }

    const handleAvatar = async (e) => {
        const file = e.target.files[0];
        setExtensao(file["name"].split(".").pop());
        const base64 = await convertToBase64(file);
        setAvatar(base64);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (extensoes.includes(extensao) !== true) {
            alert("Arquivo no formato incorreto!\nExtensões permitidas: JPEG, JPG, PNG, BMP");
            return;
        }
        const user = {
            nome: nome,
            sobrenome: sobrenome,
            nascimento: nascimento,
            telefone: telefone,
            endereco: endereco,
            cidade: cidade,
            estado: estado,
            avatar: avatar,
            status: status
        };
        try {
            const response = await fetch('http://localhost:8080/user', {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const status = response.status;
            const result = await response.json();
            switch (status) {
                case 201:
                    e.target.reset();
                    console.log(result.user);
                    alert(result.msg);
                    break;
                case 400:
                    alert(result.msg);
                    break;
                default:
                    console.log("Erro desconhecido!");
                    break;
            }
        } catch (err) {
            console.log('Erro: ' + err);
        }
    }

    const convertToBase64 = (file) => {
        return new Promise((res, rej) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                res(fileReader.result);
            };
            fileReader.onerror = (error) => {
                rej(error);
            };
        });
    };

    return (
        <div className="Inicio">
            <Title titulo="CADASTRO" texto="EFETUE O PREENCHIMENTO DO FORMULÁRIO" />
            <form id="form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className='col-sm-6 mb-2'>
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className="form-control shadow-none" id="nome" onChange={handleNome} />
                    </div>
                    <div className='col-sm-6 mb-2'>
                        <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
                        <input type="text" className="form-control shadow-none" id="sobrenome" onChange={handleSobrenome} />
                    </div>
                    <div className='col-sm-6 mb-2'>
                        <label htmlFor="nascimento" className="form-label">Data de Nascimento</label>
                        <input type="date" className="form-control shadow-none" id="nascimento" onChange={handleNascimento} />
                    </div>
                    <div className='col-sm-6 mb-2'>
                        <label htmlFor="telefone" className="form-label">Telefone</label>
                        <input type="number" className="form-control shadow-none" id="telefone" maxLength="11" onChange={handleTelefone} />
                    </div>
                    <div className='col-sm-12 mb-2'>
                        <label htmlFor="endereco" className="form-label">Endereço</label>
                        <input type="text" className="form-control shadow-none" id="endereco" onChange={handleEndereco} />
                    </div>
                    <div className='col-sm-6 mb-2'>
                        <label htmlFor="cidade" className="form-label">Cidade</label>
                        <input type="text" className="form-control shadow-none" id="cidade" onChange={handleCidade} />
                    </div>
                    <div className='col-sm-6 mb-2'>
                        <label htmlFor="estado" className="form-label">Estado</label>
                        <select className="form-select shadow-none" id="estado" onChange={handleEstado}>
                            <option value="">Selecione</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                    <div className='col-sm-12 mb-3'>
                        <label htmlFor="avatar" className="form-label">Avatar</label>
                        <input type="file" className="form-control shadow-none" id="avatar" accept="image/png,image/jpeg,image/jpg,image/bmp" onChange={(e) => handleAvatar(e)} />
                    </div>
                    <div className='col-sm-12 d-grid gap-2'>
                        <button className="btn btn-primary shadow-none" type="submit">Cadastrar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Cadastro;