// Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Sökresultat
class Search extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState             = this.setState.bind(this);
        this.search               = this.search.bind(this);
        this.handleSearchChange   = this.handleSearchChange.bind(this);
        this.toggleBtnsSwedish    = this.toggleBtnsSwedish.bind(this);
        this.toggleBtnsGerman     = this.toggleBtnsGerman.bind(this);
        this.handleBtnClick       = this.handleBtnClick.bind(this);
        this.toggleResultsSwedish = this.toggleResultsSwedish.bind(this);
        this.toggleResultsGerman  = this.toggleResultsGerman.bind(this);
        this.renderResultsSwedish = this.renderResultsSwedish.bind(this);
        this.renderResultsGerman  = this.renderResultsGerman.bind(this);
        this.handleLinkClick    = this.handleLinkClick.bind(this);
        this.handleLogout       = this.handleLogout.bind(this);
        this.handlePageTitle = this.handlePageTitle.bind(this);

        this.state = {
            signedIn:             this.props.signedIn,
            result:               [],
            results:              [],
            resultsSwedish:       [],
            resultsGerman:        [],
            numberOfPagesSwedish: 0,
            numberOfPagesGerman:  0,
            index:                0,
            activePage:           1,
            page:                 [],
            error:                false,
        }

        this.search();
    }

    // Rendrering
    render() {
        return (
            <main id="main">
                <div className="row">
                    {/* Länkstig */}
                    {localStorage.getItem('language') == 'Deutsch' ?
                    <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                        <ul>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/"}>
                                Home</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/search"}> 
                                Suchergebnisse</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/"}>
                                Start</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/search"}> 
                                Sökresultat</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="text focus regular-font-size" to={"/login"} 
                        onClick={this.handleLogout}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ?
                <section id="search">
                    <h1 className="text h1-font-size">Suchergebnisse</h1>
                    <form role="search">
                        <input id="search-bar-main" className="search-bar search-bar-mobile text-input input focus focus-header regular-font-size" 
                            type="search" aria-label="Website durchsuchen" aria-required="true"
                            onChange={this.handleSearchChange}></input>
                        <button className="search-btn search-btn-mobile btn deutsch text focus focus-header regular-font-size" 
                            type="submit" onClick={this.search}>Suchen</button>
                        <p className="text number-of-results regular-font-size" role="alert" style={localStorage.getItem('resultsGerman') ?
                            {display: 'block'} : {display: 'none'}}>{localStorage.getItem('numberOfResultsGerman') 
                            + ' Treffer'}</p>
                    </form>
                    <section id="results">
                        {localStorage.getItem('resultsGerman') ? this.renderResultsGerman() : 
                        <p className="text error regular-font-size" role="alert" style={localStorage.getItem('errorGerman') ?
                            {display: 'block'} : {display: 'none'}}>{localStorage.getItem('errorGerman')}</p>}
                        {this.toggleBtnsGerman()}
                    </section>
                </section>
                :
                <section id="search">
                    <h1 className="text h1-font-size">Sökresultat</h1>
                    <form role="search">
                        <input id="search-bar-main" className="search-bar search-bar-mobile text-input input focus focus-header regular-font-size" 
                            type="search" aria-label="Sök på webbplatsen" aria-required="true"
                            onChange={this.handleSearchChange}></input>
                        <button className="search-btn search-btn-mobile btn svenska text focus focus-header regular-font-size" 
                            type="submit" onClick={this.search}>Sök</button>
                        <p className="text number-of-results regular-font-size" role="alert" style={localStorage.getItem('resultsSwedish') ?
                            {display: 'block'} : {display: 'none'}}>{localStorage.getItem('numberOfResultsSwedish') 
                            + ' träffar'}</p>
                    </form>
                    <section id="results">
                        {localStorage.getItem('resultsSwedish') ? this.renderResultsSwedish() : 
                        <p className="text error regular-font-size" role="alert" style={localStorage.getItem('errorSwedish') ?
                            {display: 'block'} : {display: 'none'}}>{localStorage.getItem('errorSwedish')}</p>}
                        {this.toggleBtnsSwedish()}
                    </section>
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

        if (localStorage.getItem('accessibility-error')) {
            const text = document.getElementsByClassName('text');

            switch(localStorage.getItem('accessibility-error')) {
                case 'contrast':
                    for (let i = 0; i < text.length; i++) {
                        text[i].style.opacity = 0.1;
                    }
                break;
    
                /*
                case 'responsiveness':
                    const meta = document.getElementsByName('viewport');
                    meta[0].remove();
                break;
                */
    
                case 'tab-focus':
                    const focus = document.getElementsByClassName('focus');
    
                    for (let i = 0; i < document.getElementsByClassName('focus').length; i++) {
                        focus[i].className = focus[i].className.replace('focus', 'focus-invisible');
                    }
                break;
    
                case 'font-size':
                    for (let i = 0; i < text.length; i++) {
                        if (text[i].className.indexOf('h1-font-size') >= 0) {
                            text[i].style.fontSize = '19px';
                        
                        } else if (text[i].className.indexOf('h2-font-size') >= 0) {
                            text[i].style.fontSize = '15px';
                        
                        } else if (text[i].className.indexOf('h3-font-size') >= 0) {
                            text[i].style.fontSize = '12px';
    
                        } else if (text[i].className.indexOf('regular-font-size')) {
                            text[i].style.fontSize   = '8px';
                            text[i].style.lineHeight = '8px'
                        
                        } else if (text[i].className.indexOf('small-font-size')) {
                            text[i].style.fontSize = '8px';
                        }
                    }
                break;
            }
        }
    }

    search() {
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

                localStorage.removeItem('errorSwedish');
                localStorage.removeItem('errorGerman');

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
                    error:                false,
                    resultsSwedish:       resultsSwedish,
                    resultsGerman:        resultsGerman,
                    numberOfPagesSwedish: numberOfPagesSwedish,
                    numberOfPagesGerman:  numberOfPagesGerman,
                })

                localStorage.setItem('resultsSwedish', JSON.stringify(resultsSwedish));
                localStorage.setItem('resultsGerman', JSON.stringify(resultsGerman));
                localStorage.setItem('numberOfResultsSwedish', resultsSwedish.length);
                localStorage.setItem('numberOfResultsGerman', resultsGerman.length);

                if (!resultsSwedish.length) {
                    this.setState({
                        error:        true,
                    })

                    localStorage.setItem('errorSwedish', 'Sökningen gav inga träffar.');
                }

                if (!resultsGerman.length) {
                    this.setState({
                        error:        true,
                    })

                    localStorage.setItem('errorGerman', 'Ihre Suche ergab leider keine Treffer.');
                }
            })
            .catch(() => {
                this.setState({
                    error: true,
                })

                localStorage.setItem('errorSwedish', 'Ett serverfel har uppstått. Din sökning kunde inte genomföras. '
                    + 'Försök igen lite senare.');
                localStorage.setItem('errorGerman', 'Ein Serverfehler ist aufgetreten. Ihre Suche konnte leider nicht durchgeführt werden. '
                    + 'Versuchen Sie es später erneut.');  
            })
        }
    }

    handleSearchChange(e) {
        localStorage.setItem('query', e.target.value);
    }

    toggleBtnsGerman() {
        let buttons = [];

        if (this.state.numberOfPagesGerman > 1) {
            for (let i = 1; i <= this.state.numberOfPagesGerman; i++) {
                if (i == 1) {
                    if (localStorage.getItem('activeSearchPageGerman') == 1 || !localStorage.getItem('activeSearchPageGerman')) {
                        buttons.push(<button id={`btn${i}`} className="text focus toggle-btn active-toggle-btn h3-font-size"
                        aria-label={`Öppnar sida ${i}`} aria-pressed="true" 
                        onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else {
                        buttons.push(<button id={`btn${i}`} className="text focus toggle-btn inactive-toggle-btn h3-font-size"
                        aria-label={`Öppnar sida ${i}`} aria-pressed="false" 
                        onClick={this.handleBtnClick}>{i}</button>);
                    }
                } else {
                    if (localStorage.getItem('activeSearchPageGerman') == 1 || !localStorage.getItem('activeSearchPageGerman')) {
                        buttons.push(<button id={`btn${i}`} className="text focus toggle-btn inactive-toggle-btn h3-font-size"
                        aria-label={`Öppnar sida ${i}`} aria-pressed="false" 
                        onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else if (i == localStorage.getItem('activeSearchPageGerman')) {
                        buttons.push(<button id={`btn${i}`} className="text focus toggle-btn active-toggle-btn h3-font-size"
                        aria-label={`Öppnar sida ${i}`} aria-pressed="true" 
                        onClick={this.handleBtnClick}>{i}</button>);
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
                        buttons.push(<button id={`btn${i}`} className="text focus toggle-btn active-toggle-btn h3-font-size"
                        aria-label={`Öppnar sida ${i}`} aria-pressed="true" 
                        onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else {
                        buttons.push(<button id={`btn${i}`} className="text focus toggle-btn inactive-toggle-btn h3-font-size"
                        aria-label={`Öppnar sida ${i}`} aria-pressed="false" 
                        onClick={this.handleBtnClick}>{i}</button>);
                    }
                } else {
                    if (localStorage.getItem('activeSearchPageSwedish') == 1 || !localStorage.getItem('activeSearchPageSwedish')) {
                        buttons.push(<button id={`btn${i}`} className="text focus toggle-btn inactive-toggle-btn h3-font-size"
                        aria-label={`Öppnar sida ${i}`} aria-pressed="false" 
                        onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else if (i !== localStorage.getItem('activeSearchPageSwedish')) {
                        buttons.push(<button id={`btn${i}`} className="text focus toggle-btn active-toggle-btn h3-font-size"
                        aria-label={`Öppnar sida ${i}`} aria-pressed="true" 
                        onClick={this.handleBtnClick}>{i}</button>);
                    }
                }
            }
        
        } /* else if (this.state.numberOfPagesGerman > 1) {
            for (let i = 1; i <= this.state.numberOfPagesGerman; i++) {
                if (i == 1) {
                    if (localStorage.getItem('activePage') == 1 || !localStorage.getItem('activePage')) {
                        buttons.push(<button id={`btn${i}`} className="text focus toggle-btn active-toggle-btn h3-font-size"
                        aria-label={`Öppnar sida ${i}`} aria-pressed="true" 
                        onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else {
                        buttons.push(<button id={`btn${i}`} className="text focus toggle-btn inactive-toggle-btn h3-font-size"
                        aria-label={`Öppnar sida ${i}`} aria-pressed="false" 
                        onClick={this.handleBtnClick}>{i}</button>);
                    }
                } else {
                    if (localStorage.getItem('activePage') == 1 || !localStorage.getItem('activePage')) {
                        buttons.push(<button id={`btn${i}`} className="text focus toggle-btn inactive-toggle-btn h3-font-size"
                        aria-label={`Öppnar sida ${i}`} aria-pressed="false" 
                        onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else if (i == localStorage.getItem('activePage')) {
                        buttons.push(<button id={`btn${i}`} className="text focus toggle-btn active-toggle-btn h3-font-size"
                        aria-label={`Öppnar sida ${i}`} aria-pressed="true" 
                        onClick={this.handleBtnClick}>{i}</button>);
                    }
                }
            }
        } */

        return buttons;
    }

    handleBtnClick(e) {
        const id      = e.target.id.slice(3);
        const buttons = document.getElementsByClassName('toggle-btn');

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].innerHTML == id) {
                buttons[i].className = 'text focus toggle-btn active-toggle-btn h3-font-size';
                buttons[i].setAttribute('aria-pressed', true);

            } else {
                buttons[i].className = 'text focus toggle-btn inactive-toggle-btn h3-font-size';
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
            localStorage.setItem('index', 0);
            localStorage.setItem('activeSearchPageGerman', 1);

            this.setState({
                index:      0,
                activePage: 1,
            })
        } else {
            localStorage.setItem('index', (id - 1) * 5);
            localStorage.setItem('activeSearchPageGerman', id);

            this.setState({
                index:      (id - 1) * 5,
                activePage: id,
            })
        }
    }

    toggleResultsSwedish(id) {
        if (id == 1) {
            localStorage.setItem('index', 0);
            localStorage.setItem('activeSearchPageSwedish', 1);

            this.setState({
                index:      0,
                activePage: 1,
            })
        
        } else {
            localStorage.setItem('index', (id - 1) * 5);
            localStorage.setItem('activeSearchPageSwedish', id);

            this.setState({
                index:      (id - 1) * 5,
                activePage: id,
            })
        }
    }

    renderResultsGerman() {
        let results = localStorage.getItem('resultsGerman');
        results     = JSON.parse(results);

        if (results.length) {
            let page      = [];
            let render    = [];
            let lastIndex = this.state.index + 5;

            for (let i = this.state.index; i < lastIndex; i++) {
                if (results[i]) {
                    page.push(results[i])
                
                } else {
                    break;
                } 
            }

            page.forEach((element) => {
                render.push(
                    <article>
                        <h2 className="text h2-font-size h2-search">{element.title}</h2>
                        <p className="text regular-font-size">
                            {element.content.slice(0, 150) + ' ...'}</p>
                        <p><Link id={element.foreignKey ? element.foreignKey : null} 
                            className="text focus find-out-more regular-font-size"
                            to={`${element.path}`} onClick={this.handleLinkClick}>Mehr</Link></p>
                    </article>
                )
            })

            return render;
        }
    }

    renderResultsSwedish() {
        let results = localStorage.getItem('resultsSwedish');
        results     = JSON.parse(results);

        if (results.length) {
            let page      = [];
            let render    = [];
            let lastIndex = this.state.index + 5;

            for (let i = this.state.index; i < lastIndex; i++) {
                if (results[i]) {
                    page.push(results[i])
                
                } else {
                    break;
                } 
            }

            page.forEach((element) => {
                render.push(
                    <article>
                        <h2 className="text h2-font-size h2-search">{element.title}</h2>
                        <p className="text regular-font-size">
                            {element.content.slice(0, 150) + ' ...'}</p>
                        <p><Link id={element.foreignKey ? element.foreignKey : null} 
                            className="text focus find-out-more regular-font-size"
                            to={`${element.path}`} onClick={this.handleLinkClick}>Läs mer</Link></p>
                    </article>
                )
            })

            return render;
        }
    }

    handleLinkClick(e) {
        if (e.target.id.indexOf('test') >= 0) {
            localStorage.setItem('serviceId', e.target.id.slice(4));

        } else if (e.target.id.indexOf('solution') >= 0) {
            localStorage.setItem('serviceId', e.target.id.slice(8));

        } else if (e.target.id.indexOf('course') >= 0) {
            localStorage.setItem('serviceId', e.target.id.slice(6));
        
        } else if (e.target.id.indexOf('post') >= 0) {
            localStorage.setItem('postId', e.target.id.slice(4)); 
        }

        if (e.target.innerHTML == 'Logga ut') {
            this.handleLogout(e);

        } else if (e.target.innerHTML !== 'Läs mer' &&
            e.target.innerHTML !== 'Mehr') {
            this.handlePageTitle(e);
        }
    }

    // Utloggning
    handleLogout(e) {

        // Förhidrar att sidan laddas om
        e.preventDefault();

        this.props.logout();
    }

    handlePageTitle(e) {
        if (e.target.id == 'logo') {
            if (localStorage.getItem('language') == 'Deutsch') {
                localStorage.setItem('page', 'Home');
                document.title = 'Home';
            
            } else {
                localStorage.setItem('page', 'Start');
                document.title = 'Start';
            }

        } else {
            localStorage.setItem('page', e.target.innerHTML);
            document.title = e.target.innerHTML;
        }
    }
}

// Exporterar komponenten
export default Search;