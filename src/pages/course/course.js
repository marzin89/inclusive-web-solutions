// Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Kurs
class Course extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        // Binder this till funktionerna
        this.setState                         = this.setState.bind(this);
        this.getCourse                        = this.getCourse.bind(this);
        this.getCourses                       = this.getCourses.bind(this);
        this.renderNavbar                     = this.renderNavbar.bind(this);
        this.renderCourse                     = this.renderCourse.bind(this);
        this.handleLogout                     = this.handleLogout.bind(this);
        this.handlePageTitle                  = this.handlePageTitle.bind(this);
        this.handleLinkClick                  = this.handleLinkClick.bind(this);

        this.state = {
            signedIn:     this.props.signedIn,
            error:        false,
        }

        console.log(this.props.courses);

        // this.getCourses();
        this.getCourse();
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
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/services"}
                                onClick={this.handleLinkClick}> Dienstleistungen</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/course"}
                                onClick={this.handleLinkClick}> {localStorage.getItem('name')}</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/"}
                                onClick={this.handleLinkClick}>Start</Link>/</li>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/services"}
                                onClick={this.handleLinkClick}> Tjänster</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/course"}
                                onClick={this.handleLinkClick}>{localStorage.getItem('name')}</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="text focus regular-font-size" to={"/login"} 
                        onClick={this.handleLinkClick}>Logga ut</Link></p>
                </div> 
                <section id="subpage">
                    <section id="subnav">
                        {this.renderNavbar()}
                    </section>
                    <div id="subpage-right">
                        <section id="subpage-content">
                            <h1 className="text h1-font-size">{localStorage.getItem('name')}</h1>
                            {this.renderCourse()}
                        </section>
                    </div>
                </section>  
            </main>
        )
    }

    componentDidMount() {
        let title = localStorage.getItem('name');

        localStorage.setItem('pageSwedish', title);
        localStorage.setItem('pageGerman', title);
        document.title = title;

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

    // Funktionen hämtar alla publicerade inlägg
    getCourse() {
        this.props.courses.map((course) => {
            if (course.id == localStorage.getItem('serviceId')) {
                localStorage.setItem('name', course.name);
                localStorage.setItem('price', course.price);
                localStorage.setItem('description', JSON.stringify(course.description));
                localStorage.setItem('imageUrl', course.imageUrl);
                localStorage.setItem('altText', course.altText);
            }
        })

        /* GET-anrop till webbtjänsten 
        fetch(`https://iws-rest-api.herokuapp.com/courses/id/${localStorage.getItem('serviceId')}`)

        // Konverterar svaret från JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga inlägg hittades
        .then(data => {
            this.setState({
                course: data,
            })

            localStorage.setItem('name', data[0].name);
            localStorage.setItem('price', data[0].price);
            localStorage.setItem('description', JSON.stringify(data[0].description));
            localStorage.setItem('imageUrl', data[0].imageUrl);
            localStorage.setItem('altText', data[0].altText);

            if (localStorage.getItem('language') == 'Deutsch') {
                if (data.language == 'swedish') {
                    localStorage.setItem('errorGerman', 'Diese Seite ist leider nicht auf Deutsch verfügbar.');
                    localStorage.removeItem('errorSwedish');

                    this.setState({
                        error:        true,
                        errorSwedish: '',
                        errorGerman:  'Diese Seite ist leider nicht auf Deutsch verfügbar.',
                    })
                }
            
            } else {
                localStorage.removeItem('errorSwedish');
                localStorage.removeItem('errorGerman');

                this.setState({
                    error:        false,
                    errorSwedish: '',
                    errorGerman:  '',
                })
            }   
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => {
            localStorage.setItem('errorSwedish', 'Ett serverfel har uppstått. Det gick inte att hämta tjänsten.' 
                + 'Försök igen lite senare.');
            localStorage.setItem('errorSwedish', 'Ein Serverfehler ist aufgetreten. ' +
                'Die Seite konnte leider nicht abgerufen werden. Versuchen Sie es später erneut.'); 

            this.setState({             
                error:      true,
            })
        })
        */
    }

    renderNavbar() {
        let courses = [];

        if (this.props.courses) {
            courses = this.props.courses;

        } else {
            courses = localStorage.getItem('courses');
            courses = JSON.parse(courses);
        }

        let links = [];

        if (localStorage.getItem('language') == 'Deutsch') {
            courses.map((course) => {
                if (course.id == localStorage.getItem('serviceId')) {
                    links.push(<li id="open-subpage"><Link id={`course${course.id}`} 
                        className="text focus regular-font-size subnav-link open-subpage-link" 
                        to={'/course'} onClick={this.handleLinkClick}>{course.name}</Link></li>);

                } else {
                    if (course.language == 'german') {
                        links.push(<li><Link id={`course${course.id}`} className="text focus regular-font-size subnav-link" 
                        to={'/course'} onClick={this.handleLinkClick}>{course.name}</Link></li>);
                    
                    }
                }
            })
        } else {
            courses.map((course) => {
                if (course.id == localStorage.getItem('serviceId')) {
                    links.push(<li id="open-subpage"><Link id={`course${course.id}`} 
                        className="text focus regular-font-size subnav-link open-subpage-link" 
                        to={'/course'} onClick={this.handleLinkClick}>{course.name}</Link></li>);

                } else {
                    if (course.language == 'swedish') {
                        links.push(<li><Link id={`course${course.id}`} className="text focus regular-font-size subnav-link" 
                        to={'/course'} onClick={this.handleLinkClick}>{course.name}</Link></li>);
                    
                    }
                }
            })
        }

        let navbar =
            <nav aria-label={localStorage.getItem('language') == 'Deutsch' ?
                "Unternavigation mit Vorlesungen" : "Undermeny med befintliga utbildningar"}>
                <ul>
                    <li id="subnav-first-item"><Link className="text focus regular-font-size" to={'/services'}>
                        {localStorage.getItem('language') == 'Deutsch' ? 'Dienstleistungen' : 'Tjänster'}</Link></li>
                    {links}
                </ul>
            </nav>


        return navbar;
    }

    renderCourse() {
        let content = localStorage.getItem('description');
        content = JSON.parse(content);
        let content1 = content[0];
        let content2 = [];
        let image;

        if (content.length > 1) {
            for (let i = 1; i <= content.length; i++) {
                content2.push(
                    <p className="text body-text regular-font-size">{content[i]}</p>
                )
            }
        }

        if (localStorage.getItem('imageUrl')) {
            image = <img src={localStorage.getItem('imageUrl')} 
            alt={localStorage.getItem('altText')}></img>;

        } else {
            image = '';
        }

        let render;

        if (content2.length && image) {
            render = 
                <article>
                    <p className="price text regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="text body-text regular-font-size">{content1}</p>
                    {image}
                    {content2}
                </article>
        
        } else if (content2.length && !image) {
            render = 
                <article>
                    <p className="price text regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="text body-text regular-font-size">{content1}</p>
                    {content2}
                </article>
        
        } else if (!content2.length && image) {
            render = 
                <article>
                    <p className="price text regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="text body-text regular-font-size">{content1}</p>
                    {image}
                </article>
        
        } else if (!content2.length && !image) {
            render = 
                <article>
                    <p className="price text regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="text body-text regular-font-size">{content1}</p>
                </article>
        }

        return render;
    }

    // Funktionen hämtar alla tester
    getCourses() {

        // GET-anrop till webbtjänsten om användaren har tryckt på Tester
        fetch('https://iws-rest-api.herokuapp.com/courses')

        // Konverterar svaret från JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga tester hittades
        .then(data => {
            if (!data.length) {
                localStorage.setItem('errorServices', 'Inga anpassningar hittades.');

                this.setState({
                    error:      true,
                })
            
            // Lagrar testerna i state-arrayen
            } else {
                localStorage.removeItem('errorServices');
                localStorage.setItem('courses', JSON.stringify(data));

                this.setState({
                    error:     false,
                    courses: data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => { 
            localStorage.setItem('errorServices', 'Ett serverfel har uppstått. Det gick inte att hämta anpassningar.' 
            + 'Försök igen lite senare.');

            this.setState({
                error:      true,
            })
        })
    }

    handleLinkClick(e) {
        localStorage.setItem('serviceId', e.target.id.slice(6));

        if (e.target.className.indexOf('subnav-link') >= 0) {
            this.getCourse();
            window.location.reload();
        }

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
export default Course;