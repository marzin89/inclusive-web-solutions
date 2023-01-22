import { Link } from 'react-router-dom';
import StaticSwedish from './static-swedish';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../store/slices/user-slice';

function AccessibilitySwedish(props) {
    const dispatch = useDispatch();

    function logout(e) {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    useEffect(() => {
        document.title = 'Om webbtillgänglighet';
    });

    return (
        <main>
            <div className="row">
                {/* Länkstig */}
                <nav className="breadcrumbs" aria-label="Länkstig">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus 
                            focus-invisible regular-font-size" to={"/"}>Start</Link>/</li>
                        <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                            to={"/accessibility"}> Om webbtillgänglighet</Link></li>
                    </ul>
                </nav>
                {props.isSignedIn ? <p id="logout">
                    <Link className="focus focus-invisible regular-font-size" to={"/accessibility"} 
                        onClick={(e) => logout(e)}>Logga ut</Link></p> : null}
            </div>
            <StaticSwedish />
        </main>
    );
}

export default AccessibilitySwedish;