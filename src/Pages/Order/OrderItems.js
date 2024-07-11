

export const OrderItems = ({item, i})=>{
    
    return(
        <div className="orderProduct">
            <div>product No: {i}</div>
            <div>product track Id: {item.productID}</div>
            <div>
                <img src={`${item.productImage}`} alt="item preview" />
            </div>
            <div>product: {item.prodductName}</div>
            <div>quantity: {item.quantity}</div>
            <div>price: {item.price}</div>
            <hr/>
        </div>
    )
}