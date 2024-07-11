import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react"
import { auth, userRef } from "../App";
import { addDoc } from "firebase/firestore";
import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer";
import { Link } from "react-router-dom";
import { Load } from "./Load";
import { Navbar } from "../Layout/Navbar";
import { Header } from "./Header";
import { message, Input } from "antd";


export const Signup = ()=>{
    const {dispatch} = AuthConsumer();
    const [email, setEmail] = useState('');
    const [disable, setDisable] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [password, setPassword] = useState('');
    const [businessName, setBusinessName] = useState('')
    const handleSignUp= (e)=>{
        setDisable(true);
        e.preventDefault();
        createUserWithEmailAndPassword(auth, 
            email,
            password).then((userCredentials)=>{
                const user = userCredentials.user;
                dispatch({type:'signUser', payload:user});
                sendEmailVerification(user)
                .then(()=>{
                    updateProfile(user, {
                        displayName: businessName
                    })
                    .then(()=>{
                        addDoc(userRef, {
                            businessName:businessName,
                            userId:user.uid
                        }).then(()=>{
                            setEmail('');
                            setPassword('');
                            setBusinessName('');
                            setDisable(false)
                        }).catch(error=>{console.log(error)})

                    }).catch(error=>console.log(error))
                    

                }).catch(error=>console.log(error))
                

        }).catch(error=>{
        console.log(error);
        let err = error.message.split('Firebase:');
        setTimeout(()=>{
            message.error('error creating account')
        }, 2000)
        setErrorMessage(err[1]);
        setDisable(false)
        
        });
        
    }
    return(
        <section>
            <Navbar/>
            <Header/>
        {
            disable ? <Load/>:
            <div className="container-fluid">
                <form>
                    <input placeholder="name" value={businessName} onChange={e=>setBusinessName(e.target.value)}/>
                    <input type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
                    <Input.Password placeholder="create password" value={password} onChange={e=>setPassword(e.target.value)} />
                    <button onClick={handleSignUp} className="full-btn" disabled={disable}>submit</button>
                    {errorMessage && <p>{errorMessage}</p>}
                    <p> if you already have an account  <Link to={'/medical/signin'}>sign in</Link> </p>
                </form>
            
            </div>
        }
        </section>

    )
}