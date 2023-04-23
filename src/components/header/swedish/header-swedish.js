import logo from '../../../images/logo/logo.png';
import MainNavSwedish from './main-nav-swedish';
import SearchMobile from '../search-mobile';
import SearchDesktop from '../search-desktop';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { pageActions } from '../../../store/slices/page-slice';

function HeaderSwedish() {
    const language = useSelector((state) => state.page.language);
    const dispatch = useDispatch();

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

    useEffect(() => {
        const select = document.getElementById('language-switcher');
        select.value = language == 'Swedish' ? 'Svenska' : 'Deutsch'

        /*
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1040) {
                document.getElementById('main-nav-mobile').style.display = 'none';
            }
        })
        */
    });

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
                    <SearchDesktop language="Swedish" />
                    <div id="nav-language-wrapper-desktop">
                        {/* Huvudmeny desktop */}
                        {window.innerWidth >= 1040 ? <MainNavSwedish id="main-nav-desktop" /> : null}
                        {/* Rullgardinslista för språkbyte */}
                        <select id="language-switcher" className="focus focus-invisible" 
                            aria-label='Välj språk' onChange={(e) => handleLanguageChange(e)}>
                                <option className="regular-font-size" value="Svenska">Svenska</option>
                                <option className="regular-font-size" value="Deutsch">Deutsch</option>
                        </select>
                    </div>
                    <div id="icon-wrapper" tabIndex={-1}>
                        {/* Sökikon och sökruta mobil */}
                        <SearchMobile language="Swedish" />
                        {/* Huvudmeny mobil */}
                        {window.innerWidth < 1040 ? <MainNavSwedish id="main-nav-mobile" /> : null}
                    </div> 
                </div>
            </div>
        </header>
    );
}

export default HeaderSwedish;