import { useState, useEffect } from "react";
import { UseContextData } from "../Context/ContextAuth/ContextProvider/UseContextData";
import { Link } from "react-router-dom";
import { cartRef, setLocalStorageItem } from "../App";
import { Steps } from "antd";
import { Load } from "../Pages/Load";
import { PaystackButton } from "react-paystack";
import { addDoc } from "firebase/firestore";

export const Cart = () => {
    const [cart, setCart] = useState([]);
    const [cartValue, setCartValue] = useState('');
    const [showBtn, setShowBtn] = useState(false);
    const [shipValue, setShipValue] = useState(null);
    const [shipFee, setShipFee] = useState(0)
    const [disable, setDisable] = useState(false);
    const [current, setCurrent] = useState(0)
    const { data } = UseContextData();
    const [amounts, setAmounts] = useState({});
    const [carts, setCarts] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry]= useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [method, setMethod] = useState('');
    const [email,setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const publicKey = "pk_test_0e745897d2bb51a12c4fca668a094dcecd425aea"


    useEffect(() => {
        const updateDelete = ()=>{
            const carts = JSON.parse(localStorage.getItem('cart'));
            if(!carts){
                return
            }
            if(!data){
                return
            }
            const renderCart = data.filter(data => carts.includes(data.id));
            setCart(renderCart);
            console.log(renderCart);
        
            // Initialize amounts for each item in the cart
            const initialAmounts = renderCart.reduce((acc, item) => {
                acc[item.id] = 1; // Assuming initial amount is 1 for each item
                return acc;
            }, {});
            setAmounts(initialAmounts);
            setCarts(carts)
        }

        //initial load
        updateDelete();

        const handleStorage = ()=>{
            updateDelete()
        }

        window.addEventListener('storageUpdate', handleStorage);

       


    
        return () => {
            window.removeEventListener('storageUpdate', handleStorage)
        };
    }, []);


    if (cart.length === 0) {
        return(
         <section>
            
            <div className="container-fluid">
                    <Link className="headerIcon" to='/medical'><ion-icon name="return-down-back-outline"></ion-icon></Link >
                    <div>add products to cart to view carts</div>
                 <div><Link to={'/medical'} className="outline-btn">continue to shop</Link></div>
            </div>
        </section>
        )
    }

    // remove item
    const removeItem = (id)=>{
        if(!carts){
            return
        }
        const updatedCart = carts.filter(item => item !== id);
        setLocalStorageItem('cart', JSON.stringify(updatedCart))
    }

    const reduce = cart.map(cart => (
        parseFloat(cart.prize) * amounts[cart.id]
    )).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const increaseAmount = (id) => {
        setAmounts(prev => ({ ...prev, [id]: prev[id] + 1 }));
    };

    const decreaseAmount = (id) => {
        setAmounts(prev => ({ ...prev, [id]: Math.max(prev[id] - 1, 1) }));
    };

    const totalFee = parseFloat(reduce + shipFee);


    //on carrt checkout
    const onSubmitCart = ()=>{
        // console.log(current)
        setCurrent(1)
    }

    //on ship checkout
    const onSubmitShip = (e)=>{
        e.preventDefault();
        if(method == ''){
            alert('pick a shipping method')
            return
        }
        setShowBtn(true);
        console.log(current)
    }


    const createSummary = ()=>{
        return{
            email,
            firstName,
            lastName,
            address,
            deliveryMethod: method,
            date: new Date().toISOString(),
            phoneNumber,
            total:totalFee,
            items: cart.map(item=>({
                productID: item.id,
                prodductName:item.product,
                quantity:amounts[item.id],
                price:item.prize
            }))
        }
    }
    const componentProp={
        email,
        amount:totalFee * 100,
        metaData:{
            firstName,
            phoneNumber
        },
        publicKey,
        text:`checkout ${totalFee}`,
        onSuccess:()=>{alert('succesful')
            const summary = createSummary()
            try{
                addDoc(cartRef,summary)
            }catch(error){
                console.error(error)
            }
        },
        onClose:()=>{alert('closing')}
    }

    

    const displayForms =[
        <ProductCart cart={cart} setCart={setCart} amounts={amounts} setAmounts={setAmounts} removeItem={removeItem} onSubmit={onSubmitCart}
                    
                     increaseAmount={increaseAmount} decreaseAmount={decreaseAmount} reduce={reduce}  />,
        <Shipping totalFee={totalFee} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName}
                  onSubmit={onSubmitShip} PaystackButton={PaystackButton} componentProp={componentProp}
                  shipFee={shipFee} setShipFee={setShipFee} reduce={reduce} showBtn={showBtn}
                  phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} address={address} setAddress={setAddress}
                  country={country} setCountry={setCountry} state={state} setState={setState} city={city} setCity={setCity}
                  method={method} setMethod={setMethod} email={email} setEmail={setEmail} isChecked2={isChecked2} setIsChecked2={setIsChecked2} 
                  isChecked1={isChecked1} setIsChecked1={setIsChecked1} isChecked={isChecked} setIsChecked={setIsChecked}
        />,

        <Order/>
    ]

    // const isStepDisable = (stepNumber)=>{
    //     if(stepNumber === 0){
    //         return false
    //     }
    //     if(stepNumber === 1){
    //         return shipValue === null
    //     }
    // }
