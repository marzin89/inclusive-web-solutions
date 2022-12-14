// Imports
import React from 'react';
import { Link } from 'react-router-dom';

class SolutionsGerman extends React.Component {
    constructor(props) {
        super(props);

        this.setState                      = this.setState.bind(this);
        this.handleLinkClick               = this.handleLinkClick.bind(this);
        this.renderSolutions               = this.renderSolutions.bind(this);
        // this.renderSolutionsAccessible     = this.renderSolutionsAccessible.bind(this);

        this.state = {
            solutions:    [],
            errorMessage: '',
        }

        this.getSolutions();
    }

    render() {
        return (
            <section id="solutions">
                <h2 className="h2-font-size h2-services">Entwicklung</h2>
                <div className="row-services">
                    {this.state.solutions.length ? this.renderSolutions() : null}
                    <p className="error-services regular-font-size" role="alert" 
                        style={this.state.errorMessage ? {display: 'block'} : {display: 'none'}}>
                            {this.state.errorMessage}</p>
                </div>
            </section>    
        )
    }

    renderSolutions() {
        let solutions = [];

        this.state.solutions.map((solution) => {
            solutions.push(
                <article key={solution.id} className="solution">
                    <h3 className="h3-font-size">{solution.name}</h3>
                    <p className="regular-font-size line-height">{solution.description[0]}</p>
                    {solution.imageUrl ? <img className="service-image" src={solution.imageUrl} 
                        alt={solution.altText}></img> : null}
                    <p><Link id={`solution${solution.id}`} className="find-out-more regular-font-size 
                        focus focus-invisible" to={"/solution"} onClick={this.handleLinkClick}>Mehr</Link></p>
                </article>
            )
        })

        // this.renderSolutionsAccessible(solutions);
        return solutions;
    }

    /*
    renderSolutionsAccessible(solutions) {
        this.state.solutions.map((solution) => {
            solutions.push(
                <article key={solution.id} className="solution">
                    <h3 className="h3-font-size">{solution.name}</h3>
                    <p className="regular-font-size line-height">{solution.description[0]}</p>
                    {solution.imageUrl ? <img className="service-image" src={solution.imageUrl} 
                        alt={solution.altText}></img> : null}
                    <p><Link id={`solution${solution.id}`} className="find-out-more regular-font-size 
                        focus focus-invisible" to={"/solution"} onClick={this.handleLinkClick}>Mehr</Link></p>
                </article>
            )
        })
    }
    */

    handleLinkClick(e) {
        localStorage.setItem('serviceId', e.target.id.slice(8)); 
    }

    // Funktionen h??mtar alla solutioner
    getSolutions() {

        // GET-anrop till webbtj??nsten om anv??ndaren har tryckt p?? solutioner
        fetch('https://iws-rest-api.herokuapp.com/solutions')

        // Konverterar svaret fr??n JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga solutioner hittades
        .then(data => {
            if (!data.length) {
                this.setState({
                    errorMessage: 'Es wurden keine Development-pakete gefunden.',
                })
            
            // Lagrar solutionerna i state-arrayen
            } else {
                let solutionArr = [];

                data.forEach((solution) => {
                    if (solution.language == 'german') {
                        solutionArr.push(solution);
                    
                    }
                });

                localStorage.setItem('solutionsGerman', JSON.stringify(solutionArr));

                this.setState({
                    solutions: solutionArr,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppst??tt
        .catch(() => {
            this.setState({
                errorMessage: 'Ein Serverfehler ist aufgetreten. Es konnten keine Development-Pakete abgerufen werden.' 
                                + ' Versuchen Sie es sp??ter erneut.',
            })
        })
    }
}

// Exporterar komponenten
export default SolutionsGerman;