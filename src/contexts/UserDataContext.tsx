import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react"

export type TransactionProps = {
    transactionId: number;
    transactionNumeral: number;
    transactionName: string;
    transactionDescription: string;
    transactionDate: Date;
    category: CategoryProps;
}

export type CategoryProps = {
    categoryId: number;
    categoryName?: string;
}

export type FinanceProps = {
    financeId: number;
    financeBudget: number;
    financeMonthlyBudget: number;
    doWarn: boolean
    transaction?: TransactionProps[];
}

type UserInformationProps = {
    username?: string;
    email?: string;
    dateCreated?: Date;
}

type UserDataProps = {
    user?: UserInformationProps;
    finance?: FinanceProps;
    category?: CategoryProps[];
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