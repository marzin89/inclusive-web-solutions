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

        this.state = {
            results:      [],
            error:        false,
            errorMessage: this.props.errorMessage,
        }
    }

    render() {
        return (
        <div id={localStorage.getItem('activeSearchPageGerman') ? 
            `page${localStorage.getItem('activeSearchPageGerman')}` : `page1`}>
            {localStorage.getItem('resultsGerman') ? this.renderResults() : null}
            <p className="error regular-font-size" role="alert" style={this.state.errorMessage ?
                {display: 'block'} : {display: 'none'}}>{this.state.errorMessage}</p>
        </div>
        )
    }

    renderResults() {
        let results = localStorage.getItem('resultsGerman');
        results     = JSON.parse(results);
        let page    = [];
        let render  = []; 

        if (results.length) {
            let lastIndex = localStorage.getItem('searchIndexGerman') + 5;

            for (let i = localStorage.getItem('searchIndexGerman'); i < lastIndex; i++) {
                if (results[i]) {
                    page.push(results[i])
                
                } else {
                    break;
                } 
            }
        }

        this.renderResultsAccessible(render, page);
        return render;
    }

    renderResultsAccessible(render, page) {
        page.forEach((element) => {
            render.push(
                <article>
                    <h2 className="h2-font-size">{element.title}</h2>
                    <p className="regular-font-size line-height">{element.content.slice(0, 150) + ' ...'}</p>
                    <p><Link id={element.foreignKey ? element.foreignKey : null} className="find-out-more 
                        regular-font-size focus focus-invisible" to={`${element.path}`} 
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