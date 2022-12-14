// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import ResultsSwedish from './results-swedish/results-swedish';
import ResultsGerman from './results-german/results-german';

// Sökresultat
class Search extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState             = this.setState.bind(this);
        this.search               = this.search.bind(this);
        this.handleSubmit         = this.handleSubmit.bind(this);
        this.handleSearchChange   = this.handleSearchChange.bind(this);
        this.validateSearch       = this.validateSearch.bind(this);
        this.toggleBtnsSwedish    = this.toggleBtnsSwedish.bind(this);
        this.toggleBtnsGerman     = this.toggleBtnsGerman.bind(this);
        this.handleBtnClick       = this.handleBtnClick.bind(this);
        this.toggleResultsSwedish = this.toggleResultsSwedish.bind(this);
        this.toggleResultsGerman  = this.toggleResultsGerman.bind(this);
        this.handleLogout       = this.handleLogout.bind(this);

        this.state = {
            query:                '',
            results:              [],
            resultsSwedish:       [],
            resultsGerman:        [],
            numberOfPagesSwedish: 0,
            numberOfPagesGerman:  0,
            index:                0,
            activePage:           1,
            page:                 [],
            errorSwedish:         '',
            errorGerman:          '',
        }

        this.search();
    }

    // Rendrering
    render() {
        return (
            <main>
                <div className="row">
                    {/* Länkstig */}
                    {localStorage.getItem('language') == 'Deutsch' ?
                    <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                        <ul>
                            <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                                regular-font-size" to={"/"}>Home</Link>/</li>
                            <li><Link className="active-breadcrumb focus focus-invisible regular-font-size"
                                to={"/search"}> Suchergebnisse</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                                regular-font-size" to={"/"}>Start</Link>/</li>
                            <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/search"}> Sökresultat</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="focus focus-invisible regular-font-size" 
                        to={"/search"} onClick={this.handleLogout}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ?
                <section id="search">
                    <h1 id="main" className="h1-font-size">Suchergebnisse</h1>
                    <form role="search">
                        <label htmlFor="search-bar-main">Website durchsuchen</label>
                        <input id="search-bar-main" className="search-bar search-bar-mobile text-input input focus 
                            focus-invisible-input regular-font-size" type="search" aria-required="true" 
                            aria-describedby="number-of-results search-phrase-empty-main" autoComplete='on'
                            onChange={this.handleSearchChange}></input>
                        <button className="search-btn search-btn-mobile btn deutsch focus focus-invisible-input 
                            regular-font-size" type="submit" onClick={this.handleSubmit}>Suchen</button>
                        <p id="number-of-results" className="number-of-results regular-font-size" role="alert" 
                            style={localStorage.getItem('resultsGerman') ? {display: 'block'} : {display: 'none'}}>
                                {localStorage.getItem('numberOfResultsGerman') + ' Treffer'}</p>
                        <p id="search-phrase-empty-main" className="regular-font-size error" role="alert" 
                                style={this.state.searchErrorGerman ? {display: 'block'} : {display: 'none'}}>
                                {this.state.searchErrorGerman}</p>
                    </form>
                    <div id="results">
                        {this.state.resultsGerman.length ? <ResultsGerman results={this.state.resultsGerman} />
                        : <p className="error regular-font-size" role="alert" style={this.state.errorGerman ?
                            {display: 'block'} : {display: 'none'}}>{this.state.errorGerman}</p>}
                        {this.state.resultsGerman.length > 5 ? <nav aria-label="Suchergebnisse">
                            {this.toggleBtnsGerman()}</nav> : null}
                    </div>
                </section>
                :
                <section id="search">
                    <h1 id="main" className="h1-font-size">Sökresultat</h1>
                    <form role="search">
                        <label htmlFor="search-bar-main">Sök på webbplatsen</label>
                        <input id="search-bar-main" className="search-bar search-bar-mobile text-input input focus 
                            focus-invisible-input regular-font-size" type="search" aria-required="true" 
                            aria-describedby="number-of-results search-phrase-empty-main" autoComplete='on' 
                            onChange={this.handleSearchChange}></input>
                        <button className="search-btn search-btn-mobile btn svenska focus focus-invisible-input regular-font-size" 
                            type="submit" onClick={this.handleSubmit}>Sök</button>
                        <p id="number-of-results" className="number-of-results regular-font-size" role="alert" 
                            style={localStorage.getItem('resultsSwedish') ? {display: 'block'} : {display: 'none'}}>
                            {localStorage.getItem('numberOfResultsSwedish') + ' träffar'}</p>
                        <p id="search-phrase-empty-main" className="regular-font-size error" role="alert" 
                            style={this.state.searchErrorSwedish ? {display: 'block'} : {display: 'none'}}>
                            {this.state.searchErrorSwedish}</p>
                    </form>
                    <div id="results">
                        {this.state.resultsSwedish.length ? <ResultsSwedish results={this.state.resultsSwedish} />
                        : <p className="error regular-font-size" role="alert" style={this.state.errorSwedish ?
                            {display: 'block'} : {display: 'none'}}>{this.state.errorSwedish}</p>}        
                        {this.state.resultsSwedish.length > 5 ? <nav aria-label="Sökresultat">
                            {this.toggleBtnsSwedish()}</nav> : null}
                    </div>
                </section>
                }
            </main>
        )
    }

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Sökresultat');
        localStorage.setItem('pageGerman', 'Suchergebnisse');

        if (localStorage.getItem('language') == 'Deutsch') {
            document.title = 'Suchergebnisse';

        } else {
            document.title = 'Sökresultat';
        }

        const searchInput = document.getElementById('search-bar-main');

        if (localStorage.getItem('query')) {
            searchInput.value = localStorage.getItem('query');
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const search = document.getElementById('search-bar-main');

        if (!search.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    searchErrorGerman: 'Bitte geben Sie ein Suchwort ein.',
                })
            
            } else {
                this.setState({
                    searchErrorSwedish: 'Du måste skriva ett sökord.',
                })
            }

            document.getElementById('search-bar-main').setAttribute('aria-invalid', true);

        } else {
            window.location.reload();
        }
    }

    search() {
        if (!localStorage.getItem('searchIndexSwedish')) {
            localStorage.setItem('searchIndexSwedish', 0);
        }

        if (!localStorage.getItem('searchIndexGerman')) {
            localStorage.setItem('searchIndexGerman', 0);
        }

        if (localStorage.getItem('query')) {
            fetch('https://iws-rest-api.herokuapp.com/search')
            .then(response => response.json())
            .then((data) => {
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
            })
            .catch(() => {
                this.setState({
                    error:        true,
                    errorSwedish: 'Ett serverfel har uppstått. Din sökning kunde inte genomföras.'
                                    + ' Försök igen lite senare.',
                    errorGerman:  'Ein Serverfehler ist aufgetreten. Ihre Suche konnte leider nicht durchgeführt werden.'
                                    + ' Versuchen Sie es später erneut.'
                }) 
            })
        }
    }

    handleSearchChange(e) {
        this.setState({
            query:        e.target.value,
        })

        if (e.target.value) {
            this.setState({
                searchErrorSwedish: '',
                searchErrorGerman:  '',
            })

            e.target.setAttribute('aria-invalid', false);
        }

        localStorage.setItem('query', e.target.value);
    }

    validateSearch(e) {
        e.preventDefault();

        const search = document.getElementById('search-bar-main');

        if (!search.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    searchErrorGerman: 'Bitte geben Sie ein Suchwort ein.',
                })
            
            } else {
                this.setState({
                    searchErrorSwedish: 'Du måste skriva ett sökord.',
                })
            }

            document.getElementById('search-bar-main').setAttribute('aria-invalid', true);

        } else {
            window.open('/search', '_self');
        }
    }

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

    // Utloggning
    handleLogout() {
        this.props.logout();
    }
}

// Exporterar komponenten
export default Search;