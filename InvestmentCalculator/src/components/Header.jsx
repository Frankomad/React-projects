import React from 'react';
import logo from '../assets/investment-calculator-logo.png';

function Header() {
    return (
        <header id="header">
            <img src={logo} alt="logo with money"></img>
            <h1>Investment calculator</h1>
        </header>
    );
}

export default React.memo(Header);
