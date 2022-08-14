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
        this.renderPostsAccessible     = this.renderPostsAccessible.bind(this);

        this.state = {
            posts:        [],
            errorMessage: this.props.errorMessage,
        }

        this.getPosts();
    }

    render () {
        return (
            <div id={localStorage.getItem('activeBlogPageSwedish') ? 
                `page${localStorage.getItem('activeBlogPageSwedish')}` : 'page1'}>
                {this.renderPosts()}
                <p className="error regular-font-size" role="alert" style={this.state.errorMessage ?
                    {display: 'block'} : {display: 'none'}}>{this.state.errorMessage}</p>
            </div>
        )
    }

    renderPosts() {
        let posts = [];
        let page  = []; 

        if (this.state.posts.length) {
            let lastIndex = Number(localStorage.getItem('blogIndexSwedish')) + 5;

            for (let i = localStorage.getItem('blogIndexSwedish'); i < lastIndex; i++) {
                if (this.state.posts[i]) {
                    posts.push(this.state.posts[i])
                
                } else {
                    break;
                } 
            }
        }

        this.renderPostsAccessible(posts, page);
        return page;
    }

    renderPostsAccessible(posts, page) {
        posts.forEach((post) => {
            page.push(
                <article key={post.id} className="post">
                    <h2 className="h2-font-size">{post.title}</h2>
                    <p className="date small-font-size">{post.date.slice(0, 10)}</p>
                    <p className="regular-font-size line-height">{post.content[0].slice(0, 150) + ' ...'}</p>
                    {post.imageUrl ? <img src={post.imageUrl} alt={post.altText}></img> : null}
                    <p><Link id={`post${post.id}`} className="find-out-more regular-font-size 
                        focus focus-invisible" href="" to={"/post"} onClick={this.handleLinkClick} >
                            Läs mer</Link></p>
                </article>
            )
        })
    }

    getPosts() {
        let posts = localStorage.getItem('postsSwedish');
        posts     = JSON.parse(posts);

        this.setState({
            posts: posts,
        })

        fetch('https://iws-rest-api.herokuapp.com/posts')
        .then(response => response.json())
        .then(data => {
            if (!data.length) {
                this.setState({
                    error:        true,
                    errorMessage: 'Inga inlägg hittades.',
                })
            
            } else {
                let postArr   = [];

                data.forEach((post) => {
                    if (post.language == 'swedish') {
                        postArr.push(post);
                    
                    }
                });

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
    }
}

// Exporterar komponenten
export default PostsSwedish;
