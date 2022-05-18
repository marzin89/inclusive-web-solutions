// Imports
import React from 'react';
import { Link } from 'react-router-dom';

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
        this.handlePageTitle = this.handlePageTitle.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);

        this.state = {
            signedIn:              this.props.signedIn,
            tests:                 [],
            solutions:             [],
            courses:               [],
            error:                 false,
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
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/"}
                                onClick={this.handleLinkClick}>Home</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/services"}
                                onClick={this.handleLinkClick}> Dienstleistungen</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/"}
                                onClick={this.handleLinkClick}>Start</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/services"}
                                onClick={this.handleLinkClick}> Tjänster</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="text focus regular-font-size" to={"/login"} 
                        onClick={this.handleLinkClick}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ?
                <section id="services">
                    <h1 id="h1-services" className="text h1-font-size">Dienstleistungen</h1>
                    <section id="tests">
                        <h2 className="text h2-font-size">Tests</h2>
                        <div className="row-services">
                        {this.state.tests.length ? this.state.tests.map((test) => {
                            if (test.language == 'german') {
                                return (
                                    <article key={test.id} className="test">
                                        <h3 className="text h3-font-size">{test.name}</h3>
                                        <p className="text regular-font-size">{test.description[0]}</p>
                                        {test.imageUrl ? <img className="service-image" src={test.imageUrl} 
                                        alt={test.altText}></img> : null}
                                        <p><Link id={`test${test.id}`} className="text focus find-out-more regular-font-size"
                                            to={"/test"} onClick={this.handleLinkClick}>Mehr</Link></p>
                                    </article>
                                )
                            }
                        }) : <p className="error text regular-font-size" role="alert" style={localStorage.getItem('errorTestsGerman') ?
                            {display: 'block'} : {display: 'none'}}>{localStorage.getItem('errorTestsGerman')}</p> }
                        </div>
                    </section>
                    <section id="solutions">
                        <h2 className="text h2-font-size">Development</h2>
                        <div className="row-services">
                        {this.state.solutions.length ? this.state.solutions.map((solution) => {
                            if (solution.language == 'german') {
                                return (
                                    <article key={solution.id} className="solution">
                                        <h3 className="text h3-font-size">{solution.name}</h3>
                                        <p className="text regular-font-size">{solution.description[0]}</p>
                                        {solution.imageUrl ? <img className="service-image" src={solution.imageUrl} 
                                        alt={solution.altText}></img> : null}
                                        <p><Link id={`solution${solution.id}`} className="text focus find-out-more regular-font-size"
                                            to={"/solution"} onClick={this.handleLinkClick}>Mehr</Link></p>
                                    </article>
                                )
                            }
                        }) : <p className="error text regular-font-size" role="alert" 
                            style={localStorage.getItem('errorSolutionsGerman') ?
                            {display: 'block'} : {display: 'none'}}>{localStorage.getItem('errorSolutionsGerman')}</p> }
                        </div>
                    </section>
                    <section id="courses">
                        <h2 className="text h2-font-size">Kurse</h2>
                        <div className="row-services">
                        {this.state.courses.length ? this.state.courses.map((course) => {
                            if (course.language == 'german') {
                                return (
                                    <article key={course.id} className="course">
                                        <h3 className="text h3-font-size">{course.name}</h3>
                                        <p className="text regular-font-size">{course.description[0]}</p>
                                        {course.imageUrl ? <img className="service-image" src={course.imageUrl} 
                                        alt={course.altText}></img> : null}
                                        <p><Link id={`course${course.id}`} className="text focus find-out-more regular-font-size"
                                            to={"/course"} onClick={this.handleLinkClick}>Mehr</Link></p>
                                    </article>
                                )
                            }
                        }) : <p className="error text regular-font-size" role="alert" 
                            style={localStorage.getItem('errorCoursesGerman') ?
                            {display: 'block'} : {display: 'none'}}>{localStorage.getItem('errorCoursesGerman')}</p> }
                        </div>
                    </section>
                </section>
                :
                <section id="services">
                    <h1 id="h1-services" className="text h1-font-size">Tjänster</h1>
                    <section>
                        <h2 className="text h2-font-size">Tester</h2>
                        <div className="row-services">
                        {this.state.tests.length ? this.state.tests.map((test) => {
                            if (test.language == 'swedish') {
                                return (
                                    <article key={test.id} className="test">
                                        <h3 className="text h3-font-size">{test.name}</h3>
                                        <p className="text regular-font-size">{test.description[0]}</p>
                                        {test.imageUrl ? <img src={test.imageUrl} alt={test.altText}>
                                        </img> : null}
                                        <p><Link id={`test${test.id}`} className="text focus find-out-more regular-font-size"
                                            to={"/test"} onClick={this.handleLinkClick}>Läs mer</Link></p>
                                    </article>
                                )
                            }
                        }) : <p className="error text regular-font-size" role="alert" 
                            style={localStorage.getItem('errorTestsSwedish') ?
                            {display: 'block'} : {display: 'none'}}>{localStorage.getItem('errorTestsSwedish')}</p> }
                        </div>
                    </section>
                    <section>
                        <h2 className="text h2-font-size">Utveckling</h2>
                        <div className="row-services">
                        {this.state.solutions.length ? this.state.solutions.map((solution) => {
                            if (solution.language == 'swedish') {
                                return (
                                    <article key={solution.id} className="solution">
                                        <h3 className="text h3-font-size">{solution.name}</h3>
                                        <p className="text regular-font-size">{solution.description[0]}</p>
                                        {solution.imageUrl ? <img src={solution.imageUrl} alt={solution.altText}>
                                        </img> : null}
                                        <p><Link id={`solution${solution.id}`} className="text focus find-out-more regular-font-size"
                                            to={"/solution"} onClick={this.handleLinkClick}>Läs mer</Link></p>
                                    </article>
                                )
                            }
                        }) : <p className="error text regular-font-size" role="alert" 
                            style={localStorage.getItem('errorSolutionsSwedish') ?
                            {display: 'block'} : {display: 'none'}}>{localStorage.getItem('errorSolutionsSwedish')}</p> }
                        </div>
                    </section>
                    <section>
                        <h2 className="text h2-font-size">Utbildning</h2>
                        <div className="row-services">
                        {this.state.courses.length ? this.state.courses.map((course) => {
                            if (course.language == 'swedish') {
                                return (
                                    <article key={course.id} className="course">
                                        <h3 className="text h3-font-size">{course.name}</h3>
                                        <p className="text regular-font-size">{course.description[0]}</p>
                                        {course.imageUrl ? <img src={course.imageUrl} alt={course.altText}>
                                        </img> : null}
                                        <p><Link id={`course${course.id}`} className="text focus find-out-more regular-font-size"
                                            to={"/course"} onClick={this.handleLinkClick}>Läs mer</Link></p>
                                    </article>
                                )
                            }
                        }) : <p className="error text regular-font-size" role="alert" 
                            style={localStorage.getItem('errorCoursesSwedish') ?
                            {display: 'block'} : {display: 'none'}}>{localStorage.getItem('errorCoursesSwedish')}</p> }
                        </div>
                    </section>
                </section>
                }
            </main>
        )
    }

    componentDidMount() {
        if (localStorage.getItem('language') == 'Deutsch') {
            document.title = 'Dienstleistungen';

        } else {
            document.title = 'Tjänster';
        }

        if (localStorage.getItem('accessibility-error')) {
            const text = document.getElementsByClassName('text');

            switch(localStorage.getItem('accessibility-error')) {
                case 'contrast':
                    for (let i = 0; i < text.length; i++) {
                        text[i].style.opacity = 0.1;
                    }
                break;
                
                /*
                case 'responsiveness':
                    const meta = document.getElementsByName('viewport');
                    meta[0].remove();
                break;
                */
    
                case 'tab-focus':
                    const focus = document.getElementsByClassName('focus');
    
                    for (let i = 0; i < document.getElementsByClassName('focus').length; i++) {
                        console.log('foo');
                        focus[i].className = focus[i].className.replace('focus', 'focus-invisible');
                    }
                break;
    
                case 'font-size':
                    for (let i = 0; i < text.length; i++) {
                        if (text[i].className.indexOf('h1-font-size') >= 0) {
                            text[i].style.fontSize = '19px';
                        
                        } else if (text[i].className.indexOf('h2-font-size') >= 0) {
                            text[i].style.fontSize = '15px';
                        
                        } else if (text[i].className.indexOf('h3-font-size') >= 0) {
                            text[i].style.fontSize = '12px';
    
                        } else if (text[i].className.indexOf('regular-font-size')) {
                            text[i].style.fontSize   = '8px';
                            text[i].style.lineHeight = '8px'
                        
                        } else if (text[i].className.indexOf('small-font-size')) {
                            text[i].style.fontSize = '8px';
                        }
                    }
                break;
            }
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

                    })

                    localStorage.setItem('errorTestsSwedish', 'Inga tester hittades.');
                    localStorage.setItem('errorTestsGerman', 'Es wurden keine Tests gefunden.');
                
                // Lagrar testerna i state-arrayen
                } else {
                    localStorage.removeItem('errorTestsSwedish');
                    localStorage.removeItem('errorTestsGerman');

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
                })

                localStorage.setItem('errorTestsSwedish', 'Ett serverfel har uppstått. Det gick inte att hämta tester.' 
                    + 'Försök igen lite senare.');
                localStorage.setItem('errorTestsGerman', 'Ein Serverfehler ist aufgetreten. Es konnten keine Tests abgerufen werden. '
                    + 'Versuchen Sie es später erneut.');
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
                    })

                    localStorage.setItem('errorSolutionsSwedish', 'Inga utvecklingspaket hittades.');
                    localStorage.setItem('errorSolutionsGerman', 'Es wurden keine Development-pakete gefunden.');
                
                // Lagrar anpassningarna i state-arrayen
                } else {
                    localStorage.removeItem('errorSolutionsSwedish');
                    localStorage.removeItem('errorSolutionsGerman');

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
                })

                localStorage.setItem('errorSolutionsSwedish', 'Ett serverfel har uppstått. Det gick inte att hämta utvecklingspaket.' 
                    + 'Försök igen lite senare.');
                localStorage.setItem('errorSolutionsGerman', 'Ein Serverfehler ist aufgetreten. ' +
                    'Es konnten keine Development-Pakete abgerufen werden. Versuchen Sie es später erneut.');
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
                    })

                    localStorage.setItem('errorCoursesSwedish', 'Inga utbildningar hittades.');
                    localStorage.setItem('errorCoursesGerman', 'Es wurden keine Kurse gefunden.');
                
                // Lagrar utbildningarna i state-arrayen
                } else {
                    localStorage.removeItem('errorCoursesSwedish');
                    localStorage.removeItem('errorCoursesGerman');

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
                })

                localStorage.setItem('errorCoursesSwedish', 'Ett serverfel har uppstått. Det gick inte att hämta utbildningar.' 
                    + 'Försök igen lite senare.');
                localStorage.setItem('errorCoursesGerman', 'Ein Serverfehler ist aufgetreten. Es konnten keine Kurse abgerufen werden. '
                    + 'Versuchen Sie es später erneut.');
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

        console.log(localStorage.getItem('serviceId'));

        if (e.target.innerHTML == 'Logga ut') {
            this.handleLogout(e);

        } else {
            this.handlePageTitle(e);
        }
    }
    
    // Utloggning
    handleLogout(e) {
    
        // Förhidrar att sidan laddas om
        e.preventDefault();
    
        this.props.logout();
    }

    handlePageTitle(e) {
        if (e.target.id == 'logo') {
            if (localStorage.getItem('language') == 'Deutsch') {
                localStorage.setItem('page', 'Home');
                document.title = 'Home';
            
            } else {
                localStorage.setItem('page', 'Start');
                document.title = 'Start';
            }

        } else {
            localStorage.setItem('page', e.target.innerHTML);
            document.title = e.target.innerHTML;
        }
    }
}

// Exporterar komponenten
export default Services;