import logo_svg from '../assets/logo/logo.svg';

import React from 'react';

export default function Logo() {
  return (
    <div className='logo-container'>
      <img src={logo_svg} alt='by Markus Spiske on Unsplash' />
      <div className='logo-text'>
        <h1 className='logo-title'>fitquip</h1>
        <h2 className='logo-subtitle'>Fitness Tracker</h2>
      </div>
    </div>
  );
}
