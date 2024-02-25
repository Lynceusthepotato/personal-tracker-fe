import React, { useState } from 'react'
import './ModalStyle.css'
import Header from '../Header';
import { useSignIn, useSignOut } from 'react-auth-kit';
import CustomButton from '../CustomButton';
import { useNavigate } from 'react-router-dom';
import { login, register, createFinance, updateFinance, createTransaction, updateTransaction, getAllTransactionCategory } from '../../api/api';
import { TransactionProps, useUserData } from '../../contexts/UserDataContext';
import { NumericFormat } from 'react-number-format';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Select, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';


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
    transaction?: TransactionProps;
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

export default function Modal({modalOverlayStyle, modalContentStyle, isOpen, onClose, handleMultipleModal, functionType, type = 0, children, setUsername, transaction} : ModalProps) {
    const customModalOverlayStyle = {...defaultModalOverlayStyle, ...modalOverlayStyle};
    const navigate = useNavigate();

    const { userData, setUserData } = useUserData();

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    // Form details
    const [loginData, setLoginData] = useState({email: '', password: ''});
    const [registerData, setRegisterData] = useState({username: '', email: '', password: ''});
    const [financeData, setFinanceData] = useState({finance_budget: 0, finance_monthly_budget: 0, do_warn: true});
    const [transactionData, setTransactionData] = useState({transaction_id: 0, transaction_numeral: 1, transaction_name: 'Shopping', transaction_description: 'hehe', transaction_date: dayjs(), category_id: 1});

    const categoryList = userData?.category || [];

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
        // e.preventDefault();
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
                    setUserData({finance: response.data});
                } else {
                    console.log(response);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleFinanceSubmit = async (e: React.FormEvent) => {
        // e.preventDefault();
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

    // Transaction
    const handleCreateTransaction = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (typeof (createTransaction) !== 'undefined') {
                const response = await createTransaction(transactionData);
                if (response.data) {
                    setUserData(prevUserData => {
                        if (prevUserData?.finance) {
                            const updatedFinance = {
                                ...prevUserData.finance,
                                transaction: [...(prevUserData.finance.transaction ?? []), response.data.transaction]
                            };
                            return {
                                ...prevUserData,
                                finance: updatedFinance,
                            };
                        }
                        return prevUserData;
                    });
                } else {
                    console.log(response);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleUpdateTransaction = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (typeof (updateTransaction) !== 'undefined') {
                const response = await updateTransaction(transactionData);
                if (response.data) {
                    console.log(response.data);
                    // setUserData(prevUserData => {
                    //     if (prevUserData?.finance) {
                    //         const updatedFinance = {
                    //             ...prevUserData.finance,
                    //             transaction: response.data
                    //         };
                    //         return {
                    //             ...prevUserData,
                    //             finance: updatedFinance,
                    //         };
                    //     }
                    //     return prevUserData;
                    // });
                } else {
                    console.log(response);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleTransactionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            switch (functionType) {
                case 0:
                    await handleCreateTransaction(e);
                    break;
                case 1:
                    if (transaction?.transactionId) {
                        setTransactionData({...transactionData, transaction_id: transaction.transactionId})
                    }
                    await handleUpdateTransaction(e);
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    }
    // how to implement this when update?
    // if (functionType === 1 && transaction) {
    //     setTransactionData(
    //         {   transaction_id: transaction?.transactionId ?? transactionData.transaction_id,
    //             transaction_numeral: transaction?.transactionNumeral ?? transactionData.transaction_numeral, 
    //             transaction_name: transaction?.transactionName ?? transactionData.transaction_name, 
    //             transaction_description: transaction?.transactionDescription ?? transactionData.transaction_description, 
    //             transaction_date: dayjs(transaction?.transactionDate) ?? transactionData.transaction_date, 
    //             category_id: transactionData.category_id
    //         }
    //     )
    // }

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
                        <div className='is-form-question'> Don`t have an account yet? {handleMultipleModal && <p onClick={() => handleMultipleModal(2)} className="is-modal-text-pointer"> Register </p> }</div>
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
                        <div className='is-form-question'> Already have an account? {handleMultipleModal && <p onClick={() => handleMultipleModal(1)} className="is-modal-text-pointer"> Login </p> }</div>
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
                                <NumericFormat 
                                className='is-numeral-format'
                                value={userData?.finance?.financeBudget}
                                placeholder='enter number'
                                allowLeadingZeros={false}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix='IDR '
                                onValueChange={(e) => e.floatValue && e.floatValue > 0 ? setFinanceData({...financeData, finance_budget: e.floatValue}) : undefined}
                                readOnly
                                />
                            </div>
                            }
                            <div className='is-finance-budget'>
                                <Header style={{fontSize: '0.8rem', color:'var(--color-pallete-white)', fontWeight:'300'}}> Monthly Budget: </Header>
                                <NumericFormat 
                                className='is-numeral-format'
                                value={financeData.finance_monthly_budget}
                                placeholder='enter number'
                                allowLeadingZeros={false}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix='IDR '
                                onValueChange={(e) => e.floatValue && e.floatValue > 0 ? setFinanceData({...financeData, finance_monthly_budget: e.floatValue}) : undefined}
                                />
                            </div>
                            <div className='is-finance-warn'>
                                <Header style={{fontSize: '0.8rem', color:'var(--color-pallete-white)'}}> Warn me ?</Header>
                                <input type="checkbox" className="is-input-field" placeholder= "Warn me?" name="do_warn" checked={financeData.do_warn} onChange={(e) => setFinanceData({...financeData, do_warn: Boolean(e.target.checked)})} />
                            </div>
                            <input type="submit" className="is-submit-btn" id="finance" value= {functionType === 0 ? "Create" : functionType === 1 ? "Update" : ""}/>
                        </form>
                    </div>
                )
            case 5: // Create transaction form
                return (
                    <div className='is-form-box'>
                        <Header style={{color:'white', paddingBottom:'20px'}}> Finance Tracker </Header>
                        <form id='is-transaction-form' onSubmit={handleTransactionSubmit}>
                            <div className='is-transaction-name is-transaction-num'>
                                <Header style={{fontSize: '0.8rem', color:'var(--color-pallete-white)'}}> Transaction Name </Header>
                                <TextField value={transactionData.transaction_name} onChange={(e) => setTransactionData({...transactionData, transaction_name: e.target.value})} className='is-textfield'/>
                            </div>
                            <div className='is-transaction-num'>
                                <Header style={{fontSize: '0.8rem', color:'var(--color-pallete-white)'}}> Transaction Numeral </Header>
                                <NumericFormat 
                                className='is-numeral-format'
                                value={transactionData.transaction_numeral}
                                placeholder='enter number'
                                allowLeadingZeros={false}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix='IDR '
                                onValueChange={(e) => e.floatValue && e.floatValue > 0 ? setTransactionData({...transactionData, transaction_numeral: e.floatValue}) : undefined}
                                />
                            </div>
                            <div className='is-transactional-type is-transaction-num'>
                                <Header style={{fontSize: '0.8rem', color:'var(--color-pallete-white)'}}> Transaction Type </Header>
                                <Select
                                    value={transactionData.category_id}
                                    onChange={(e) => setTransactionData({...transactionData, category_id: Number(e.target.value)})}
                                    >
                                    {categoryList.map(category => (
                                        <MenuItem key={category.categoryId} value={category.categoryId}>
                                        {category.categoryName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className='is-transaction-desc'>
                                <Header style={{fontSize: '0.8rem', color:'var(--color-pallete-white)', textAlign:'start'}}> Transaction Description </Header>
                                <TextField placeholder='hehe' value={transactionData.transaction_description} onChange={(e) => setTransactionData({...transactionData, transaction_description: e.target.value})} className='is-textfield'/>
                            </div>
                            <div className='is-transaction-date'>
                                <Header style={{fontSize: '0.8rem', color:'var(--color-pallete-white)'}}> Transaction Date </Header>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker value={transactionData.transaction_date} maxDate={dayjs()} onChange={(e) => setTransactionData({...transactionData, transaction_date: dayjs(e?.format('YYYY-MM-DD HH:mm:ss'))})} className='is-datetime'/>
                                </LocalizationProvider>
                                <p style={{fontSize: '0.8rem', color:'var(--color-pallete-lightGray)', padding:'10px'}}> *note: date will have default/max of today </p>
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