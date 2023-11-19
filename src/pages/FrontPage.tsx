import React, { useState } from 'react'
import CustomButton from '../components/CustomButton'
import CustomBox from '../components/CustomBox'
import CustomUnderLine from '../components/CustomUnderLine'
import Modal from '../components/customModal/Modal'

type FrontPageProps = {
  isModalVisible: boolean,
  modalType: number,
  closeModal: () => void,
  setModalType: React.Dispatch<React.SetStateAction<number>>;
  setIsModalVisilble: React.Dispatch<React.SetStateAction<boolean>>;
}

const FrontPage = ({isModalVisible, modalType, closeModal, setModalType, setIsModalVisilble} : FrontPageProps) => {
  // const [isModalVisible, setIsModalVisilble] = useState(false);
  // const [modalType, setModalType] = useState<number | undefined>();
  const [customFunction, setCustomFunction] = useState<() => void> ();

  const handleModal = (visibility: boolean, type: number, customFunction?: () => void) => {
    setIsModalVisilble(visibility);
    setModalType(type);
  } 

  const handleModalChange = (type: number) => {
    setIsModalVisilble(!isModalVisible);
    handleModal(true, type);
  }

  return (
    <div className='is-frontpage'>
        <Modal isOpen={isModalVisible} onClose={closeModal} handleMultipleModal={handleModalChange} type={modalType} modalContentStyle={{width:'400px'}}/>
        <div className='is-cover-container'>
          <div className='is-cover-text'>
              <div className='is-cover-title'>
                PERSONAL TRACKER
              </div>
              <div className='is-cover-paragraph'>
                Welcome to our personal tracker web app, your go-to solution for effortless financial management. Take charge of your expenses and set monthly budgets with ease. Our user-friendly interface simplifies the tracking process, ensuring you stay on top of your financial goals. But that's not all – seamlessly integrate your to-do lists to enhance productivity in one central hub. Simplify your life, manage your money, and achieve your goals seamlessly with our intuitive platform. Join us on this journey to financial control and personal success.
              </div>
            </div>
            <div className='is-button-container'>
                <CustomButton> LEARN MORE </CustomButton>
                <CustomButton onClick={() => handleModal(true, 1)}> JOIN NOW </CustomButton>
            </div>
        </div>
        <CustomUnderLine />
        <p style={{display:'grid', justifyItems:'center', fontWeight:'700', fontSize:'2rem', paddingTop:'20px'}}> OUR SERVICES </p>
        <div className='is-description-container'>
          <CustomBox titleChildren='Finance Tracker' paragraphChildren='simplifying expense tracking, budget setting, and financial management for a stress-free and informed financial journey.'/>
          <CustomBox titleChildren=' To-do List' paragraphChildren=' Efficiently organize your tasks and enhance productivity using our user-friendly to-do list feature.'/>
        </div>
    </div>
  )
}

export default FrontPage