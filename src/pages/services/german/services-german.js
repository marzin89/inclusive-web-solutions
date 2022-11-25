import { Link } from 'react-router-dom';
import TestsGerman from './german/tests-german';
import SolutionsGerman from './german/solutions-german';
import CoursesGerman from './german/courses-german';
import { useEffect } from 'react';
import { userActions } from '../../../store/slices/user-slice';
import { testActions } from '../../../store/slices/test-slice';
import { solutionActions } from '../../../store/slices/solution-slice';
import { courseActions } from '../../../store/slices/solution-slice';

function ServicesGerman() {
    useEffect(() => {
        document.title = 'Tjänster';
    });

    return (
        <main>
            <div className="row">
                {/* Länkstig */}
                <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb 
                            focus focus-invisible regular-font-size" to={"/"}>Home</Link>/</li>
                        <li><Link className="active-breadcrumb focus focus-invisible 
                            regular-font-size" to={"/services"}> Dienstleistungen</Link></li>
                    </ul>
                </nav>
            </div>
            <section id="services">
                <h1 id="main" className="h1-font-size">Dienstleistungen</h1>
                <TestsGerman />
                <SolutionsGerman />
                <CoursesGerman />
            </section>
        </main>
    );
}

export default ServicesGerman;