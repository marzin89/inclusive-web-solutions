import logo from '../../images/logo/logo.png';
import MainNavGerman from './main-nav-german';
import SearchMobile from '../search-mobile';
import SearchDesktop from '../search-desktop';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { pageActions } from '../../../store/slices/page-slice';

function HeaderGerman() {
    const language = useSelector((state) => state.page.language);
    const dispatch = useDispatch();
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

    function handleLanguageChange(e) {
        dispatch(pageActions.setLanguage(e.target.value));

        if (e.target.value == 'Deutsch') {
            document.documentElement.setAttribute('lang', 'de');

        } else {
            document.documentElement.setAttribute('lang', 'sv');
        }
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
                    <SearchDesktop language="German" />
                    <div id="nav-language-wrapper-desktop">
                        {/* Huvudmeny desktop */}
                        {window.innerWidth >= 1040 ? <MainNavGerman id="main-nav-desktop" /> : null}
                        {/* Rullgardinslista för språkbyte */}
                        <select id="language-switcher" className="focus focus-invisible" 
                            aria-label='Sprache wechseln' onChange={(e) => handleLanguageChange(e)}>
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
}

export default HeaderGerman;