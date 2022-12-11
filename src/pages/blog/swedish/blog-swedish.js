import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostsSwedish from './swedish/posts-swedish';
import ToggleBtnSwedish from './toggle-btn-swedish';
import { userActions } from '../../../store/slices/user-slice';
import { render } from '@testing-library/react';

function BlogSwedish(props) {
    const posts = useSelector((state) => state.post.swedish);
    const numberOfPages = useSelector((state) => state.post.numberOfPagesSwedish);
    const errorMessage = useSelector((state) => state.post.errorMessage);
    const dispatch = useDispatch();

    function logout(e) {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    function renderToggleBtns() {
        const toggleBtns = [];

        for (let i = 0; i < numberOfPages; i++) {
            toggleBtns.push(<ToggleBtnSwedish index={i} />);
        }

        return toggleBtns;
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
                {numberOfPages > 1 ? <nav aria-label="Blogginlägg">{renderToggleBtns()}</nav> : null}
            </section>
        </main>
    );
}

export default BlogSwedish;