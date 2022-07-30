// Imports
import React from 'react';

class PostSwedish extends React.Component {
    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.getPost                          = this.getPost.bind(this);
        this.renderPost                       = this.renderPost.bind(this);

        this.getPost();
    }

    render() {
        return (
            <section id="subpage-content">
                <h1 className="h1-font-size">{localStorage.getItem('title')}</h1>
                {this.renderPost()}
            </section> 
        )
    }

    renderPost() {
        let content = localStorage.getItem('content');
        content = JSON.parse(content);
        let content1 = content[0];
        let content2 = [];
        let image;

        if (content.length > 1) {
            for (let i = 1; i <= content.length; i++) {
                content2.push(
                    <p className="body-text regular-font-size line-height">{content[i]}</p>
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
                <div role="article" aria-label="Datum, innehåll, bild och författare">
                    <p className="date small-font-size">{localStorage.getItem('date').slice(0, 10)}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    {image}
                    {content2}
                    <p id="author" className="regular-font-size">{localStorage.getItem('author')}</p>
                </div>
        
        } else if (content2.length && !image) {
            render = 
                <div role="article" aria-label="Datum, innehåll och författare">
                    <p className="date small-font-size">{localStorage.getItem('date').slice(0, 10)}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    {content2}
                    <p id="author" className="regular-font-size">{localStorage.getItem('author')}</p>
                </div>
        
        } else if (!content2.length && image) {
            render = 
                <div role="article" aria-label="Datum, innehåll, bild och författare">
                    <p className="date small-font-size">{localStorage.getItem('date').slice(0, 10)}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    {image}
                    <p id="author" className="regular-font-size">{localStorage.getItem('author')}</p>
                </div>
        
        } else if (!content2.length && !image) {
            render = 
                <div role="article" aria-label="Datum, innehåll och författare">
                    <p className="date small-font-size">{localStorage.getItem('date').slice(0, 10)}</p>
                    <p className="body-text regular-font-size line-height">{content1}</p>
                    <p id="author" className="regular-font-size">{localStorage.getItem('author')}</p>
                </div>
        }

        return render;
    }

    // Funktionen hämtar alla publicerade inlägg
    getPost() {
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
    }
}

export default PostSwedish;