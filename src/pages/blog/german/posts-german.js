// Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Rendrerar inlägg på tyska
class PostsGerman extends React.Component {
    constructor(props) {
        super(props);

        this.setState                  = this.setState.bind(this);
        this.handleLinkClick           = this.handleLinkClick.bind(this);
        this.renderPosts               = this.renderPosts.bind(this);
        this.renderPostsAccessible     = this.renderPostsAccessible.bind(this);

        this.state = {
            posts:        [],
            error:        false,
            errorMessage: '',
        }

        this.getPosts();
    }

    render () {
        return (
            <div id={localStorage.getItem('activeBlogPageGerman') ? 
                `page${localStorage.getItem('activeBlogPageGerman')}` : 'page1'}>
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
            let lastIndex = Number(localStorage.getItem('blogIndexGerman')) + 5;

            for (let i = localStorage.getItem('blogIndexGerman'); i < lastIndex; i++) {
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
                            Mehr</Link></p>
                </article>
            )
        })
    }

    getPosts() {
        fetch('https://iws-rest-api.herokuapp.com/posts')
        .then(response => response.json())
        .then(data => {
            if (!data.length) {
                this.setState({
                    error:        true,
                    errorMessage: 'Es wurden keine Posts gefunden.',
                })
            
            } else {
                let postArr   = [];

                data.forEach((post) => {
                    if (post.language == 'german') {
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
                error:        true,
                errorMessage: 'Ein Serverfehler ist aufgetreten. Es konnten keine Posts abgerufen werden. '
                                + 'Versuchen Sie es später erneut.',
            })
        })
    }

    handleLinkClick(e) {
        localStorage.setItem('postId', e.target.id.slice(4));
        
        
    }
}

// Exporterar komponenten
export default PostsGerman;