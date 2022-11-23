import { Link } from 'react-router-dom';
import StaticGerman from './german/static-german';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/slices/user-slice';

function About(props) {
    const dispatch = useDispatch();

    function logout() {
        dispatch(userActions.logout());
    }

    useEffect(() => {
        document.title = 'Über uns';
    });

    return (
        <main>
            <div className="row">
                {/* Länkstig */}
                <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb 
                            focus focus-invisible regular-font-size" to={"/"}>Home</Link>/</li>
                        <li><Link className="inactive-breadcrumb focus focus-invisible 
                            regular-font-size" to={"/about"}> Über uns</Link></li>
                    </ul>
                </nav>
                {props.isSignedIn ? <p id="logout">
                    <Link className="focus focus-invisible regular-font-size" to="/about"
                        onClick={() => logout()}>Logga ut</Link></p> : null}
            </div>
            <StaticGerman />
        </main>
    );
}

export default About;