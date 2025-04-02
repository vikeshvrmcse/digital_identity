import { createContext, useState } from "react";

export const AppContext = createContext();
export const ContextProvider = ({ children }) => {
    const [val, setVal] = useState(false); 

    const toggleTheme = () => {
        setVal((prevTheme) => !prevTheme);
    };

    return (
        <AppContext.Provider value={{ val, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
};
