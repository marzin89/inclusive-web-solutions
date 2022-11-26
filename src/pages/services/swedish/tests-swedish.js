import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { testActions } from '../../../store/slices/test-slice';

function TestsSwedish() {
    const tests = useSelector((state) => state.test.swedish);
    const errorMessage = useSelector((state) => state.test.errorMessage);
    const dispatch = useDispatch();

    function handleLinkClick(e) {
        dispatch(testActions.setTest(e.target.id.slice(4)));
    }

    return (
        <section id="tests">
            <h2 className="h2-font-size h2-services">Tester</h2>
            <div className="row-services">
                {tests.length ? tests.map((test) => {
                    return (
                        <article key={test.id} className="test">
                            <h3 className="h3-font-size">{test.name}</h3>
                            <p className="regular-font-size line-height">{test.description[0]}</p>
                            {test.imageUrl ? <img className="service-image" src={test.imageUrl} 
                                alt={test.altText}></img> : null}
                            <p><Link id={`test${test.id}`} className="find-out-more regular-font-size 
                                focus focus-invisible" to={"/test"} onClick={(e) => handleLinkClick(e)}>
                                    Läs mer</Link></p>
                        </article>
                    );
                }) : <p className="error-services regular-font-size" role="alert">
                        {errorMessage}</p>}
            </div>
        </section>    
    );
}

export default TestsSwedish;