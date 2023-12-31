import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';

// Style 
import './assets/App.css';

// Pages
import FrontPage from './pages/FrontPage';
import FinancePage from './pages/FinancePage';
import Homepage from './pages/Homepage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomPrivateRoute from './components/CustomPrivateRoute';
import Modal from './components/customModal/Modal';

function App() {
  const [isModalVisible, setIsModalVisilble] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [modalFuncType, setModalFuncType] = useState(0);
  const [username, setUsername] = useState<string | null>(null);
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();

  const closeModal = () => {
    setIsModalVisilble(false);
  }

  const handleModal = (visible:boolean, type?: number, funcType?: number) => {
    setIsModalVisilble(visible);
    if (typeof(type) === 'number') {
      setModalType(type);
    }
    if (typeof(funcType) === 'number') {
      setModalFuncType(funcType);
    }
  }

  const handleModalChange = (type: number) => {
    setIsModalVisilble(!isModalVisible);
    handleModal(true, type);
  }

  useEffect(() => {
    if (isAuthenticated() && authUser() && typeof authUser() === 'object') {
      setUsername(authUser()!.username); // Forcing it cause it keep returing it might be null 
    }
  },[authUser()]);

  return (
    <>
      <Navbar showModal={handleModal} username={username}/>
      <Modal isOpen={isModalVisible} onClose={closeModal} handleMultipleModal={handleModalChange} type={modalType} modalContentStyle={{width:'400px'}} functionType={modalFuncType}/>
      <Routes>
        <Route path='/' element={<>
          <FrontPage showModal={handleModal}/>
          </>}
        />
        <Route path='/home' element={
          <CustomPrivateRoute>
            <Homepage showModal={handleModal}/>
          </CustomPrivateRoute>
          } 
        />
        <Route path='/finance' element={
          <CustomPrivateRoute>
            <FinancePage/>
          </CustomPrivateRoute>
          } 
        />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
