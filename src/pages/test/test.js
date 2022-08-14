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
    constructor() {
        super();

        // Binder this till funktionerna
        this.handleLogout = this.handleLogout.bind(this);

        const id = localStorage.getItem('serviceId');
        let tests = [];

        if (localStorage.getItem('language') == 'Deutsch') {
            tests = JSON.parse(localStorage.getItem('testsGerman'));

        } else {
            tests = JSON.parse(localStorage.getItem('testsSwedish'));
        }

        tests.map((test) => {
            if (test.id == id) {
                localStorage.setItem('name', test.name);
            }
        })
    }

    // Rendrering
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
                            <li><Link className="inactive-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/services"}> Dienstleistungen</Link>/</li>
                            <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/test"}> {localStorage.getItem('name')}</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                                regular-font-size" to={"/"}>Start</Link>/</li>
                            <li><Link className="inactive-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/services"}> Tjänster</Link>/</li>
                            <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/test"}>{localStorage.getItem('name')}</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="focus focus-invisible regular-font-size" 
                        to={"/test"} onClick={this.handleLogout}>Logga ut</Link></p>
                </div>   
                <div id="subpage">
                    {localStorage.getItem('language') == 'Deutsch' ? <NavbarGerman /> :
                        <NavbarSwedish />}
                    <div id="subpage-right">
                        {localStorage.getItem('language') == 'Deutsch' ? <TestGerman /> 
                            : <TestSwedish />}
                    </div>
                </div>
            </main>
        )
    }
    
    componentDidMount() {
        // const id  = localStorage.getItem('serviceId');
        // let tests = [];
        let title = localStorage.getItem('name');

        /*
        if (localStorage.getItem('language') == 'Deutsch') {
            tests = JSON.parse(localStorage.getItem('testsGerman'));

        } else {
            tests = JSON.parse(localStorage.getItem('testsSwedish'));
        }

        tests.map((test) => {
            if (test.id == id) {
                localStorage.setItem('name', test.name);
                title = test.name;
            }
        })
        */

        localStorage.setItem('pageSwedish', title);
        localStorage.setItem('pageGerman', title);
        document.title = title;
    }

    // Utloggning
    handleLogout() {
        this.props.logout();
    }
}

// Exporterar komponenten
export default Test;