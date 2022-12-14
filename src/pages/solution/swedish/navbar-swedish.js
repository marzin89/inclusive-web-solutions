// Imports
import React from 'react';
import { Link } from 'react-router-dom';

class NavbarSwedish extends React.Component {
    // Konstruktor
    constructor() {
        super();

        // Binder this till funktionerna
        this.renderNavbar    = this.renderNavbar.bind(this);
        // this.getSolution     = this.getSolution.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    render() {
        return (
            this.renderNavbar()
        )
    }

    renderNavbar() {
        let solutions = localStorage.getItem('solutionsSwedish');
        solutions     = JSON.parse(solutions);
        
        let links = [];

        solutions.map((solution) => {
            if (solution.id == localStorage.getItem('serviceId')) {
                links.push(<li key={solution.id} id="open-subpage"><Link id={`solution${solution.id}`} 
                    className="focus focus-invisible regular-font-size subnav-link open-subpage-link" 
                    to={'/solution'} onClick={this.handleLinkClick}>{solution.name}</Link></li>);

            } else {
                if (solution.language == 'swedish') {
                    links.push(<li key={solution.id}><Link id={`solution${solution.id}`} className="focus focus-invisible 
                    regular-font-size subnav-link" to={'/solution'} onClick={this.handleLinkClick}>
                        {solution.name}</Link></li>);
                
                }
            }
        })

        let navbar =
            <nav id="subnav" aria-label="Undermeny med utvecklingspaket">
                <ul>
                    <li id="subnav-first-item"><Link className="focus focus-invisible regular-font-size" 
                        to={'/services'}>Tjänster</Link></li>
                    {links}
                </ul>
            </nav>

        return navbar;
    }

    /*
    // Funktionen hämtar alla publicerade inlägg
    getSolution() {
        let solutions = localStorage.getItem('solutionsSwedish');
        solutions     = JSON.parse(solutions);

        solutions.map((solution) => {
            if (solution.id == localStorage.getItem('serviceId')) {
                localStorage.setItem('name', solution.name);
                localStorage.setItem('price', solution.price);
                localStorage.setItem('description', JSON.stringify(solution.description));
                localStorage.setItem('imageUrl', solution.imageUrl);
                localStorage.setItem('altText', solution.altText);
            }
        })
    }
    */

    handleLinkClick(e) {
        localStorage.setItem('serviceId', e.target.id.slice(8));    
        // this.getSolution();
        window.location.reload();
    }
}

export default NavbarSwedish;