import "./navbar.css"
import { useRouter } from 'next/navigation';


const Navbar = () => {
    const router = useRouter();


    const handleClickReviews = () => {
        router.push('/reviews')
    }

    return(
        <div className="navbar">
            <h4>Logo</h4>
            <div className="container-botones">
                <div className="container-boton"> 
                    <button onClick={handleClickReviews} className="button-navegar">
                    Mis reviews
                    </button>
                </div>
                <div className="container-boton">
                    <button className="button-navegar">
                    Mis blogs
                    </button>    
                </div>
                <div>Buscador</div>
            </div>
        </div>
    )
}
export default Navbar;