import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import StaticSwedish from './static-swedish';
import { userActions } from '../../../store/slices/user-slice';

function ContactSwedish(props) {
    const dispatch = useDispatch();

    function logout(e) {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    useEffect(() => {
        document.title = 'Kontakt';
    });

    return (
        <main>
            <div className="row">
                {/* Länkstig */}
                <nav className="breadcrumbs" aria-label="Länkstig">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus 
                            focus-invisible regular-font-size" to={"/"}>Start</Link>/</li>
                        <li><Link className="active-breadcrumb focus focus-invisible 
                            regular-font-size" to={"/contact"}> Kontakt</Link></li>
                    </ul>
                </nav>
                {props.isSignedIn ? <p id="logout">
                    <Link className="focus focus-invisible regular-font-size" to={"/contact"} 
                        onClick={(e) => logout(e)}>Logga ut</Link></p> : null}
            </div>
            <StaticSwedish />
        </main>
    );
}

export default ContactSwedish;