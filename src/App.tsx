import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './assets/App.css';

// Pages
import FrontPage from './pages/FrontPage';
import FinancePage from './pages/FinancePage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomPrivateRoute from './components/CustomPrivateRoute';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';

function App() {
  const [isModalVisible, setIsModalVisilble] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [username, setUsername] = useState<string | null>(null);
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();

  const closeModal = () => {
    setIsModalVisilble(false);
  }

  const handleModal = (visible:boolean, type?: number) => {
    setIsModalVisilble(visible);
    if (typeof(type) === 'number') {
      setModalType(type);
    }
  }

  useEffect(() => {
    if (isAuthenticated() && authUser() && typeof authUser() === 'object') {
      setUsername(authUser()!.username); // Forcing it cause it keep returing it might be null 
    }
  },[authUser()]);

  return (
    <>
      <Navbar openModal={handleModal} username={username}/>
      <Routes>
        <Route path='/' element={<>
          <FrontPage isModalVisible={isModalVisible} modalType={modalType} closeModal={closeModal} setModalType={setModalType} setIsModalVisilble={setIsModalVisilble}/>
          </>}
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
