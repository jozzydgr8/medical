import { AuthConsumer } from '../Context/ContextAuth/AuthConsumer';
import{MyProduct} from '../Layout/MyProduct'
import { Admin } from "./Admin";
import {Carousel} from './Carousel'


export const Home = ()=>{
  const {user} = AuthConsumer();
    return(
        <>
      
        <Carousel />
        
        <div className="container-fluid" >
          {user && user.uid === process.env.REACT_APP_acceptedID?<Admin name={user.displayName}/>:<div style={{textAlign:'center'}}>shop with us</div>}
           
            <main>
              <MyProduct/>
            </main>
        </div>
        </>
    )
}