import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react"

type TransactionProps = {
    transactionId?: number;
    transactionNumeral: number;
    transactionName: string;
    transactionDescription: string;
    transactionDate: Date;
    categoryId?: number;
    categoryName?: string;
}

type FinanceProps = {
    financeId: number;
    financeBudget: number;
    financeMonthlyBudget: number;
    doWarn: boolean
    transactionList?: TransactionProps[];
}

type UserInformationProps = {
    username?: string;
    email?: string;
    dateCreated?: Date;
}

type UserDataProps = {
    user?: UserInformationProps;
    finance?: FinanceProps;
}

type UserDataContextType = {
    userData: UserDataProps | null;
    setUserData: Dispatch<SetStateAction<UserDataProps | null>>;
}

type UserDataProviderProps = {
    children: ReactNode;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export default function UserDataProvider({children}: UserDataProviderProps) {
    const [userData, setUserData] = useState<UserDataProps | null>(null);

    return (
        <UserDataContext.Provider value={{userData, setUserData}}>
            {children}
        </UserDataContext.Provider>
    )
}

export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error('bruh');
    }
    return context;
}