import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Shop from './pages/Shop'
import Profile from './pages/Profile';
import { Container } from 'react-bootstrap';
import NavbarProvider from './contexts/NavbarContext';
import Payment from './components/payment/Payment';
import Completion from './components/payment/Completion';

function App() {
  return (
    <BrowserRouter>
      <NavbarProvider>
        <Navbar/>
          <Container className='mt-5'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/completion' element={<Completion />} />
            </Routes>
          </Container>
      </NavbarProvider>
    </BrowserRouter>
  );
}

export default App;