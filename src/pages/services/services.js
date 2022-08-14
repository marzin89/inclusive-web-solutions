// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import TestsGerman from './german/tests-german';
import TestsSwedish from './swedish/tests-swedish';
import SolutionsGerman from './german/solutions-german';
import SolutionsSwedish from './swedish/solutions-swedish';
import CoursesGerman from './german/courses-german';
import CoursesSwedish from './swedish/courses-swedish';

// Tjänster
class Services extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState        = this.setState.bind(this);
        this.handleLogout    = this.handleLogout.bind(this);

        this.state = {
            signedIn: this.props.signedIn,
        }
    }

    // Rendrering
    render() {
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
        )
    }

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Tjänster');
        localStorage.setItem('pageGerman', 'Dienstleistungen');

        if (localStorage.getItem('language') == 'Deutsch') {
            document.title = 'Dienstleistungen';

        } else {
            document.title = 'Tjänster';
        }
    }
    
    // Utloggning
    handleLogout() {
        this.props.logout();
    }
}

// Exporterar komponenten
export default Services;