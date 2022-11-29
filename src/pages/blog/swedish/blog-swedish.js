import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostsSwedish from './posts-swedish';
import ToggleBtnSwedish from './toggle-btn-swedish';
import { userActions } from '../../../store/slices/user-slice';

function BlogSwedish(props) {
    const posts = useSelector((state) => state.post.swedish);
    const errorMessage = useSelector((state) => state.post.errorMessage);
    const numberOfPages = useSelector((state) => state.post.numberOfPagesSwedish);
    const activePage = useSelector((state) => state.post.activeBlogPageSwedish);
    const buttons = [];
    const dispatch = useDispatch();

    if (numberOfPages > 1) {
        for (let i = 0; i < numberOfPages; i++) {
            if (i == activePage) {
                buttons.push(
                    <ToggleBtnSwedish activePage={activePage} className="focus focus-invisible-btns 
                        toggle-btn active-toggle-btn h3-font-size" aria-pressed="true" />
                );
            
            } else {
                buttons.push(
                    <ToggleBtnSwedish activePage={activePage} className="focus focus-invisible-btns 
                        toggle-btn inactive-toggle-btn h3-font-size" aria-pressed="false" />
                );
            }
        }
    }

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
                {numberOfPages > 1 ? <nav aria-label="Blogginlägg">
                    {buttons}</nav> : null}
            </section>
        </main>
    );
}

export default BlogSwedish;