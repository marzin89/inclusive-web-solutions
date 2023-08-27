import React from 'react';
import PostGerman from './german/post-german';
import PostSwedish from './swedish/post-swedish';
import NavbarSwedish from './swedish/navbar-swedish';
import NavbarGerman from './german/navbar-german';
import CommentFormSwedish from './swedish/comment-form-swedish';
import CommentFormGerman from './german/comment-form-german';
import Comments from './comments';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

class Post extends React.Component {
    // const post = useSelector((state) => state.post.post);
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.getComments            = this.getComments.bind(this);
        this.checkIfPostHasComments = this.checkIfPostHasComments.bind(this);
        this.addComment             = this.addComment.bind(this);
        this.updatePost             = this.updatePost.bind(this);
        this.handleLogout           = this.handleLogout.bind(this);

        this.state = {
            comments:       [],
            errorMessage:   '',
            confirmMessage: '',
        }

        this.getComments();
    }

    render() {
        return (
            <main>
                <div className="row">
                    {/* Länkstig */}
                    {props.language == 'Deutsch' ?
                    <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                        <ul>
                            <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                                regular-font-size" to={"/"}>Home</Link>/</li>
                            <li><Link className="inactive-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/blog"}> Blog</Link>/</li>
                            <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/post"}> {/*post.title*/}</Link></li>
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
                        {display: 'none'}}><Link className="focus focus-invisible regular-font-size" 
                        to={"/post"} onClick={this.handleLogout}>Logga ut</Link></p>
                </div>   
                <div id="subpage">
                    {localStorage.getItem('language') == 'Deutsch' ? <NavbarGerman /> :
                        <NavbarSwedish />}
                    <div id="subpage-right">
                        {localStorage.getItem('language') == 'Deutsch' ? <PostGerman /> 
                            : <PostSwedish />}              
                        {localStorage.getItem('language') == 'Deutsch' ? 
                            <CommentFormGerman errorMessage={this.state.errorMessage} confirmMessage={this.state.confirmMessage} 
                                function={this.addComment} /> : 
                            <CommentFormSwedish errorMessage={this.state.errorMessage} confirmMessage={this.state.confirmMessage} 
                                function={this.addComment} />}
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
        const id  = localStorage.getItem('postId');
        let posts = [];
        let title;

        if (localStorage.getItem('language') == 'Deutsch') {
            posts = JSON.parse(localStorage.getItem('postsGerman'));

        } else {
            posts = JSON.parse(localStorage.getItem('postsSwedish'));
        }

        posts.map((post) => {
            if (post.id == id) {
                localStorage.setItem('title', post.title);
                title = post.title;
            }
        })

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
                // localStorage.setItem('commentArr', JSON.stringify(data)); 
        
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

    checkIfPostHasComments() {
        const id   = localStorage.getItem('postId');
        let result = false;

        this.state.comments.map((comment) => {
            if (comment.postId == id && comment.published) {
                result = true;
            }
        })

        return result;
    }

    addComment(body) {
        if (this.state.comments.length) {
            let comments = this.state.comments;

            comments.sort((a, b) => {
                return a.id - b.id;
            })

            body.id = comments[comments.length - 1].id + 1;
        
        } else {
            body.id = 1;
        }

        fetch('https://iws-rest-api.herokuapp.com/comments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
        .then(response => response.json())
        .then((data) => {
            const id = data.postId;
            this.updatePost(id);

            let comments = this.state.comments;
            comments.push(data);
            comments.reverse();

            this.setState({
                comments: comments,
            })

            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    confirmMessage:  'Ihr Kommentar wurde gesendet.',
                });
            
            } else {
                this.setState({
                    confirmMessage: 'Din kommentar har skickats.',
                });
            }
        })
        .catch(() => {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    errorMessage:  'Ein Serverfehler ist aufgetreten. ' +
                                    'Ihr Kommentar konnte leider nicht gesendet werden' +
                                    ' Versuchen Sie es später erneut.',
                })

            } else {
                this.setState({
                    errorMessage: 'Ett serverfel har uppstått. ' +
                                    'Det gick inte att skicka kommentaren. Försök igen senare.',
                })
            }
        })
    }

    updatePost(id) {
        fetch(`https://iws-rest-api.herokuapp.com/posts/id/${id}/comments/true`, {
            method:  'PUT',
            headers: {'Content-Type': 'application/json',},
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // Utloggning
    handleLogout() {
        this.props.logout();
    }
}

// Exporterar komponenten
export default Post;