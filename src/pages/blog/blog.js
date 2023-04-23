// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import PostsSwedish from './swedish/posts-swedish';
import PostsGerman from './german/posts-german';

// Blogg
class Blog extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState           = this.setState.bind(this);
        this.getAllPosts        = this.getAllPosts.bind(this);
        this.toggleBtnsSwedish  = this.toggleBtnsSwedish.bind(this);
        this.toggleBtnsGerman   = this.toggleBtnsGerman.bind(this);
        this.togglePostsSwedish = this.togglePostsSwedish.bind(this);
        this.togglePostsGerman  = this.togglePostsGerman.bind(this); 
        this.handleBtnClick     = this.handleBtnClick.bind(this);      
        this.handleLogout       = this.handleLogout.bind(this);

        this.state = {
            postsSwedish:         [],
            postsGerman:          [],
            numberOfPagesSwedish: 0,
            numberOfPagesGerman:  0,
            index:                0,
            activePage:           1,
            page:                 [],
            errorSwedish:         '',
            errorGerman:          '',
        }

        if (!localStorage.getItem('blogIndexSwedish')) {
            localStorage.setItem('blogIndexSwedish', 0);
        }

        if (!localStorage.getItem('blogIndexGerman')) {
            localStorage.setItem('blogIndexGerman', 0);
        }

        this.getAllPosts();
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
                                to={"/blog"}> Blog</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus focus-invisible 
                                regular-font-size" to={"/"}>Start</Link>/</li>
                            <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                                to={"/blog"}> Blogg</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} : {display: 'none'}}>
                        <Link className="focus focus-invisible regular-font-size" 
                        to={"/blog"} onClick={this.handleLogout}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ?
                <section id="blog">
                    <h1 id="main" className="h1-font-size">Blog</h1>
                    {this.state.postsGerman.length ? <PostsGerman /> : 
                    <p className="error regular-font-size" role="alert" style={this.state.errorGerman ?
                        {display: 'block'} : {display: 'none'}}>{this.state.errorGerman}</p>}
                    {this.state.postsGerman.length > 5 ? <nav aria-label="Blog-Posts">
                        {this.toggleBtnsGerman()}</nav> : null}                  
                </section>
                :
                <section id="blog">
                    <h1 id="main" className="h1-font-size">Blogg</h1>
                    {this.state.postsSwedish.length ? <PostsSwedish /> : 
                    <p className="error regular-font-size" role="alert" style={this.state.errorSwedish ?
                        {display: 'block'} : {display: 'none'}}>{this.state.errorSwedish}</p>}
                    {this.state.postsSwedish.length > 5 ? <nav aria-label="Blogginlägg">
                        {this.toggleBtnsSwedish()}</nav> : null}
                </section>}
            </main>
        )
    }

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Blogg');
        localStorage.setItem('pageGerman', 'Blog');

        if (localStorage.getItem('language') == 'Deutsch') {
            document.title = 'Blog';

        } else {
            document.title = 'Blogg';
        }
    }

    // Funktionen hämtar alla inlägg
    getAllPosts() {
        /* GET-anrop till webbtjänsten om användaren har tryckt på Inlägg och 
            har full behörighet */
        fetch('https://iws-rest-api.herokuapp.com/posts')

        // Konverterar svaret från JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga inlägg hittades
        .then(data => {
            if (!data.length) {
                this.setState({
                    errorSwedish: 'Inga inlägg hittades.',
                    errorGerman:  'Es wurden keine Posts gefunden.',
                })
            
            // Lagrar inläggen i state-arrayen
            } else {
                let postArrSwedish = [];
                let postArrGerman  = [];
                let page           = [];
                let numberOfPagesSwedish;
                let numberOfPagesGerman;

                data.forEach((post) => {
                    if (post.language == 'swedish') {
                        postArrSwedish.push(post);
                    
                    } else if (post.language == 'german') {
                        postArrGerman.push(post);
                    }
                });

                localStorage.setItem('postsSwedish', JSON.stringify(postArrSwedish));
                localStorage.setItem('postsGerman', JSON.stringify(postArrGerman));

                if (postArrSwedish.length && postArrSwedish.length <= 5) {
                    numberOfPagesSwedish = 1;
                
                } else if (postArrSwedish.length > 5) {
                    if (postArrSwedish.length % 5) {
                        numberOfPagesSwedish = parseInt(postArrSwedish.length / 5) + 1;
                    
                    } else {
                        numberOfPagesSwedish = postArrSwedish.length / 5;
                    }
                }

                if (postArrGerman.length && postArrGerman.length <= 5) {
                    numberOfPagesGerman = 1;
               
                } else if (postArrGerman.length > 5) {
                    if (postArrGerman.length % 5) {
                        numberOfPagesGerman = parseInt(postArrGerman.length / 5) + 1;
                    
                    } else {
                        numberOfPagesGerman = postArrGerman.length / 5;
                    }
                }

                this.setState({
                    postsSwedish:         postArrSwedish,
                    postsGerman:          postArrGerman,
                    numberOfPagesSwedish: numberOfPagesSwedish,
                    numberOfPagesGerman:  numberOfPagesGerman,
                })

                if (!postArrGerman.length) {
                    this.setState({
                        errorGerman: 'Diese Seite ist leider nicht auf Deutsch verfügbar.',
                    })
                }
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => {
            this.setState({
                error:        true,
                errorSwedish: 'Ett serverfel har uppstått. Det gick inte att hämta inlägg.' 
                                + ' Försök igen lite senare.',
                errorGerman:  'Ein Serverfehler ist aufgetreten. Es konnten keine Posts abgerufen werden.'
                                + ' Versuchen Sie es später erneut.'
            })
        })
    }

    toggleBtnsGerman() {
        let buttons = [];

        if (this.state.numberOfPagesGerman > 1) {
            for (let i = 1; i <= this.state.numberOfPagesGerman; i++) {
                if (i == 1) {
                    if (localStorage.getItem('activeBlogPageGerman') == 1 || !localStorage.getItem('activeBlogPageGerman')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn active-toggle-btn h3-font-size"
                        aria-pressed="true" onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
                        aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
                    }
                } else {
                    if (localStorage.getItem('activeBlogPageGerman') != i || !localStorage.getItem('activeBlogPageGerman')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
                        aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else if (i == localStorage.getItem('activeBlogPageGerman')) {
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
            this.togglePostsGerman(id);
        
        } else {
            this.togglePostsSwedish(id);
        }
    }
    
    togglePostsGerman(id) {
        if (id == 1) {
            localStorage.setItem('blogIndexGerman', 0);
            localStorage.setItem('activeBlogPageGerman', 1);

            this.setState({
                index:      0,
                activePage: 1,
            })
        } else {
            localStorage.setItem('blogIndexGerman', (id - 1) * 5);
            localStorage.setItem('activeBlogPageGerman', id);

            this.setState({
                index:      (id - 1) * 5,
                activePage: id,
            })
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

    // Utloggning
    handleLogout() {
        this.props.logout();
    }
}

// Exporterar komponenten
export default Blog;