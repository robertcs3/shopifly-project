import { motion } from 'framer-motion';
import { Button, Container } from 'react-bootstrap';
import styles from '../styles/home.module.css';
import {  fadeIn, fadeIn2, fadeIn3, fadeIn4, animationContainer } from '../animations/variants';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate(); 
 
  return (
    <>

        <div className={styles['body']}>
          <div className={styles['intro']}>
            <motion.div variants={animationContainer} className={styles['logo']}>
              <motion.div variants={fadeIn} initial="hidden" animate="visible">Limitless</motion.div>
              <motion.div variants={fadeIn2} initial="hidden" animate="visible">with </motion.div>
              <motion.div variants={fadeIn3} initial="hidden" animate="visible">Wings</motion.div>
            </motion.div>
            <motion.div variants={fadeIn4} initial="hidden" animate="visible">
              <Button onClick={() => navigate('/shop')} variant='dark' className='mt-5 rounded-0' size="lg">Shop Now</Button>
              </motion.div>
          </div>
        </div>
  
    </>
    
  )
}