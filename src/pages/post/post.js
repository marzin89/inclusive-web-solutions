// Imports
import React from 'react';
import PostGerman from './german/post-german';
import PostSwedish from './swedish/post-swedish';
import NavbarSwedish from './swedish/navbar-swedish';
import NavbarGerman from './german/navbar-german';
import CommentFormSwedish from './swedish/comment-form-swedish';
import CommentFormGerman from './german/comment-form-german';
import Comments from './comments';
import { Link } from 'react-router-dom';

// Inlägg
class Post extends React.Component {
    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.handleLogout = this.handleLogout.bind(this);
        this.getComments  = this.getComments.bind(this);

        this.state = {
            posts:    this.props.posts,
            comments: this.props.comments,
        }
    }

    // Rendrering
    render() {
        return (
            <main id="main">
                <div className="row">
                    {/* Länkstig */}
                    {localStorage.getItem('language') == 'Deutsch' ?
                    <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                        <ul>
                            <li><Link className="inactive-breadcrumb focus regular-font-size" 
                                to={"/"}>Home</Link>/</li>
                            <li><Link className="inactive-breadcrumb focus regular-font-size" 
                                to={"/blog"}> Blog</Link>/</li>
                            <li><Link className="active-breadcrumb focus regular-font-size" 
                                to={"/post"}> {localStorage.getItem('title')}</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb focus regular-font-size" 
                                to={"/"}>Start</Link>/</li>
                            <li><Link className="inactive-breadcrumb focus regular-font-size" 
                                to={"/blog"}> Blogg</Link>/</li>
                            <li><Link className="active-breadcrumb focus regular-font-size" 
                                to={"/post"}>{localStorage.getItem('title')}</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="focus regular-font-size" to={"/login"} 
                        onClick={this.handleLogout}>Logga ut</Link></p>
                </div>   
                <div id="subpage">
                    {localStorage.getItem('language') == 'Deutsch' ? <NavbarGerman /> :
                        <NavbarSwedish />}
                    <div id="subpage-right">
                        {localStorage.getItem('language') == 'Deutsch' ? <PostGerman posts={this.state.posts} /> 
                            : <PostSwedish posts={this.state.posts} />}              
                        {localStorage.getItem('language') == 'Deutsch' ? <CommentFormGerman /> : 
                            <CommentFormSwedish />
                        }
                        <section id="comment-section">
                            <h2 className="h2-font-size">{localStorage.getItem('language') == 'Deutsch' ? 
                                'Kommentare' : 'Kommentarer'}</h2>
                            {localStorage.getItem('comments') ? <Comments comments={this.state.comments} /> : null}
                            {localStorage.getItem('language') == 'Deutsch' ?
                            <p className="error regular-font-size" style={this.props.comments ?
                                {display: 'none'} : {display: 'block'}}>Schreiben Sie den ersten Kommentar</p> :
                            <p className="error regular-font-size" style={this.props.comments ?
                                {display: 'none'} : {display: 'block'}}>Skriv den första kommentaren</p>}
                        </section>
                    </div>
                </div>
            </main>
        )
    }

    componentDidMount() {
        let title = localStorage.getItem('title');
        localStorage.setItem('pageSwedish', title);
        localStorage.setItem('pageGerman', title);
        document.title = title;
    }

    getComments() {
        fetch('https://iws-rest-api.herokuapp.com/comments/admin')
        .then(response => response.json())
        .then(data => {
            if (!data.length) {
                this.setState({
                    error: true,
                })
            
            } else {
                localStorage.setItem('comments', JSON.stringify(data)); 
      
                this.setState({
                    error:    false,
                    comments: data,
                })
            }
        })
        .catch(() => {
            this.setState({
                error: true,
            })
        })
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

    handleLinkClick(e) {
        if (e.target.className.indexOf('respond-link') >= 0) {
            localStorage.setItem('response', true);
            localStorage.setItem('commentId', e.target.id.slice(7));
        
        } else {
            localStorage.setItem('postId', e.target.id.slice(4));
        }

        if (e.target.className.indexOf('subnav-link') >= 0) {
            this.getPost();
            window.location.reload();
        }
    }

    // Utloggning
    handleLogout(e) {

        // Förhidrar att sidan laddas om
        e.preventDefault();

        this.props.logout();
    }
}

// Exporterar komponenten
export default Post;