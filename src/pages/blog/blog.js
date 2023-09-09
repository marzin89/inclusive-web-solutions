import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Posts from './post';
import ToggleBtn from './toggle-btn';

function Blog(props) {
    const posts         = useSelector((state) => props.language == 'Swedish' ? 
        state.post.swedish : state.post.german);
    const numberOfPages = useSelector((state) => props.language == 'Swedish' ? 
        state.post.numberOfPagesSwedish : state.post.numberOfPagesGerman);
    const errorMessage  = useSelector((state) => state.post.errorMessage);

    const mainPage    = props.language == 'Swedish' ? 'Start' : 'Home';
    const currentPage = props.language == 'Swedish' ? 'Blogg' : 'Blog';
    const ariaLabel   = props.language == 'Swedish' ? 'Blogginlägg' : 'Blog-Posts';

    const breadcrumbs =
    [
        {
            page: mainPage,
            path: '/',
            isCurrentPage: false,
        },
        {
            page: currentPage,
            path: '/blog',
            isCurrentPage: true,
        }
    ];

    function renderToggleBtns() {
        const toggleBtns = [];

        for (let i = 0; i < numberOfPages; i++) {
            toggleBtns.push(<ToggleBtn language={props.language} />);
        }

        return toggleBtns;
    }

    useEffect(() => {
        document.title = currentPage;
    });

    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} currentPage={currentPage}
                language={props.language} />
            <section id="blog">
                <h1 id="main" className="h1-font-size">{currentPage}</h1>
                {posts.length ? <Posts language={props.language} /> : <p className="error regular-font-size" 
                    role="alert">{errorMessage}</p>}
                {numberOfPages > 1 ? <nav aria-label={ariaLabel}>{renderToggleBtns()}</nav> : null}
            </section>
        </main>
    );
}

export default Blog;