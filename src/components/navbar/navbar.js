import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import testActions from '../../store/slices/test-slice';
import solutionActions from '../../store/slices/solution-slice';
import courseActions from '../../store/slices/course-slice';

function Navbar(props) {
    const services = useSelector((state) => {
        if (props.service == 'test') {
            return state.test.tests;
        
        } else if (props.service == 'solution') {
            return state.solution.solutions;
        
        } else {
            return state.course.courses;
        }
    });
    const dispatch = useDispatch();
    let ariaLabel;

    if (props.service == 'test') {
        ariaLabel = props.language == 'Swedish' ? 'Undermeny med tester' : 'Unternavigation mit Tests';
    
    } else if (props.service == 'solution') {
        ariaLabel = props.language == 'Swedish' ? 'Undermeny med utvecklingspaket' : 'Unternavigation mit Developments';
    
    } else {
        ariaLabel = props.language == 'Swedish' ? 'Undermeny med utbildningar' : 'Unternavigation mit Vorlesungen';
    }

    function handleLinkClick(e) {
        if (props.service == 'test') {
            dispatch(testActions.setTest(e.target.id));
        
        } else if (props.service == 'solution') {
            dispatch(solutionActions.setSolution(e.target.id));
        
        } else {
            dispatch(courseActions.setCourse(e.target.id));
        }
    }

    return (
        <nav id="subnav" aria-label={ariaLabel}>
            <ul>
                <li id="subnav-first-item"><Link className="focus focus-invisible regular-font-size" 
                    to={'/services'}>{props.language == 'Swedish' ? 'Tjänster' : 'Dienstleistungen'}</Link></li>
                {services.map((service) => {
                    return(
                        <li key={test.id} id={service.id == props.id ? 'open-subpage' : ''}>
                            <Link id={test.id} className="focus focus-invisible regular-font-size subnav-link" 
                                to={`/${props.service}`} onClick={() => handleLinkClick()}>{service.name}</Link></li>
                    );
                })}
            </ul>
        </nav>
    );
                /*
    renderNavbar() {
        let tests = localStorage.getItem('testsSwedish');
        tests     = JSON.parse(tests);

        let links = [];

        tests.map((test) => {
            if (test.id == localStorage.getItem('serviceId')) {
                links.push(<li key={test.id} id="open-subpage"><Link id={`test${test.id}`} 
                    className="focus focus-invisible regular-font-size subnav-link open-subpage-link" 
                    to={'/test'} onClick={this.handleLinkClick}>{test.name}</Link></li>);
            
            } else {
                if (test.language == 'swedish') {
                    links.push(<li key={test.id}><Link id={`test${test.id}`} className="focus focus-invisible
                    regular-font-size subnav-link" to={'/test'} onClick={this.handleLinkClick}>
                        {test.name}</Link></li>);
                
                }
            }
        })

        let navbar =
            <nav id="subnav" aria-label="Undermeny med tester">
                <ul>
                    <li id="subnav-first-item"><Link className="focus focus-invisible regular-font-size" 
                        to={'/services'}>Tjänster</Link></li>
                    {links}
                </ul>
            </nav>

        return navbar;
    }
    */
}

export default Navbar;