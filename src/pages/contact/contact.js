// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import StaticGerman from './german/static-german';
import StaticSwedish from './swedish/static-swedish';

// Kontaktformulär
class Contact extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState              = this.setState.bind(this);
        this.handleLogout          = this.handleLogout.bind(this);
    }

    //Rendrering
    render() {
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
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} : {display: 'none'}}>
                        <Link className="focus focus-invisible regular-font-size" 
                        to={"/contact"} onClick={this.handleLogout}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ? <StaticGerman /> : <StaticSwedish /> }
            </main>
        )
    }

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Kontakt');
        localStorage.setItem('pageGerman', 'Kontakt');
        document.title = 'Kontakt'; 
    }

    // Utloggning
    handleLogout() {
        this.props.logout();
    }
}

// Exporterar komponenten
export default Contact;