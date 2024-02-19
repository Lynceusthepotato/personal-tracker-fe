import { useEffect, useRef, useState} from "react"
import { getAllFinance } from "../api/api";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../contexts/UserDataContext";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import CustomTransactionCard from "../components/CustomTransactionCard";

type HomepageProps = {
    showModal: (visible: boolean, type: number, functionType: number) => void;
}

const Homepage = ({showModal}: HomepageProps) => {
    const { userData, setUserData } = useUserData();
    const [totalNegative, setTotalNegative] = useState(0);
    let lastTransaction = userData?.finance?.transaction?.slice(-5) || [];

    const getFinanceInfo = async () => {
        try {
            const response = await getAllFinance();
            if (response.data) {
                setUserData({finance: response.data});
                lastTransaction = userData?.finance?.transaction?.slice(-5) || [];
                countMoneyEaten();
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

    const navigate = useNavigate();

    const countMoneyEaten = () => {
        if (userData?.finance?.transaction) {
            userData.finance.transaction.map(transaction => (
                setTotalNegative(totalNegative + transaction.transactionNumeral)
            ))
        }
    }

    return (
        <div className="is-homepage-container">
            <Header style={{backgroundColor:'var(--color-pallete-white)'}}> Manage Tracker </Header>
            <div className="is-homepage-cover">
                <div className="is-tracker-container">
                    <div className="is-tracker-title">
                        <Header style={{fontSize: '1.1rem', fontWeight:'500'}}> To-do List</Header>
                        <FaPencil style={{cursor:'pointer'}}/>
                    </div>
                    <div className="is-todo-content">

                    </div>
                </div>
                <div className="is-tracker-container">
                    <div className="is-tracker-title">
                        <Header style={{fontSize: '1.1rem', fontWeight:'500'}}> Finance </Header>
                        <FaPencil style={{cursor:'pointer'}}/>
                    </div>
                    <div className="is-finance-content">
                        <div className="is-finance-information-container">
                            <div className="is-finance-budget-cover">
                                <Header style={{fontSize:'0.8', fontWeight:'400', color:'var(--color-pallete-white)'}}> Budget </Header>
                                <FaPencil style={{cursor:'pointer'}} onClick={handleFinanceFunction}/>
                            </div>
                            {userData?.finance ? 
                            (<Header style={{color:'var(--color-pallete-white)'}}>{userData.finance.financeBudget}</Header>) 
                            : 
                            (<Header style={{color:'var(--color-pallete-white)'}}>?</Header>)}
                        </div>
                        <div className="is-finance-transaction-container" style={{margin: '10px'}}>
                            <p> Last 5 Transaction... </p>
                            <div className="is-finance-transaction">
                                {lastTransaction ? lastTransaction.map(transaction => (
                                    <CustomTransactionCard transaction={transaction}/>
                                )) : <p> No transaction has been made... </p>}
                            </div>
                        </div>
                        <CustomButton onClick={() => navigate("/finance")}> Show all transaction </CustomButton>
                    </div>
                </div>
            </div>
            <div className="is-homepage-filler">
                <Header> ¯\_(ツ)_/¯ </Header>
            </div>
        </div>
    )
}

export default Homepage