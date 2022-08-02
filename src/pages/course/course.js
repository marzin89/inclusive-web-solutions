// Imports
import React from 'react';
import CourseSwedish from './swedish/course-swedish';
import CourseGerman from './german/course-german';
import NavbarSwedish from './swedish/navbar-swedish';
import NavbarGerman from './german/navbar-german';
import { Link } from 'react-router-dom';

// Kurs
class Course extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.getName      = this.getName.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            courses: this.props.courses,
        }

        this.getName();
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
                            <li><Link className="inactive-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/services"}> Dienstleistungen</Link>/</li>
                            <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/course"}> {localStorage.getItem('name')}</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                                regular-font-size" to={"/"}>Start</Link>/</li>
                            <li><Link className="inactive-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/services"}> Tjänster</Link>/</li>
                            <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/course"}>{localStorage.getItem('name')}</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="focus focus-invisible regular-font-size" to={"/login"} 
                        onClick={this.handleLogout}>Logga ut</Link></p>
                </div> 
                <div id="subpage">
                    {localStorage.getItem('language') == 'Deutsch' ? <NavbarGerman /> :
                        <NavbarSwedish />}
                    <div id="subpage-right">
                        {localStorage.getItem('language') == 'Deutsch' ? 
                            <CourseGerman courses={this.state.courses} /> : 
                            <CourseSwedish courses={this.state.courses} />}
                    </div>
                </div>  
            </main>
        )
    }

    componentDidMount() {
        let title = localStorage.getItem('name');

        localStorage.setItem('pageSwedish', title);
        localStorage.setItem('pageGerman', title);
        document.title = title;
    }

    getName() {
        const id = localStorage.getItem('serviceId');

        this.props.courses.map((course) => {
            if (course.id == id) {
                localStorage.setItem('name', course.name);
            }
        })
    }

    // Utloggning
    handleLogout(e) {

        // Förhidrar att sidan laddas om
        e.preventDefault();

        this.props.logout();
    }
}

// Exporterar komponenten
export default Course;