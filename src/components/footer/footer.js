// Imports
import React from 'react';
// import './css/styles.css';

// Sidfor
function Footer() {
    return (
        <footer>
            <div id="footer-wrapper">
                <div id="footer-inner-wrap">
                    {/* Kontaktinformation */}
                    <p id="contact-information"><a id="email-link" className="focus focus-invisible 
                        regular-font-size" href="mailto:info@iws.se">
                            info@iws.se</a> | 0123-45678 | Drottninggatan 1, 12345 Grönköping</p>
                    {/* Länk till integritetspolicy */}
                    {localStorage.getItem('language') == 'Deutsch' ? 
                    <p id="privacy-policy"><a id="privacy-policy-link" href="" 
                        className="focus focus-invisible regular-font-size">Datenschutzerklärung</a></p> 
                    :
                    <p id="privacy-policy"><a id="privacy-policy-link" href="" 
                        className="focus focus-invisible regular-font-size">Integritetspolicy</a></p>
                    }
                    {/* Copyright */}
                    <p id="copyright" className="regular-font-size">Copyright</p>
                </div>
                {/* Tillbaka-till-toppen-knapp */}
                <a id="scroll-to-top-btn" className="focus focus-invisible" role="button" href="#main"
                    aria-label={localStorage.getItem('language') == 'Deutsch' ? 'Zum Seitenanfang springen' : 
                    'Gå till toppen av sidan'}>
                    <svg role="button" width="45" height="25">
                        <line x1="2" x2="22" y1="22" y2="2" stroke="white" strokeWidth="5"></line>
                        <line x1="19" x2="39" y1="2" y2="22" stroke="white" strokeWidth="5"></line>
                    </svg>
                </a>
            </div>
        </footer>
    )
}

// Exporterar komponenten
export default Footer;