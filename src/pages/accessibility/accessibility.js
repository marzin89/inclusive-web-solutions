// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import AccessibilityGerman from './german/accessibility-german';
import AccessibilitySwedish from './swedish/accessibility-swedish.';

// Om webbtillgänglighet
class Accessibility extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState        = this.setState.bind(this);
        // this.handleBtnClick  = this.handleBtnClick.bind(this);
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
                            <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                                regular-font-size" to={"/"}>Home</Link>/</li>
                            <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/accessibility"}> Barrierefreiheit</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                                regular-font-size" to={"/"}>Start</Link>/</li>
                            <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/accessibility"}> Om webbtillgänglighet</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="focus focus-invisible regular-font-size" 
                            to={"/accessibility"} onClick={this.handleLogout}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ?
                <AccessibilityGerman /> : <AccessibilitySwedish />}
            </main>
        )
    }

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Om webbtillgänglighet');
        localStorage.setItem('pageGerman', 'Barrierefreiheit');

        if (localStorage.getItem('language') == 'Deutsch') {
            document.title = 'Barrierefreiheit';

        } else {
            document.title = 'Om webbtillgänglighet';
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
export default Accessibility;