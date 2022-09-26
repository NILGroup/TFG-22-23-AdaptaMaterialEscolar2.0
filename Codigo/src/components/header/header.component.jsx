import React from 'react';
import { NavLink } from 'react-router-dom';

import './header.styles.scss';

const Header = () => (<header>
    <h1>AdaptaMaterialEscolar</h1>
    <ul className='links-container'>
        <NavLink exact activeClassName="link-active" to="/">Inicio</NavLink>
        <NavLink exact activeClassName="link-active" to="/help">Ayuda</NavLink>
        <NavLink exact activeClassName="link-active" to="/contact">Contacto</NavLink>
    </ul>
</header>);

export default Header;