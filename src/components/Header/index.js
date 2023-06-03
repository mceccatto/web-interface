import { Link, useLocation } from 'react-router-dom';

function Header() {

    const pagina = useLocation();

    return (
        <div className="Header">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <span className="fs-4">WebInterface - API</span>
                </a>
                {
                    (() => {
                        if (pagina.pathname.includes("/listar")) {
                            return (
                                <ul className="nav nav-pills">
                                    <li className="nav-item"><Link to='/' className="nav-link">Cadastro</Link></li>
                                </ul>
                            )
                        } else if (pagina.pathname.includes("/editar")) {
                            return (
                                <ul className="nav nav-pills">
                                    <li className="nav-item"><Link to='/listar' className="nav-link">Listar</Link></li>
                                </ul>
                            )
                        } else {
                            return (
                                <ul className="nav nav-pills">
                                    <li className="nav-item"><Link to='/listar' className="nav-link">Listar</Link></li>
                                </ul>
                            )
                        }
                    })()
                }
            </header>
        </div>
    );
}

export default Header;