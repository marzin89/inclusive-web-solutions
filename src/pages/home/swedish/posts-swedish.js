import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostsSwedish() {
    const posts = useSelector((state) => state.post.swedish);
    const errorMessage = useSelector((state) => state.post.errorMessage);

    return (
        <section className="home-right">
            <h2 className="h2-home h2-font-size">Senaste nytt</h2>
            {posts ? posts.map((post, index) => {
                {index < 3 ? 
                    <article key={post.id}>
                        <h3 className="h3-font-size">{post.title}</h3>
                        <p className="date small-font-size">{post.date.slice(0, 10)}</p>
                        <p className="regular-font-size line-height">{post.content[0].slice(0, 150) 
                            + ' ...'}</p>
                        <p><Link id={`post${post.id}`} className="find-out-more regular-font-size 
                            focus focus-invisible" to={"/post"}>Läs mer</Link></p>
                    </article> : null}
            }) : <p className="error regular-font-size" role="alert">{errorMessage}</p>}
            {errorMessage ? null : <button id="posts-btn" role="link" 
                className="focus focus-invisible regular-font-size" onClick={() => 
                    window.open('/blog', '_self')}>Alla inlägg</button>}
        </section>
    );
}

export default PostsSwedish;
