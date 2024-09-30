import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/estilos.css';
import { useAuth } from '../components/AuthContext';

const Header = ({ onSearch }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isDebounced, setIsDebounced] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = (event) => {
    if (event.type === 'touchstart') event.preventDefault();
    if (isDebounced) return;
    setIsDebounced(true);

    setIsMenuActive(!isMenuActive);

    setTimeout(() => {
      setIsDebounced(false);
    }, 300);
  };

  const closeMenu = () => {
    setIsMenuActive(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    setShouldRedirect(true);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  useEffect(() => {
    if (shouldRedirect) {
      navigate('/');
      setShouldRedirect(false);
    }
  }, [shouldRedirect, navigate]);

  return (
    <header id="header" className="navbar">
      <div className="container">
        <Link id="logo" to="/">
          <img src="/assets/logo.png" alt="Minha Escola Logo" className="logo-img" />
        </Link>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar..." 
          onChange={handleSearchChange} 
        />
        <nav id="nav" className={isMenuActive ? 'active' : ''}>
          <button
            aria-label={isMenuActive ? 'Fechar Menu' : 'Abrir Menu'}
            id="btn-mobile"
            onClick={toggleMenu}
          >
            <span id="hamburger"></span>
          </button>
          <ul id="menu" role="menu">
            <li><Link to="/" onClick={closeMenu}>Início</Link></li>
            <li>{isLoggedIn ? (
              <Link to="/postagens" onClick={closeMenu}>Postagens</Link>
            ) : (
              <span onClick={() => { 
                closeMenu(); 
                alert("Você precisa estar logado para acessar as postagens."); 
              }}>
                Postagens
              </span>
            )}
            </li>
            <li><Link to="/contato" onClick={closeMenu}>Contato</Link></li>
            <li>
              {isLoggedIn ? (
                <Link onClick={handleLogout}>Logoff</Link>
              ) : (
                <Link to="/login" onClick={closeMenu}>Logar/Cadastrar</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
