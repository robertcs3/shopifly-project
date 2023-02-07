import { motion } from 'framer-motion';
import { Button, Container, Row } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom';


export default function Completion() {

  const isSmallScreen = useMediaQuery({maxWidth: 640});
  const navigate = useNavigate();

  return (
    <Container className='d-flex flex-column align-items-center justify-content-evenly text-center' style={{height: "50vh"}}>
      <Row>
        <motion.div initial={{y: -100, opacity: 0, scale: 0.5}} animate={{y:0, opacity: 1, scale: 1}} transition={{duration: 1, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}>
          <h1>Thank you for shopping at Shopifly!</h1>
        </motion.div>
      </Row>
      <Row>
        <motion.div initial={{opacity: 0, scale: 0.5}} animate={{ opacity: 1, scale: 1}} transition={{duration: 1, delay: 1.5, ease: [0, 0.71, 0.2, 1.01] }}>
        <Button className='rounded' size={isSmallScreen ? 'sm' : 'lg'}
        onClick={() => navigate('/profile') }>Check-out History</Button>
        </motion.div>
      </Row>
    </Container>
  )
}
