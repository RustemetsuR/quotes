import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderNavigation.css';

const HeaderNavigation = () => {
    return (
        <header>
            <div className='container'>
                <nav className="header-nav">
                    <ul className="header-ul">
                        <li className="header-li"><NavLink to='/quotes/categories/all/'>Quotes</NavLink></li>
                        <li className="header-li"><NavLink to='/quotes/addNewQuote'>Add New Quote</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default HeaderNavigation;