import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import SearchForm from './search-form';
import SearchResults from './search-results';
import ToggleBtn from './toggle-btn';

function Search(props) {
    const results       = useSelector((state) => props.language == 'Swedish' ? 
        state.page.searchResultsSwedish : state.page.searchResultsGerman);
    const numberOfPages = useSelector((state) => props.language == 'Swedish' ? 
        state.page.numberOfPages : state.page.numberOfPages);
    const errorMessage  = useSelector((state) => state.page.errorMessage);

    const mainPage    = props.language == 'Swedish' ? 'Start' : 'Home';
    const currentPage = props.language == 'Swedish' ? 'Sökresultat' : 'Suchergebnisse';

    const breadcrumbs =
    [
        {
            page: mainPage,
            path: '/',
            isCurrentPage: false,
        },
        {
            page: currentPage,
            path: '/search',
            isCurrentPage: true,
        }
    ];
    
    function renderToggleBtns() {
        const toggleBtns = [];

        for (let i = 0; i < numberOfPages; i++) {
            toggleBtns.push(<ToggleBtn language={props.language} index={i} />);
        }

        return toggleBtns;
    }

    useEffect(() => {
        document.title = currentPage;
    });

    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} currentPage={currentPage}
                language={props.language} />
            <section id="search">
                <h1 id="main" className="h1-font-size">{currentPage}</h1>
                <SearchForm language={props.language} />
                <div id="results">
                    {results.length ? <SearchResults language={props.language} /> : <p className="error 
                        regular-font-size" role="alert">{errorMessage}</p>}        
                    {results.length > 5 ? <nav aria-label={currentPage}>
                        {renderToggleBtns()}</nav> : null}
                </div>
            </section>
        </main>
    );

    /*
    toggleBtnsGerman() {
        let buttons = [];

        if (this.state.numberOfPagesGerman > 1) {
            for (let i = 1; i <= this.state.numberOfPagesGerman; i++) {
                if (i == 1) {
                    if (localStorage.getItem('activeSearchPageGerman') == 1 || !localStorage.getItem('activeSearchPageGerman')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn active-toggle-btn h3-font-size"
                        aria-pressed="true" onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
                        aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
                    }
                } else {
                    if (localStorage.getItem('activeSearchPageGerman') != i || !localStorage.getItem('activeSearchPageGerman')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
                        aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else if (i == localStorage.getItem('activeSearchPageGerman')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn active-toggle-btn h3-font-size"
                        aria-pressed="true" onClick={this.handleBtnClick}>{i}</button>);
                    }
                }
            }
        }

        return buttons;
    }

    toggleBtnsSwedish() {
        let buttons = [];

        if (this.state.numberOfPagesSwedish > 1) {
            for (let i = 1; i <= this.state.numberOfPagesSwedish; i++) {
                if (i == 1) {
                    if (localStorage.getItem('activeSearchPageSwedish') == 1 || !localStorage.getItem('activeSearchPageSwedish')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn active-toggle-btn h3-font-size"
                        aria-pressed="true" onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
                        aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
                    }
                } else {
                    if (localStorage.getItem('activeSearchPageSwedish') != i || !localStorage.getItem('activeSearchPageSwedish')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
                        aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else if (i == localStorage.getItem('activeSearchPageSwedish')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn active-toggle-btn h3-font-size"
                        aria-pressed="true" onClick={this.handleBtnClick}>{i}</button>);
                    
                    }
                }
            }
        
        }

        return buttons;
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
            this.toggleResultsGerman(id);
        
        } else {
            this.toggleResultsSwedish(id);
        }
    }

    toggleResultsGerman(id) {
        if (id == 1) {
            localStorage.setItem('searchIndexGerman', 0);
            localStorage.setItem('activeSearchPageGerman', 1);

            this.setState({
                index:      0,
                activePage: 1,
            })
        } else {
            localStorage.setItem('searchIndexGerman', (id - 1) * 5);
            localStorage.setItem('activeSearchPageGerman', id);

            this.setState({
                index:      (id - 1) * 5,
                activePage: id,
            })
        }
    }

    toggleResultsSwedish(id) {
        if (id == 1) {
            localStorage.setItem('searchIndexSwedish', 0);
            localStorage.setItem('activeSearchPageSwedish', 1);

            this.setState({
                index:      0,
                activePage: 1,
            })
        
        } else {
            localStorage.setItem('searchIndexSwedish', (id - 1) * 5);
            localStorage.setItem('activeSearchPageSwedish', id);

            this.setState({
                index:      (id - 1) * 5,
                activePage: id,
            })
        }
    }
    */
}

export default Search;