import { Context } from "./ContextAuth";
import { useContext } from "react";


export const AuthConsumer = ()=>{
    const context = useContext(Context);
    if(!context){
        throw Error('Auth requires a consimer')
    }
    return context
}