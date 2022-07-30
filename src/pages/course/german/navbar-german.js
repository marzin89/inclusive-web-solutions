// Imports
import React from 'react';
import { Link } from 'react-router-dom';

class NavbarGerman extends React.Component {
    // Konstruktor
    constructor() {
        super();

        // Binder this till funktionerna
        this.renderNavbar    = this.renderNavbar.bind(this);
        this.getCourse       = this.getCourse.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    render() {
        return (
            this.renderNavbar()
        )
    }

    renderNavbar() {
        let courses = localStorage.getItem('courses');
        courses     = JSON.parse(courses);

        let links = [];

        courses.map((course) => {
            if (course.id == localStorage.getItem('serviceId')) {
                links.push(<li id="open-subpage"><Link id={`course${course.id}`} 
                    className="focus regular-font-size subnav-link open-subpage-link" 
                    to={'/course'} onClick={this.handleLinkClick}>{course.name}</Link></li>);

            } else {
                if (course.language == 'german') {
                    links.push(<li><Link id={`course${course.id}`} className="focus regular-font-size subnav-link" 
                    to={'/course'} onClick={this.handleLinkClick}>{course.name}</Link></li>);
                
                }
            }
        })

        let navbar =
            <nav id="subnav" aria-label="Unternavigation mit Vorlesungen">
                <ul>
                    <li id="subnav-first-item"><Link className="focus regular-font-size" 
                        to={'/services'}>Dienstleistungen</Link></li>
                    {links}
                </ul>
            </nav>

        return navbar;
    }

    // Funktionen hämtar alla publicerade inlägg
    getCourse() {
        let courses = localStorage.getItem('courses');
        courses     = JSON.parse(courses);

        courses.map((course) => {
            if (course.id == localStorage.getItem('serviceId')) {
                localStorage.setItem('name', course.name);
                localStorage.setItem('price', course.price);
                localStorage.setItem('description', JSON.stringify(course.description));
                localStorage.setItem('imageUrl', course.imageUrl);
                localStorage.setItem('altText', course.altText);
            }
        })
    }

    handleLinkClick(e) {
        localStorage.setItem('serviceId', e.target.id.slice(6));

        this.getCourse();
        window.location.reload();
    }
}

export default NavbarGerman;