import { Outlet } from "react-router-dom";


export const Root = ()=>{

    return(
    <section className="rootsection">
        <main>        
            <Outlet />
        </main>
    </section>
    )
}