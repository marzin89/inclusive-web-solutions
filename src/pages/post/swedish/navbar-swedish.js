// Imports
import React from 'react';
import { Link } from 'react-router-dom';

class NavbarSwedish extends React.Component {
    // Konstruktor
    constructor() {
        super();

        // Binder this till funktionerna
        this.renderNavbar    = this.renderNavbar.bind(this);
        this.getPost         = this.getPost.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    render() {
        return (
            this.renderNavbar()
        )
    }

    renderNavbar() {        
        let posts = localStorage.getItem('postsSwedish');
        posts     = JSON.parse(posts);

        let links = [];

        posts.map((post) => {
            if (post.id == localStorage.getItem('postId')) {
                links.push(<li key={post.id} id="open-subpage"><Link id={`post${post.id}`}
                    className="focus focus-invisible regular-font-size subnav-link open-subpage-link" 
                    to={'/post'} onClick={this.handleLinkClick}>{post.title}</Link></li>);
            
            } else {
                if (post.language == 'swedish') {
                    links.push(<li key={post.id}><Link id={`post${post.id}`} className="focus 
                    focus-invisible regular-font-size subnav-link" to={'/post'} onClick={this.handleLinkClick}>
                        {post.title}</Link></li>);
                }
            }
        })

        let navbar =
            <nav id="subnav" aria-label="Blogginlägg">
                <ul>
                    <li id="subnav-first-item"><Link className="focus focus-invisible regular-font-size" 
                        to={'/blog'}>Blogg</Link></li>
                    {links}
                </ul>
            </nav>


        return navbar;
    }

    // Funktionen hämtar alla publicerade inlägg
    getPost() {
        let posts = localStorage.getItem('postsSwedish');
        posts     = JSON.parse(posts);

        posts.map((post) => {
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

    handleLinkClick(e) {
        localStorage.setItem('postId', e.target.id.slice(4));
        
        this.getPost();
        window.location.reload();
    }
}

export default NavbarSwedish;