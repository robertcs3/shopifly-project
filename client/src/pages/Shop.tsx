import { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import AdminDisplay from '../components/item/AdminDisplay';
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
        <Row className='gap-5'>
          <>
            {itemContext.items.map(item => {
              return (
              
                  <Col key={item._id} className='mx-5 d-flex justify-content-center'> 
                    {!userContext.user ? (
                      <NonUserDisplay {...item}/>
                    ) : userContext.user.isAdmin ? (
                      <AdminDisplay {...item}/>
                    ) : (
                      <NonAdminDisplay {...item}/>
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