import { OrderItems } from "./OrderItems"
import { useState } from "react"
export const OrderSummary = ({order})=>{
    const [view, setView] = useState(false);
    return(
        <>
        <div className="orderDiv">
            <div className="orderSubDiv">
                    <div className="montserrat">{order.deliveryMethod}</div>
                    <div className="montserrat">product ordered by {order.firstName + ' ' + order.lastName}</div>
                    
                    <div>
                        <div className="montserrat">contact</div>
                    <div > <a href={`tel:${order.phoneNumber}`}className="footerFlex"><ion-icon name="call-outline"></ion-icon>{order.phoneNumber}</a></div>
                        <div > <a href={`mailto:${order.email}`} className="footerFlex"><ion-icon name="mail-outline"></ion-icon>{order.email}</a></div>


                    </div>
                    <div className="orderProducts" >
                        <div className='orderFlex' onClick={()=>setView(!view)}>
                            <div className="montserrat">Products</div>
                            <div>{!view ? <span className="footerFlex">view products <ion-icon name="chevron-down-outline"></ion-icon></span>:  <span className="footerFlex">view less <ion-icon name="chevron-up-outline"></ion-icon></span> }</div>
                        </div>
                        {view &&
                        <>
                            <div >
                                    {
                                    order.items && order.items.map((item, index)=>(
                                        <OrderItems key={index} item={item} i={index + 1} />
                                    ))
                                    }
                            </div>

                            <div>Total: {order.total}</div>
                        </>
                        }


                        

                    </div>
                
            </div>

        </div>
        
        </>
    )
}