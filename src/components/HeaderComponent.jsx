import React from 'react';
import './HeaderComponent.css'; // Import the CSS file

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav className='navbar navbar-dark bg-dark'>
          <a className='navbar-brand'>Article System</a>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
