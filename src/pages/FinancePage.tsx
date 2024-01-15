import { useState } from "react";
import Header from "../components/Header";
import { FaPlus, FaTrashCan, FaRotateRight } from "react-icons/fa6";
import CustomDropdown, { DropdownOption }  from "../components/CustomDropdown";

type FinancePage = {
    showModal: (visible: boolean, type: number, functionType: number) => void;
}

const FinancePage = ({showModal}: FinancePage) => {
    const [transactionData, setTransactionData] = useState('');

    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
    ]

    const year = [ // Later change to user create date + 5 year
        { value: 1, label: '2024' },
        { value: 2, label: '2025' },
        { value: 3, label: '2026' },
        { value: 4, label: '2027' },
        { value: 5, label: '2028' },
    ]

    // Change this default to current month / year
    const [selectedMonth, setSelectedMonth] = useState<DropdownOption>(months[0]);
    const [selectedYear, setSelecteYear] = useState<DropdownOption>(year[0]);

    const getTransactionData = async () => {
        
    }

    const handleMonthChange = (newSelectedOption: DropdownOption) => {
        setSelectedMonth(newSelectedOption);
    }

    const handleYearChange = (newSelectedOption: DropdownOption) => {
        setSelecteYear(newSelectedOption);
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
                    <CustomDropdown option={months} selectedOption={selectedMonth} onOptionChange={handleMonthChange}/>
                    <CustomDropdown option={year} selectedOption={selectedYear} onOptionChange={handleYearChange}/>
                    <FaPlus style={{cursor:"pointer"}} onClick={(e) => handleTransactionFunction(0)}/>
                    <FaTrashCan style={{cursor:"pointer"}}/>
                    <FaRotateRight style={{cursor:"pointer"}}/>
                </div>
                <div className="is-finance-history">
                    <div className="is-month-history-container">
                        <Header style={{textAlign:'justify', fontSize:'1.2rem'}}> {selectedMonth.label} Transaction History </Header>
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