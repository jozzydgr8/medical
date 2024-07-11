

export const OrderItems = ({item, i})=>{
    
    return(
        <div className="orderProduct">
            <div>product No: {i}</div>
            <div>product track Id: {item.productID}</div>
            <div>product: {item.prodductName}</div>
            <div>quantity: {item.quantity}</div>
            <div>price: {item.price}</div>
        </div>
    )
}