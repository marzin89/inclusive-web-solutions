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
    const service                             = useState('');
    const tests     = useSelector((state) => state.test.tests);
    const solutions = useSelector((state) => state.solution.solutions);
    const courses   = useSelector((state) => state.course.courses);
    const dispatch  = useDispatch();

    return (
        <div id="main" className="admin-form">
            <h2 className="h2-admin">{props.service}</h2>
            <ServiceForm errorMessage={errorMessage} confirmMessage={confirmMessage} service={props.service}
                post={addService} put={updateService} />
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
        scrollComponent(e.target.className == 'edit' ? formRef : resetBtnRef);
        setId(e.target.id);

        

        if (e.target.className == 'edit') {
            populateForm(e.target.id);
        
        } else {  
            localStorage.setItem('searchId', getForeignKey());
            deleteService(id);
        }
    }

    function getForeignKey() {
        let service = this.props.service.slice(0, -1);
        const foreignKey = props.search.find((page) => page.foreignKey.indexOf(id) >= 0);
        return foreignKey;
    }

    async function getService() {
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

    async function addService(body) {
        const response = await fetch(`https://iws-rest-api.herokuapp.com/${props.service}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })

        if (response.status != 200) {
            setErrorMessage(`Ett serverfel har uppstått. Det gick inte att lägga till 
                ${props.serviceSE.toLowerCase()}. Försök igen lite senare.`);
            setConfirmMessage('');
            return;
        }

        const data = await response.json();
        props.addSearch(body);

        if (props.service == 'tests') {
            dispatch(testActions.setTests(data));
        }

        if (props.service == 'solutions') {
            dispatch(solutionActions.setSolutions(data));
        }

        if (props.service == 'courses') {
            dispatch(courseActions.setCourses(data))
        }

        setConfirmMessage(`${props.serviceSE} har lagts till.`);
    }

    async function updateService(id, body) {
        const response = await fetch(`https://iws-rest-api.herokuapp.com/${props.service}/id/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        });

        if (response.status != 200) {
            setErrorMessage(`Ett serverfel har uppstått. Det gick inte att uppdatera 
                ${props.serviceSE.toLowerCase()}. Försök igen lite senare.`);
            setConfirmMessage('');
            return;
        }

        const data = await response.json();
        props.updateSearch(body);
        updateStore(data);
        setConfirmMessage(`${props.serviceSE} har uppdaterats.`);
    }

    async function deleteService(id) {
        const response = await fetch(`https://iws-rest-api.herokuapp.com/${props.service}/id/${id}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        });

        if (!response.status != 200) {
            setErrorMessage(`Ett serverfel har uppstått. Det gick inte att radera 
                ${props.serviceSE.toLowerCase()}. Försök igen lite senare.`);
            setConfirmMessage('');
            return;
        }

        const data = await response.json();
        props.deleteSearch();
        updateStore(data);
        setConfirmMessage('Testet har raderats.');
    }

    function updateStore(data) {
        if (props.service == 'tests') {
            dispatch(testActions.setTests(data));
        }

        if (props.service == 'solutions') {
            dispatch(solutionActions.setSolutions(data));
        }

        if (props.service == 'courses') {
            dispatch(courseActions.setCourses(data))
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