return(
    <section>
    <div className='container-fluid'>
        {
            disable ? <Load />:
        <>
        
         <Steps onChange={setCurrent} current={current}>
            <Steps.Step  title='cart' icon={<ion-icon name="cart-outline"></ion-icon>} />
            <Steps.Step  title='shipping' icon={<ion-icon name="bicycle-outline"></ion-icon>} />
            <Steps.Step  title='congratulations' icon={<ion-icon name="bag-check-outline"></ion-icon>} />
        </Steps>
        
            {displayForms[current]}

        </>
        }

        
    </div>
</section>
)}









const ProductCart = ({cart, amounts, removeItem,
    increaseAmount, decreaseAmount, reduce, onSubmit})=>{
        return(
            <section>
            <div className="summary container-fluid">
            <Link className="headerIcon" to='/medical'><ion-icon name="return-down-back-outline"></ion-icon></Link >
                <div><span>cart summary</span></div>
                
                    <div className="subtotal">
                        subtotal: $ {reduce}
                        <div>Delivery fees not included yet</div>
                    </div>
   
                {cart.map(cart => (
                    <div key={cart.id} className="cartDiv">
                        <div className="cartSubDiv row">
                            <div className="cartImgDiv col-md-6">
                                <img src={`${cart.productImage}`} alt={cart.product} />
                            </div>
                            <div className="cartDetail col-md-6">
                                <div>{cart.product}</div>
                                <div>{amounts[cart.id]}</div>
                                <div>
                                    <button className="full-btn" onClick={() => increaseAmount(cart.id)} style={{fontSize:'18px'}}>+</button>
                                </div>
                                <div>
                                <button className="outline-btn" onClick={() => decreaseAmount(cart.id)} style={{fontSize:'18px'}}>-</button>
                                </div>
                                <div>
                                    <button onClick={()=>removeItem(cart.id)} className="outline-btn">remove item</button>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                
                    <button onClick={onSubmit}  style={{width:'100%'}} className="full-btn">checkout {`$ ${reduce}`}</button>
                    <Link to={'/medical'} className="outline-btn">continue to shop</Link> 
            </div>
        </section>
        )
    }









 const Shipping = ({firstName, onSubmit, setFirstName, lastName, setLastName,isChecked, setIsChecked,
    setShipFee,
    isChecked2, setIsChecked2, setIsChecked1, isChecked1,
    phoneNumber, setPhoneNumber, address, setAddress, showBtn,
    country, setCountry, state, setState, city, setCity,totalFee,
    setMethod, email, setEmail, componentProp})=>{

    return(
        <section>
            <div className="container-fluid">
            <Link className="headerIcon" to='/medical'><ion-icon name="return-down-back-outline"></ion-icon></Link >
                <div className="montserrat">shipping address</div>
                <form   onSubmit={onSubmit}  >
                    <div>
                        <input value={firstName} placeholder="Enter your first name" onChange={(e)=>setFirstName(e.target.value)} required />
                    </div>
                    <div>
                        <input value={lastName} placeholder="Enter yout last name" onChange={(e)=>setLastName(e.target.value)} required />
                    </div>
                    <div>
                        <input value={phoneNumber} placeholder="Enter your phone number" type="phone" onChange={(e)=>setPhoneNumber(e.target.value)} required />
                    </div>
                    <div>
                        <input value={address} placeholder="Enter address" onChange={(e)=>setAddress(e.target.value)} required />
                    </div>
                    <div>
                        <input value={country} placeholder="Country" onChange ={(e)=>setCountry(e.target.value)} required />
                    </div>
                    <div>
                        <input value={state} placeholder="State" onChange={(e)=>setState(e.target.value)} required />
                    </div>
                    <div>
                        <input value={city} placeholder="City" onChange={(e)=>setCity(e.target.value)} required />
                    </div>
                    <div>
                        <input value={email} placeholder="email" type="email" onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <div>
                        <div className="montserrat">shipping method</div>
                        <div>
                        <input type="checkbox" checked={isChecked} onChange={(e)=>{
                            setIsChecked(true);
                            setIsChecked2(false);
                            setIsChecked1(false);
                            setMethod('customer pickup');
                            setShipFee(parseFloat(0))
                        }} /> <div>customer pick up <span>free</span></div>
                        </div>

                        <div>
                        <input name="pickUp" type="checkbox"
                        checked={isChecked2} onChange={(e)=>{
                            if(e.target.checked){
                                setIsChecked(false);
                                setIsChecked2(true);
                                setIsChecked1(false);
                                setShipFee(parseFloat(50))
                                setMethod('delivery within lagos');
                            }

                        }}
                         /> <div> delivery within lagos <span>$50</span></div>
                        </div>
                        
                        <div>
                        <input name="pickUp" type="checkbox"
                        checked={isChecked1} onChange={(e)=>{
                            if(e.target.checked){
                                setIsChecked(false);
                                setIsChecked2(false);
                                setIsChecked1(true);
                                setMethod('delivery outside lagos');
                                setShipFee(parseFloat(200))
                            }

                        }}
                         /> <div>delivery outside lagos <span>$200</span></div>
                        </div>
                    </div>


                        <div>Total Price: ${totalFee}</div>
                        {showBtn?<PaystackButton style={{width:'100%'}} className="full-btn" {...componentProp}/>:
                        <div>
                            <button style={{width:'100%'}} className="full-btn">checkout {`$ ${totalFee}`}</button>
                            <Link to={'/medical'} className="outline-btn">continue to shop</Link> 
                        </div>
                        
                        }
                    
                </form>
            
                
            </div>
        </section>
    )
}






const Order = ({})=>{
    return(
        <>
            congratulations
        </>
    )
}
   