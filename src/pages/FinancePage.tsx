import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { FaPlus, FaTrashCan, FaRotateRight } from "react-icons/fa6";
import { deleteTransaction, getAllFinance, getAllTransactionCategory } from "../api/api";
import { FinanceProps, TransactionProps, useUserData } from "../contexts/UserDataContext";
import CustomTransactionCard from "../components/CustomTransactionCard";
import dayjs from 'dayjs';
import CustomButton from "../components/CustomButton";


type FinancePage = {
    showModal: (visible: boolean, type: number, functionType?: number, transaction?: TransactionProps) => void;
}

const FinancePage = ({showModal}: FinancePage) => {
    const { userData, setUserData } = useUserData();
    const [oldHistory, setOldHistory] = useState(false);
    const [isActiveRemove, setIsActiveRemove] = useState(false);
    let transactionList = userData?.finance?.transaction || [];

    const currentDate = dayjs();
    let currentMonthTransaction = transactionList?.filter(transaction => {
        return typeof transaction?.transactionDate !== "undefined" && 
               dayjs(transaction.transactionDate).isSame(currentDate, 'month');
    }) || [];
    let olderTransaction = transactionList?.filter(transaction => {
        return typeof transaction?.transactionDate !== "undefined" && !dayjs(transaction.transactionDate).isSame(currentDate, 'month')}) || [];

    // Fetch
    const getFinanceInfo = async () => {
        try {
            const response = await getAllFinance();
            if (response.data) {
                setUserData(prevUserData => {
                    let updatedFinance: FinanceProps;
                    if (prevUserData?.finance) {
                        updatedFinance = {
                            ...prevUserData.finance,
                            transaction: response.data.transaction,
                        }
                    } else {
                        updatedFinance = response.data;
                    }

                    return {
                        ...prevUserData,
                        finance: updatedFinance,
                    }
                })
                transactionList = userData?.finance?.transaction || [];
                currentMonthTransaction = transactionList?.filter(transaction => dayjs(transaction.transactionDate).isSame(currentDate, 'month')) || [];
                olderTransaction = transactionList?.filter(transaction => !dayjs(transaction.transactionDate).isSame(currentDate, 'month')) || [];
            } else {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getAllCategory = async () => {
        try {
            const response = await getAllTransactionCategory();
            if (response.data) {
                setUserData(prevUserData => ({
                    ...prevUserData,
                    category: response.data
                }));
            } else {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const isMounted = useRef(true);
    useEffect(() => {
        if (isMounted.current) {
            getFinanceInfo();
            getAllCategory();
        }
    }, [userData?.finance]); 
    

    const handleTransactionFunction = (type:number) => { // 0 Create | 1 Update
        showModal(true, 5, type);
    }

    const refreshFinance = () => {
        getFinanceInfo();

        if (olderTransaction.length <= 0) {
            setOldHistory(false);
        }
    }

    const [removeList, setRemoveList] = useState<number[]>([]);
    const handleChangeRemoveItem = (value:number) => {
        const indexCheck = removeList?.indexOf(value)
        if (indexCheck !== -1) {
            const newList = removeList.filter((item, idx) => idx !== indexCheck);
            setRemoveList(newList);
        } else {
            setRemoveList(prevList => [...prevList, value]);
        }
    }

    const handleRemoveTransaction = async() => {
        removeList.map(transaction => (
            handleRemoveTransactionAPI(transaction)
        ));
        refreshFinance();
    }

    const handleRemoveTransactionAPI = async(transaction_id: number) => {
        try {
            const response = await deleteTransaction(transaction_id);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="is-financepage" style={{display:'grid'}}>
            <Header style={{backgroundColor:'var(--color-pallete-white)'}}> Finance History </Header>
            <div className="is-finance-history-container" style={{minHeight:'80vh', backgroundColor:'var(--color-pallete-lightGray)'}}>
                <div className="is-finance-taskbar">
                    <div className="is-finance-taskbar-pattern"/>
                    <FaPlus style={{cursor:"pointer"}} onClick={(e) => handleTransactionFunction(0)}/>
                    <FaTrashCan style={{cursor:"pointer"}} onClick={() => setIsActiveRemove(!isActiveRemove)}/>
                    <FaRotateRight style={{cursor:"pointer"}} onClick={refreshFinance}/>
                </div>
                <div className="is-finance-history">
                    <div className="is-month-history-container">
                        <Header style={{textAlign:'justify', fontSize:'1.2rem'}}> Transaction History </Header>
                        <div className={`is-month-transaction-container${isActiveRemove ? ' active' : ''}`}>
                            <Header style={{textAlign:'justify', fontSize:'1rem'}}> {currentDate.format('MMMM')} History </Header>
                            <CustomButton customClassName={`is-remove-button${isActiveRemove ? ' active' : ''}`} onClick={handleRemoveTransaction}> Remove </CustomButton>
                        </div>
                        <div className='is-month-history'>
                            {currentMonthTransaction ? currentMonthTransaction.slice().reverse().map((transaction) => (
                                <CustomTransactionCard onClick={()=> showModal(true, 5, 1, transaction)} transaction={transaction} onRemoveItem={handleChangeRemoveItem} isRemoveActive={isActiveRemove}/>
                            )) : <p> Gathering Data... </p>}
                        </div>
                    </div>
                    <div style={{padding: '10px'}}>
                        {oldHistory ?
                            <>
                                <Header style={{textAlign:'justify', fontSize:'1rem'}}> Old History </Header>
                                <div className='is-month-history'>
                                    {olderTransaction.length > 0 ? olderTransaction.slice().reverse().map((transaction) => (
                                        <CustomTransactionCard onClick={()=> showModal(true, 5, 1, transaction)} transaction={transaction} onRemoveItem={handleChangeRemoveItem} isRemoveActive={isActiveRemove}/>
                                    )) : <p> You don`t have old data :| </p>}
                                </div> 
                            </>
                            :
                            <p style={{textAlign:'justify', fontSize:'1.2rem', padding:'20px', cursor:'pointer', fontWeight:'600', textAlignLast:'center'}} onClick={(e) => setOldHistory(true)}> Show Older History? </p>
                        }
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default FinancePage