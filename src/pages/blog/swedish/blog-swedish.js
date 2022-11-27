import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostsSwedish from './swedish/posts-swedish';
import { postActions } from '../../../store/slices/post-slice';
import { userActions } from '../../../store/slices/user-slice';

function BlogSwedish(props) {
    const posts = useSelector((state) => state.post.swedish);
    const errorMessage = useSelector((state) => state.post.errorMessage);
    const dispatch = useDispatch();

    function logout(e) {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    useEffect(() => {
        document.title = 'Blogg';
    });

    return (
        <main>
            <div className="row">
                {/* Länkstig */}
                <nav className="breadcrumbs" aria-label="Länkstig">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus 
                            focus-invisible regular-font-size" to={"/"}>Start</Link>/</li>
                        <li><Link className="active-breadcrumb focus focus-invisible 
                            regular-font-size" to={"/blog"}> Blogg</Link></li>
                    </ul>
                </nav>
                {props.isSignedIn ? <p id="logout">
                    <Link className="focus focus-invisible regular-font-size" to={"/blog"} 
                        onClick={(e) => logout(e)}>Logga ut</Link></p> : null}
            </div>
            <section id="blog">
                <h1 id="main" className="h1-font-size">Blogg</h1>
                {posts.length ? <PostsSwedish /> : <p className="error regular-font-size" 
                    role="alert">{errorMessage}</p>}
                {posts.length > 5 ? <nav aria-label="Blogginlägg">
                    {this.toggleBtnsSwedish()}</nav> : null}
            </section>
        </main>
    );

    toggleBtnsSwedish() {
        let buttons = [];

        if (this.state.numberOfPagesSwedish > 1) {
            for (let i = 1; i <= this.state.numberOfPagesSwedish; i++) {
                if (i == 1) {
                    if (localStorage.getItem('activeBlogPageSwedish') == 1 || !localStorage.getItem('activeBlogPageSwedish')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn active-toggle-btn h3-font-size"
                        aria-pressed="true" onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
                        aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
                    }
                } else {
                    if (localStorage.getItem('activeBlogPageSwedish') != i || !localStorage.getItem('activeBlogPageSwedish')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
                        aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else if (i == localStorage.getItem('activeBlogPageSwedish')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn active-toggle-btn h3-font-size"
                        aria-pressed="true" onClick={this.handleBtnClick}>{i}</button>);
                    }
                }
            }
        
        }

        return buttons;
    }

    handleBtnClick(e) {
        const id      = e.target.id.slice(3);
        const buttons = document.getElementsByClassName('toggle-btn');

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].innerHTML == id) {
                buttons[i].className = 'focus toggle-btn active-toggle-btn h3-font-size';
                buttons[i].setAttribute('aria-pressed', true);

            } else {
                buttons[i].className = 'focus toggle-btn inactive-toggle-btn h3-font-size';
                buttons[i].setAttribute('aria-pressed', false);
            }
        }

        if (localStorage.getItem('language') == 'Deutsch') {
            this.togglePostsGerman(id);
        
        } else {
            this.togglePostsSwedish(id);
        }
    }

    togglePostsSwedish(id) {
        if (id == 1) {
            localStorage.setItem('blogIndexSwedish', 0);
            localStorage.setItem('activeBlogPageSwedish', 1);

            this.setState({
                index:      0,
                activePage: 1,
            })
        
        } else {
            localStorage.setItem('blogIndexSwedish', (id - 1) * 5);
            localStorage.setItem('activeBlogPageSwedish', id);

            this.setState({
                index:      (id - 1) * 5,
                activePage: id,
            })
        }
    }
}

export default BlogSwedish;