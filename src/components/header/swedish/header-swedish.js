import logo from '../../images/logo/logo.png';
import searchIcon from '../../images/sökikon/searchIcon.png';
import navIcon from '../../images/hamburgerikon/navIcon.png';
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';

function HeaderSwedish() {

    // Konstruktor
    /*
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState               = this.setState.bind(this);
        this.handleSkipLinkFocus    = this.handleSkipLinkFocus.bind(this);
        this.handleSkipLinkFocusout = this.handleSkipLinkFocusout.bind(this);
        this.handleSearchIconClick  = this.handleSearchIconClick.bind(this);
        this.handleNavIconClick     = this.handleNavIconClick.bind(this);
        this.handleCloseNav         = this.handleCloseNav.bind(this);
        this.handleCloseSearch      = this.handleCloseSearch.bind(this);
        this.handleLanguageChange   = this.handleLanguageChange.bind(this);
        this.handleSearchChange     = this.handleSearchChange.bind(this)
        this.validateSearch         = this.validateSearch.bind(this);

        this.state = {
            signedIn:           this.props.signedIn,
            language:           '',
            query:              '',
            searchErrorSwedish: '',
            searchErrorGerman:  '',
        }
    }
    */

    function handleSkipLinkFocus(e) {
        e.currentTarget.parentElement.style.position = 'fixed';

        if (window.innerWidth <= 1040) {
            e.currentTarget.parentElement.style.top = '70px';
        
        } else {
            e.currentTarget.parentElement.style.top = '125px';
        }
    }

    function handleSkipLinkFocusout(e) {
        e.currentTarget.parentElement.style.position = 'absolute';
        e.currentTarget.parentElement.style.top = '-10000px';
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

    return (
        <header>
            <div id="header-wrapper" tabIndex={-1}>
                <div id="skip-to-content-wrapper">
                    <a id="skip-to-content" className="focus focus-invisible regular-font-size" 
                        href="#main" onFocus={(e) => handleSkipLinkFocus(e)} onBlur={(e) => 
                            handleSkipLinkFocusout(e)}>Gå till innehållet</a>
                </div>
                {/* Logotyp */}
                <div id="header-left">
                    <Link id="logo" to={"/"}  
                        aria-label='Länk till startsidan' className="focus focus-invisible">
                        <img id="logo-mobile" src={logo} alt="IWS logotyp"></img>
                        <img id="logo-desktop" src={logo} alt="IWS logotyp"></img>
                    </Link>
                </div>
                <div id="header-right">
                    {/* Sökruta desktop */}
                    <div id="search-wrapper-desktop">
                        <form id="search-form-desktop" role="search">
                            <label htmlFor="search-bar">Sök på webbplatsen</label>
                            <input id="search-bar" className="search-bar text-input input focus focus-invisible-input 
                                regular-font-size" type="search" aria-required="true" autoComplete='on' 
                                aria-describedby="search-phrase-empty" onChange={this.handleSearchChange}></input>
                            <button className="search-btn btn svenska focus focus-invisible-input regular-font-size" 
                                type="submit" onClick={this.validateSearch}>Sök</button>
                        </form>
                    <p id="search-phrase-empty" className="regular-font-size error-search" role="alert" 
                        style={this.state.searchErrorSwedish ? {display: 'block'} : {display: 'none'}}>
                        {this.state.searchErrorSwedish}</p>
                    </div>
                    <div id="nav-language-wrapper-desktop">
                        {/* Huvudmeny desktop */}
                        <nav id="main-nav-desktop" aria-label='Huvudmeny'>
                            <ul>
                                <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                    to={"/"} >Start</Link></li>
                                <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                    to={"/about"} >Om oss</Link></li>
                                <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                    to={"/contact"} >Kontakt</Link></li>
                                <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                    to={"/services"} >Tjänster</Link></li>
                                <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                    to={"/blog"} >Blogg</Link></li>
                                <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                    to={"/accessibility"} >Om webbtillgänglighet</Link></li>
                                {sessionStorage.getItem('signedIn') ? 
                                    <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                        to={"/admin"} >Admin</Link></li> : null}
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

                        <input type="image" id="search-icon" className="focus focus-invisible" aria-haspopup="true" 
                            aria-label= 'Visar sökrutan' aria-expanded="false" src={searchIcon} alt="Sökikon" 
                            onClick={this.handleSearchIconClick}></input> 
                        {/* Sökruta mobil */}
                        <div id="search-mobile">
                            <form id="search-form-mobile" role="search">
                                <label htmlFor="search-bar">Sök på webbplatsen</label>
                                <input id="search-bar" className="search-bar search-bar-mobile text-input input focus 
                                    focus-invisible-input regular-font-size" type="search" aria-required="true" autoComplete='on' 
                                    aria-describedby="search-phrase-empty" onChange={this.handleSearchChange}></input>
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
                        <input type="image" id="nav-icon" className="focus focus-invisible" aria-haspopup="true" 
                            aria-label='Öppnar huvudmenyn' aria-expanded="false" src={navIcon} alt="Hamburgerikon"
                            onClick={this.handleNavIconClick}></input> 
                        {/* Huvudmeny mobil. Texten är på tyska eller svenska beroende på vilket språk som valts */}
                        <nav id="main-nav-mobile" aria-label='Huvudmeny'>      
                            <ul>
                                <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                    to={"/"} >Start</Link></li>
                                <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                    to={"/about"} >Om oss</Link></li>
                                <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                    to={"/contact"} >Kontakt</Link></li>
                                <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                    to={"/services"} >Tjänster</Link></li>
                                <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                    to={"/blog"} >Blogg</Link></li>
                                <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                    to={"/accessibility"} >Om webbtillgänglighet</Link></li>
                                    {sessionStorage.getItem('signedIn') ? 
                                <li className="svenska"><Link className="navlink focus focus-invisible regular-font-size" 
                                    to={"/admin"}  href="#">Admin</Link></li> : null}
                                <li id="close-menu" className="svenska"><a id="close-menu-link" className="navlink focus 
                                    focus-invisible regular-font-size" href="#" onClick={this.handleCloseNav}>Stäng</a></li>
                            </ul>
                        </nav>
                    </div> 
                </div>
            </div>
        </header>
    );

    componentDidMount() {
        const select = document.getElementById('language-switcher');

        if (localStorage.getItem('language') == 'Deutsch') {
            select.value = 'Deutsch';
            document.documentElement.setAttribute('lang', 'de');
        
        } else {
            select.value = 'Svenska';
            document.documentElement.setAttribute('lang', 'sv');
        }

        /*
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1040) {
                document.getElementById('main-nav-mobile').style.display = 'none';
            }
        })
        */
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
            this.setState({
                searchErrorGerman:  '',
                searchErrorSwedish: '',
            });
            
            window.open('/search', '_self');
        }
    }
}

// Exporterar komponenten
export default Header;