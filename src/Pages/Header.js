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
        <section>
            <div className="container-fluid">
            <div className="headerFlex">
                <NavLink to='/medical' className="ubuntu">Medical shop</NavLink>
                <div className="headerIcon"> {user ? <ion-icon onClick={handleLogOut} name="log-out-outline"></ion-icon> : <NavLink to='signin'><ion-icon name="person-outline"></ion-icon></NavLink> }</div>
            </div>
            
            </div>
        </section>
    )
}
