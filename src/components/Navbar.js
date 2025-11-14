import "./navbar.css"
import { useRouter } from 'next/navigation';
import logo from '../assets/logo.png'
import Image from 'next/image'

const Navbar = () => {
    const router = useRouter();

    const handleClickReviews = () => {
        router.push('/reviews')
    }

    const handleClickLogo = () => {
        router.push('/')
    }

    return(
        <div className="navbar">
            <Image className="img-logo" src={logo} alt="Logo" width={45} height={45} onClick={handleClickLogo}/>
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