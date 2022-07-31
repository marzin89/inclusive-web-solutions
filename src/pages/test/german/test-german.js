// Imports
import React from 'react';

class TestGerman extends React.Component {
    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.getTest    = this.getTest.bind(this);
        this.renderTest = this.renderTest.bind(this);

        this.getTest();
    }

    render() {
        return (
            <section id="subpage-content">
                <h1 className="h1-font-size">{localStorage.getItem('name')}</h1>
                {this.renderTest()}
            </section>
        )
    }

    renderTest() {
        let content = localStorage.getItem('description');
        content = JSON.parse(content);
        let content1 = content[0];
        let content2 = [];
        let image;

        if (content.length > 1) {
            for (let i = 1; i <= content.length; i++) {
                content2.push(
                    <p key={i} className="body-text regular-font-size line-height">{content[i]}</p>
                )
            }
        }

        if (localStorage.getItem('imageUrl')) {
            image = <img src={localStorage.getItem('imageUrl')} 
            alt={localStorage.getItem('altText')}></img>;

        } else {
            image = '';
        }

        let render;

        if (content2.length && image) {
            render = 
                <div role="article" aria-label="Preis, Beschreibung und Bild">
                    <p className="price regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    {image}
                    {content2}
                </div>
        
        } else if (content2.length && !image) {
            render = 
                <div role="article" aria-label="Preis und Beschreibung">
                    <p className="price regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    {content2}
                </div>
        
        } else if (!content2.length && image) {
            render = 
                <div role="article" aria-label="Preis, Beschreibung und Bild">
                    <p className="price regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    {image}
                </div>
        
        } else if (!content2.length && !image) {
            render = 
                <div role="article" aria-label="Preis und Beschreibung">
                    <p className="price regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                </div>
        }

        return render;
    }

    // Funktionen hämtar alla publicerade inlägg
    getTest() {
        this.props.tests.map((test) => {
            if (test.id == localStorage.getItem('serviceId')) {
                localStorage.setItem('name', test.name);
                localStorage.setItem('price', test.price);
                localStorage.setItem('description', JSON.stringify(test.description));
                localStorage.setItem('imageUrl', test.imageUrl);
                localStorage.setItem('altText', test.altText);
            }
        })
    }
}

export default TestGerman;