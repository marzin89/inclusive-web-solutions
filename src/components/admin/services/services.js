import { useState, useRef } from 'react';
import ServiceForm from './service-form';
import RenderServices from './render-services';
import testActions from '../../../store/slices/test-slice';
import solutionActions from '../../../store/slices/solution-slice';
import courseActions from '../../../store/slices/course-slice';
import { useSelector, useDispatch } from 'react-redux';

function Services(props) {
    const formRef     = useRef();
    const resetBtnRef = useRef();
    const [id, setId]                         = useState('');
    const [errorMessage, setErrorMessage]     = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');
    const tests     = useSelector((state) => state.test.tests);
    const solutions = useSelector((state) => state.solution.solutions);
    const courses   = useSelector((state) => state.course.courses);
    const dispatch  = useDispatch();

    return (
        <div id="main" className="admin-form">
            <h2 className="h2-admin">{props.service}</h2>
            <ServiceForm errorMessage={errorMessage} confirmMessage={confirmMessage} service={props.service} />
            <RenderServices function={handleLinkClick} />
        </div>
    );

    function scrollComponent(ref) {
        ref.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    function handleLinkClick(e) {
        e.preventDefault();
        setCrudAction(e.target.className);
        scrollComponent(e.target.className == 'edit' ? formRef : resetBtnRef);
        setId(e.target.id);

        if (e.target.className == 'edit') {
            populateForm(e.target.id);
        
        } else {  
            localStorage.setItem('searchId', getForeignKey());
            props.delete(id);
        }
    }

    function getForeignKey() {
        let service = this.props.service.slice(0, -1);
        const foreignKey = props.search.find((page) => page.foreignKey.indexOf(id) >= 0);
        return foreignKey;
    }

    async function get() {
        const response = await fetch(`https://iws-rest-api.herokuapp.com/${props.service}/admin`);
        
        if (response.status != 200) {
            if (response.status == 404) {
                setErrorMessage(`Inga ${props.serviceSE.toLowerCase()} hittades.`);
            
            } else if (response.status == 500) {
                setErrorMessage(`Ett serverfel har uppstått. Det gick inte att hämta 
                    ${props.serviceSE.toLowerCase()}. Försök igen lite senare.`);
            }

            return;
        }

        setErrorMessage('');
        const data = await response.json();

        if (props.service == 'tests' && tests.length == 0) {
            dispatch(testActions.setTests(data));
        }

        if (props.service == 'solutions' && solutions.length == 0) {
            dispatch(solutionActions.setSolutions(data));
        }

        if (props.service == 'courses' && courses.length == 0) {
            dispatch(courseActions(data));
        }
    }

    function upload(image, name) {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'iws_upload')
        data.append('cloud_name', 'inclusivewebsolutions')
        data.append('folder', props.service)
        data.append('public_id', name)

        fetch('https://api.cloudinary.com/v1_1/inclusivewebsolutions/image/upload', {
            method: 'POST',
            body:   data,
        })
        .then(response => response.json())
        .then(data => {
            /*
            this.setState({
                imageUrl: data.url.replace('http', 'https'),
            })
            */
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export default Services;