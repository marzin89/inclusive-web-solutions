import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StaticSwedish from './swedish/static-swedish';

// Kontaktformulär
function ContactSwedish(props) {

    useEffect(() => {
        document.title = 'Kontakt';
    });

    return (
        <main>
            <div className="row">
                {/* Länkstig */}
                {localStorage.getItem('language') == 'Deutsch' ?
                <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                            regular-font-size" to={"/"}>Home</Link>/</li>
                        <li><Link className="active-breadcrumb focus focus-invisible regular-font-size"
                            to={"/contact"}> Kontakt</Link></li>
                    </ul>
                </nav>
                :
                <nav className="breadcrumbs" aria-label="Länkstig">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                            regular-font-size" to={"/"}>Start</Link>/</li>
                        <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                            to={"/contact"}> Kontakt</Link></li>
                    </ul>
                </nav>
                }
                {props.isSignedIn ? <p id="logout">
                    <Link className="focus focus-invisible regular-font-size" to={"/contact"} 
                        onClick={this.handleLogout}>Logga ut</Link></p> : null}
            </div>
            {localStorage.getItem('language') == 'Deutsch' ? <StaticGerman /> : <StaticSwedish /> }
        </main>
    );
}

export default ContactSwedish;