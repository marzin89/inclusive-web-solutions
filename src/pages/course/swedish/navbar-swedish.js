// Imports
import React from 'react';
import { Link } from 'react-router-dom';

class NavbarSwedish extends React.Component {
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
                links.push(<li key={course.id} id="open-subpage"><Link id={`course${course.id}`} 
                    className="focus regular-font-size subnav-link open-subpage-link" 
                    to={'/course'} onClick={this.handleLinkClick}>{course.name}</Link></li>);

            } else {
                if (course.language == 'swedish') {
                    links.push(<li key={course.id}><Link id={`course${course.id}`} className="focus 
                    regular-font-size subnav-link" to={'/course'} onClick={this.handleLinkClick}>
                        {course.name}</Link></li>);
                
                }
            }
        })

        let navbar =
            <nav id="subnav" aria-label="Undermeny med befintliga utbildningar">
                <ul>
                    <li id="subnav-first-item"><Link className="focus regular-font-size" 
                        to={'/services'}>Tjänster</Link></li>
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

export default NavbarSwedish;