import { useContext, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import { motion } from 'framer-motion';
import * as yup from 'yup';
import CreateItem from '../item/CreateItem';
import CheckOutHistory from '../CheckOutHistory';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import { fadeInRight } from '../../animations/variants';
import VerifyAdmin from './VerifyAdmin';
import { useMediaQuery } from 'react-responsive'
import { NavbarContext } from '../../contexts/NavbarContext';

const schema = yup.object().shape({
  secret: yup.number().required(),
})

export default function User() {
  const userContext = useContext(UserContext);
  const shoppingCartContext = useContext(ShoppingCartContext);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [adminModalShow, setAdminModalShow] = useState<boolean>(false);
  const navbarContext = useContext(NavbarContext);
  const isSmallScreen = useMediaQuery({maxWidth: 640})

  const handleLogout = async () => {
    let response = await userContext.logout();
    if (response === "success!") {
      window.location.href = '/profile'
    }
  }

  return (
    <>
      <Container>
        {!userContext.user?.isAdmin ? (
          <>
            <Row>
              <Col>
                <motion.div variants={fadeInRight} initial="hidden" animate="visible">
                  <h1>Welcome Back <em>{userContext.user!.username}</em></h1>
                </motion.div>
              </Col>
              <Col className='d-flex justify-content-end align-items-baseline gap-4'>
                <Button className='rounded-pill' onClick={() => setAdminModalShow(true)}>Verify</Button>
                <Button className='rounded-pill' onClick={() => handleLogout()}>Logout</Button>
                {shoppingCartContext.checkOutHistory.length === 0 ? (
                  <Button disabled className='rounded-pill' variant='danger' onClick={() => shoppingCartContext.clearCheckOutHistory()}>Clear history</Button>
                ) : (
                  <Button className='rounded-pill' variant='danger' onClick={() => shoppingCartContext.clearCheckOutHistory()}>Clear history</Button>
                )}
              </Col>

            </Row>
            <VerifyAdmin show={adminModalShow} onHide={() => setAdminModalShow(false)} />
          </>
        ) : (
          <>
            <Row>
              <Col>
                <motion.div variants={fadeInRight} initial="hidden" animate="visible">
                  <h1>Welcome Back <em>{userContext.user!.username + '!'}</em></h1>
                </motion.div>
              </Col>
              <Col className='d-flex justify-content-end align-items-center gap-4'>
                <Button className='rounded-pill' onClick={() => setModalShow(true)}>Create Item</Button>
                {shoppingCartContext.checkOutHistory.length === 0 ? (
                  <Button disabled className='rounded-pill' variant='danger' onClick={() => shoppingCartContext.clearCheckOutHistory()}>Clear history</Button>
                ) : (
                  <Button className='rounded-pill' variant='danger' onClick={() => shoppingCartContext.clearCheckOutHistory()}>Clear history</Button>
                )}
                <Button className='rounded-pill' onClick={() => handleLogout()}>Logout</Button>
              </Col>
            </Row>
            <CreateItem show={modalShow} onHide={() => setModalShow(false)} />
          </>
        )}
        <CheckOutHistory />
      </Container>


    </>
  )
}