import logo from '../../images/logo/logo.png';
import MainNavGerman from './main-nav-german';
import SearchMobile from '../search-mobile';
import {Link} from 'react-router-dom';

function HeaderGerman() {

    // Konstruktor
    /*
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.handleSkipLinkFocus    = this.handleSkipLinkFocus.bind(this);
        this.handleSkipLinkFocusout = this.handleSkipLinkFocusout.bind(this);
        this.handleLanguageChange   = this.handleLanguageChange.bind(this);

        this.state = {
            signedIn:           this.props.signedIn,
            language:           '',
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

    return (
        <header>
            <div id="header-wrapper" tabIndex={-1}>
                <div id="skip-to-content-wrapper">
                    <a id="skip-to-content" className="focus focus-invisible regular-font-size" 
                        href="#main" onFocus={(e) => handleSkipLinkFocus(e)} onBlur={(e) => 
                            handleSkipLinkFocusout(e)}>Zum Inhalt springen</a>
                </div>
                {/* Logotyp */}
                <div id="header-left">
                    <Link id="logo" to={"/"}  aria-label='Link zur Homepage' 
                        className="focus focus-invisible">
                        <img id="logo-mobile" src={logo} alt="Logo von IWS"></img>
                        <img id="logo-desktop" src={logo} alt="Logo von IWS"></img>
                    </Link>
                </div>
                <div id="header-right">
                    {/* Sökruta desktop */}
                    <div id="search-wrapper-desktop">
                        <form id="search-form-desktop" role="search">
                            <label htmlFor="search-bar">Website durchsuchen</label>
                            <input id="search-bar" className="search-bar text-input input focus focus-invisible-input 
                                regular-font-size" type="search" aria-required="true"
                                aria-describedby="search-phrase-empty" autoComplete='on' onChange={this.handleSearchChange}></input>
                            <button className="search-btn btn deutsch focus focus-invisible-input regular-font-size" 
                                type="submit" onClick={this.validateSearch}>Suchen</button>
                        </form>
                        <p id="search-phrase-empty" className="regular-font-size error-search" role="alert" 
                            style={this.state.searchErrorGerman ? {display: 'block'} : {display: 'none'}}>
                            {this.state.searchErrorGerman}</p>
                    </div>
                    <div id="nav-language-wrapper-desktop">
                        {/* Huvudmeny desktop */}
                        {window.innerWidth >= 1040 ? <MainNavGerman id="main-nav-desktop" /> : null}
                        {/* Rullgardinslista för språkbyte */}
                        <select id="language-switcher" className="focus focus-invisible" 
                            aria-label='Sprache wechseln' onChange={this.handleLanguageChange}>
                                <option className="regular-font-size" value="Svenska">Svenska</option>
                                <option className="regular-font-size" value="Deutsch">Deutsch</option>
                        </select>
                    </div>
                    <div id="icon-wrapper" tabIndex={-1}>
                        {/* Sökikon och sökruta mobil */}
                        <SearchMobile language="German" />
                        {/* Huvudmeny mobil */}
                        {window.innerWidth < 1040 ? <MainNavGerman id="main-nav-mobile" /> : null}
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
}

export default HeaderGerman;