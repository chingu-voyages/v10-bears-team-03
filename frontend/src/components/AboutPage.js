import React from 'react';

import Navbar from './Navbar';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <div id='about-page'>
        <h1 className='title'>About Fitquip</h1>
        <p>
          There are many fitness tracking applications out there for
          enthusiasts. However, just as important as your 'Just DO It' attitude
          is the equipment you use and the state of its wear.
        </p>

        <p>
          Fitquip will not only track where you have been and where you are
          going, it will also track the wear and tear of your equipment. Create
          an account and enter each piece of fitness equipment along with the
          date of purchase, and let Fitquip remind you when it's ready for
          routine maintenance or replacement.
        </p>
        <p>
          Fitquip was developed as a part of{' '}
          <a href='https://medium.com/chingu' target='_blank'>
            Chingu
          </a>{' '}
          Voyage 10.
        </p>
      </div>
    </div>
  );
}
