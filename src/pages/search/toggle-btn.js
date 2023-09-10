import { useSelector, useDispatch } from 'react-redux';
import { pageActions } from '../../store/slices/page-slice';

function ToggleBtn(props) {
    const activePage = useSelector((state) => props.language == 'Swedish' ? 
        state.page.activeSearchPageSwedish : state.page.activeSearchPageGerman);
    const dispatch = useDispatch();

    function handleLinkClick(e) {
        e.preventDefault();
        const id = e.target.innerHTML;

        if (props.language == 'Swedish') {
            dispatch(pageActions.toggleSwedish(id));
        
        } else {
            dispatch(pageActions.toggleGerman(id));
        }
    }

    return (
        <button key={props.index + 1} id={`btn${props.index + 1}`} 
            className={`focus focus-invisible-btns toggle-btn ${props.index + 1 == 
                activePage ? 'active-toggle-btn' : 'inactive-toggle-btn'} h3-font-size`}
                    aria-pressed={props.index + 1 == activePage ? true : false} 
                        onClick={(e) => handleLinkClick(e)}>{props.index + 1}</button>
    );
}

export default ToggleBtn;