import React, { useState, useContext } from "react";

export const ContextUser = React.createContext();

export const UserIdProvider = ({ children }) => {

    const [ id, setId ] = useState('')

    return (
        <ContextUser.Provider value={({id, setId})}>
            {children}
        </ContextUser.Provider>
    )
}


export const useIdContext = () => {return useContext(ContextUser)};