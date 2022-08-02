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
        this.getTitle               = this.getTitle.bind(this);
        this.getComments            = this.getComments.bind(this);
        this.checkIfPostHasComments = this.checkIfPostHasComments.bind(this);
        this.handleLogout           = this.handleLogout.bind(this);

        this.state = {
            posts:    this.props.posts,
            comments: [],
        }

        this.getComments();
        this.getTitle();
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
                            <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                                regular-font-size" to={"/"}>Home</Link>/</li>
                            <li><Link className="inactive-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/blog"}> Blog</Link>/</li>
                            <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/post"}> {localStorage.getItem('title')}</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                                regular-font-size" to={"/"}>Start</Link>/</li>
                            <li><Link className="inactive-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/blog"}> Blogg</Link>/</li>
                            <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/post"}>{localStorage.getItem('title')}</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="focus focus-invisible regular-font-size" to={"/login"} 
                        onClick={this.handleLogout}>Logga ut</Link></p>
                </div>   
                <div id="subpage">
                    {localStorage.getItem('language') == 'Deutsch' ? <NavbarGerman /> :
                        <NavbarSwedish />}
                    <div id="subpage-right">
                        {localStorage.getItem('language') == 'Deutsch' ? <PostGerman posts={this.state.posts} /> 
                            : <PostSwedish posts={this.state.posts} />}              
                        {localStorage.getItem('language') == 'Deutsch' ? 
                            <CommentFormGerman comments={this.state.comments} /> : 
                            <CommentFormSwedish comments={this.state.comments} />}
                        <section id="comment-section">
                            <h2 className="h2-font-size">{localStorage.getItem('language') == 'Deutsch' ? 
                                'Kommentare' : 'Kommentarer'}</h2> 
                            {this.checkIfPostHasComments() ? <Comments comments={this.state.comments} />
                                : <p className="error regular-font-size" style={{display: 'block'}}>
                                    {localStorage.getItem('language') == 'Deutsch' ?
                                    'Schreiben Sie den ersten Kommentar' : 'Skriv den första kommentaren'}</p>}
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
            localStorage.setItem('commentArr', JSON.stringify(data)); 
    
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

    getTitle() {
        const id = localStorage.getItem('postId');

        this.props.posts.map((post) => {
            if (post.id == id) {
                localStorage.setItem('title', post.title);
            }
        })
    }

    checkIfPostHasComments() {
        const id   = localStorage.getItem('postId');
        let result = false;

        this.state.comments.map((comment) => {
            if (comment.postId == id && comment.published) {
                result = true;
            }
        })

        console.log(result);
        return result;
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