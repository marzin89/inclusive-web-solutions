// Imports
import React from 'react';
import logoMobil from '../../images/logo/logoMobil.jpg';
import logoDesktop from '../../images/logo/logoDesktop.jpg'
import {Link} from 'react-router-dom';
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
// import './css/styles.css';

let selectCount = 0;

// Sidhuvud
class Header extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState              = this.setState.bind(this);
        this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
        this.handleSelectClick     = this.handleSelectClick.bind(this);
        this.handleNavIconClick    = this.handleNavIconClick.bind(this);
        this.handleLanguageChange  = this.handleLanguageChange.bind(this);
        this.handlePageTitle       = this.handlePageTitle.bind(this);
        this.handleSearchChange    = this.handleSearchChange.bind(this)
        this.validateSearch        = this.validateSearch.bind(this);

        this.state = {
            signedIn:     this.props.signedIn,
            language:     '',
            error:        false,
            errorSwedish: '',
            errorGerman:  '',
        }
    }

    render() {
        return(
            <header>
                <div id="header-wrapper">
                    {/* Logotyp */}
                    <div id="header-left">
                        <Link id="logo" to={"/"} onClick={this.handlePageTitle} 
                            aria-label={localStorage.getItem('language') == 'Deutsch' ?
                            'Link zur Homepage' : 'Länk till startsidan'} className="focus focus-header">
                            <img id="logo-mobile" src={logoMobil} alt="IWS logotyp"></img>
                            <img id="logo-desktop" src={logoDesktop} alt="IWS logotyp"></img>
                        </Link>
                    </div>
                    <div id="header-right">
                        {/* Sökruta desktop */}
                        <div id="search-wrapper-desktop">
                            <form id="search-form-desktop" role="search">
                                <input className="search-bar text-input input focus focus-header regular-font-size" 
                                    type="search" aria-label={localStorage.getItem('language') == 'Deutsch' ?
                                    'Website durchsuchen' : 'Sök på webbplatsen'} aria-required="true"
                                    onChange={this.handleSearchChange}></input>
                                {/* Texten är på tyska eller svenska beroende på vilket språk som valts */}
                                {localStorage.getItem('language') == 'Deutsch' ? 
                                    <button className="search-btn btn deutsch text focus focus-header regular-font-size" 
                                        type="submit" onClick={this.validateSearch}>Suchen</button> : 
                                        <button className="search-btn btn svenska text focus focus-header regular-font-size" 
                                        type="submit" onClick={this.validateSearch}>Sök</button>}
                            </form>
                        </div>
                        <div id="nav-language-wrapper-desktop">
                            {/* Huvudmeny desktop. Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <nav id="main-nav-desktop" aria-label={localStorage.getItem('language') == 'Deutsch' ?
                                    'Hauptmenü' : 'Huvudmeny'}>
                                {localStorage.getItem('language') == 'Deutsch' ?
                                <ul>
                                    <li className="deutsch"><Link className="navlink text focus focus-header regular-font-size" to={"/"} 
                                        onClick={this.handlePageTitle}>Home</Link></li>
                                    <li className="deutsch"><Link className="navlink text focus focus-header regular-font-size" to={"/about"}
                                        onClick={this.handlePageTitle}>Über uns</Link></li>
                                    <li className="deutsch"><Link className="navlink text focus focus-header regular-font-size" to={"/contact"}
                                        onClick={this.handlePageTitle}>Kontakt</Link></li>                                   
                                    <li className="deutsch"><Link className="navlink text focus focus-header regular-font-size" to={"/services"}
                                        onClick={this.handlePageTitle}>Dienstleistungen</Link></li>    
                                    <li className="deutsch"><Link className="navlink text focus focus-header regular-font-size" to={"/blog"}
                                        onClick={this.handlePageTitle}>Blog</Link></li>
                                    <li className="deutsch"><Link className="navlink text focus focus-header regular-font-size" to={"/accessibility"} 
                                        onClick={this.handlePageTitle}>Web Accessibility</Link></li>
                                </ul>
                                :
                                <ul>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/"} 
                                        onClick={this.handlePageTitle}>Start</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/about"}
                                        onClick={this.handlePageTitle}>Om oss</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/contact"} 
                                        onClick={this.handlePageTitle}>Kontakt</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/services"} 
                                        onClick={this.handlePageTitle}>Tjänster</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/blog"} 
                                        onClick={this.handlePageTitle}>Blogg</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/accessibility"} 
                                        onClick={this.handlePageTitle}>Om webbtillgänglighet</Link></li>
                                    {this.props.signedIn ? 
                                        <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" 
                                            to={"/admin"} onClick={this.handlePageTitle}>Admin</Link></li> : null}
                                </ul>
                                }
                            </nav>
                            {/* Huvudmeny mobil. Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <nav id="main-nav-mobile" aria-label={localStorage.getItem('language') == 'Deutsch' ?
                                    'Hauptmenü' : 'Huvudmeny'} aria-labelledby="nav-icon">
                                {localStorage.getItem('language') == 'Deutsch' ?
                                <ul>
                                    <li className="deutsch"><Link className="navlink text focus focus-header regular-font-size" to={"/"} 
                                        onClick={this.handlePageTitle}>Home</Link></li>
                                    <li className="deutsch"><Link className="navlink text focus focus-header regular-font-size" to={"/about"} 
                                        onClick={this.handlePageTitle}>Über uns</Link></li>
                                    <li className="deutsch"><Link className="navlink text focus focus-header regular-font-size" to={"/contact"} 
                                        onClick={this.handlePageTitle}>Kontakt</Link></li>
                                    <li className="deutsch"><Link className="navlink text focus focus-header regular-font-size" to={"/services"} 
                                        onClick={this.handlePageTitle}>Dienstleistungen</Link></li>
                                    <li className="deutsch"><Link className="navlink text focus focus-header regular-font-size" to={"/blog"} 
                                        onClick={this.handlePageTitle}>Blog</Link></li>
                                    <li className="deutsch"><Link className="navlink text focus focus-header regular-font-size" to={"/accessibility"} 
                                        onClick={this.handlePageTitle}>Web Accessibility</Link></li>
                                    <li id="close-menu" className="deutsch"><a id="close-menu-link" 
                                        className="navlink text focus focus-header regular-font-size" href="#" tabIndex="0">Schließen</a></li>
                                </ul>
                                :        
                                <ul>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/"} 
                                        onClick={this.handlePageTitle}>Start</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/about"} 
                                        onClick={this.handlePageTitle}>Om oss</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/contact"} 
                                        onClick={this.handlePageTitle}>Kontakt</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/services"} 
                                        onClick={this.handlePageTitle}>Tjänster</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/blog"}
                                        onClick={this.handlePageTitle}>Blogg</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/accessibility"}
                                        onClick={this.handlePageTitle}>Om webbtillgänglighet</Link></li>
                                    {this.props.signedIn ? 
                                        <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/admin"} 
                                            onClick={this.handlePageTitle}>Admin</Link></li> : null}
                                    <li id="close-menu" className="svenska"><a id="close-menu-link" href="#" 
                                        className="navlink text focus focus-header regular-font-size" tabIndex="0">Stäng</a></li>
                                </ul>
                                }
                            </nav>
                            {/* Rullgardinslista för språkbyte */}
                            <select id="language-switcher" className="focus text focus-header" 
                                aria-label={localStorage.getItem('language') == 'Deutsch' ? 'Sprache wechseln' : 'Byt språk'} 
                                onClick={this.handleSelectClick} onChange={this.handleLanguageChange}>
                                    <option className="text regular-font-size" value="Svenska">Svenska</option>
                                    <option className="text regular-font-size" value="Deutsch">Deutsch</option>
                            </select>
                        </div>
                        <div id="icon-wrapper">
                            {/* Förstoringsglas */}
                            <a role="button" href="#search-mobile" className="focus focus-header" aria-haspopup="true" 
                                aria-label={localStorage.getItem('language') == 'Deutsch' ? 'Suchleiste zeigen' : 
                                'Visar sökrutan'} aria-expanded="false" onClick={this.handleSearchIconClick}> 
                                <svg id="search-icon" role="button" className="focus focus-header"
                                    aria-haspopup="true" aria-label={localStorage.getItem('language') == 'Deutsch' ? 
                                    'Suchleiste zeigen' : 'Visar sökrutan'} width="35" height="40">
                                    <circle cx="13" cy="13" r="10" stroke="white" strokeWidth="4" fill="#2A7373"></circle>
                                    <line x1="20" y1="22" x2="27" y2="31" stroke="white" strokeWidth="4" />
                                </svg>
                            </a>
                            {/* Hamburgerikon */}
                            <a id="nav-icon" role="button" href="#main-nav-mobile" className="focus focus-header" aria-haspopup="true" 
                                aria-label={localStorage.getItem('language') == 'Deutsch' ? 'Hauptmenü öffnen' : 
                                'Öppnar huvudmenyn'} aria-expanded="false" onClick={this.handleNavIconClick}>
                                <div id="bar1" className="bar"></div>
                                <div id="bar2" className="bar"></div>
                                <div id="bar3" className="bar"></div>
                            </a>
                        </div> 
                    </div>
                    {/* Sökruta mobil */}
                    <div id="search-mobile">
                        <form id="search-form-mobile" role="search">
                            <input className="search-bar search-bar-mobile text-input input focus focus-header regular-font-size" 
                                type="search" aria-label={localStorage.getItem('language') == 'Deutsch' ?
                                'Website durchsuchen' : 'Sök på webbplatsen'} aria-required="true"
                                onChange={this.handleSearchChange}></input>
                            {/* Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            {localStorage.getItem('language') == 'Deutsch' ? 
                            <button className="search-btn search-btn-mobile btn deutsch text focus focus-header regular-font-size" 
                                type="submit" onClick={this.validateSearch}>Suchen</button>
                            : <button className=" search-btn search-btn-mobile btn svenska text focus focus-header regular-font-size" 
                                type="submit" onClick={this.validateSearch}>Sök</button>}
                            <a id="close-search-bar-link" className="navlink text focus focus-header regular-font-size" href="#"
                                aria-label={localStorage.getItem('language') == 'Deutsch' ? 'Suchleiste schließen' : 'Döljer sökrutan'}>
                                    X</a>
                        </form>
                    </div>
                    
                </div>
            </header>
        )
    }

    componentDidMount() {
        const select = document.getElementById('language-switcher');

        if (localStorage.getItem('language') == 'Deutsch') {
            select.value = 'Deutsch';
        
        } else {
            select.value = 'Svenska';
        }

        if (localStorage.getItem('accessible') == false) {
            const text         = document.getElementsByClassName('text');
            const focus        = document.getElementsByClassName('focus');

            if (localStorage.getItem('accessibility-error') == 'contrast') {
                for (let i = 0; i < text.length; i++) {
                    text[i].style.opacity = '0.1';
                }
    
            } else if (localStorage.getItem('accessibility-error') == 'responsiveness') {
                const meta = document.getElementsByName('viewport');
                meta[0].remove();
            
            } else if (localStorage.getItem('accessibility-error') == 'tab-focus') {
                for (let i = 0; i < focus.length; i++) {
                    focus[i].style.outline = '1px solid white';
                }
            
            } else if (localStorage.getItem('accessibility-error') == 'font-size') {
                
            }
        }
    }

    handleLanguageChange(e) {
        if (e.target.value == 'Deutsch') {
            localStorage.setItem('language', 'Deutsch');
            document.documentElement.setAttribute('lang', 'de');
            document.title = localStorage.getItem('pageGerman');

            this.setState({
                language: e.target.value,
            })
        
        } else if (e.target.value == 'Svenska') {
            localStorage.setItem('language', 'Svenska');
            document.documentElement.setAttribute('lang', 'sv');
            document.title = localStorage.getItem('pageSwedish');

            this.setState({
                language: e.target.value,
            })
        }

        this.props.function(this.state.language);
    }

    // Funktionen uppdaterar aria-expanded för sökikonen
    handleSearchIconClick(e) {
        e.target.setAttribute('aria-expanded', true);
    }

    // Funktionen uppdaterar aria-expanded för språkval
    handleSelectClick(e) {
        selectCount++;

        if (!selectCount || selectCount % 2 == 0) {
            e.target.setAttribute('aria-expanded', false);
        
        } else if (selectCount % 2) {
            e.target.setAttribute('aria-expanded', true);
        }
    }

    // Funktionen uppdaterar aria-expanded för hamburgerikonen
    handleNavIconClick(e) {
        e.target.setAttribute('aria-expanded', true);
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

    handleSearchChange(e) {
        this.setState({
            error:        false,
            errorSwedish: '',
            errorGerman:  '',
        })

        localStorage.setItem('query', e.target.value);
    }

    validateSearch(e) {
        e.preventDefault();

        if (!localStorage.getItem('query')) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:       true,
                    errorGerman: 'Bitte geben Sie ein Suchwort ein.',
                })
            
            } else {
                this.setState({
                    error:        true,
                    errorSwedish: 'Du måste skriva ett sökord.',
                })
            }

        } else {
            window.open('/search', '_self');
        }
    }
}

// Exporterar komponenten
export default Header;