import { Link } from 'react-router-dom';
import TestsGerman from './german/tests-german';
import TestsSwedish from './swedish/tests-swedish';
import SolutionsGerman from './german/solutions-german';
import SolutionsSwedish from './swedish/solutions-swedish';
import CoursesGerman from './german/courses-german';
import CoursesSwedish from './swedish/courses-swedish';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/slices/user-slice';
import { testActions } from '../../store/slices/test-slice';
import { solutionActions } from '../../store/slices/solution-slice';
import { courseActions } from '../../store/slices/solution-slice';

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
                {localStorage.getItem('language') == 'Deutsch' ?
                <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                            regular-font-size" to={"/"}>Home</Link>/</li>
                        <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                            to={"/services"}> Dienstleistungen</Link></li>
                    </ul>
                </nav>
                :
                <nav className="breadcrumbs" aria-label="Länkstig">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                            regular-font-size" to={"/"}>Start</Link>/</li>
                        <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                            to={"/services"}> Tjänster</Link></li>
                    </ul>
                </nav>
                }
                <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                    {display: 'none'}}><Link className="focus focus-invisible regular-font-size" 
                    to={"/services"} onClick={this.handleLogout}>Logga ut</Link></p>
            </div>
            {localStorage.getItem('language') == 'Deutsch' ?
            <section id="services">
                <h1 id="main" className="h1-font-size">Dienstleistungen</h1>
                <TestsGerman />
                <SolutionsGerman />
                <CoursesGerman />
            </section>
            :
            <section id="services">
                <h1 id="main" className="h1-font-size">Tjänster</h1>
                <TestsSwedish />
                <SolutionsSwedish />
                <CoursesSwedish />
            </section>
            }
        </main>
    );
}

export default ServicesSwedish;