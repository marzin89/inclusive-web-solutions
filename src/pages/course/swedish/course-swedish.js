// Imports
import React from 'react';

class CourseSwedish extends React.Component {
    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.getCourse    = this.getCourse.bind(this);
        this.renderCourse = this.renderCourse.bind(this);

        this.state = {
            name:        '',
            price:       '',
            description: [],
            imageUrl:    '',
            altText:     '',
        }

        this.getCourse();
    }

    render() {
        return (
            <section id="subpage-content">
                <h1 id="main" className="h1-font-size">{this.state.name}</h1>
                {this.renderCourse()}
            </section>
        )
    }

    renderCourse() {
        let content = this.state.description;
        // content = JSON.parse(content);
        let content1 = content[0];
        let content2 = [];
        let image;

        if (content.length > 1) {
            for (let i = 1; i <= content.length; i++) {
                content2.push(
                    <p key={i} className="text body-text regular-font-size line-height">{content[i]}</p>
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
                    <p className="text body-text regular-font-size line-height">{content1}</p>
                    {image}
                    {content2}
                </div>
        
        } else if (content2.length && !image) {
            render = 
                <div role="article" aria-label="Pris och beskrivning">
                    <p className="price regular-font-size">{this.state.price}</p>
                    <p className="text body-text regular-font-size line-height">{content1}</p>
                    {content2}
                </div>
        
        } else if (!content2.length && image) {
            render = 
                <div role="article" aria-label="Pris, beskrivning och bild">
                    <p className="price regular-font-size">{this.state.price}</p>
                    <p className="text body-text regular-font-size line-height">{content1}</p>
                    {image}
                </div>
        
        } else if (!content2.length && !image) {
            render = 
                <div role="article" aria-label="Pris och beskrivning">
                    <p className="price regular-font-size">{this.state.price}</p>
                    <p className="text body-text regular-font-size line-height">{content1}</p>
                </div>
        }

        return render;
    }

    // Funktionen hämtar alla publicerade inlägg
    getCourse() {
        fetch(`https://iws-rest-api.herokuapp.com/courses/id/${localStorage.getItem('serviceId')}`)
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
        this.props.courses.map((course) => {
            if (course.id == localStorage.getItem('serviceId')) {
                localStorage.setItem('name', course.name);
                localStorage.setItem('price', course.price);
                localStorage.setItem('description', JSON.stringify(course.description));
                localStorage.setItem('imageUrl', course.imageUrl);
                localStorage.setItem('altText', course.altText);
            }
        })
        */
    }
}

export default CourseSwedish;