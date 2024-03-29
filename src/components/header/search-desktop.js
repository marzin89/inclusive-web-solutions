import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { pageActions } from '../../store/slices/page-slice';

function SearchDesktop(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const queryRef = useRef();
    const dispatch = useDispatch();

    function validate(e) {
        e.preventDefault();

        if (!queryRef.current.value) {
            setErrorMessage(props.language == 'Swedish' ? 'Du måste skriva ett sökord.' :
                'Bitte geben Sie ein Suchwort ein.');
            document.getElementById('search-bar').setAttribute('aria-invalid', true);

        } else {
            setErrorMessage('');
            dispatch(pageActions.setQuery(queryRef.current.value));
            window.open('/search', '_self');
        }
    }
    return (
        <div id="search-wrapper-desktop">
            {/* Sökruta */}
            <form id="search-form-desktop" role="search" onSubmit={(e) => validate(e)}>
                <label htmlFor="search-bar">{props.language == 'Swedish' ? 
                    'Sök på webbplatsen' : 'Website durchsuchen'}</label>
                <input id="search-bar" className="search-bar text-input input focus 
                    focus-invisible-input regular-font-size" type="search" aria-required="true" 
                        autoComplete="on" aria-describedby="search-phrase-empty" ref={queryRef}>
                </input>
                <button className="search-btn btn svenska focus focus-invisible-input 
                    regular-font-size" type="submit">{props.language == 'Swedish' ? 
                        'Sök' : 'Suchen'}</button>
            </form>
            {errorMessage ? <p id="search-phrase-empty" className="regular-font-size 
                error-search" role="alert" aria-invalid="true">{errorMessage}</p> : null}
        </div>
    );
}

export default SearchDesktop;