import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      VideoSync Header
      <nav>
        <Link to="/">Home</Link> | <Link to="/meeting">Start a Meeting</Link>
      </nav>
    </header>
  );
};

export default Header;
