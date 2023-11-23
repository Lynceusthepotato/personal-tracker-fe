import React, { useState } from 'react'
import './ModalStyle.css'
import Header from '../Header';
import { useSignIn } from 'react-auth-kit';

type ModalProps = {
    modalOverlayStyle?: React.CSSProperties;
    modalContentStyle?: React.CSSProperties;
    isOpen: boolean;
    onClose: () => void;
    handleMultipleModal?: (modalType: number) => void;
    loginFunc?: (loginCredential: {email: string, password:string}) => Promise<any>;
    registerFunc?: (loginCredential: {username: string, email:string, password:string}) => Promise<any>;
    type?: number;
    children?: React.ReactNode;
    setUsername?: React.Dispatch<React.SetStateAction<string>>;
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

export default function Modal({modalOverlayStyle, modalContentStyle, isOpen, onClose, handleMultipleModal, loginFunc, registerFunc,  type = 0, children, setUsername} : ModalProps) {
    const customModalOverlayStyle = {...defaultModalOverlayStyle, ...modalOverlayStyle};

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    // Form details
    const [loginData, setLoginData] = useState({email: '', password: ''});
    const [registerData, setRegisterData] = useState({username: '', email: '', password: ''});

    // Login
    const signIn = useSignIn();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (typeof(loginFunc) !== 'undefined') {
                const response = await loginFunc(loginData);
                if (response.data) {
                    signIn({
                        token: response.data.token,
                        expiresIn: 120,
                        tokenType: "Bearer",
                        authState: { username: response.data.username, email: loginData.email }
                    });
                    if (typeof(setUsername) !== 'undefined') {
                        setUsername(response.data.username);
                    }
                } else {
                    console.error(response);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    // Register
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (typeof(registerFunc) !== 'undefined') {
                const response = await registerFunc(registerData);
                if (response.data) {
                    signIn({
                        token: response.data.token,
                        expiresIn: 120,
                        tokenType: "Bearer",
                        authState: { username: response.data.username, email: loginData.email }
                    })
                    if (typeof(setUsername) !== 'undefined') {
                        setUsername(response.data.username);
                    }
                } else {
                    console.error(response);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const customModalContent = () => {
        switch (type) {
            case 1: // Login form
                return (
                    <div className='is-form-box'>
                        <Header style={{color:'white', paddingBottom:'20px'}}> Login </Header>
                        <form id='is-login-form' onSubmit={handleLogin}>
                        <input type="text" className="is-input-field" placeholder= "Email" name="Email" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
                        <input type="text" className="is-input-field" placeholder= "Password" name="password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
                        <input type="submit" className="is-submit-btn" id="login" value= "Login"/>  
                        </form>
                        <div className='is-form-question'> Don`t have an account yet? {handleMultipleModal && <p onClick={() => handleMultipleModal(2)} style={{fontWeight:'700', color:'white'}}> Register </p> }</div>
                    </div>
                )
            case 2: 
                return (
                    <div className='is-form-box'>
                        <Header style={{color:'white', paddingBottom:'20px'}}> Register </Header>
                        <form id='is-login-form' onSubmit={handleRegister}>
                        <input type="text" className="is-input-field" placeholder= "Email" name="email" value={registerData.email} onChange={(e) => setRegisterData({...registerData, email: e.target.value})} />

                        <input type="text" className="is-input-field" placeholder= "Username" name="Username" value={registerData.username} onChange={(e) => setRegisterData({...registerData, username: e.target.value})} />
                        <input type="text" className="is-input-field" placeholder= "Password" name="password" value={registerData.password} onChange={(e) => setRegisterData({...registerData, password: e.target.value})} />
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