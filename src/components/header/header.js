// Imports
import React from 'react';
import logoMobil from '../../images/logo/logoMobil.jpg';
import logoDesktop from '../../images/logo/logoDesktop.jpg';
import searchIcon from '../../images/sökikon/searchIcon.jpg';
import navIcon from '../../images/hamburgerikon/navIcon.jpg';
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
        this.handleCloseSearch     = this.handleCloseSearch.bind(this);
        this.handleLanguageChange  = this.handleLanguageChange.bind(this);
        this.handlePageTitle       = this.handlePageTitle.bind(this);
        this.handleSearchChange    = this.handleSearchChange.bind(this)
        this.validateSearch        = this.validateSearch.bind(this);

        this.state = {
            signedIn:           this.props.signedIn,
            language:           '',
            query:              '',
            searchErrorSwedish: '',
            searchErrorGerman:  '',
        }
    }

    render() {
        return (
            <header>
                {localStorage.getItem('language') == 'Deutsch' ?
                <div id="header-wrapper" tabIndex={-1}>
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
                            <form id="search-form-desktop">
                                <input id="search-bar" className="search-bar text-input input focus focus-invisible-input 
                                    regular-font-size" type="search" aria-required="true" aria-label="Website durchsuchen"
                                    aria-describedby="search-phrase-empty" autoComplete='on' onChange={this.handleSearchChange}></input>
                                {/* Texten är på tyska eller svenska beroende på vilket språk som valts */}
                                <button className="search-btn btn deutsch focus focus-invisible-input regular-font-size" 
                                    type="submit" onClick={this.validateSearch}>Suchen</button>
                            </form>
                            <p id="search-phrase-empty" className="regular-font-size error-search" role="alert" 
                                style={this.state.searchErrorGerman ? {display: 'block'} : {display: 'none'}}>
                                {this.state.searchErrorGerman}</p>
                        </div>
                        <div id="nav-language-wrapper-desktop">
                            {/* Huvudmeny desktop. Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <nav id="main-nav-desktop" aria-label='Hauptmenü'>
                                <ul>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/"} onClick={this.handlePageTitle}>Home</Link></li>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/about"} onClick={this.handlePageTitle}>Über uns</Link></li>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/contact"} onClick={this.handlePageTitle}>Kontakt</Link></li>                                   
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/services"} onClick={this.handlePageTitle}>Dienstleistungen</Link></li>    
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/blog"} onClick={this.handlePageTitle}>Blog</Link></li>
                                    <li className="deutsch"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/accessibility"} onClick={this.handlePageTitle}>Barrierefreiheit</Link></li>
                                </ul>
                            </nav>
                            {/* Rullgardinslista för språkbyte */}
                            <select id="language-switcher" className="focus focus-invisible" 
                                aria-label='Sprache wechseln' onChange={this.handleLanguageChange}>
                                    <option className="regular-font-size" value="Svenska">Svenska</option>
                                    <option className="regular-font-size" value="Deutsch">Deutsch</option>
                            </select>
                        </div>
                        <div id="icon-wrapper" tabIndex={-1}>
                            {/* Sökikon */}
                            <input type="image" id="search-icon" role="button" className="focus focus-invisible" aria-haspopup="true" 
                                aria-label='Suchleiste zeigen' aria-expanded="false" src={searchIcon} alt="Such-Icon" 
                                onClick={this.handleSearchIconClick}></input> 
                            {/* Sökruta mobil */}
                            <div id="search-mobile">
                                <form id="search-form-mobile">
                                    <input id="search-bar" className="search-bar search-bar-mobile text-input input focus focus-invisible-input 
                                        regular-font-size" type="search" aria-label='Website durchsuchen' aria-required="true"
                                        autoComplete='on' onChange={this.handleSearchChange}></input>
                                    {/* Texten är på tyska eller svenska beroende på vilket språk som valts */}
                                    <button className="search-btn search-btn-mobile btn deutsch focus focus-invisible-input 
                                        regular-font-size" type="submit" onClick={this.validateSearch}>Suchen</button>
                                    <a id="close-search-bar-link" className="navlink focus focus-invisible-input regular-font-size" 
                                        href="" aria-label='Suchleiste schließen' onClick={this.handleCloseSearch}>X</a>
                                </form>
                                <p id="search-phrase-empty" className="regular-font-size error-search" role="alert" 
                                    style={this.state.searchErrorGerman ? {display: 'block'} : {display: 'none'}}>
                                    {this.state.searchErrorGerman}</p>
                            </div> 
                            {/* Hamburgerikon */}
                            <input type="image" id="nav-icon" role="button" className="focus focus-invisible" aria-haspopup="true" 
                                aria-label='Hauptmenü öffnen' aria-expanded="false" src={navIcon} alt="Hamburger-Icon"
                                onClick={this.handleNavIconClick}></input>
                            {/* Huvudmeny mobil. Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <nav id="main-nav-mobile" aria-label='Hauptmenü'>
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
                                    <li id="close-menu" className="deutsch"><a id="close-menu-link" className="navlink focus 
                                        focus-invisible regular-font-size" href="#" onClick={this.handleCloseNav}>Schließen</a></li>
                                </ul>
                            </nav>
                        </div> 
                    </div>
                </div>
                :
                <div id="header-wrapper" tabIndex={-1}>
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
                            <form id="search-form-desktop">
                                <input id="search-bar" className="search-bar text-input input focus focus-invisible-input regular-font-size" 
                                    type="search" aria-label='Sök på webbplatsen' aria-required="true"
                                    autoComplete='on' onChange={this.handleSearchChange}></input>
                                {/* Texten är på tyska eller svenska beroende på vilket språk som valts */}
                                <button className="search-btn btn svenska focus focus-invisible-input regular-font-size" 
                                    type="submit" onClick={this.validateSearch}>Sök</button>
                            </form>
                        <p id="search-phrase-empty" className="regular-font-size error-search" role="alert" 
                            style={this.state.searchErrorSwedish ? {display: 'block'} : {display: 'none'}}>
                            {this.state.searchErrorSwedish}</p>
                        </div>
                        <div id="nav-language-wrapper-desktop">
                            {/* Huvudmeny desktop. Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <nav id="main-nav-desktop" aria-label='Huvudmeny'>
                                <ul>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/"} onClick={this.handlePageTitle}>Start</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/about"} onClick={this.handlePageTitle}>Om oss</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/contact"} onClick={this.handlePageTitle}>Kontakt</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/services"} onClick={this.handlePageTitle}>Tjänster</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/blog"} onClick={this.handlePageTitle}>Blogg</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/accessibility"} onClick={this.handlePageTitle}>Om webbtillgänglighet</Link></li>
                                    {sessionStorage.getItem('signedIn') ? 
                                        <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                            to={"/admin"} onClick={this.handlePageTitle}>Admin</Link></li> : null}
                                </ul>
                            </nav>
                            {/* Rullgardinslista för språkbyte */}
                            <select id="language-switcher" className="focus focus-invisible" 
                                aria-label='Välj språk' onChange={this.handleLanguageChange}>
                                    <option className="regular-font-size" value="Svenska">Svenska</option>
                                    <option className="regular-font-size" value="Deutsch">Deutsch</option>
                            </select>
                        </div>
                        <div id="icon-wrapper" tabIndex={-1}>
                            {/* Sökikon */}

                            <input type="image" id="search-icon" role="button" className="focus focus-invisible" aria-haspopup="true" 
                                aria-label= 'Visar sökrutan' aria-expanded="false" src={searchIcon} alt="Sökikon" 
                                onClick={this.handleSearchIconClick}></input> 
                            {/* Sökruta mobil */}
                            <div id="search-mobile">
                                <form id="search-form-mobile">
                                    <input id="search-bar" className="search-bar search-bar-mobile text-input input focus focus-invisible-input 
                                        regular-font-size" type="search" aria-label='Sök på webbplatsen' aria-required="true" 
                                        autoComplete='on' onChange={this.handleSearchChange}></input>
                                    {/* Texten är på tyska eller svenska beroende på vilket språk som valts */}
                                    <button className="search-btn search-btn-mobile btn svenska focus focus-invisible-input 
                                        regular-font-size" type="submit" onClick={this.validateSearch}>Sök</button>
                                    <a id="close-search-bar-link" className="navlink focus focus-invisible regular-font-size" 
                                        href="" aria-label='Döljer sökrutan' onClick={this.handleCloseSearch}>X</a>
                                </form>
                                <p id="search-phrase-empty" className="regular-font-size error-search" role="alert" 
                                    style={this.state.searchErrorSwedish ? {display: 'block'} : {display: 'none'}}>
                                    {this.state.searchErrorSwedish}</p>
                            </div>
                            {/* Hamburgerikon */}
                            <input type="image" id="nav-icon" role="button" className="focus focus-invisible" aria-haspopup="true" 
                                aria-label='Öppnar huvudmenyn' aria-expanded="false" src={navIcon} alt="Hamburgerikon"
                                onClick={this.handleNavIconClick}></input> 
                            {/* Huvudmeny mobil. Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <nav id="main-nav-mobile" aria-label='Huvudmeny'>      
                                <ul>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/"} onClick={this.handlePageTitle}>Start</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/about"} onClick={this.handlePageTitle}>Om oss</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/contact"} onClick={this.handlePageTitle}>Kontakt</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/services"} onClick={this.handlePageTitle}>Tjänster</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/blog"} onClick={this.handlePageTitle}>Blogg</Link></li>
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/accessibility"} onClick={this.handlePageTitle}>Om webbtillgänglighet</Link></li>
                                        {sessionStorage.getItem('signedIn') ? 
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/admin"} onClick={this.handlePageTitle} href="#">Admin</Link></li> : null}
                                    <li id="close-menu" className="svenska"><a id="close-menu-link" className="navlink focus 
                                        focus-invisible regular-font-size" href="#" onClick={this.handleCloseNav}>Stäng</a></li>
                                </ul>
                            </nav>
                        </div> 
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

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1040) {
                document.getElementById('main-nav-mobile').style.display = 'none';
            }
        })
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
    handleSearchIconClick() {
        document.getElementById('search-mobile').style.display = 'block';
        document.getElementById('search-icon').setAttribute('aria-expanded', true);
    }

    // Funktionen uppdaterar aria-expanded för hamburgerikonen
    handleNavIconClick() {
        document.getElementById('main-nav-mobile').style.display = 'block';
        document.getElementById('nav-icon').setAttribute('aria-expanded', true);
    }

    handleCloseNav(e) {
        e.preventDefault();
        document.getElementById('main-nav-mobile').style.display = 'none';
        document.getElementById('nav-icon').setAttribute('aria-expanded', false);
    }

    handleCloseSearch(e) {
        e.preventDefault();
        document.getElementById('search-mobile').style.display = 'none';
        document.getElementById('search-icon').setAttribute('aria-expanded', false);
    }

    handlePageTitle(e) {
        if (e.target.id == 'logo') {
            if (localStorage.getItem('language') == 'Deutsch') {
                document.title = 'Home';
            
            } else {
                document.title = 'Start';
            }

        } else {
            localStorage.setItem('pageTitle', e.target.innerHTML);
            document.title = e.target.innerHTML;
        }
    }

    handleSearchChange(e) {
        this.setState({
            query:        e.target.value,
        })

        if (e.target.value) {
            this.setState({
                searchErrorSwedish: '',
                searchErrorGerman:  '',
            })

            e.target.setAttribute('aria-invalid', false);
        }

        localStorage.setItem('query', e.target.value);
    }

    validateSearch(e) {
        e.preventDefault();

        if (!this.state.query) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    searchErrorGerman: 'Bitte geben Sie ein Suchwort ein.',
                })
            
            } else {
                this.setState({
                    searchErrorSwedish: 'Du måste skriva ett sökord.',
                })
            }

            document.getElementById('search-bar').setAttribute('aria-invalid', true);

        } else {
            window.open('/search', '_self');
        }
    }
}

// Exporterar komponenten
export default Header;