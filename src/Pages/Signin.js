import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../App";
import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer";
import { Link } from "react-router-dom";
import { Load } from "./Load";

export const Signin = ()=>{
    const [email, setEmail] = useState('');
    const [disable, setDisable] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const {dispatch} = AuthConsumer();

    const handleSignIn = (e)=>{
        setDisable(true)
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials)=>{
            const user = userCredentials.user;
            dispatch({type:'signUser', payload:user});
            setEmail('');
            setPassword('');
        }).catch(error=>{
            console.log(error)
            let err = error.message.split('Firebase:')
            setErrorMessage(err[1]);
            setDisable(false)
        })
    }
    return(
        <>
        
        {
            disable ? <Load />:

            <div>
            <form>
            <input type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
                <input placeholder="create password" value={password} onChange={e=>setPassword(e.target.value)} />
                <button onClick={handleSignIn} className="full-btn" disabled={disable}>submit</button>
                {errorMessage && <p>{errorMessage}</p>}
                <p><Link className="" to={'/commerce/signup'}> or signup?</Link></p>
            </form>
            
            </div>
        }
        </>

    )
}