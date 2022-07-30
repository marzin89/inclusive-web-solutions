// Imports
import React from 'react';

class Comments extends React.Component {
    // Konstruktor
    constructor() {
        super();

        // Binder this till funktionerna
        this.renderComments = this.renderComments.bind(this);
    }

    render() {
        return (
            this.renderComments()
        )
    }

    renderComments() {
        let comments = [];

        this.props.comments.map((comment) => {
            if (comment.postId == localStorage.getItem('postId')) {
                if (comment.published) {
                    comments.push(comment);
                }
            }
        });

        let render  = [];

        if (comments.length) {
            comments.map((comment) => {
                render.push(
                    <article key={comment.id}>
                        <h3 className="h3-font-size">{comment.author}</h3>
                        <p className="date small-font-size">{comment.date.slice(0, 10)}</p>
                        <p className="regular-font-size">{comment.content}</p>
                        <p className="respond"><a id={`comment${comment.id}`} 
                            className="focus respond-link regular-font-size" 
                            href="#subpage-content" onClick={this.handleLinkClick}>
                            {localStorage.getItem('language') == 'Deutsch' ? 'Antworten' : 'Svara'}
                        </a></p>
                    </article>
                )
            })
        }

        return render;
    }
}

export default Comments;