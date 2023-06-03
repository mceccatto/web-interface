import React, { useEffect, useState } from 'react';
import './inputs.css';
import Title from './../components/Title/index';
import TrUsers from './../components/TrUsers/index';

function Listar() {

    const [users, setUsers] = useState([]);
    const [userSearch, serUserSearch] = useState({
        codigo: 0,
        busca: "",
        estado: "",
        status: true
    });

    const getUserList = async () => {
        try {
            const response = await fetch('http://localhost:8080/user', {
                method: 'GET',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            setUsers(result);
        } catch (err) {
            console.log('Erro: ' + err);
        }
    }

    const getUserFilter = async () => {
        try {
            const response = await fetch('http://localhost:8080/user/busca/', {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userSearch)
            });
            const result = await response.json();
            if (userSearch.codigo !== 0 && response.status === 200) {
                setUsers([result]);
            } else if(response.status === 200) {
                setUsers(result);
            } else {
                alert('É obrigatório informar um código válido!');
            }
        } catch (err) {
            console.log('Erro: ' + err);
        }
    }

    useEffect(() => {
        getUserList();
    }, [userSearch]);

    const handleClickEditar = (e) => {
        window.location.replace('http://localhost:3000/editar/' + e.target.value);
    }

    const handleClickStatus = async (e) => {
        let clickCodigo = e.target.value.split(",")[0];
        let clickStatus = e.target.value.split(",")[1];
        let newStatus;
        if (clickStatus === "ATIVO") {
            newStatus = false;
        } else {
            newStatus = true;
        }
        try {
            const response = await fetch('http://localhost:8080/user/' + clickCodigo, {
                method: 'PUT',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
            const status = response.status;
            const result = await response.json();
            switch (status) {
                case 200:
                    getUserFilter();
                    alert(result.msg);
                    break;
                case 400:
                    alert(result.msg);
                    break;
                default:
                    alert("Erro desconhecido!");
                    break;
            }
        } catch (err) {
            console.log('Erro: ' + err);
        }
    }

    const handleClickExcluir = async (e) => {
        let clickCodigo = e.target.value;
        try {
            const response = await fetch('http://localhost:8080/user/' + clickCodigo, {
                method: 'DELETE',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const status = response.status;
            const result = await response.json();
            switch (status) {
                case 200:
                    getUserList();
                    getUserFilter();
                    alert(result.msg);
                    break;
                case 400:
                    alert(result.msg);
                    break;
                default:
                    alert("Erro desconhecido!");
                    break;
            }
        } catch (err) {
            console.log('Erro: ' + err);
        }
    }

    const handleCodigo = (e) => {
        userSearch.codigo = Number(e.target.value);
        userSearch.busca = "";
        userSearch.estado = "";
        getUserFilter();
    }

    const handleBusca = (e) => {
        userSearch.busca = e.target.value;
        getUserFilter();
    }

    const handleEstado = (e) => {
        userSearch.estado = e.target.value;
        getUserFilter();
    }

    const handleStatus = (e) => {
        if(e.target.value === "ATIVO") {
            userSearch.status = Boolean(true);
        } else {
            userSearch.status = Boolean(false);
        }
        getUserFilter();
    }

    return (
        <div className="Listar">
            <Title titulo="USUÁRIOS" texto="LISTA DE USUÁRIOS CADASTRADOS" />
            <form>
                <div className="row">
                    <div className="col-sm-2">
                        <input type="number" className="form-control shadow-none" id="codigo" name="codigo" placeholder="Código" onChange={handleCodigo} />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" className="form-control shadow-none" id="busca" name="busca" value={userSearch.busca} placeholder="Busca (Nome/Sobrenome/Cidade)" onChange={handleBusca} />
                    </div>
                    <div className="col-sm-2">
                        <select className="form-select shadow-none" id="estado" name="estado" value={userSearch.estado} onChange={handleEstado}>
                            <option value="">Estado</option>
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
                    <div className="col-sm-2">
                        <select className="form-select shadow-none" id="status" name="status" onChange={handleStatus}>
                            <option value="ATIVO">Ativo</option>
                            <option value="INATIVO">Inativo</option>
                        </select>
                    </div>
                </div>
            </form>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th className="text-center">CODIGO</th>
                        <th>NOME COMPLETO</th>
                        <th>CIDADE</th>
                        <th>ESTADO</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    {
                        users && users.map((user, index) => (
                            <TrUsers key={index} codigo={user.codigo} nome={user.nome} sobrenome={user.sobrenome} cidade={user.cidade} estado={user.estado} avatar={user.avatar} status={user.status} handleClickEditar={handleClickEditar} handleClickStatus={handleClickStatus} handleClickExcluir={handleClickExcluir} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Listar;