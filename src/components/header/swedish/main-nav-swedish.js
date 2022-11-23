import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import navIcon from '../../images/hamburgerikon/navIcon.png';

function MainNavSwedish(props) {
    const isSignedIn = useSelector((state) => state.user.isSignedIn);
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
        <nav id={props.id} aria-label='Huvudmeny'>
            {/* Hamburgerikon */}
            <input type="image" id="nav-icon" className="focus focus-invisible" 
                aria-haspopup="true" aria-label='Öppnar huvudmenyn' aria-expanded="false" 
                    src={navIcon} alt="Hamburgerikon" onClick={(e) => 
                        handleNavIconClick(e)}>
            </input> 
            {/* Huvudmeny */}      
            <ul ref={navRef}>
                <li className="svenska">
                    <Link className="navlink focus focus-invisible 
                        regular-font-size" to={"/"} >Start</Link>
                </li>
                <li className="svenska">
                    <Link className="navlink focus focus-invisible 
                        regular-font-size" to={"/about"} >Om oss</Link>
                </li>
                <li className="svenska">
                    <Link className="navlink focus focus-invisible 
                        regular-font-size" to={"/contact"} >Kontakt</Link>
                </li>
                <li className="svenska">
                    <Link className="navlink focus focus-invisible 
                        regular-font-size" to={"/services"} >Tjänster</Link>
                </li>
                <li className="svenska">
                    <Link className="navlink focus focus-invisible 
                        regular-font-size" to={"/blog"} >Blogg</Link>
                </li>
                <li className="svenska">
                    <Link className="navlink focus focus-invisible regular-font-size" 
                        to={"/accessibility"} >Om webbtillgänglighet</Link>
                </li>
                {isSignedIn ? 
                <li className="svenska">
                    <Link className="navlink focus focus-invisible regular-font-size" 
                        to={"/admin"}  href="#">Admin</Link>
                </li> : null}
                <li id="close-menu" className="svenska">
                    <a id="close-menu-link" className="navlink focus focus-invisible 
                        regular-font-size" href="#" onClick={(e) => handleCloseNav(e)}>
                            Stäng</a>
                </li>
            </ul>
        </nav>
    );
}

export default MainNavSwedish;