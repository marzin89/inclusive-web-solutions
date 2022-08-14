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
    constructor() {
        super();

        // Binder this till funktionerna
        this.handleLogout = this.handleLogout.bind(this);

        const id = localStorage.getItem('serviceId');
        let courses = [];

        if (localStorage.getItem('language') == 'Deutsch') {
            courses = JSON.parse(localStorage.getItem('coursesGerman'));

        } else {
            courses = JSON.parse(localStorage.getItem('coursesSwedish'));
        }

        courses.map((course) => {
            if (course.id == id) {
                localStorage.setItem('name', course.name);
            }
        })
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
                        {display: 'none'}}><Link className="focus focus-invisible regular-font-size" 
                        to={"/course"} onClick={this.handleLogout}>Logga ut</Link></p>
                </div> 
                <div id="subpage">
                    {localStorage.getItem('language') == 'Deutsch' ? <NavbarGerman /> :
                        <NavbarSwedish />}
                    <div id="subpage-right">
                        {localStorage.getItem('language') == 'Deutsch' ? 
                            <CourseGerman /> : 
                            <CourseSwedish />}
                    </div>
                </div>  
            </main>
        )
    }

    componentDidMount() {
        // const id  = localStorage.getItem('serviceId');
        // let courses = [];
        let title = localStorage.getItem('name');

        /*
        if (localStorage.getItem('language') == 'Deutsch') {
            courses = JSON.parse(localStorage.getItem('coursesGerman'));

        } else {
            courses = JSON.parse(localStorage.getItem('coursesSwedish'));
        }

        courses.map((course) => {
            if (course.id == id) {
                localStorage.setItem('name', course.name);
                title = course.name;
            }
        })
        */

        localStorage.setItem('pageSwedish', title);
        localStorage.setItem('pageGerman', title);
        document.title = title;
    }

    // Utloggning
    handleLogout() {
        this.props.logout();
    }
}

// Exporterar komponenten
export default Course;