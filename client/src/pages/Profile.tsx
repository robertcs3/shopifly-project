import React, { useContext } from 'react'
import { Container } from 'react-bootstrap';
import Entry from '../components/user/Entry';
import User from '../components/user/User';
import { UserContext } from '../contexts/UserContext';

export default function Profile() {
  const userContext = useContext(UserContext);

  return (
    <div>
      {userContext.user ? (
        <>
          <User />
        </>
      ) : (
        <Entry />
      )}
    </div>
  )
}