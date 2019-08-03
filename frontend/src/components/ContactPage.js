import React from 'react';

import Navbar from './Navbar';

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <div id='contact-page'>
        <h1 className='title'>Contact Us</h1>
        <p>For questions or assistance using Fitquip, contact us at:</p>
        <a href='#'>chingufitquip@gmail.com</a>
      </div>
    </div>
  );
}
