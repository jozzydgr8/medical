import { AuthConsumer } from '../Context/ContextAuth/AuthConsumer';
import{MyProduct} from '../Layout/MyProduct'
import { Navbar } from '../Layout/Navbar';
import { Admin } from "./Admin";
import {Carousel} from './Carousel'
import { Footer } from './Footer';
import { Header } from './Header';


export const Home = ()=>{
  const {user} = AuthConsumer();
    return(
        <section>
          <Navbar/>
          <Header/>
          <Carousel />
        
            <div>
              <div className='container-fluid'>
              {user && user.uid === process.env.REACT_APP_acceptedID?<Admin name={user.displayName}/>:<section><div><div className='montserrat'>shop with us</div> {user && user.displayName}</div></section>}
              
                <main>
                  <MyProduct/>
                </main>
                </div>
                <Footer/>
            </div>
        </section>
    )
}