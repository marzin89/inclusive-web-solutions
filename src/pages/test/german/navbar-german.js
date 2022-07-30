// Imports
import React from 'react';
import { Link } from 'react-router-dom';

class NavbarGerman extends React.Component {
    // Konstruktor
    constructor() {
        super();

        // Binder this till funktionerna
        this.renderNavbar    = this.renderNavbar.bind(this);
        this.getTest         = this.getTest.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    render() {
        return (
            this.renderNavbar()
        )
    }

    renderNavbar() {
        let tests = localStorage.getItem('tests');
        tests     = JSON.parse(tests);

        let links = [];

        tests.map((test) => {
            if (test.id == localStorage.getItem('serviceId')) {
                links.push(<li id="open-subpage"><Link id={`test${test.id}`} 
                    className="focus regular-font-size subnav-link open-subpage-link" 
                    to={'/test'} onClick={this.handleLinkClick}>{test.name}</Link></li>);
            
            } else {
                if (test.language == 'german') {
                    links.push(<li><Link id={`test${test.id}`} className="focus regular-font-size subnav-link" 
                    to={'/test'} onClick={this.handleLinkClick}>{test.name}</Link></li>);
                
                }
            }
        })

        let navbar =
            <nav id="subnav" aria-label="Unternavigation mit Tests">
                <ul>
                    <li id="subnav-first-item"><Link className="focus regular-font-size" 
                        to={'/services'}>Dienstleistungen</Link></li>
                    {links}
                </ul>
            </nav>

        return navbar;
    }

    // Funktionen hämtar alla publicerade inlägg
    getTest() {
        let tests = localStorage.getItem('tests');
        tests     = JSON.parse(tests);

        tests.map((test) => {
            if (test.id == localStorage.getItem('serviceId')) {
                localStorage.setItem('name', test.name);
                localStorage.setItem('price', test.price);
                localStorage.setItem('description', JSON.stringify(test.description));
                localStorage.setItem('imageUrl', test.imageUrl);
                localStorage.setItem('altText', test.altText);
            }
        })
    }

    handleLinkClick(e) {
        localStorage.setItem('serviceId', e.target.id.slice(4));
        
        this.getTest();
        window.location.reload();
    }
}

export default NavbarGerman;