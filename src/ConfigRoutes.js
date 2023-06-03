import { Routes, Route } from 'react-router-dom';
import Cadastro from './pages/cadastro';
import Listar from './pages/listar';
import Editar from './pages/editar';

function ConfigRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Cadastro />} />
            <Route path='/listar' element={<Listar />} />
            <Route path='/editar/:codigo' element={<Editar />} />
            <Route path='*' element={'A página solicitada não existe!'} />
        </Routes>
    );
}

export default ConfigRoutes;