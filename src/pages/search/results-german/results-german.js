// Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Rendrerar sökresultat på svenska
class ResultsGerman extends React.Component {
    constructor(props) {
        super(props);

        this.setState                    = this.setState.bind(this);
        this.handleLinkClick             = this.handleLinkClick.bind(this);
        this.renderResults               = this.renderResults.bind(this);
        this.renderResultsAccessible     = this.renderResultsAccessible.bind(this);
    }

    render() {
        return (
        <div id={localStorage.getItem('activeSearchPageGerman') ? 
            `page${localStorage.getItem('activeSearchPageGerman')}` : `page1`}>
            {this.renderResults()}
        </div>
        )
    }

    renderResults() {
        let results    = [];
        let page       = []; 

        let lastIndex = Number(localStorage.getItem('searchIndexGerman')) + 5;

        for (let i = localStorage.getItem('searchIndexGerman'); i < lastIndex; i++) {
            if (this.props.results[i]) {
                results.push(this.props.results[i])
            
            } else {
                break;
            } 
        }

        this.renderResultsAccessible(results, page);
        return page;
    }

    renderResultsAccessible(results, page) {
        results.forEach((result) => {
            page.push(
                <article key={result.id}>
                    <h2 className="h2-font-size">{result.title}</h2>
                    <p className="regular-font-size line-height">{result.content.slice(0, 150) + ' ...'}</p>
                    <p><Link id={result.foreignKey ? result.foreignKey : null} className="find-out-more 
                        regular-font-size focus focus-invisible" to={`${result.path}`} 
                        onClick={this.handleLinkClick}>Mehr</Link></p>
                </article>
            )
        })
    }

    handleLinkClick(e) {
        if (e.target.id.indexOf('test') >= 0) {
            localStorage.setItem('serviceId', e.target.id.slice(4));

        } else if (e.target.id.indexOf('solution') >= 0) {
            localStorage.setItem('serviceId', e.target.id.slice(8));

        } else if (e.target.id.indexOf('course') >= 0) {
            localStorage.setItem('serviceId', e.target.id.slice(6));
        
        } else if (e.target.id.indexOf('post') >= 0) {
            localStorage.setItem('postId', e.target.id.slice(4)); 
        }
    }
}

// Exporterar komponenten
export default ResultsGerman;