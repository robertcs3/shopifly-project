import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import AdminDisplay from '../components/item/AdminDisplay';
import Item from '../components/item/Item';
import NonAdminDisplay from '../components/item/nonAdminDisplay';
import NonUserDisplay from '../components/item/NonUserDisplay';
import { ItemContext } from '../contexts/ItemContext';
import { UserContext } from '../contexts/UserContext';

export default function Shop() {
  const itemContext = useContext(ItemContext);
  const userContext = useContext(UserContext);
  return (
    <>
      <Container className='mt-5'>
        <Row>
          <>
            {itemContext.items.map(item => {
              return (
              
                  <Col key={item._id} className='mx-5 mt-2 d-flex justify-content-center'> 
                    {!userContext.user ? (
                      <NonUserDisplay {...item}/>
                    ) : userContext.user.isAdmin ? (
                      <AdminDisplay/>
                    ) : (
                      <NonAdminDisplay/>
                    )}
                  </Col>
                
              )
            })}
          </>
        </Row>
      </Container>
      {/* <Item /> */}
    </>
  )
}