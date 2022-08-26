// Imports
import React from 'react';
import { Link } from 'react-router-dom';

class SolutionsSwedish extends React.Component {
    constructor(props) {
        super(props);

        this.setState                      = this.setState.bind(this);
        this.handleLinkClick               = this.handleLinkClick.bind(this);
        this.renderSolutions               = this.renderSolutions.bind(this);
        this.renderSolutionsAccessible     = this.renderSolutionsAccessible.bind(this);

        this.state = {
            solutions:    [],
            errorMessage: '',
        }

        this.getSolutions();
    }

    render() {
        return (
            <section id="solutions">
                <h2 className="h2-font-size h2-services">Utveckling</h2>
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
        this.renderSolutionsAccessible(solutions);
        return solutions;
    }

    renderSolutionsAccessible(solutions) {
        this.state.solutions.map((solution) => {
            solutions.push(
                <article key={solution.id} className="solution">
                    <h3 className="h3-font-size">{solution.name}</h3>
                    <p className="regular-font-size line-height">{solution.description[0]}</p>
                    {solution.imageUrl ? <img className="service-image" src={solution.imageUrl} 
                        alt={solution.altText}></img> : null}
                    <p><Link id={`solution${solution.id}`} className="find-out-more regular-font-size 
                        focus focus-invisible" to={"/solution"} onClick={this.handleLinkClick}>Läs mer</Link></p>
                </article>
            )
        })
    }

    handleLinkClick(e) {
        localStorage.setItem('serviceId', e.target.id.slice(8)); 
    }

    // Funktionen hämtar alla solutioner
    getSolutions() {

        // GET-anrop till webbtjänsten om användaren har tryckt på solutioner
        fetch('https://iws-rest-api.herokuapp.com/solutions')

        // Konverterar svaret från JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga solutioner hittades
        .then(data => {
            if (!data.length) {
                this.setState({
                    errorMessage: 'Inga utvecklingspaket hittades.',
                })
            
            // Lagrar solutionerna i state-arrayen
            } else {
                let solutionArr = [];

                data.forEach((solution) => {
                    if (solution.language == 'swedish') {
                        solutionArr.push(solution);
                    
                    }
                });

                localStorage.setItem('solutionsSwedish', JSON.stringify(solutionArr));

                this.setState({
                    solutions: solutionArr,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => {
            this.setState({
                errorMessage: 'Ett serverfel har uppstått. Det gick inte att hämta utvecklingspaket.' 
                                + ' Försök igen lite senare.',
            })
        })
    }
}

// Exporterar komponenten
export default SolutionsSwedish;