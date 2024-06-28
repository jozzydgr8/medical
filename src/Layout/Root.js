import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Header } from "../Pages/Header";


export const Root = ()=>{

    return(
    <section className="rootsection">
        <Navbar/>
        <Header/>
        <main>        
            <Outlet />
        </main>
    </section>
    )
}