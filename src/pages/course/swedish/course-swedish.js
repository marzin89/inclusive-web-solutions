// Imports
import React from 'react';

class CourseSwedish extends React.Component {
    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.getCourse    = this.getCourse.bind(this);
        this.renderCourse = this.renderCourse.bind(this);

        this.getCourse();
    }

    render() {
        return (
            <section id="subpage-content">
                <h1 className="h1-font-size">{localStorage.getItem('name')}</h1>
                {this.renderCourse()}
            </section>
        )
    }

    renderCourse() {
        let content = localStorage.getItem('description');
        content = JSON.parse(content);
        let content1 = content[0];
        let content2 = [];
        let image;

        if (content.length > 1) {
            for (let i = 1; i <= content.length; i++) {
                content2.push(
                    <p className="text body-text regular-font-size line-height">{content[i]}</p>
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
                <div role="article" aria-label="Pris, beskrivning och bild">
                    <p className="price regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="text body-text regular-font-size line-height">{content1}</p>
                    {image}
                    {content2}
                </div>
        
        } else if (content2.length && !image) {
            render = 
                <div role="article" aria-label="Pris och beskrivning">
                    <p className="price regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="text body-text regular-font-size line-height">{content1}</p>
                    {content2}
                </div>
        
        } else if (!content2.length && image) {
            render = 
                <div role="article" aria-label="Pris, beskrivning och bild">
                    <p className="price regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="text body-text regular-font-size line-height">{content1}</p>
                    {image}
                </div>
        
        } else if (!content2.length && !image) {
            render = 
                <div role="article" aria-label="Pris och beskrivning">
                    <p className="price regular-font-size">{localStorage.getItem('price')}</p>
                    <p className="text body-text regular-font-size line-height">{content1}</p>
                </div>
        }

        return render;
    }

    // Funktionen hämtar alla publicerade inlägg
    getCourse() {
        this.props.courses.map((course) => {
            if (course.id == localStorage.getItem('serviceId')) {
                localStorage.setItem('name', course.name);
                localStorage.setItem('price', course.price);
                localStorage.setItem('description', JSON.stringify(course.description));
                localStorage.setItem('imageUrl', course.imageUrl);
                localStorage.setItem('altText', course.altText);
            }
        })
    }
}

export default CourseSwedish;