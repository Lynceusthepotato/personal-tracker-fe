import React, { useState } from 'react'
import './ModalStyle.css'
import Header from '../Header';

type ModalProps = {
    modalOverlayStyle?: React.CSSProperties;
    modalContentStyle?: React.CSSProperties;
    isOpen: boolean;
    onClose: () => void;
    handleMultipleModal?: (modalType: number) => void;
    customFunc?: () => void;
    type?: number;
    children?: React.ReactNode;
}

const defaultModalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    display: 'grid',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 5,
    justifyItems: 'center',
    alignItems: 'center',
}

export default function Modal({modalOverlayStyle, modalContentStyle, isOpen, onClose, handleMultipleModal, customFunc, type = 0, children} : ModalProps) {
    const customModalOverlayStyle = {...defaultModalOverlayStyle, ...modalOverlayStyle};

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    // Form details
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const customModalContent = () => {
        switch (type) {
            case 1: // Login form
                return (
                    <div className='is-form-box'>
                        <Header style={{color:'white', paddingBottom:'20px'}}> Login </Header>
                        <form id='is-login-form' onSubmit={customFunc}>
                        <input type="text" className="is-input-field" placeholder= "Email" name="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="text" className="is-input-field" placeholder= "Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="submit" className="is-submit-btn" id="login" value= "Login"/>  
                        </form>
                        <div className='is-form-question'> Don`t have an account yet? {handleMultipleModal && <p onClick={() => handleMultipleModal(2)} style={{fontWeight:'700', color:'white'}}> Register </p> }</div>
                    </div>
                )
            case 2: 
                return (
                    <div className='is-form-box'>
                        <Header style={{color:'white', paddingBottom:'20px'}}> Register </Header>
                        <form id='is-login-form' onSubmit={customFunc}>
                        <input type="text" className="is-input-field" placeholder= "Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <input type="text" className="is-input-field" placeholder= "Username" name="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="text" className="is-input-field" placeholder= "Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="submit" className="is-submit-btn" id="register" value= "Register"/>
                        </form>
                        <div className='is-form-question'> Already have an account? {handleMultipleModal && <p onClick={() => handleMultipleModal(1)} style={{fontWeight:'700', color:'white'}}> Login </p> }</div>
                    </div>
                )
            default:
                return children;
        }
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className='is-modal-overlay' style={customModalOverlayStyle} onClick={handleOverlayClick}>
            <div className='is-modal-container'>
                <div className='is-modal-content' style={modalContentStyle}>
                    {customModalContent()}
                </div>
            </div>
        </div>
    )
}