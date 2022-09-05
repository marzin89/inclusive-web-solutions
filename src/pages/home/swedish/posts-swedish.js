// Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Rendrerar inlägg på svenska
class PostsSwedish extends React.Component {
    constructor(props) {
        super(props);

        this.setState                  = this.setState.bind(this);
        this.handleLinkClick           = this.handleLinkClick.bind(this);
        this.renderPosts               = this.renderPosts.bind(this);
        // this.renderPostsAccessible     = this.renderPostsAccessible.bind(this);

        this.state = {
            posts:        [],
            errorMessage: '',
        }

        this.getPosts();
    }

    render () {
        return (
            <section className="home-right">
                <h2 className="h2-home h2-font-size">Senaste nytt</h2>
                {this.state.posts ? this.renderPosts() : null}
                <p className="error regular-font-size" role="alert" style={this.state.errorMessage ?
                    {display: 'block'} : {display: 'none'}}>{this.state.errorMessage}</p>
                <button id="posts-btn" role="link" className="focus focus-invisible regular-font-size"
                    onClick={() => window.open('/blog', '_self')} style={this.state.errorMessage ? 
                    {display: 'none'} : {display: 'block'}}>Alla inlägg</button>
            </section>
        )
    }

    renderPosts() {
        let posts = [];

        this.state.posts.map((post) => {
            posts.push(
                <article key={post.id}>
                    <h3 className="h3-font-size">{post.title}</h3>
                    <p className="date small-font-size">{post.date.slice(0, 10)}</p>
                    <p className="regular-font-size line-height">{post.content[0].slice(0, 150) + ' ...'}</p>
                    <p><Link id={`post${post.id}`} className="find-out-more regular-font-size 
                        focus focus-invisible" to={"/post"} onClick={this.handleLinkClick}>Läs mer</Link></p>
                </article>
            )
        })

        // this.renderPostsAccessible(posts);
        return posts;
    }

    /*
    renderPostsAccessible(posts) {
        this.state.posts.map((post) => {
            posts.push(
                <article key={post.id}>
                    <h3 className="h3-font-size">{post.title}</h3>
                    <p className="date small-font-size">{post.date.slice(0, 10)}</p>
                    <p className="regular-font-size line-height">{post.content[0].slice(0, 150) + ' ...'}</p>
                    <p><Link id={`post${post.id}`} className="find-out-more regular-font-size 
                        focus focus-invisible" to={"/post"} onClick={this.handleLinkClick}>Läs mer</Link></p>
                </article>
            )
        })
    }
    */

    getPosts() {
        fetch('https://iws-rest-api.herokuapp.com/posts')
        .then(response => response.json())
        .then(data => {
            if (!data.length) {
                this.setState({
                    error:        true,
                    errorMessage: 'Inga inlägg hittades.',
                })
            
            } else {
                let filterArr = [];
                let postArr   = [];

                data.forEach((post) => {
                    if (post.language == 'swedish') {
                        filterArr.push(post);
                    
                    }
                });

                localStorage.setItem('postsSwedish', JSON.stringify(filterArr));

                for (let i = 0; i < 3; i++) {
                    if (filterArr[i]) {
                        postArr.push(filterArr[i]);
                    }
                }

                this.setState({
                    error: false,
                    posts: postArr,
                })
            }
        })
        .catch(() => {
            this.setState({
                error:         true,
                errorMessage:  'Ett serverfel har uppstått. Det gick inte att hämta inlägg.' 
                                + 'Försök igen lite senare.',
            })
        })
    }

    handleLinkClick(e) {
        localStorage.setItem('postId', e.target.id.slice(4));

        if (localStorage.getItem('language') == 'Deutsch') {
            document.title = 'Blog';
        
        } else {
            document.title = 'Blogg';
        }
        
    }
}

// Exporterar komponenten
export default PostsSwedish;
