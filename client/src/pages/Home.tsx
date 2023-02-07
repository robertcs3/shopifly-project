import { motion } from 'framer-motion';
import { Button } from 'react-bootstrap';
import styles from '../styles/home.module.css';
import {  fadeInRight,  fadeIn4, animationContainer } from '../animations/variants';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
export default function Home() {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({maxWidth: 640})
  return (
    <>

        <div className={styles['body']}>
          <div className={styles['intro']}>
            <motion.div variants={animationContainer} initial="hidden" animate="visible" className={styles['logo']}>
              <motion.div variants={fadeInRight}>Limitless</motion.div>
              <motion.div variants={fadeInRight}>with </motion.div>
              <motion.div variants={fadeInRight}>Wings</motion.div>
            </motion.div>
            <motion.div variants={fadeIn4} initial="hidden" animate="visible">
              <Button onClick={() => {
                navigate('/shop')
                }} variant='dark' className='rounded' size={isSmallScreen ? 'sm' : 'lg'}>Shop Now</Button>
              </motion.div>
          </div>
        </div>
  
    </>
    
  )
}