import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Shop from './pages/Shop'
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;