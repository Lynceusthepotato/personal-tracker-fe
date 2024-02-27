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
import UserDataProvider, { TransactionProps } from './contexts/UserDataContext';

export const categoryColorPicker = (category_id: number) => {
  switch (category_id) {
    case 1: // Else
      return 'var(--color-palette-category-else)';
    case 2: // Food n Drinks
      return 'var(--color-palette-category-fnb)';
    case 3: // Clothing
      return 'var(--color-palette-category-clothing)';
    case 4: // Electronics
      return 'var(--color-palette-category-electronics)';
    case 5: // Electricity Bill
      return 'var(--color-palette-category-eb)';
    case 6: // Water Bill
      return 'var(--color-palette-category-wb)';
  }
}

function App() {
  const [isModalVisible, setIsModalVisilble] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [modalFuncType, setModalFuncType] = useState(0);
  const [username, setUsername] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<TransactionProps>();
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();

  const closeModal = () => {
    setIsModalVisilble(false);
  }

  const handleModal = (visible:boolean, type?: number, funcType?: number, transaction?: TransactionProps) => {
    setIsModalVisilble(visible);
    if (typeof(type) === 'number') {
      setModalType(type);
    }
    if (typeof(funcType) === 'number') {
      setModalFuncType(funcType);
    }
    if (transaction) {
      setTransaction(transaction);
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
    <UserDataProvider>
      <>
        <Navbar showModal={handleModal} username={username}/>
        <Modal 
          isOpen={isModalVisible} 
          onClose={closeModal} 
          handleMultipleModal={handleModalChange} 
          type={modalType} modalContentStyle={{width:'400px'}} 
          functionType={modalFuncType} 
          transaction={transaction}
        />
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
              <FinancePage showModal={handleModal}/>
            </CustomPrivateRoute>
            } 
          />
        </Routes>
        <Footer/>
      </>
    </UserDataProvider>
  );
}

export default App;
