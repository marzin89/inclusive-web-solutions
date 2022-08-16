// Imports
import React from 'react';
import { Link } from 'react-router-dom';

class CoursesSwedish extends React.Component {
    constructor(props) {
        super(props);

        this.setState                    = this.setState.bind(this);
        this.handleLinkClick             = this.handleLinkClick.bind(this);
        this.renderCourses               = this.renderCourses.bind(this);
        this.renderCoursesAccessible     = this.renderCoursesAccessible.bind(this);

        this.state = {
            courses:    [],
            errorMessage: '',
        }

        this.getCourses();
    }

    render() {
        return (
            <section id="courses">
                <h2 className="h2-font-size">Utbildning</h2>
                <div className="row-services">
                    {this.state.courses.length ? this.renderCourses() : null}
                    <p className="error-services regular-font-size" role="alert" 
                        style={this.state.errorMessage ? {display: 'block'} : {display: 'none'}}>
                            {this.state.errorMessage}</p>
                </div>
            </section>    
        )
    }

    renderCourses() {
        let courses = [];
        this.renderCoursesAccessible(courses);
        return courses;
    }

    renderCoursesAccessible(courses) {
        this.state.courses.map((course) => {
            courses.push(
                <article key={course.id} className="course">
                    <h3 className="h3-font-size">{course.name}</h3>
                    <p className="regular-font-size line-height">{course.description[0]}</p>
                    {course.imageUrl ? <img className="service-image" src={course.imageUrl} 
                        alt={course.altText}></img> : null}
                    <p><Link id={`course${course.id}`} className="find-out-more regular-font-size 
                        focus focus-invisible" to={"/course"} onClick={this.handleLinkClick}>Läs mer</Link></p>
                </article>
            )
        })
    }

    handleLinkClick(e) {
        localStorage.setItem('serviceId', e.target.id.slice(6));
    }

    // Funktionen hämtar alla courseer
    getCourses() {

        // GET-anrop till webbtjänsten om användaren har tryckt på courseer
        fetch('https://iws-rest-api.herokuapp.com/courses')

        // Konverterar svaret från JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga courseer hittades
        .then(data => {
            if (!data.length) {
                this.setState({
                    errorMessage: 'Inga utbildningar hittades.',
                })
            
            // Lagrar courseerna i state-arrayen
            } else {
                let courseArr = [];

                data.forEach((course) => {
                    if (course.language == 'swedish') {
                        courseArr.push(course);
                    }
                });

                localStorage.setItem('coursesSwedish', JSON.stringify(courseArr));

                this.setState({
                    courses: courseArr,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => {
            this.setState({
                errorMessage: 'Ett serverfel har uppstått. Det gick inte att hämta utbildningar.' 
                                + ' Försök igen lite senare.',
            })
        })
    }
}

// Exporterar komponenten
export default CoursesSwedish;