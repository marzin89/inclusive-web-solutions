// Imports
import React from 'react';

class PostGerman extends React.Component {
    // Konstruktor
    constructor() {
        super();

        // Binder this till funktionerna
        this.getPost    = this.getPost.bind(this);
        this.renderPost = this.renderPost.bind(this);

        this.state = {
            title:    '',
            date:     '',
            content:  [],
            imageUrl: '',
            altText:  '',
            author:   '',
        }

        this.getPost();
    }

    render() {
        return (
            <section id="subpage-content">
                <h1 id="main" className="h1-font-size">{this.state.title}</h1>
                {this.renderPost()}
            </section>
        )
    }

    renderPost() {
        // let content = this.state.content;
        // content = JSON.parse(content);
        let content1 = this.state.content[0];
        let content2 = [];
        let image;

        if (this.state.content.length > 1) {
            for (let i = 1; i <= this.state.content.length; i++) {
                content2.push(
                    <p key={i} className="body-text regular-font-size line-height">{this.state.content[i]}</p>
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
                <div role="article" aria-label="Datum, Inhalt, Bild und Autor">
                    <p className="date small-font-size">{this.state.date.slice(0, 10)}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    {image}
                    {content2}
                    <p id="author" className="regular-font-size">{this.state.author}</p>
                </div>
        
        } else if (content2.length && !image) {
            render = 
                <div role="article" aria-label="Datum, Inhalt und Autor">
                    <p className="date small-font-size">{this.state.date.slice(0, 10)}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    {content2}
                    <p id="author" className="regular-font-size">{this.state.author}</p>
                </div>
        
        } else if (!content2.length && image) {
            render = 
                <div role="article" aria-label="Datum, Inhalt, Bild und Autor">
                    <p className="date small-font-size">{this.state.date.slice(0, 10)}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    {image}
                    <p id="author" className="regular-font-size">{this.state.author}</p>
                </div>
        
        } else if (!content2.length && !image) {
            render = 
                <div role="article" aria-label="Datum, Inhalt und Autor">
                    <p className="date small-font-size">{this.state.date.slice(0, 10)}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    <p id="author" className="regular-font-size">{this.state.author}</p>
                </div>
        }

        return render;
    }

    // Funktionen hämtar alla publicerade inlägg
    getPost() {
        fetch(`https://iws-rest-api.herokuapp.com/posts/id/${localStorage.getItem('postId')}`)
        .then((response) => response.json()
        .then((data) => {
            this.setState({
                title:    data[0].title,
                date:     data[0].date,
                content:  data[0].content,
                imageUrl: data[0].imageUrl,
                altText:  data[0].altText,
                author:   data[0].author,
            })
        }))
        /*
        this.props.posts.map((post) => {
            if (post.id == localStorage.getItem('postId')) {
                localStorage.setItem('title', post.title);
                localStorage.setItem('date', post.date);
                localStorage.setItem('content', JSON.stringify(post.content));
                localStorage.setItem('imageUrl', post.imageUrl);
                localStorage.setItem('altText', post.altText);
                localStorage.setItem('author', post.author);
                localStorage.setItem('published', post.published);
                localStorage.setItem('comments', post.comments);
                localStorage.setItem('postLanguage', post.language);
                localStorage.setItem('updated', post.updated);
            }
        })
        */
    }
}

export default PostGerman;