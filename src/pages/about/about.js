// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import StaticSwedish from './swedish/static-swedish';
import StaticGerman from './german/static-german';

// Om oss
class About extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState        = this.setState.bind(this);
        this.handleLogout    = this.handleLogout.bind(this);

        this.state = {
            signedIn: this.props.signedIn,
        }
    }

    // Rendrering
    render() {
        return (
            <main id="main">
                <div className="row">
                    {/* Länkstig */}
                    {localStorage.getItem('language') == 'Deutsch' ?
                    <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                        <ul>
                            <li><Link className="inactive-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/"}>Home</Link>/</li>
                            <li><Link className="inactive-breadcrumb focus focus-invisible regular-font-size"
                                to={"/about"}> Über uns</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb focus focus-invisible regular-font-size"
                                to={"/"}>Start</Link>/</li>
                            <li><Link className="active-breadcrumb focus focus-invisible regular-font-size"
                                to={"/about"}> Om oss</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} : {display: 'none'}}>
                        <Link className="focus focus-invisible regular-font-size" to={"/login"} 
                        onClick={this.handleLogout}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ? <StaticGerman /> : <StaticSwedish />}
            </main>
        )
    }

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Om oss');
        localStorage.setItem('pageGerman', 'Über uns');

        if (localStorage.getItem('language') == 'Deutsch') {
            document.title = 'Über uns';

        } else {
            document.title = 'Om oss';
        }
    }

    // Utloggning
    handleLogout(e) {

        // Förhidrar att sidan laddas om
        e.preventDefault();

        this.props.logout();
    }
}

// Exporterar komponenten
export default About;