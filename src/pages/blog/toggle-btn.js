import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '../../store/slices/post-slice';

function ToggleBtn(props) {
    const activePage = useSelector((state) => props.language == 'Swedish' ? 
        state.post.activeBlogPageSwedish : state.post.activeBlogPageGerman);
    const dispatch = useDispatch();

    function handleLinkClick(e) {
        e.preventDefault();
        const id = e.target.innerHTML;

        if (props.language == 'Swedish') {
            dispatch(postActions.toggleSwedish(id));   
        
        } else {
            dispatch(postActions.toggleGerman(id));
        }
    }

    return (
        <button key={props.index + 1} id={`btn${props.index + 1}`} 
            className={ `focus focus-invisible-btns toggle-btn ${props.index + 1 == 
                activePage ? 'active-toggle-btn' : 'inactive-toggle-btn'} h3-font-size`}
                    aria-pressed={props.index + 1 == activePage ? true : false}
                        onClick={(e) => handleLinkClick(e)}>{props.index + 1}</button>
    );
    
    /*
    if (i == 1) {
        if (localStorage.getItem('activeBlogPageSwedish') == 1 || !localStorage.getItem('activeBlogPageSwedish')) {
            buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn active-toggle-btn h3-font-size"
            aria-pressed="true" onClick={this.handleBtnClick}>{i}</button>);
        
        } else {
            buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
            aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
        }
    } else {
        if (localStorage.getItem('activeBlogPageSwedish') != i || !localStorage.getItem('activeBlogPageSwedish')) {
            buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
            aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
        
        } else if (i == localStorage.getItem('activeBlogPageSwedish')) {
            buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn active-toggle-btn h3-font-size"
            aria-pressed="true" onClick={this.handleBtnClick}>{i}</button>);
        }
    }

    handleBtnClick(e) {
        const id      = e.target.id.slice(3);
        const buttons = document.getElementsByClassName('toggle-btn');

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].innerHTML == id) {
                buttons[i].className = 'focus toggle-btn active-toggle-btn h3-font-size';
                buttons[i].setAttribute('aria-pressed', true);

            } else {
                buttons[i].className = 'focus toggle-btn inactive-toggle-btn h3-font-size';
                buttons[i].setAttribute('aria-pressed', false);
            }
        }

        if (localStorage.getItem('language') == 'Deutsch') {
            this.togglePostsGerman(id);
        
        } else {
            this.togglePostsSwedish(id);
        }
    }

    togglePostsSwedish(id) {
        if (id == 1) {
            localStorage.setItem('blogIndexSwedish', 0);
            localStorage.setItem('activeBlogPageSwedish', 1);

            this.setState({
                index:      0,
                activePage: 1,
            })
        
        } else {
            localStorage.setItem('blogIndexSwedish', (id - 1) * 5);
            localStorage.setItem('activeBlogPageSwedish', id);

            this.setState({
                index:      (id - 1) * 5,
                activePage: id,
            })
        }
    }
    */
}

export default ToggleBtn;