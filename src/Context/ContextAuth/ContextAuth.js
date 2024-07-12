import {  onAuthStateChanged } from "firebase/auth"
import { auth } from "../../App";
import { createContext, useEffect, useReducer } from "react";


export const Context = createContext();

const initialState = {
    user:null,
    loading:true
}
const reducer = (state, action)=>{
    switch(action.type){
        case'signUser':
            return{
                ...state, user:action.payload, loading:false
            };
        case 'loading':
            return{
                ...state, loading:action.payload
            }
        default:
            return state
    }
}

export const ContextAuth=({children})=>{
    const [state, dispatch] = useReducer(reducer,initialState )

    // console.log(state)
    return(
        <Context.Provider value={{...state, dispatch}}>
            {children}
        </Context.Provider>
    )
}