import React from 'react';
import { isMobile } from 'react-device-detect';

export const getNavbar = (auth, signOut, signOutDialog, showDialog) => {
  return auth.uid ? (
    <a href='/' className='logoNav'>
      <svg xmlns='http://www.w3.org/2000/svg' width='26' height='31' viewBox='0 0 26 31'>
        <g fill='none' fillRule='evenodd' stroke='#000' strokeWidth='1.5' transform='translate(1 1)'>
          <path d='M0 28.458V9.253c.505-7.783 16.926-16.194 21.979 0 0 .162.625 2.884 1.874 8.167a.505.505 0 0 1-.492.621h-1.74a.505.505 0 0 0-.505.525c.062 1.659.055 2.488-.021 2.488-5.053-.878-6.19 4.269 0 4.269v3.135a.505.505 0 0 1-.506.505H.505A.505.505 0 0 1 0 28.458z' />
          <ellipse cx='13.642' cy='12.554' rx='2.021' ry='2.009' />
        </g>
      </svg>
      &nbsp;&nbsp;&nbsp;&nbsp;
      {isMobile ? '' : 'Coculture'}
      {isMobile ? (
        ''
      ) : (
        <a className='link logout' onClick={signOutDialog}>
          {auth.displayName} &nbsp;<i className='fa fa-chevron-down'></i>
        </a>
      )}
      {showDialog ? (
        <div className='dialog'>
          <a className='link' onClick={signOut}>
            Logout
          </a>
        </div>
      ) : (
        ''
      )}
    </a>
  ) : (
    <span />
  );
};
