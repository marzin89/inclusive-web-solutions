import { useRef } from 'react';
import { Link } from 'react-router-dom';
import navIcon from '../../../images/hamburgerikon/navIcon.png';

function MainNavGerman(props) {
    const navRef = useRef();

    function handleNavIconClick(e) {
        navRef.current.style.display = 'block';
        e.target.setAttribute('aria-expanded', true);
    }

    function handleCloseNav(e) {
        e.preventDefault();
        navRef.current.style.display = 'none';
        document.getElementById('nav-icon').setAttribute('aria-expanded', false);
    }

    return (
        <nav id={props.id} aria-label="Hauptmenü">
            {/* Hamburgerikon */}
            <input type="image" id="nav-icon" className="focus focus-invisible" 
                aria-haspopup="true" aria-label='Hauptmenü öffnen' aria-expanded="false" 
                    src={navIcon} alt="Hamburger-Icon"onClick={(e) => 
                        handleNavIconClick(e)}>
            </input> 
            {/* Huvudmeny */}      
            <ul ref={navRef}>
                <li className="deutsch">
                    <Link className="navlink focus focus-invisible 
                        regular-font-size" to={"/"} >Home</Link>
                </li>
                <li className="deutsch">
                    <Link className="navlink focus focus-invisible 
                        regular-font-size" to={"/about"} >Über uns</Link>
                </li>
                <li className="deutsch">
                    <Link className="navlink focus focus-invisible 
                        regular-font-size" to={"/contact"} >Kontakt</Link>
                </li>
                <li className="deutsch">
                    <Link className="navlink focus focus-invisible 
                        regular-font-size" to={"/services"} >Dienstleistungen</Link>
                </li>
                <li className="deutsch">
                    <Link className="navlink focus focus-invisible 
                        regular-font-size" to={"/blog"} >Blog</Link>
                </li>
                <li className="deutsch">
                    <Link className="navlink focus focus-invisible regular-font-size" 
                        to={"/accessibility"} >Barrierefreiheit</Link>
                </li>
                <li id="close-menu" className="deutsch">
                    <a id="close-menu-link" className="navlink focus focus-invisible 
                        regular-font-size" href="#" onClick={(e) => 
                            handleCloseNav(e)}>Schließen</a>
                </li>
            </ul>
        </nav>
    );
}

export default MainNavGerman;