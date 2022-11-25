import { Link } from 'react-router-dom';
import StaticSwedish from './static-swedish';
import PostsSwedish from './posts-swedish';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/slices/user-slice';

function HomeSwedish(props) {
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
            <div className="row">
                {props.isSignedIn ? <p id="logout">
                    <Link className="focus focus-invisible regular-font-size" to={"/home"} 
                        onClick={() => logout(e)}>Logga ut</Link></p> : null}
            </div>
            <div className="row">
                <StaticSwedish />
                <PostsSwedish />
            </div>
        </main>
    );
}

export default HomeSwedish;