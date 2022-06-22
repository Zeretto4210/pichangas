import React from 'react';
import './Header.css';
function Header(){
    return (
        <div className='Header'>
            <img className='header-logo' src={require('../../images/header-logo.png')} alt= 'Header logo'/>
            
        </div>
    );
}
export default Header;