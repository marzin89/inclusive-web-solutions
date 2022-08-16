// Imports
import React from 'react';
import { Link } from 'react-router-dom';

class TestsSwedish extends React.Component {
    constructor(props) {
        super(props);

        this.setState                  = this.setState.bind(this);
        this.handleLinkClick           = this.handleLinkClick.bind(this);
        this.renderTests               = this.renderTests.bind(this);
        this.renderTestsAccessible     = this.renderTestsAccessible.bind(this);

        this.state = {
            tests:        [],
            errorMessage: '',
        }

        this.getTests();
    }

    render() {
        return (
            <section id="tests">
                <h2 className="h2-font-size">Tester</h2>
                <div className="row-services">
                    {this.state.tests.length ? this.renderTests() : null}
                    <p className="error-services regular-font-size" role="alert" 
                        style={this.state.errorMessage ? {display: 'block'} : {display: 'none'}}>
                            {this.state.errorMessage}</p>
                </div>
            </section>    
        )
    }

    renderTests() {
        let tests = [];
        this.renderTestsAccessible(tests);
        return tests;
    }

    renderTestsAccessible(tests) {
        this.state.tests.map((test) => {
            tests.push(
                <article key={test.id} className="test">
                    <h3 className="h3-font-size">{test.name}</h3>
                    <p className="regular-font-size line-height">{test.description[0]}</p>
                    {test.imageUrl ? <img className="service-image" src={test.imageUrl} 
                        alt={test.altText}></img> : null}
                    <p><Link id={`test${test.id}`} className="find-out-more regular-font-size 
                        focus focus-invisible" to={"/test"} onClick={this.handleLinkClick}>Läs mer</Link></p>
                </article>
            )
        })
    }

    handleLinkClick(e) {
        localStorage.setItem('serviceId', e.target.id.slice(4)); 
    }

    // Funktionen hämtar alla tester
    getTests() {

        // GET-anrop till webbtjänsten om användaren har tryckt på Tester
        fetch('https://iws-rest-api.herokuapp.com/tests')

        // Konverterar svaret från JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga tester hittades
        .then(data => {
            if (!data.length) {
                this.setState({
                    errorMessage: 'Inga tester hittades.',
                })
            
            // Lagrar testerna i state-arrayen
            } else {
                let testArr   = [];

                data.forEach((test) => {
                    if (test.language == 'swedish') {
                        testArr.push(test);
                    
                    }
                });

                localStorage.setItem('testsSwedish', JSON.stringify(testArr));

                this.setState({
                    tests: testArr,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => {
            this.setState({
                error:        true,
                errorMessage: 'Ett serverfel har uppstått. Det gick inte att hämta tester.' 
                                    + ' Försök igen lite senare.',
            })
        })
    }
}

// Exporterar komponenten
export default TestsSwedish;