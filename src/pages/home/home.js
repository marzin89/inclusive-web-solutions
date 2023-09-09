import { Link } from 'react-router-dom';
import StaticSwedish from './swedish/static-swedish';
import StaticGerman from './german/static-german';
import Posts from './posts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/slices/user-slice';

function Home(props) {
    const dispatch = useDispatch();

    function logout(e) {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    useEffect(() => {
        document.title = 'Start';
    });

    return (
        <main id="main">
            {props.language == 'Swedish' && props.isSignedIn ?
            <div className="row">
                <p id="logout">
                    <Link className="focus focus-invisible regular-font-size" to={"/home"} 
                        onClick={(e) => logout(e)}>Logga ut</Link></p>
            </div> : null}
            <div className="row">
                {props.language == 'Swedish' ? <StaticSwedish /> : <StaticGerman />}           
                <Posts language={props.language} />
            </div>
        </main>
    );
}

export default Home;