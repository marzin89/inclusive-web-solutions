import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pageActions } from '../../../store/slices/page-slice';

function SearchFormGerman() {
    const query = useSelector((state) => state.page.query);
    const queryRef = useRef();
    const numberOfResults = useSelector((state) => 
        state.page.searchResultsGerman.length);
    const [errorMessage, setErrorMessage] = useState();
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();

        if (!queryRef.current.value) {
            setErrorMessage('Bitte geben Sie ein Suchwort ein.');            
            queryRef.setAttribute('aria-invalid', true);

        } else {
            dispatch(pageActions.setQuery(queryRef.current.value));
            search();
        }
    }

    function search() {
        /*
        if (!localStorage.getItem('searchIndexSwedish')) {
            localStorage.setItem('searchIndexSwedish', 0);
        }

        if (!localStorage.getItem('searchIndexGerman')) {
            localStorage.setItem('searchIndexGerman', 0);
        }
        */

        fetch('https://iws-rest-api.herokuapp.com/search')
        .then(response => response.json())
        .then((data) => {
            dispatch(pageActions.search(data));
            /*
            let filterSwedish  = [];
            let filterGerman   = [];
            let resultsSwedish = [];
            let resultsGerman  = [];
            let numberOfPagesSwedish;
            let numberOfPagesGerman;

            data.forEach((page) => {
                if (page.language == 'swedish') {
                    filterSwedish.push(page);
                
                } else if (page.language == 'german') {
                    filterGerman.push(page);
                }
            })

            let query = localStorage.getItem('query');

            filterSwedish.forEach((page) => {
                if (page.title.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
                    page.content.toLowerCase().indexOf(query.toLowerCase()) >= 0) {

                    resultsSwedish.push(page);
                }
            })

            filterGerman.forEach((page) => {
                if (page.title.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
                    page.content.toLowerCase().indexOf(query.toLowerCase()) >= 0) {

                    resultsGerman.push(page);
                }
            })

            if (resultsSwedish.length && resultsSwedish.length <= 5) {
                numberOfPagesSwedish = 1;
            
            } else if (resultsSwedish.length > 5) {
                if (resultsSwedish.length % 5) {
                    numberOfPagesSwedish = parseInt(resultsSwedish.length / 5) + 1;
                
                } else {
                    numberOfPagesSwedish = resultsSwedish.length / 5;
                }
            }

            if (resultsGerman.length && resultsGerman.length <= 5) {
                numberOfPagesGerman = 1;
            
            } else if (resultsGerman.length > 5) {
                if (resultsGerman.length % 5) {
                    numberOfPagesGerman = parseInt(resultsGerman.length / 5) + 1;
                
                } else {
                    numberOfPagesGerman = resultsGerman.length / 5;
                }
            }

            this.setState({
                resultsSwedish:       resultsSwedish,
                resultsGerman:        resultsGerman,
                numberOfPagesSwedish: numberOfPagesSwedish,
                numberOfPagesGerman:  numberOfPagesGerman,
            })

            localStorage.setItem('resultsSwedish', JSON.stringify(resultsSwedish));
            localStorage.setItem('resultsGerman', JSON.stringify(resultsGerman));
            localStorage.setItem('numberOfResultsSwedish', resultsSwedish.length);
            localStorage.setItem('numberOfResultsGerman', resultsGerman.length);

            if (localStorage.getItem('searchIndexSwedish') >= 5 &&
                localStorage.getItem('numberOfResultsSwedish') < 5) {

                localStorage.setItem('searchIndexSwedish', 0);
            }   

            if (localStorage.getItem('activeSearchPageSwedish') > 1 &&
                localStorage.getItem('numberOfResultsSwedish') <= 5) {
                    
                localStorage.setItem('activeSearchPageSwedish', 1);
            }

            if (localStorage.getItem('searchIndexGerman') >= 5 &&
                localStorage.getItem('numberOfResultsGerman') < 5) {

                localStorage.setItem('searchIndexGerman', 0);
            }   

            if (localStorage.getItem('activeSearchPageGerman') > 1 &&
                localStorage.getItem('numberOfResultsGerman') <= 5) {
                    
                localStorage.setItem('activeSearchPageGerman', 1);
            }

            if (!resultsSwedish.length) {
                this.setState({
                    error:        true,
                    errorSwedish: 'Sökningen gav inga träffar.',
                })
            }

            if (!resultsGerman.length) {
                this.setState({
                    error:       true,
                    errorGerman: 'Ihre Suche ergab leider keine Treffer.',
                })
            }

            document.getElementById('search-bar-main').focus();
            */

           queryRef.focus();
        })
        .catch(() => {
            dispatch(pageActions.setErrorMessage('Ein Serverfehler ist aufgetreten.' +
                'Ihre Suche konnte leider nicht durchgeführt werden.'
                    + ' Versuchen Sie es später erneut.'));
        });
    }

    return (
        <form role="search" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="search-bar-main">Website durchsuchen</label>
            <input id="search-bar-main" className="search-bar search-bar-mobile 
                text-input input focus focus-invisible-input regular-font-size" 
                    type="search" value={query || ''} aria-required="true" 
                        aria-describedby="number-of-results search-phrase-empty-main" 
                            autoComplete="on" ref={queryRef}></input>
            <button className="search-btn search-btn-mobile btn deutsch focus 
                focus-invisible-input regular-font-size" type="submit">Suchen</button>
            {numberOfResults ? <p id="number-of-results" className="number-of-results 
                regular-font-size" role="alert">{numberOfResults + ' Treffer'}</p> : null}
            {errorMessage ? <p id="search-phrase-empty-main" className="regular-font-size 
                error" role="alert">{errorMessage}</p> : null}
        </form>
    );
}

export default SearchFormGerman;