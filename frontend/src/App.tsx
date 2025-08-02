import Navbar from './components/navbar.tsx';
import Home from './pages/Home.tsx';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import Product from './pages/Product';

export default function App(){
  return (
    <div className='min-h-screen transition-colors bg-white'>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<Product/>}/>
      </Routes>
    </div>
  )
}