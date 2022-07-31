// Imports
import React from 'react';
import logoMobil from '../../images/logo/logoMobil.jpg';
import logoDesktop from '../../images/logo/logoDesktop.jpg';
import {Link} from 'react-router-dom';
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';

// Sidhuvud
class Header extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState              = this.setState.bind(this);
        this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
        this.handleNavIconClick    = this.handleNavIconClick.bind(this);
        this.handleCloseNav        = this.handleCloseNav.bind(this);
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
        return (
            <header>
                {localStorage.getItem('language') == 'Deutsch' ?
                <div id="header-wrapper">
                    {/* Logotyp */}
                    <div id="header-left">
                        <Link id="logo" to={"/"} onClick={this.handlePageTitle} aria-label='Link zur Homepage' 
                            className="focus focus-invisible">
                            <img id="logo-mobile" src={logoMobil} alt="Logo von IWS"></img>
                            <img id="logo-desktop" src={logoDesktop} alt="Logo von IWS"></img>
                        </Link>
                    </div>
                    <div id="header-right">
                        {/* Sökruta desktop */}
                        <div id="search-wrapper-desktop">
                            <form id="search-form-desktop" role="search">
                                <input className="search-bar text-input input focus focus-invisible-input regular-font-size" 
                                    type="search" aria-label='Website durchsuchen' aria-required="true"
                                    onChange={this.handleSearchChange}></input>
                                {/* Texten är på tyska eller svenska beroende på vilket språk som valts */}
                                <button className="search-btn btn deutsch focus focus-invisible-input regular-font-size" 
                                    type="submit" onClick={this.validateSearch}>Suchen</button>
                            </form>
                        </div>
                        <div id="nav-language-wrapper-desktop">
                            {/* Huvudmeny desktop. Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <nav id="main-nav-desktop" aria-label='Hauptmenü'>
                                <ul>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" to={"/"} 
                                        onClick={this.handlePageTitle}>Home</Link></li>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" to={"/about"}
                                        onClick={this.handlePageTitle}>Über uns</Link></li>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" to={"/contact"}
                                        onClick={this.handlePageTitle}>Kontakt</Link></li>                                   
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" to={"/services"}
                                        onClick={this.handlePageTitle}>Dienstleistungen</Link></li>    
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" to={"/blog"}
                                        onClick={this.handlePageTitle}>Blog</Link></li>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" to={"/accessibility"} 
                                        onClick={this.handlePageTitle}>Barrierefreiheit</Link></li>
                                </ul>
                            </nav>
                            {/* Huvudmeny mobil. Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <nav id="main-nav-mobile" aria-label='Hauptmenü' aria-labelledby="nav-icon">
                                <ul>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" to={"/"} 
                                        onClick={this.handlePageTitle}>Home</Link></li>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" to={"/about"} 
                                        onClick={this.handlePageTitle}>Über uns</Link></li>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" to={"/contact"} 
                                        onClick={this.handlePageTitle}>Kontakt</Link></li>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" to={"/services"} 
                                        onClick={this.handlePageTitle}>Dienstleistungen</Link></li>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" to={"/blog"} 
                                        onClick={this.handlePageTitle}>Blog</Link></li>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" to={"/accessibility"} 
                                        onClick={this.handlePageTitle}>Barrierefreiheit</Link></li>
                                    <li id="close-menu" className="deutsch"><a id="close-menu-link" className="navlink focus focus-invisible
                                        regular-font-size" onClick={this.handleCloseNav}>Schließen</a></li>
                                </ul>
                            </nav>
                            {/* Rullgardinslista för språkbyte */}
                            <select id="language-switcher" className="focus focus-invisible" 
                                aria-label='Sprache wechseln' onChange={this.handleLanguageChange}>
                                    <option className="regular-font-size" value="Svenska">Svenska</option>
                                    <option className="regular-font-size" value="Deutsch">Deutsch</option>
                            </select>
                        </div>
                        <div id="icon-wrapper">
                            {/* Förstoringsglas */}
                            <a role="button" href="#search-mobile" className="focus focus-invisible" aria-haspopup="true" 
                                aria-controls="search-mobile"
                                aria-label='Suchleiste zeigen' aria-expanded="false" onClick={this.handleSearchIconClick}> 
                                <svg id="search-icon" role="button" className="focus focus-invisible" aria-haspopup="true" 
                                    aria-controls="search-mobile" aria-label='Suchleiste zeigen' width="35" height="40">
                                    <circle cx="13" cy="13" r="10" stroke="white" strokeWidth="4" fill="#2A7373"></circle>
                                    <line x1="20" y1="22" x2="27" y2="31" stroke="white" strokeWidth="4" />
                                </svg>
                            </a>
                            {/* Hamburgerikon */}
                            <a id="nav-icon" href="#main-nav-mobile" className="focus focus-invisible" 
                                aria-controls="main-nav-mobile" aria-haspopup="true" aria-label='Hauptmenü öffnen' 
                                aria-expanded="false" onClick={this.handleNavIconClick}>☰</a>
                        </div> 
                    </div>
                    {/* Sökruta mobil */}
                    <div id="search-mobile">
                        <form id="search-form-mobile" role="search">
                            <input className="search-bar search-bar-mobile text-input input focus focus-invisible-input regular-font-size" 
                                type="search" aria-label='Website durchsuchen' aria-required="true"
                                onChange={this.handleSearchChange}></input>
                            {/* Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <button className="search-btn search-btn-mobile btn deutsch focus focus-invisible-input regular-font-size" 
                                type="submit" onClick={this.validateSearch}>Suchen</button>
                            <a id="close-search-bar-link" className="navlink focus focus-invisible-input regular-font-size" href="#"
                                aria-label='Suchleiste schließen'>X</a>
                        </form>
                    </div> 
                </div>
                :
                <div id="header-wrapper">
                    {/* Logotyp */}
                    <div id="header-left">
                        <Link id="logo" to={"/"} onClick={this.handlePageTitle} 
                            aria-label='Länk till startsidan' className="focus focus-invisible">
                            <img id="logo-mobile" src={logoMobil} alt="IWS logotyp"></img>
                            <img id="logo-desktop" src={logoDesktop} alt="IWS logotyp"></img>
                        </Link>
                    </div>
                    <div id="header-right">
                        {/* Sökruta desktop */}
                        <div id="search-wrapper-desktop">
                            <form id="search-form-desktop" role="search">
                                <input className="search-bar text-input input focus focus-invisible-input regular-font-size" 
                                    type="search" aria-label='Sök på webbplatsen' aria-required="true"
                                    onChange={this.handleSearchChange}></input>
                                {/* Texten är på tyska eller svenska beroende på vilket språk som valts */}
                                <button className="search-btn btn svenska focus focus-invisible-input regular-font-size" 
                                    type="submit" onClick={this.validateSearch}>Sök</button>
                            </form>
                        </div>
                        <div id="nav-language-wrapper-desktop">
                            {/* Huvudmeny desktop. Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <nav id="main-nav-desktop" aria-label='Huvudmeny'>
                                <ul>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" to={"/"} 
                                        onClick={this.handlePageTitle}>Start</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" to={"/about"}
                                        onClick={this.handlePageTitle}>Om oss</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" to={"/contact"} 
                                        onClick={this.handlePageTitle}>Kontakt</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" to={"/services"} 
                                        onClick={this.handlePageTitle}>Tjänster</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" to={"/blog"} 
                                        onClick={this.handlePageTitle}>Blogg</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" to={"/accessibility"} 
                                        onClick={this.handlePageTitle}>Om webbtillgänglighet</Link></li>
                                    {this.props.signedIn ? 
                                        <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                            to={"/admin"} onClick={this.handlePageTitle}>Admin</Link></li> : null}
                                </ul>
                            </nav>
                            {/* Huvudmeny mobil. Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <nav id="main-nav-mobile" aria-label='Huvudmeny' aria-labelledby="nav-icon">      
                                <ul>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" to={"/"} 
                                        onClick={this.handlePageTitle}>Start</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" to={"/about"} 
                                        onClick={this.handlePageTitle}>Om oss</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" to={"/contact"} 
                                        onClick={this.handlePageTitle}>Kontakt</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" to={"/services"} 
                                        onClick={this.handlePageTitle}>Tjänster</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" to={"/blog"}
                                        onClick={this.handlePageTitle}>Blogg</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" to={"/accessibility"}
                                        onClick={this.handlePageTitle}>Om webbtillgänglighet</Link></li>
                                    {this.props.signedIn ? 
                                        <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" to={"/admin"} 
                                            onClick={this.handlePageTitle} href="#">Admin</Link></li> : null}
                                    <li id="close-menu" className="svenska"><a id="close-menu-link" 
                                        className="navlink focus focus-invisible regular-font-size"
                                        onClick={this.handleCloseNav}>Stäng</a></li>
                                </ul>
                            </nav>
                            {/* Rullgardinslista för språkbyte */}
                            <select id="language-switcher" className="focus focus-invisible" 
                                aria-label='Välj språk' onChange={this.handleLanguageChange}>
                                    <option className="regular-font-size" value="Svenska">Svenska</option>
                                    <option className="regular-font-size" value="Deutsch">Deutsch</option>
                            </select>
                        </div>
                        <div id="icon-wrapper">
                            {/* Förstoringsglas */}
                            <a role="button" href="#search-mobile" className="focus focus-invisible" aria-haspopup="true" 
                                aria-controls="search-mobile" aria-label= 'Visar sökrutan' aria-expanded="false" 
                                onClick={this.handleSearchIconClick}> 
                                <svg id="search-icon" role="button" className="focus focus-invisible" aria-haspopup="true" 
                                    aria-controls="search-mobile" aria-label='Visar sökrutan' width="35" height="40">
                                    <circle cx="13" cy="13" r="10" stroke="white" strokeWidth="4" fill="#2A7373"></circle>
                                    <line x1="20" y1="22" x2="27" y2="31" stroke="white" strokeWidth="4" />
                                </svg>
                            </a>
                            {/* Hamburgerikon */}
                            <button id="nav-icon" className="focus focus-invisible" aria-controls="main-nav-mobile" 
                                aria-haspopup="true" aria-label='Öppnar huvudmenyn' aria-expanded="false" 
                                onClick={this.handleNavIconClick}>☰</button>
                        </div> 
                    </div>
                    {/* Sökruta mobil */}
                    <div id="search-mobile">
                        <form id="search-form-mobile" role="search">
                            <input className="search-bar search-bar-mobile text-input input focus focus-invisible-input regular-font-size" 
                                type="search" aria-label='Sök på webbplatsen' aria-required="true" 
                                onChange={this.handleSearchChange}></input>
                            {/* Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <button className="search-btn search-btn-mobile btn svenska focus focus-invisible-input regular-font-size" 
                                type="submit" onClick={this.validateSearch}>Sök</button><a id="close-search-bar-link" 
                                className="navlink focus focus-invisible regular-font-size" href="#" aria-label='Döljer sökrutan'>X</a>
                        </form>
                    </div>
                    
                </div>
                }
            </header>
        )
    }

    componentDidMount() {
        const select = document.getElementById('language-switcher');

        if (localStorage.getItem('language') == 'Deutsch') {
            select.value = 'Deutsch';
            document.documentElement.setAttribute('lang', 'de');
        
        } else {
            select.value = 'Svenska';
            document.documentElement.setAttribute('lang', 'sv');
        }
    }

    handleLanguageChange(e) {
        this.setState({
            language: e.target.value,
        })

        if (e.target.value == 'Deutsch') {
            localStorage.setItem('language', 'Deutsch');
            document.documentElement.setAttribute('lang', 'de');
            document.title = localStorage.getItem('pageGerman');

        } else if (e.target.value == 'Svenska') {
            localStorage.setItem('language', 'Svenska');
            document.documentElement.setAttribute('lang', 'sv');
            document.title = localStorage.getItem('pageSwedish');
        }

        this.props.function(this.state.language);
    }

    // Funktionen uppdaterar aria-expanded för sökikonen
    handleSearchIconClick(e) {
        e.target.setAttribute('aria-expanded', true);
    }

    // Funktionen uppdaterar aria-expanded för hamburgerikonen
    handleNavIconClick(e) {
        document.getElementById('main-nav-mobile').style.display = 'block';
        e.target.setAttribute('aria-expanded', true);
    }

    handleCloseNav() {
        document.getElementById('main-nav-mobile').style.display = 'none';
        document.getElementById('nav-icon').setAttribute('aria-expanded', false);
    }

    handlePageTitle(e) {
        if (e.target.id == 'logo') {
            if (localStorage.getItem('language') == 'Deutsch') {
                document.title = 'Home';
            
            } else {
                document.title = 'Start';
            }

        } else {
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