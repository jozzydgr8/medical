import { AuthConsumer } from '../Context/ContextAuth/AuthConsumer';
import{MyProduct} from '../Layout/MyProduct'
import { Admin } from "./Admin";
import {Carousel} from './Carousel'


export const Home = ()=>{
  const {user} = AuthConsumer();
    return(
        <>
      
        <Carousel />
        
        <div>
          {user && user.uid === process.env.REACT_APP_acceptedID?<Admin name={user.displayName}/>:<section><div className='container-fluid'>shop with us{user && user.displayName}</div></section>}
           
            <main>
              <MyProduct/>
            </main>
        </div>
        </>
    )
}