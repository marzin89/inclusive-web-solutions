import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { courseActions } from '../../store/slices/course-slice';

function Courses(props) {
    const courses = useSelector((state) => props.language == 'Swedish' ? 
        state.course.swedish : state.course.german);
    const errorMessage = useSelector((state) => state.course.errorMessage);
    const dispatch = useDispatch();

    function handleLinkClick(e) {
        dispatch(courseActions.setCourse(e.target.id.slice(8)));
    }

    return (
        <section id="courses">
            <h2 className="h2-font-size h2-services">
                {props.language == 'Swedish' ? 'Utbildning' : 'Kurse'}</h2>
            <div className="row-services">
                {courses.length ? courses.map((course) => {
                    return (
                        <article key={course.id} className="course">
                            <h3 className="h3-font-size">{course.name}</h3>
                            <p className="regular-font-size line-height">{course.description[0]}</p>
                            {course.imageUrl ? <img className="service-image" src={course.imageUrl} 
                                alt={course.altText}></img> : null}
                            <p><Link id={`course${course.id}`} className="find-out-more regular-font-size 
                                focus focus-invisible" to={"/course"} onClick={(e) => handleLinkClick(e)}>
                                    {props.linkText}</Link></p>
                        </article>
                    );
                }) : <p className="error-services regular-font-size" role="alert">
                        {errorMessage}</p>}
            </div>
        </section>    
    );
}

export default Courses;