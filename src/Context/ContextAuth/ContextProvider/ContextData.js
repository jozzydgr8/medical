import { createContext, useReducer } from "react";

export const contextProvider = createContext();
const initialState={
    data:null,
    loading:false
}
const reducer = (state, action)=>{
    switch(action.type){
        case 'getData':
            return{
                ...state, data:action.payload, loading:false
            };
        case 'loading':
                return{
                    ...state, loading:action.payload
                };

        default: return state

    }
}

export const ContextData = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <contextProvider.Provider value={{...state, dispatch}}>
            {children}
        </contextProvider.Provider>
    )
}
