// Imports
import React from 'react';
import {Link} from 'react-router-dom';

/* Komponent som visar befintliga kommentarer med länkar
    för publicering och radering */
class Comments extends React.Component {
    
    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    // Rendrering
    render() {
        return (
            <div id="main" className="admin-output">
                {/* Här skrivs övriga felmeddelanden ut (inga poster, serverfel) */}
                <p className="error" role="alert" style={this.props.errorComments ? 
                    {display: 'block'} : {display: 'none'}}>{this.props.errorComments}</p>
                {/* Här skrivs övriga bekräftelsemeddelanden ut (uppdatering, borttagning) */}
                <p className="confirm" role="alert" style={this.props.confirmComments ? 
                    {display: 'block'} : {display: 'none'}}>{this.props.confirmComments}</p>
                <h2 id="comment-section-heading" className="h2-admin">Kommentarer</h2>
                {/* Här skrivs alla kommentarer ut (via props) med länkar för 
                    publicering (om kommentaren inte är publicerad) och radering */}
                {this.props.comments.map((comment) => {
                    return (
                        <article key={comment.id}>
                            <h3>{comment.postTitle}</h3>
                            <p className="date">{comment.date.slice(0, 10)}</p>
                            <p>{comment.content}</p>
                            <p className="author">{comment.author}</p>
                            {comment.published ? 
                            <div>
                                <p className="delete"><a id={`delete${comment.id}`} className="focus" 
                                    href="" onClick={this.handleLinkClick}>Radera</a></p> 
                            </div>
                            :
                            <div>
                                <p className="edit"><a id={`publish${comment.id}`} className="focus" 
                                    href="" onClick={this.handleLinkClick}>Publicera</a></p> 
                                <p className="delete"><a id={`delete${comment.id}`} className="focus" 
                                    href="" onClick={this.handleLinkClick}>Radera</a></p>
                            </div>
                            }
                        </article>
                    )
                })}
            </div>
        )
    }

    handleLinkClick(e) {
        e.preventDefault();

        document.getElementById('comment-section-heading').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        let action;
        let id;

        if (e.target.id.indexOf('delete') >= 0) {
            action = 'delete';
            id     = e.target.id.slice(6);
        
        } else if (e.target.id.indexOf('publish') >= 0) {
            action = 'publish';
            id     = e.target.id.slice(7);
        }

        if (action == 'delete') {
            this.props.delete(id);
        
        } else if (action == 'publish') {
            this.props.publish(id);
        }
    }
}

// Exporterar komponenten
export default Comments;