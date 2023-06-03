function TrUsers({ codigo, nome, sobrenome, cidade, estado, avatar, status, handleClickEditar, handleClickStatus, handleClickExcluir }) {
    return (
        <tr className="TrUsers">
            <th className="text-center">{codigo}</th>
            <td><img src={avatar} height="30px" alt="avatar"/> {nome} {sobrenome}</td>
            <td>{cidade}</td>
            <td className="text-center">{estado}</td>
            <td><button className="btn btn-sm btn-info" value={codigo} onClick={handleClickEditar}>✎ Editar</button> <button className={status === true ? 'btn btn-sm btn-success' : 'btn btn-sm btn-secondary'} value={`${codigo},${status === true ? 'ATIVO' : 'INATIVO'}`} onClick={handleClickStatus}>{status === true ? '✖ Desativar' : '✔ Reativar'}</button> <button className="btn btn-sm btn-danger" value={codigo} onClick={handleClickExcluir}>✘ Excluir</button></td>
        </tr>
    );
}

export default TrUsers;