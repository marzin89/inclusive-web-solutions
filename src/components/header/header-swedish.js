// Imports
import React from 'react';
import logoMobil from '../../images/logo/logoMobil.jpg';
import logoDesktop from '../../images/logo/logoDesktop.jpg';
import {Link} from 'react-router-dom';
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';

// Sidhuvud
class HeaderSwedish extends React.Component {

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
        return(
            <header id={this.props.id}>
                <div id="header-wrapper">
                    {/* Logotyp */}
                    <div id="header-left">
                        <Link id="logo" to={"/"} onClick={this.handlePageTitle} 
                            aria-label='Länk till startsidan' className="focus focus-header" tabIndex={1}>
                            <img id="logo-mobile" src={logoMobil} alt="IWS logotyp"></img>
                        </Link>
                    </div>
                    <div id="header-right">
                        {/* Sökruta desktop */}
                        <div id="search-wrapper-desktop">
                            <form id="search-form-desktop" role="search">
                                <input className="search-bar text-input input focus focus-header regular-font-size" 
                                    type="search" aria-label='Sök på webbplatsen' aria-required="true"
                                    onChange={this.handleSearchChange} tabIndex={2}></input>
                                {/* Texten är på tyska eller svenska beroende på vilket språk som valts */}
                                <button className="search-btn btn svenska text focus focus-header regular-font-size" 
                                    type="submit" onClick={this.validateSearch} tabIndex={3}>Sök</button>
                            </form>
                        </div>
                        <div id="nav-language-wrapper-desktop">
                            {/* Huvudmeny desktop. Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <nav id="main-nav-desktop" aria-label='Huvudmeny'>
                                <ul>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/"} 
                                        onClick={this.handlePageTitle} tabIndex={4}>Start</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/about"}
                                        onClick={this.handlePageTitle} tabIndex={5}>Om oss</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/contact"} 
                                        onClick={this.handlePageTitle} tabIndex={6}>Kontakt</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/services"} 
                                        onClick={this.handlePageTitle} tabIndex={7}>Tjänster</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/blog"} 
                                        onClick={this.handlePageTitle} tabIndex={8}>Blogg</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/accessibility"} 
                                        onClick={this.handlePageTitle} tabIndex={10}>Om webbtillgänglighet</Link></li>
                                    {this.props.signedIn ? 
                                        <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" 
                                            to={"/admin"} onClick={this.handlePageTitle} tabIndex={11}>Admin</Link></li> : null}
                                </ul>
                            </nav>
                            {/* Huvudmeny mobil. Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <nav id="main-nav-mobile" aria-label='Huvudmeny' aria-labelledby="nav-icon">      
                                <ul>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/"} 
                                        onClick={this.handlePageTitle} tabIndex={8}>Start</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/about"} 
                                        onClick={this.handlePageTitle} tabIndex={9}>Om oss</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/contact"} 
                                        onClick={this.handlePageTitle} tabIndex={10}>Kontakt</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/services"} 
                                        onClick={this.handlePageTitle} tabIndex={11}>Tjänster</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/blog"}
                                        onClick={this.handlePageTitle} tabIndex={12}>Blogg</Link></li>
                                    <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/accessibility"}
                                        onClick={this.handlePageTitle} tabIndex={13}>Om webbtillgänglighet</Link></li>
                                    {this.props.signedIn ? 
                                        <li className="svenska"><Link className="navlink text focus focus-header regular-font-size" to={"/admin"} 
                                            onClick={this.handlePageTitle} href="#" tabIndex={14}>Admin</Link></li> : null}
                                    <li id="close-menu" className="svenska"><a id="close-menu-link" href="#" 
                                        className="navlink text focus focus-header regular-font-size" tabIndex={15}>Stäng</a></li>
                                </ul>
                            </nav>
                            {/* Rullgardinslista för språkbyte */}
                            <select id="language-switcher" className="focus text focus-header" 
                                aria-label='Välj språk' onChange={this.handleLanguageChange} tabIndex={2}>
                                    <option className="text regular-font-size" value="Svenska">Svenska</option>
                                    <option className="text regular-font-size" value="Deutsch">Deutsch</option>
                            </select>
                        </div>
                        <div id="icon-wrapper">
                            {/* Förstoringsglas */}
                            <a role="button" href="#search-mobile" className="focus focus-header" aria-haspopup="true" 
                                aria-controls="search-mobile" aria-label= 'Visar sökrutan' aria-expanded="false" 
                                onClick={this.handleSearchIconClick} tabIndex={3}> 
                                <svg id="search-icon" role="button" className="focus focus-header" aria-haspopup="true" 
                                    aria-controls="search-mobile" aria-label='Visar sökrutan' width="35" height="40">
                                    <circle cx="13" cy="13" r="10" stroke="white" strokeWidth="4" fill="#2A7373"></circle>
                                    <line x1="20" y1="22" x2="27" y2="31" stroke="white" strokeWidth="4" />
                                </svg>
                            </a>
                            {/* Hamburgerikon */}
                            <button id="nav-icon" className="focus focus-header" aria-controls="main-nav-mobile" 
                                aria-haspopup="true" aria-label='Öppnar huvudmenyn' aria-expanded="false" 
                                onClick={this.handleNavIconClick} tabIndex="7">☰</button>
                        </div> 
                    </div>
                    {/* Sökruta mobil */}
                    <div id="search-mobile">
                        <form id="search-form-mobile" role="search">
                            <input className="search-bar search-bar-mobile text-input input focus focus-header regular-font-size" 
                                type="search" aria-label='Sök på webbplatsen' aria-required="true" onChange={this.handleSearchChange} 
                                tabIndex={4}></input>
                            {/* Texten är på tyska eller svenska beroende på vilket språk som valts */}
                            <button className=" search-btn search-btn-mobile btn svenska text focus focus-header regular-font-size" 
                                type="submit" onClick={this.validateSearch} tabIndex={5}>Sök</button>
                            <a id="close-search-bar-link" className="navlink text focus focus-header regular-font-size" href="#"
                                aria-label='Döljer sökrutan' tabIndex={6}>X</a>
                        </form>
                    </div>
                    
                </div>
            </header>
        )
    }

    componentDidMount() {
        const select = document.getElementById('language-switcher');
        select.value = 'Svenska';
        document.documentElement.setAttribute('lang', 'sv');
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
            document.title = 'Start';

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
            this.setState({
                error:        true,
                errorSwedish: 'Du måste skriva ett sökord.',
            })

        } else {
            window.open('/search', '_self');
        }
    }
}

// Exporterar komponenten
export default HeaderSwedish;