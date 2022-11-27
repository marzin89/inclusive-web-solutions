import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { solutionActions } from '../../../store/slices/solution-slice';

function SolutionsGerman() {
    const solutions = useSelector((state) => state.solution.german);
    const errorMessage = useSelector((state) => state.solution.errorMessage);
    const dispatch = useDispatch();

    function handleLinkClick(e) {
        dispatch(solutionActions.setSolution(e.target.id.slice(8)));
    }

    return (
        <section id="solutions">
            <h2 className="h2-font-size h2-services">Entwicklung</h2>
            <div className="row-services">
                {solutions.length ? solutions.map((solution) => {
                    return (
                        <article key={solution.id} className="solution">
                            <h3 className="h3-font-size">{solution.name}</h3>
                            <p className="regular-font-size line-height">{solution.description[0]}</p>
                            {solution.imageUrl ? <img className="service-image" src={solution.imageUrl} 
                                alt={solution.altText}></img> : null}
                            <p><Link id={`solution${solution.id}`} className="find-out-more regular-font-size 
                                focus focus-invisible" to={"/solution"} onClick={(e) => handleLinkClick(e)}>
                                    Mehr</Link></p>
                        </article>
                    );
                }) : <p className="error-services regular-font-size" role="alert">
                        {errorMessage}</p>}
            </div>
        </section>    
    );
}

export default SolutionsGerman;