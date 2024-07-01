import { AuthConsumer } from '../Context/ContextAuth/AuthConsumer';
import{MyProduct} from '../Layout/MyProduct'
import { Navbar } from '../Layout/Navbar';
import { Admin } from "./Admin";
import {Carousel} from './Carousel'
import { Footer } from './Footer';


export const Home = ()=>{
  const {user} = AuthConsumer();
    return(
        <>
          <Navbar/>
          <Carousel />
        
            <div>
              {user && user.uid === process.env.REACT_APP_acceptedID?<Admin name={user.displayName}/>:<section><div className='container-fluid'><span className='ubuntu'>shop with us</span>{user && user.displayName}</div></section>}
              
                <main>
                  <MyProduct/>
                </main>
                <Footer/>
            </div>
        </>
    )
}