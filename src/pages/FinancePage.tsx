import { useState } from "react";
import Header from "../components/Header";
import { FaPlus, FaTrashCan, FaRotateRight } from "react-icons/fa6";
import CustomDropdown, { DropdownOption }  from "../components/CustomDropdown";
import DateTime from 'react-datetime';

type FinancePage = {
    showModal: (visible: boolean, type: number, functionType: number) => void;
}

const FinancePage = ({showModal}: FinancePage) => {
    const [transactionData, setTransactionData] = useState('');

    const getTransactionData = async () => {
        
    }

    const handleTransactionFunction = (type:number) => { // 0 Create | 1 Update
        showModal(true, 5, type);
    }

    return (
        <div className="is-financepage" style={{display:'grid'}}>
            <Header style={{backgroundColor:'var(--color-pallete-white)'}}> Finance History </Header>
            <div className="is-finance-history-container" style={{minHeight:'80vh', backgroundColor:'var(--color-pallete-lightGray)'}}>
                <div className="is-finance-taskbar">
                    <div className="is-finance-taskbar-pattern"/>
                    {/* <CustomDropdown option={months} selectedOption={selectedMonth} onOptionChange={handleMonthChange}/>
                    <CustomDropdown option={year} selectedOption={selectedYear} onOptionChange={handleYearChange}/> */}
                    <FaPlus style={{cursor:"pointer"}} onClick={(e) => handleTransactionFunction(0)}/>
                    <FaTrashCan style={{cursor:"pointer"}}/>
                    <FaRotateRight style={{cursor:"pointer"}}/>
                </div>
                <div className="is-finance-history">
                    <div className="is-month-history-container">
                        <Header style={{textAlign:'justify', fontSize:'1.2rem'}}> {} Transaction History </Header>
                        <div className='is-month-history'>
                            <p> Gathering Data... </p>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default FinancePage