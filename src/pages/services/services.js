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
        this.getTests        = this.getTests.bind(this);
        this.getSolutions    = this.getSolutions.bind(this);
        this.getCourses      = this.getCourses.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);

        this.state = {
            signedIn:              this.props.signedIn,
            tests:                 [],
            solutions:             [],
            courses:               [],
            error:                 false,
            errorTestsSwedish:     '',
            errorTestsGerman:      '',
            errorSolutionsSwedish: '',
            errorSolutionsGerman:  '',
            errorCoursesSwedish:   '',
            errorCoursesGerman:    '',
        }

        this.getTests();
        this.getSolutions();
        this.getCourses();
    }

    // Rendrering
    render() {
        return (
            <main id="main">
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
                        to={"/login"} onClick={this.handleLogout}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ?
                <section id="services">
                    <h1 id="h1-services" className="h1-font-size">Dienstleistungen</h1>
                    <TestsGerman />
                    <SolutionsGerman />
                    <CoursesGerman />
                </section>
                :
                <section id="services">
                    <h1 id="h1-services" className="h1-font-size">Tjänster</h1>
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

    // Funktionen hämtar alla tester
    getTests() {

        // if (this.state.displayTests) {

            // GET-anrop till webbtjänsten om användaren har tryckt på Tester
            fetch('https://iws-rest-api.herokuapp.com/tests')

            // Konverterar svaret från JSON
            .then(response => response.json())

            // Skriver ut ett felmeddelande om inga tester hittades
            .then(data => {
                if (!data.length) {
                    this.setState({
                        error:             true,
                        errorTestsSwedish: 'Inga tester hittades.',
                        errorTestsGerman:  'Es wurden keine Tests gefunden.',
                    })
                
                // Lagrar testerna i state-arrayen
                } else {
                    this.setState({
                        error:             false,
                        tests:             data,
                    })
                }
            })

            // Skriver ut ett felmeddelande om ett serverfel har uppstått
            .catch(() => {
                this.setState({
                    error:             true,
                    errorTestsSwedish: 'Ett serverfel har uppstått. Det gick inte att hämta tester.' 
                                            + ' Försök igen lite senare.',
                    errorTestsGerman:  'Ein Serverfehler ist aufgetreten. Es konnten keine Tests abgerufen werden.'
                                            + ' Versuchen Sie es später erneut.',
                })
            })
        // }
    }

    // Funktionen hämtar alla anpassningar
    getSolutions() {

        // if (this.state.displaySolutions) {

            // GET-anrop till webbtjänsten om användaren har tryckt på Anpassningar
            fetch('https://iws-rest-api.herokuapp.com/solutions')

            // Konverterar svaret från JSON
            .then(response => response.json())

            // Skriver ut ett felmeddelande om inga anpassningar hittades
            .then(data => {
                if (!data.length) {
                    this.setState({
                        error:                 true,
                        errorSolutionsSwedish: 'Inga utvecklingspaket hittades.',
                        errorSolutionsGerman:  'Es wurden keine Development-pakete gefunden.',
                    })
                
                // Lagrar anpassningarna i state-arrayen
                } else {
                    this.setState({
                        error:                 false,
                        solutions:      data,
                    })
                }
            })

            // Skriver ut ett felmeddelande om ett serverfel har uppstått
            .catch(() => {
                this.setState({
                    error:                 true,
                    errorSolutionsSwedish: 'Ett serverfel har uppstått. Det gick inte att hämta utvecklingspaket.' 
                                                + ' Försök igen lite senare.',
                    errorSolutionsGerman:   'Ein Serverfehler ist aufgetreten. Es konnten keine Development-Pakete abgerufen werden.' 
                                                + ' Versuchen Sie es später erneut.'
                })
            })
        // }
    }

    // Funktionen hämtar alla utbildningar
    getCourses() {

        // if (this.state.displayCourses) {

            // GET-anrop till webbtjänsten om användaren har tryckt på Utbildningar
            fetch('https://iws-rest-api.herokuapp.com/courses')

            // Konverterar svaret från JSON
            .then(response => response.json())

            // Skriver ut ett felmeddelande om inga utbildningar hittades
            .then(data => {
                if (!data.length) {
                    this.setState({
                        error:               true,
                        errorCoursesSwedish: 'Inga utbildningar hittades.',
                        errorCoursesGerman:  'Es wurden keine Kurse gefunden.',
                    })
                
                // Lagrar utbildningarna i state-arrayen
                } else {
                    this.setState({
                        error:               false,
                        courses:             data,
                    })
                }
            })

            // Skriver ut ett felmeddelande om ett serverfel har uppstått
            .catch(err => {
                console.log(err);
                
                this.setState({
                    error:               true,
                    errorCoursesSwedish: 'Ett serverfel har uppstått. Det gick inte att hämta utbildningar.' 
                                            + ' Försök igen lite senare.',
                    errorCoursesGerman:  'Ein Serverfehler ist aufgetreten. Es konnten keine Kurse abgerufen werden.'
                                            + ' Versuchen Sie es später erneut.'
                })
            })
        // }
    }

    handleLinkClick(e) {
        if (e.target.id.indexOf('test') >= 0) {
            localStorage.setItem('serviceId', e.target.id.slice(4));
        
        } else if (e.target.id.indexOf('solution') >= 0) {
            localStorage.setItem('serviceId', e.target.id.slice(8));
        
        } else if (e.target.id.indexOf('course') >= 0) {
            localStorage.setItem('serviceId', e.target.id.slice(6));
        }
    }
    
    // Utloggning
    handleLogout(e) {
    
        // Förhidrar att sidan laddas om
        e.preventDefault();
    
        this.props.logout();
    }
}

// Exporterar komponenten
export default Services;