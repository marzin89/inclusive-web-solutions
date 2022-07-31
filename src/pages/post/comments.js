// Imports
import React from 'react';

class Comments extends React.Component {
    // Konstruktor
    constructor(props) {
        super(props);

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
            if (comment.postId == localStorage.getItem('postId') && 
                comment.published) {

                comments.push(
                    <article key={comment.id}>
                        <h3 className="h3-font-size">{comment.author}</h3>
                        <p className="date small-font-size">{comment.date.slice(0, 10)}</p>
                        <p className="regular-font-size">{comment.content}</p>
                    </article>
                )
            }
        });

        return comments;
    
    }
}

export default Comments;