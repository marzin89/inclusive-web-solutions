import { useSelector } from 'react-redux';

function BreadCrumbs(props) {
    const isSignedIn = useSelector((state) => state.user.isSignedIn);
    const language = useSelector((state) => state.page.language);

    return(
        <div className="row">
            <nav className="breadcrumbs" aria-label={language == 'Swedish' ? 'Länkstig' :
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
            {isSignedIn ? <p id="logout"><Link className="focus focus-invisible regular-font-size" 
                to={props.currentPage} onClick={(e) => logout(e)}>Logga ut</Link></p> : null}
        </div>
    );
}

export default BreadCrumbs;