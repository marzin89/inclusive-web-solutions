import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { testActions } from '../../../store/slices/test-slice';
import { solutionActions } from '../../../store/slices/solution-slice';
import { courseActions } from '../../../store/slices/course-slice';
import { postActions } from '../../../store/slices/post-slice';

function SearchResultsGerman() {
    const activePage = useSelector((state) => state.page.activeSearchPageGerman);
    const page = useSelector((state) => state.page.pageGerman);
    const dispatch = useDispatch();

    function handleLinkClick(e) {
        let id;

        switch(e.target.id) {
            case e.target.id.indexOf('test') >= 0:
                id = e.target.id.slice(4);
                dispatch(testActions.setTest(id));
            break;

            case e.target.id.indexOf('solution') >= 0:
                id = e.target.id.slice(8);
                dispatch(solutionActions.setSolution(id));
            break;

            case e.target.id.indexOf('course') >= 0:
                id = e.target.id.slice(6);
                dispatch(courseActions.setCourse(id));
            break;

            case e.target.id.indexOf('post') >= 0:
                id = e.target.id.slice(4);
                dispatch(postActions.setPost(id));
            break;
        }
    }

    return (
        <div id={activePage ? `page${activePage}` : `page1`}>
            {page.map((result) => {
                return (
                    <article key={result.id}>
                        <h2 className="h2-font-size">{result.title}</h2>
                        <p className="regular-font-size line-height">{result.content.slice(0, 150) 
                            + ' ...'}</p>
                        <p><Link id={result.foreignKey ? result.foreignKey : null} className="find-out-more 
                            regular-font-size focus focus-invisible" to={`${result.path}`} 
                                onClick={(e) => handleLinkClick(e)}>Mehr</Link></p>
                    </article>
                );
            })}
        </div>
    );
}

export default SearchResultsGerman;