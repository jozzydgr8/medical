import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer";
import {NavLink} from "react-router-dom";
import { auth, setLocalStorageItem } from "../App";
import { signOut } from "firebase/auth";

export const Header = ()=>{
    const {dispatch, user} = AuthConsumer();

    //handlelogout
    const handleLogOut = ()=>{
        signOut(auth)
        .then(()=>{
            const emptyCart = [];
            setLocalStorageItem('cart',JSON.stringify(emptyCart))
            dispatch({type:'signUser', payload:null}); 
        })
    }
    return (
        <main>
            <div className="headerFlex">
                <NavLink to='/commerce' className="ubuntu">Medical shop</NavLink>
                <div className=""> {user ? <ion-icon className='outline-btn' onClick={handleLogOut} name="log-out-outline"></ion-icon> : <NavLink to='signin' className=""><ion-icon name="person-outline"></ion-icon></NavLink> }</div>
            </div>
            

        </main>
    )
}
