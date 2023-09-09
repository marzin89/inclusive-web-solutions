import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../store/slices/user-slice';
import { Link } from 'react-router-dom';

function Breadcrumbs(props) {
    const isSignedIn = useSelector((state) => state.user.isSignedIn);
    const dispatch   = useDispatch();

    function logout(e) {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    return(
        <div className="row">
            <nav className="breadcrumbs" aria-label={props.language == 'Swedish' ? 'Länkstig' :
                'Brotkrümelnavigation'}>
                <ul>
                    {props.breadcrumbs.map((breadcrumb, index) => {
                        return(
                            <li><Link id={index == 0 ? 'first-breadcrumb' : ''} 
                                className={breadcrumb.isCurrentPage ? 'active-breadcrumb focus focus-invisible regular-font-size'
                                    : "inactive-breadcrumb focus focus-invisible regular-font-size"} 
                                        to={breadcrumb.path}>{breadcrumb.page}</Link>{breadcrumb.isCurrentPage ? '' : '/'}</li>
                        );
                    })}
                </ul>
            </nav>
            {isSignedIn && props.language == 'Swedish' ? 
                <p id="logout"><Link className="focus focus-invisible regular-font-size" to={props.currentPage} 
                    onClick={(e) => logout(e)}>Logga ut</Link></p> : null}
        </div>
    );
}

export default Breadcrumbs;