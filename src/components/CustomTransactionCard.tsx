import { NumericFormat } from "react-number-format";
import Header from "./Header";
import dayjs from "dayjs";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { TransactionProps } from "../contexts/UserDataContext";

type TransactionCardProps = {
    transaction: TransactionProps;
    type?: number;
    onRemoveItem?: (value: number) => void;
    isRemoveActive?: boolean;
    onClick?: () => void;
    categoryColor?: string;
}

export default function CustomTransactionCard({transaction, type = 0, onRemoveItem, isRemoveActive, onClick, categoryColor}:TransactionCardProps) {
    const [checked, setChecked] = useState(false);
    const handleAddRemoveTrans = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        if (onRemoveItem) {
            onRemoveItem(Number(e.target.value));
        }
    }

    const handleOnClick = () => {
        switch(type) {
            case 0:
                if (onClick) {
                    onClick();
                }
                break;
        }
    }

  return (
    <div className={`is-transaction-card-container-container${isRemoveActive ? ' active' : ''}`}>
        <Checkbox className={`is-transaction-checkbox${isRemoveActive ? ' active': ''}`} checked={checked} onChange={handleAddRemoveTrans} value={transaction.transactionId}/>
        <div className="is-transaction-card-container" onClick={handleOnClick} style={{backgroundColor: `${categoryColor}`}}>
            <div className="is-transaction-card">
                <Header style={{fontSize: '.8em', textAlign:'start', width: '100%'}}> {transaction.transactionName} </Header>
                <NumericFormat
                    value={transaction.transactionNumeral} 
                    thousandSeparator='.'
                    decimalSeparator=','
                    readOnly={true}
                    style={{border:'0', background:'transparent', textAlign:'end'}}
                    prefix="IDR "
                />
            </div>
            <div className="is-transaction-card">
                <p style={{width:'100%'}}> {transaction.transactionDescription} </p>
                <p style={{width:'100%'}}> {dayjs(transaction.transactionDate).format('YYYY-MM-DD HH:mm:ss').toString()} </p>
            </div>
        </div>
    </div>
  )
}
