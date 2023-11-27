import React, { useState } from 'react'
import './ModalStyle.css'
import Header from '../Header';
import { useSignIn, useSignOut } from 'react-auth-kit';
import CustomButton from '../CustomButton';
import { useNavigate } from 'react-router-dom';
import { login, register, createFinance, updateFinance } from '../../api/api';

type ModalProps = {
    modalOverlayStyle?: React.CSSProperties;
    modalContentStyle?: React.CSSProperties;
    isOpen: boolean;
    onClose: () => void;
    handleMultipleModal?: (modalType: number) => void;
    functionType?: number; // 0 = Create | 1 = Update
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

export default function Modal({modalOverlayStyle, modalContentStyle, isOpen, onClose, handleMultipleModal, functionType, type = 0, children, setUsername} : ModalProps) {
    const customModalOverlayStyle = {...defaultModalOverlayStyle, ...modalOverlayStyle};
    const navigate = useNavigate();

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    // Form details
    const [loginData, setLoginData] = useState({email: '', password: ''});
    const [registerData, setRegisterData] = useState({username: '', email: '', password: ''});
    const [financeData, setFinanceData] = useState({finance_budget: 0, finance_monthly_budget: 0, do_warn: true});


    // Login
    const signIn = useSignIn();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (typeof(login) !== 'undefined') {
                const response = await login(loginData);
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
                    onClose();
                    navigate("/home");
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
            if (typeof(register) !== 'undefined') {
                const response = await register(registerData);
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
                    onClose();
                    navigate("/home");
                } else {
                    console.error(response);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    // Log out
    const signOut = useSignOut();
    const logout = () => {
        signOut();
        onClose();
        navigate("/");
    }

    // Finance
    const handleCreateFinance = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (typeof (createFinance) !== 'undefined') {
                const response = await createFinance(financeData);
                if (response.data) {
                    console.log(response.data);
                } else {
                    console.log(response);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleUpdateFinance = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (typeof (updateFinance) !== 'undefined') {
                const response = await updateFinance(financeData);
                if (response.data) {
                    console.log(response.data);
                } else {
                    console.log(response);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleFinanceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            switch (functionType) {
                case 0:
                    await handleCreateFinance(e);
                    break;
                case 1:
                    await handleUpdateFinance(e);
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.log(err);
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
            case 2: // Register form
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
            case 3: // Log out
                return (
                    <div className='is-modal-content-container'>
                        <Header style={{color: 'white'}}> Are you sure you want to log out?</Header>
                        <CustomButton onClick={() => logout()}> Log out </CustomButton>
                    </div>
                )
            case 4: // Update/Create finance form
                return (
                    <div className='is-form-box'>
                        <Header style={{color:'white', paddingBottom:'20px'}}> Finance Tracker </Header>
                        <form id='is-finance-form' onSubmit={handleFinanceSubmit}>
                            {functionType === 1 && 
                            <div className='is-finance-budget'>
                                <Header style={{fontSize: '0.8rem', color:'var(--color-pallete-white)', fontWeight:'300'}}> Current Budget: </Header>
                                <input type="number" className="is-input-field" placeholder= "Current Finance Budget" name="finance_budget" value={financeData.finance_budget} onChange={(e) => setFinanceData({...financeData, finance_budget: Number(e.target.value)})} />
                            </div>
                            }
                            <div className='is-finance-budget'>
                                <Header style={{fontSize: '0.8rem', color:'var(--color-pallete-white)', fontWeight:'300'}}> Monthly Budget: </Header>
                                <input type="number" className="is-input-field" placeholder= "Monthly Budget" name="monthlyBudget" value={financeData.finance_monthly_budget} onChange={(e) => setFinanceData({...financeData, finance_monthly_budget: Number(e.target.value)})} />
                            </div>
                            <div className='is-finance-warn'>
                                <Header style={{fontSize: '0.8rem', color:'var(--color-pallete-white)'}}> Warn me ?</Header>
                                <input type="checkbox" className="is-input-field" placeholder= "Warn me?" name="do_warn" checked={financeData.do_warn} onChange={(e) => setFinanceData({...financeData, do_warn: Boolean(e.target.checked)})} />
                            </div>
                            <input type="submit" className="is-submit-btn" id="finance" value= {functionType === 0 ? "Create" : functionType === 1 ? "Update" : ""}/>
                        </form>
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