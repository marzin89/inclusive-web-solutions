// Imports
import React from 'react';
import logoDesktop from '../../images/logo/logoDesktop.jpg'
import {Link} from 'react-router-dom';
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';

// Sidhuvud
class HeaderDesktop extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState              = this.setState.bind(this);
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
            <header id="header-desktop">
                <div id="header-wrapper">
                    {/* Logotyp */}
                    <div id="header-left">
                        <Link id="logo" to={"/"} onClick={this.handlePageTitle} 
                            aria-label={localStorage.getItem('language') == 'Deutsch' ?
                            'Link zur Homepage' : 'Länk till startsidan'} className="focus focus-header">
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
                                        onClick={this.handlePageTitle}>Barrierefreiheit</Link></li>
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
                            {/* Rullgardinslista för språkbyte */}
                            <select id="language-switcher" className="focus text focus-header" 
                                aria-label={localStorage.getItem('language') == 'Deutsch' ? 'Sprache wechseln' : 'Välj språk'} 
                                onChange={this.handleLanguageChange}>
                                    <option className="text regular-font-size" value="Svenska">Svenska</option>
                                    <option className="text regular-font-size" value="Deutsch">Deutsch</option>
                            </select>
                        </div>
                    </div>
                </div>
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
export default HeaderDesktop;