// Imports
import React from 'react';
import TestSwedish from './swedish/test-swedish';
import TestGerman from './german/test-german';
import NavbarSwedish from './swedish/navbar-swedish';
import NavbarGerman from './german/navbar-german';
import { Link } from 'react-router-dom';

// Test
class Test extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.getName      = this.getName.bind(this);
        this.getTest      = this.getTest.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            tests: this.props.tests,
            test:  [],
        }

        this.getTest();
        this.getName();
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
                            <li><Link className="inactive-breadcrumb focus regular-font-size" 
                                to={"/"}>Home</Link>/</li>
                            <li><Link className="inactive-breadcrumb focus regular-font-size" 
                                to={"/services"}> Dienstleistungen</Link>/</li>
                            <li><Link className="active-breadcrumb focus regular-font-size" 
                                to={"/test"}> {localStorage.getItem('name')}</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb focus regular-font-size" 
                                to={"/"}>Start</Link>/</li>
                            <li><Link className="inactive-breadcrumb focus regular-font-size" 
                                to={"/services"}> Tjänster</Link>/</li>
                            <li><Link className="active-breadcrumb focus regular-font-size" 
                                to={"/test"}>{localStorage.getItem('name')}</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="focus regular-font-size" to={"/login"} 
                        onClick={this.handleLogout}>Logga ut</Link></p>
                </div>   
                <div id="subpage">
                    {localStorage.getItem('language') == 'Deutsch' ? <NavbarGerman /> :
                        <NavbarSwedish />}
                    <div id="subpage-right">
                        {localStorage.getItem('language') == 'Deutsch' ? <TestGerman tests={this.state.tests} /> 
                            : <TestSwedish tests={this.state.tests} />}
                    </div>
                </div>
            </main>
        )
    }
    
    componentDidMount() {
        let title = localStorage.getItem('name');
        localStorage.setItem('pageSwedish', title);
        localStorage.setItem('pageGerman', title);
        document.title = title;
    }

    // Funktionen hämtar alla tester
  getTest() {
    const id = localStorage.getItem('serviceId');

    // GET-anrop till webbtjänsten
    fetch(`https://iws-rest-api.herokuapp.com/tests/id/${id}`)

    // Konverterar svaret från JSON
    .then(response => response.json())

    // Skriver ut ett felmeddelande om inga tester hittades
    .then(data => {
        if (!data.length) {
            this.setState({
                error: true,
            })
        
        // Lagrar testerna i state-arrayen
        } else {
            this.setState({
                error: false,
                test:  data,
            })
        }
    })

    // Skriver ut ett felmeddelande om ett serverfel har uppstått
    .catch(() => { 
        this.setState({
            error: true,
        })
    })
  }

    getName() {
        const id = localStorage.getItem('serviceId');

        this.props.tests.map((test) => {
            if (test.id == id) {
                localStorage.setItem('name', test.name);
            }
        })
    }

    // Utloggning
    handleLogout(e) {

        // Förhidrar att sidan laddas om
        e.preventDefault();

        this.props.logout();
    }
}

// Exporterar komponenten
export default Test;