// Imports
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import { Link } from 'react-router-dom';

// Test
class Test extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState                         = this.setState.bind(this);
        this.getTest                          = this.getTest.bind(this);
        this.renderNavbar                     = this.renderNavbar.bind(this);
        this.renderTest                       = this.renderTest.bind(this);
        this.handleLogout                     = this.handleLogout.bind(this);
        this.handleLinkClick                  = this.handleLinkClick.bind(this);

        this.state = {
            signedIn:     this.props.signedIn,
            error:        false,
        }

        this.getTest();
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
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" 
                                to={"/"}>Home</Link>/</li>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" 
                                to={"/services"}> Dienstleistungen</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" 
                                to={"/test"}> {localStorage.getItem('name')}</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" 
                                to={"/"}>Start</Link>/</li>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" 
                                to={"/services"}> Tjänster</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" 
                                to={"/test"}>{localStorage.getItem('name')}</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="text focus regular-font-size" to={"/login"} 
                        onClick={this.handleLogout}>Logga ut</Link></p>
                </div>   
                <div id="subpage">
                    {this.renderNavbar()}
                    <div id="subpage-right">
                        <section id="subpage-content">
                            <h1 className="text h1-font-size">{localStorage.getItem('name')}</h1>
                            {this.renderTest()}
                        </section>
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
    getTest() {
        this.props.tests.map((test) => {
            if (test.id == localStorage.getItem('serviceId')) {
                localStorage.setItem('name', test.name);
                localStorage.setItem('price', test.price);
                localStorage.setItem('description', JSON.stringify(test.description));
                localStorage.setItem('imageUrl', test.imageUrl);
                localStorage.setItem('altText', test.altText);
            }
        })
    }

    renderNavbar() {
        let tests = [];

        if (this.props.tests) {
            tests = this.props.tests;

        } else {
            tests = localStorage.getItem('tests');
            tests = JSON.parse(tests);
        }

        let links = [];

        if (localStorage.getItem('language') == 'Deutsch') {
            tests.map((test) => {
                if (test.id == localStorage.getItem('serviceId')) {
                    links.push(<li id="open-subpage"><Link id={`test${test.id}`} 
                        className="text focus regular-font-size subnav-link open-subpage-link" 
                        to={'/test'} onClick={this.handleLinkClick}>{test.name}</Link></li>);
                
                } else {
                    if (test.language == 'german') {
                        links.push(<li><Link id={`test${test.id}`} className="text focus regular-font-size subnav-link" 
                        to={'/test'} onClick={this.handleLinkClick}>{test.name}</Link></li>);
                    
                    }
                }
            })       
        } else {
            tests.map((test) => {
                if (test.id == localStorage.getItem('serviceId')) {
                    links.push(<li id="open-subpage"><Link id={`test${test.id}`} 
                        className="text focus regular-font-size subnav-link open-subpage-link" 
                        to={'/test'} onClick={this.handleLinkClick}>{test.name}</Link></li>);
                
                } else {
                    if (test.language == 'swedish') {
                        links.push(<li><Link id={`test${test.id}`} className="text focus regular-font-size subnav-link" 
                        to={'/test'} onClick={this.handleLinkClick}>{test.name}</Link></li>);
                    
                    }
                }
            })
        }

        let navbar =
            <nav id="subnav" aria-label={localStorage.getItem('language') == 'Deutsch' ?
                "Unternavigation mit Tests" : "Undermeny med befintliga tester"}>
                <ul>
                    <li id="subnav-first-item"><Link className="text focus regular-font-size" to={'/services'}>
                        {localStorage.getItem('language') == 'Deutsch' ? 'Dienstleistungen' : 'Tjänster'}</Link></li>
                    {links}
                </ul>
            </nav>


        return navbar;
    }

    renderTest() {
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
                <div role="article" aria-label={localStorage.getItem('language') == 'Deutsch' ? 
                    'Preis, Beschreibung und Bild' : 'Pris, beskrivning och bild'}>
                    <p className="price text regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="text body-text regular-font-size">{content1}</p>
                    {image}
                    {content2}
                </div>
        
        } else if (content2.length && !image) {
            render = 
                <div role="article" aria-label={localStorage.getItem('language') == 'Deutsch' ? 
                    'Preis und Beschreibung' : 'Pris och beskrivning'}>
                    <p className="price text regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="text body-text regular-font-size">{content1}</p>
                    {content2}
                </div>
        
        } else if (!content2.length && image) {
            render = 
                <div role="article" aria-label={localStorage.getItem('language') == 'Deutsch' ? 
                    'Preis, Beschreibung und Bild' : 'Pris, beskrivning och bild'}>
                    <p className="price text regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="text body-text regular-font-size">{content1}</p>
                    {image}
                </div>
        
        } else if (!content2.length && !image) {
            render = 
                <div role="article" aria-label={localStorage.getItem('language') == 'Deutsch' ? 
                    'Preis und Beschreibung' : 'Pris och beskrivning'}>
                    <p className="price text regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="text body-text regular-font-size">{content1}</p>
                </div>
        }

        return render;
    }

    handleLinkClick(e) {
        localStorage.setItem('serviceId', e.target.id.slice(4));

        if (e.target.className.indexOf('subnav-link') >= 0) {
            this.getTest();
            window.location.reload();
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
export default Test;