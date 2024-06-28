import { contextProvider } from "./ContextData";
import { useContext } from "react";


export const UseContextData = ()=>{
    const context = useContext(contextProvider);
    if(!context){
        throw Error('Auth requires a consimer')
    }
    return context
}