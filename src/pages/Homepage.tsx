import { useEffect, useState } from "react"
import { getAllFinance } from "../api/api";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import { FaPencil } from "react-icons/fa6";


type HomepageProps = {
    showModal: (visible: boolean, type: number, functionType: number) => void,
}

type financeDataProps = {
    finance_id: number;
    finance_budget: number;
    finance_monthly_budget: number;
    do_warn: boolean
}

const Homepage = ({showModal}: HomepageProps) => {
    const [financeData, setFinanceData] = useState<financeDataProps>()

    const getFinanceInfo = async () => {
        try {
            const response = await getAllFinance();
            if (response.data) {
                console.log(response.data);
                setFinanceData({
                    finance_id: response.data.financeId,
                    finance_budget: response.data.financeBudget,
                    finance_monthly_budget: response.data.financeMonthlyBudget,
                    do_warn: response.data.doWarn
                })
            } else {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getFinanceInfo();
    },[]); 

    const renderFinanceInformation = () => {
       
    }

    useEffect(() => {
        renderFinanceInformation();
    }, [financeData])

    const handleFinanceFunction = () => {
        if (financeData) {
            showModal(true, 4, 1);
        } else {
            showModal(true, 4, 0);
        }
    }
    
    return (
        <div className="is-homepage-container">
            <Header style={{backgroundColor:'var(--color-pallete-white)'}}> Manage Tracker </Header>
            <div className="is-homepage-cover">
                <div className="is-tracker-container">
                    <div className="is-tracker-title">
                        <Header style={{fontSize: '1.1rem', fontWeight:'500'}}> To-do List</Header>
                        <FaPencil />
                    </div>
                    <div className="is-todo-content">

                    </div>
                </div>
                <div className="is-tracker-container">
                    <div className="is-tracker-title">
                        <Header style={{fontSize: '1.1rem', fontWeight:'500'}}> Finance </Header>
                        <FaPencil onClick={handleFinanceFunction}/>
                    </div>
                    <div className="is-finance-content">
                        <div className="is-finance-information-container">
                            <Header style={{fontSize:'0.8', fontWeight:'400', color:'var(--color-pallete-white)'}}> Budget </Header>
                            {financeData ? 
                            (<Header style={{color:'var(--color-pallete-white)'}}>{financeData.finance_budget + "/" + financeData.finance_monthly_budget + " left"}</Header>) 
                            : 
                            (<Header style={{color:'var(--color-pallete-white)'}}>?</Header>)}
                        </div>
                        <div className="is-finance-transaction-container">
                            <p> Last 5 Transaction... </p>
                            <div className="is-finance-transaction">

                            </div>
                        </div>
                        <CustomButton> Show all transaction </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage