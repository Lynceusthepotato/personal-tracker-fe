import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './assets/App.css';

// Pages
import FrontPage from './pages/FrontPage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [isModalVisible, setIsModalVisilble] = useState(false);
  const [modalType, setModalType] = useState(0);

  const closeModal = () => {
    setIsModalVisilble(false);
  }

  const handleModal = (visible:boolean, type?: number) => {
    setIsModalVisilble(visible);
    if (typeof(type) === 'number') {
      setModalType(type);
    }
  }

  return (
    <Routes>
      <Route path='/' element={<>
        <Navbar openModal={handleModal} />
        <FrontPage isModalVisible={isModalVisible} modalType={modalType} closeModal={closeModal} setModalType={setModalType} setIsModalVisilble={setIsModalVisilble}/>
        <Footer/>
        </>}/>
      <Route path='/finance' element={<><Navbar openModal={handleModal} /></>}/>
    </Routes>
  );
}

export default App;
