import { Link } from 'react-router-dom';
import TestsSwedish from './swedish/tests-swedish';
import SolutionsSwedish from './swedish/solutions-swedish';
import CoursesSwedish from './swedish/courses-swedish';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../store/slices/user-slice';

function ServicesSwedish(props) {
    const dispatch = useDispatch();
    
    function logout(e) {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    useEffect(() => {
        document.title = 'Tjänster';
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
                            regular-font-size" to={"/services"}> Tjänster</Link></li>
                    </ul>
                </nav>
                {props.isSignedIn ? <p id="logout">
                    <Link className="focus focus-invisible regular-font-size" 
                        to={"/services"} onClick={(e) => logout(e)}>Logga ut</Link>
                            </p> : null}
            </div>
            <section id="services">
                <h1 id="main" className="h1-font-size">Tjänster</h1>
                <TestsSwedish />
                <SolutionsSwedish />
                <CoursesSwedish />
            </section>
        </main>
    );
}

export default ServicesSwedish;