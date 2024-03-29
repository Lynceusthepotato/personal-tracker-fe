import { useEffect, useRef, useState} from "react"
import { getAllFinance } from "../api/api";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../contexts/UserDataContext";
import { NumericFormat } from "react-number-format";
import CustomTransactionCard from "../components/CustomTransactionCard";
import { categoryColorPicker } from "../App";

type HomepageProps = {
    showModal: (visible: boolean, type: number, functionType: number) => void;
}

export const getCurrentWarnStage = (currentBudget: number, monthlyBudget: number) => { // 0 = normal | 1 = medium | 2 = bad
    if (currentBudget >= monthlyBudget * 70 / 100) {
        return 0;
    } else if (currentBudget >= monthlyBudget * 30 / 100 && currentBudget < monthlyBudget * 70 / 100) {
        return 1;
    } else if (currentBudget < monthlyBudget * 30 / 100) {
        return 2;
    }
}

const Homepage = ({showModal}: HomepageProps) => {
    const { userData, setUserData } = useUserData();
    const navigate = useNavigate();
    const [currentWarnColor, setCurrentWarnColor] = useState<string>('var(--color-palette-blue)');
    let lastTransaction = userData?.finance?.transaction?.slice(-5) || [];

    const getFinanceInfo = async () => {
        try {
            const response = await getAllFinance();
            if (response.data) {
                setUserData({finance: response.data});
                switch (getCurrentWarnStage(response.data.financeBudget, response.data.financeMonthlyBudget)) {
                    case 1:
                        setCurrentWarnColor('var(--color-palette-medium)');
                        break;
                    case 2:
                        setCurrentWarnColor('var(--color-palette-bad)');
                        break;
                    default:
                        setCurrentWarnColor('var(--color-palette-blue)');
                }
                lastTransaction = userData?.finance?.transaction?.slice(-5) || [];
                isMounted.current = false;
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
        }
        if (userData?.finance) {
            console.log(userData.finance);
        }
    }, [userData?.finance]); 

    // Get 5 recent transaction below
    const handleFinanceFunction = () => {
        if (userData?.finance) {
            showModal(true, 4, 1);
        } else {
            showModal(true, 4, 0);
        }
    }

    return (
        <div className="is-homepage-container">
            <Header style={{backgroundColor:'var(--color-palette-white)'}}> Manage Tracker </Header>
            <div className="is-homepage-cover">
                <div className="is-tracker-container">
                    <div className="is-tracker-title">
                        <Header style={{fontSize: '1.1rem', fontWeight:'500'}}> To-do List</Header>
                    </div>
                    <div className="is-todo-content">

                    </div>
                </div>
                <div className="is-tracker-container">
                    <div className="is-tracker-title">
                        <Header style={{fontSize: '1.1rem', fontWeight:'500'}}> Finance </Header>
                    </div>
                    <div className="is-finance-content">
                        <div className="is-finance-information-container" style={{backgroundColor: `${currentWarnColor}`}}>
                            <div className="is-finance-budget-cover">
                                <Header style={{fontSize:'0.8', fontWeight:'400', color:'var(--color-palette-white)'}}> Budget </Header>
                                <FaPencil style={{cursor:'pointer'}} onClick={handleFinanceFunction}/>
                            </div>
                            {userData?.finance ? 
                            (
                                <NumericFormat 
                                className='is-numeral-format'
                                value={userData.finance.financeBudget}
                                style={{border:'none'}}
                                placeholder='enter number'
                                allowLeadingZeros={false}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix='IDR '
                                readOnly
                                />
                            ) 
                            : 
                            (<Header style={{color:'var(--color-palette-white)'}}>?</Header>)}
                        </div>
                        <div className="is-finance-transaction-container" style={{margin: '10px'}}>
                            <p> Last 5 Transaction... </p>
                            <div className="is-finance-transaction">
                                {lastTransaction.length > 0 ? lastTransaction.map(transaction => (
                                    <CustomTransactionCard transaction={transaction} categoryColor={categoryColorPicker(transaction.category.categoryId)}/>
                                )) : <p> No transaction has been made... </p>}
                            </div>
                        </div>
                        <CustomButton onClick={() => navigate("/finance")}> Show all transaction </CustomButton>
                    </div>
                </div>
            </div>
            <div className="is-homepage-filler">
                <Header> ¯\_(T o T)_/¯ </Header>
            </div>
        </div>
    )
}

export default Homepage