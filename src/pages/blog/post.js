import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '../../store/slices/post-slice';

function Posts(props) {
    const activePage = useSelector((state) => props.language == 'Swedish' ? 
        state.post.activeBlogPageSwedish : state.post.activeBlogPageGerman);
    const page = useSelector((state) => props.language == 'Swedish' ? 
        state.post.pageSwedish : state.post.pageGerman);
    const dispatch = useDispatch();

    function handleLinkClick(e) {
        const id = e.target.slice(4);
        dispatch(postActions.setPost(id));
    }

    return (
        <div id={activePage ? `page${activePage}` : 'page1'}>
            {page.map((post) => {
                return (
                    <article key={post.id} className="post">
                        <h2 className="h2-font-size">{post.title}</h2>
                        <p className="date small-font-size">{post.date.slice(0, 10)}</p>
                        <p className="regular-font-size line-height">{post.content[0].slice(0, 150) 
                            + ' ...'}</p>
                        {post.imageUrl ? <img src={post.imageUrl} alt={post.altText}></img> : null}
                        <p><Link id={`post${post.id}`} className="find-out-more regular-font-size focus focus-invisible" 
                            href="" to={"/post"} onClick={(e) => handleLinkClick(e)}>
                                {props.language == 'Swedish' ? 'Läs mer' : 'Mehr'}</Link></p>
                    </article>
                );
            })}
        </div>
    );
}

export default Posts;