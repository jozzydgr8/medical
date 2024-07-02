import { useState } from "react";

export const Shipping = ()=>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry]= useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [method, setMethod] = useState('');
    return(
        <section>
            <div className="container-fluid">
                <div className="montserrat">shipping address</div>
                <form>
                    <div>
                        <input placeholder="Enter your first name" onChange={(e)=>setFirstName(e.target.value)} required />
                    </div>
                    <div>
                        <input placeholder="Enter yout last name" onChange={(e)=>setLastName(e.target.value)} required />
                    </div>
                    <div>
                        <input placeholder="Enter your phone number" type="phone" onChange={(e)=>setPhoneNumber(e.target.value)} required />
                    </div>
                    <div>
                        <input placeholder="Enter address" onChange={(e)=>setAddress(e.target.value)} required />
                    </div>
                    <div>
                        <input placeholder="Country" onChange ={(e)=>setCountry(e.target.value)} required />
                    </div>
                    <div>
                        <input placeholder="State" onChange={(e)=>setState(e.target.value)} required />
                    </div>
                    <div>
                        <input placeholder="City" onChange={(e)=>setCity(e.target.value)} required />
                    </div>
                    <div>
                        <div className="montserrat">shipping method</div>
                        <div>
                        <input type="checkbox" /> <div>customer pick up</div>
                        </div>

                        <div>
                        <input name="pickUp" type="checkbox" /> <div> delivery within lagos</div>
                        </div>
                        
                        <div>
                        <input name="pickUp" type="checkbox" /> <div>delivery outside lagos</div>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    )
}