// Imports
import React from 'react';

class TestSwedish extends React.Component {
    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.getTest    = this.getTest.bind(this);
        this.renderTest = this.renderTest.bind(this);

        this.state = {
            name:        '',
            price:       '',
            description: [],
            imageUrl:    '',
            altText:     '',
        }
        
        this.getTest();
    }

    render() {
        return (
            <section id="subpage-content">
                <h1 id="main" className="h1-font-size">{this.state.name}</h1>
                {this.renderTest()}
            </section>
        )
    }

    renderTest() {
        // let content = this.state.description;
        // content = JSON.parse(content);
        let content1 = this.state.description[0];
        let content2 = [];
        let image;

        if (this.state.description.length > 1) {
            for (let i = 1; i <= this.state.description.length; i++) {
                content2.push(
                    <p key={i} className="body-text regular-font-size line-height">{this.state.description[i]}</p>
                )
            }
        }

        if (this.state.imageUrl) {
            image = <img src={this.state.imageUrl} 
            alt={this.state.altText}></img>;

        } else {
            image = '';
        }

        let render;

        if (content2.length && image) {
            render = 
                <div role="article" aria-label="Pris, beskrivning och bild">
                    <p className="price regular-font-size">{this.state.price}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    {image}
                    {content2}
                </div>
        
        } else if (content2.length && !image) {
            render = 
                <div role="article" aria-label="Pris och beskrivning">
                    <p className="price regular-font-size">{this.state.price}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    {content2}
                </div>
        
        } else if (!content2.length && image) {
            render = 
                <div role="article" aria-label="Pris, beskrivning och bild">
                    <p className="price regular-font-size">{this.state.price}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    {image}
                </div>
        
        } else if (!content2.length && !image) {
            render = 
                <div role="article" aria-label="Pris och beskrivning">
                    <p className="price regular-font-size">{this.state.price}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                </div>
        }

        return render;
    }

    // Funktionen hämtar alla publicerade inlägg
    getTest() {
        fetch(`https://iws-rest-api.herokuapp.com/tests/id/${localStorage.getItem('serviceId')}`)
        .then((response) => response.json()
        .then((data) => {
            // localStorage.setItem('title', data[0].title);

            this.setState({
                name:        data[0].name,
                price:       data[0].price,
                description: data[0].description,
                imageUrl:    data[0].imageUrl,
                altText:     data[0].altText,
            })
        }))
        /*
        this.props.tests.map((test) => {
            if (test.id == localStorage.getItem('serviceId')) {
                localStorage.setItem('name', test.name);
                localStorage.setItem('price', test.price);
                localStorage.setItem('description', JSON.stringify(test.description));
                localStorage.setItem('imageUrl', test.imageUrl);
                localStorage.setItem('altText', test.altText);
            }
        })
        */
    }
}

export default TestSwedish;