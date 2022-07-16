import React, { createContext, useContext, useState, useEffect } from "react";
type contextProps = {
    children: React.ReactNode;
};
type replyType = {
    id: number;
    message: string;
};
type localStorageType = {
    id: number;
    title: string;
    info: string;
    reply?: Array<replyType>;
};
type localStorageProps = {
    localStorageData: Array<localStorageType>;
    addLocalStorage: (title: string, info: string) => void;
    addReply: (id: number, message: string) => void;
};
const defaultValue = {
    localStorageData: [],
    addLocalStorage: (title: string, info: string) => {},
    addReply: (id: number, message: string) => {},
};

const getRandomId = () => {
    return Math.floor(Math.random() * (50000 - 1 + 1)) + 1;
};

const LocalStorageContext = createContext<localStorageProps>(defaultValue);
export const LocalStorageProvider: React.FC<contextProps> = ({ children }) => {
    const [localStorageData, setLocalStorageData] = useState<
        Array<localStorageType>
    >([]);
    useEffect(() => {
        if (localStorage.getItem("message_board") !== null) {
            setLocalStorageData(
                JSON.parse(localStorage.getItem("message_board") || "{}")
            );
        }
    }, []);
    useEffect(() => {
        if (localStorageData.length !== 0) {
            localStorage.setItem(
                "message_board",
                JSON.stringify(localStorageData)
            );
        }
    }, [localStorageData]);
    const addLocalStorage = (title: string, info: string) => {
        let data = {
            id: getRandomId(),
            title: title,
            info: info,
        };
        setLocalStorageData([data, ...localStorageData]);
    };
    const addReply = (id: number, message: string) => {
		let data ={
			id: getRandomId(),
			message: message
		}
		if(localStorageData.filter((item) => item.id === id)[0].reply === undefined)
			localStorageData.filter((item) => item.id === id)[0].reply = []
		localStorageData.filter((item) => item.id === id)[0].reply?.unshift(data)
        setLocalStorageData([...localStorageData]);
    };

    return (
        <>
            <LocalStorageContext.Provider
                value={{ localStorageData, addLocalStorage, addReply }}
            >
                {children}
            </LocalStorageContext.Provider>
        </>
    );
};

export const useLocalStorageContext = () => useContext(LocalStorageContext);
