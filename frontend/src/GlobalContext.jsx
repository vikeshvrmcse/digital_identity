import { createContext, useState } from "react";

// Create Context
export const AppContext = createContext();

// Create Provider Component
export const ContextProvider = ({ children }) => {
    const [val, setVal] = useState(false); // false = Light, true = Dark

    const toggleTheme = () => {
        setVal((prevTheme) => !prevTheme);
    };

    return (
        <AppContext.Provider value={{ val, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
};
