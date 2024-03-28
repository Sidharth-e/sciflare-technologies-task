import React from 'react';
import { getUserData } from '../../utility/utlis';
import './NormalUser.scss';

export default function NormalUser() {
  const userDetails = getUserData();

  return (
    <div className='normal-user'>
      <h1>Normal User</h1>

      <div className="user-info">
        <label>User Name:</label>
        <span>{userDetails.firstName} {userDetails.lastName}</span>
      </div>

      <div className="user-info email">
        <label>User Email:</label>
        <span>{userDetails.email}</span>
      </div>

      <div className="user-info role">
        <label> Role:</label>
        <span>{userDetails.role}</span>
      </div>
    </div>
  );
}
