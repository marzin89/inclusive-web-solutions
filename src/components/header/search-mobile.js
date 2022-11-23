import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import searchIcon from '../../images/sökikon/searchIcon.png';
import { pageActions } from '../../store/slices/page-slice';

function SearchMobile(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const queryRef = useRef();
    const dispatch = useDispatch();

    function handleSearchIconClick(e) {
        document.getElementById('search-form-mobile').style.display = 'block';
        e.target.setAttribute('aria-expanded', true);
    }

    function handleCloseSearch(e) {
        e.preventDefault();
        document.getElementById('search-form-mobile').style.display = 'none';
        document.getElementById('search-icon').setAttribute('aria-expanded', false);
    }

    function validate(e) {
        e.preventDefault();

        if (!queryRef.current.value) {
            if (props.language == 'Deutsch') {
                setErrorMessage('Bitte geben Sie ein Suchwort ein.');
            
            } else {
                setErrorMessage('Du måste skriva ett sökord.');
            }

            document.getElementById('search-bar').setAttribute('aria-invalid', true);

        } else {
            setErrorMessage('');
            dispatch(pageActions.setQuery(queryRef.current.value));
            window.open('/search', '_self');
        }
    }

    return (
        <div id="search-mobile">
            {/* Sökikon */}
            <input type="image" id="search-icon" className="focus focus-invisible" 
                aria-haspopup="true" aria-label={props.language == 'Swedish' ?
                    'Visar sökrutan' : 'Suchleiste zeigen'} aria-expanded="false" 
                        src={searchIcon} alt={props.language == 'Swedish' ?
                            'Sökikon' : 'Such-Icon'} onClick={(e) => 
                                handleSearchIconClick(e)}></input> 
            {/* Sökruta */}
            <form id="search-form-mobile" role="search" onSubmit={(e) => validate(e)}>
                <label htmlFor="search-bar">{props.language == 'Swedish' ? 
                    'Sök på webbplatsen' : 'Website durchsuchen'}</label>
                <input id="search-bar" className="search-bar search-bar-mobile 
                    text-input input focus focus-invisible-input regular-font-size" 
                        type="search" aria-required="true" autoComplete="on" 
                            aria-describedby="search-phrase-empty" ref={queryRef}>
                </input>
                <button className="search-btn search-btn-mobile btn svenska focus 
                    focus-invisible-input regular-font-size" type="submit"> 
                        {props.language == 'Swedish' ? 'Sök' : 'Suchen'}</button>
                <a id="close-search-bar-link" className="navlink focus focus-invisible 
                    regular-font-size" href="" aria-label={props.language == 'Swedish' ?
                        'Döljer sökrutan' : 'Suchleiste schließen'} onClick={(e) => 
                            handleCloseSearch(e)}>X</a>
            </form>
            {errorMessage ? <p id="search-phrase-empty" className="regular-font-size 
                error-search" role="alert" aria-invalid="true">{errorMessage}</p> : null}
        </div>
    );
}

export default SearchMobile;