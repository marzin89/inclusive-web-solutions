// Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Blogg
class Blog extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState           = this.setState.bind(this);
        this.getAllPosts        = this.getAllPosts.bind(this);
        this.toggleBtns         = this.toggleBtns.bind(this);
        this.togglePostsSwedish = this.togglePostsSwedish.bind(this);
        this.togglePostsGerman  = this.togglePostsGerman.bind(this); 
        this.renderPostsSwedish = this.renderPostsSwedish.bind(this);
        this.renderPostsGerman  = this.renderPostsGerman.bind(this); 
        this.handleBtnClick     = this.handleBtnClick.bind(this);      
        this.handleLinkClick    = this.handleLinkClick.bind(this);
        this.handleLogout       = this.handleLogout.bind(this);
        this.handlePageTitle = this.handlePageTitle.bind(this);

        this.state = {
            signedIn:             this.props.signedIn,
            post:                 [],
            postsSwedish:         [],
            postsGerman:          [],
            numberOfPagesSwedish: 0,
            numberOfPagesGerman:  0,
            index:                0,
            activePage:           1,
            page:                 [],
            error:                false,
        }

        this.getAllPosts();
        this.renderPostsSwedish();
        this.renderPostsGerman();
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
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/blog"}> 
                                Blog</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/"}>
                                Start</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/blog"}> 
                                Blogg</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="text focus regular-font-size" to={"/login"} 
                        onClick={this.handleLogout}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ?
                <section id="blog">
                    <h1 id="h1-blog" className="text h1-font-size">Blog</h1>
                    <section>
                        {this.renderPostsGerman()}
                        {this.toggleBtns()}
                        <p className="text error regular-font-size" role="alert" style={localStorage.getItem('errorGerman') ?
                            {display: 'block'} : {display: 'none'}}>{localStorage.getItem('errorGerman')}</p>
                    </section>
                </section>
                :
                <section id="blog">
                    <h1 id="h1-blog" className="text h1-font-size">Blogg</h1>
                    <section>
                        {this.renderPostsSwedish()}
                        {this.toggleBtns()}
                        <p className="text error regular-font-size" role="alert" style={localStorage.getItem('errorSwedish') ?
                            {display: 'block'} : {display: 'none'}}>{localStorage.getItem('errorSwedish')}</p>
                    </section>
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
                        console.log('foo');
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
                    error:        true,
                })

                localStorage.setItem('errorSwedish', 'Inga inlägg hittades.');
                localStorage.setItem('errorGerman', 'Es wurden keine Posts gefunden.');
            
            // Lagrar inläggen i state-arrayen
            } else {
                let postArrSwedish = [];
                let postArrGerman  = [];
                let page           = [];
                let numberOfPagesSwedish;
                let numberOfPagesGerman;

                localStorage.removeItem('errorSwedish');
                localStorage.removeItem('errorGerman');

                data.forEach((post) => {
                    if (post.language == 'swedish') {
                        postArrSwedish.push(post);
                    
                    } else if (post.language == 'german') {
                        postArrGerman.push(post);
                    }
                });

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
                    error:                false,
                    postsSwedish:         postArrSwedish,
                    postsGerman:          postArrGerman,
                    numberOfPagesSwedish: numberOfPagesSwedish,
                    numberOfPagesGerman:  numberOfPagesGerman,
                })

                if (!postArrGerman.length) {
                    this.setState({
                        error:       true,
                    })

                    localStorage.setItem('errorGerman', 'Diese Seite ist leider nicht auf Deutsch verfügbar.');
                }
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => {
            this.setState({
                error:        true,
            })

            localStorage.setItem('errorSwedish', 'Ett serverfel har uppstått. Det gick inte att hämta inlägg.' 
                + 'Försök igen lite senare.');
            localStorage.setItem('errorGerman', 'Ein Serverfehler ist aufgetreten. Es konnten keine Posts abgerufen werden. '
                + 'Versuchen Sie es später erneut.');
        })
    }

    toggleBtns() {
        let buttons = [];

        if (this.state.numberOfPagesSwedish > 1) {
            for (let i = 1; i <= this.state.numberOfPagesSwedish; i++) {
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
        
        } else if (this.state.numberOfPagesGerman > 1) {
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
        }

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
            this.togglePostsGerman(id);
        
        } else {
            this.togglePostsSwedish(id);
        }
    }
    
    togglePostsGerman(id) {
        if (id == 1) {
            localStorage.setItem('index', 0);
            localStorage.setItem('activePage', 1);

            this.setState({
                index:      0,
                activePage: 1,
            })
        } else {
            localStorage.setItem('index', (this.state.numberOfPagesGerman - 1) * 5);
            localStorage.setItem('activePage', id);

            this.setState({
                index:      (this.state.numberOfPagesGerman - 1) * 5,
                activePage: id,
            })
        }
    }

    togglePostsSwedish(id) {
        if (id == 1) {
            localStorage.setItem('index', 0);
            localStorage.setItem('activePage', 1);

            this.setState({
                index:      0,
                activePage: 1,
            })
        
        } else {
            localStorage.setItem('index', (this.state.numberOfPagesGerman - 1) * 5);
            localStorage.setItem('activePage', id);

            this.setState({
                index:      (this.state.numberOfPagesSwedish - 1) * 5,
                activePage: id,
            })
        }
    }

    renderPostsGerman() {
        if (this.state.postsGerman.length) {
            let posts     = [];
            let page      = [];
            let lastIndex = this.state.index + 5;

            for (let i = this.state.index; i < lastIndex; i++) {
                if (this.state.postsGerman[i]) {
                    posts.push(this.state.postsGerman[i])
                
                } else {
                    break;
                }
            }

            posts.forEach((post) => {
                page.push(
                    <article key={post.id} className="post">
                        <h2 className="text h2-font-size">{post.title}</h2>
                        <p className="date text small-font-size">{post.date.slice(0, 10)}</p>
                        <p className="text regular-font-size">{post.content[0].slice(0, 150) + ' ...'}</p>
                        {post.imageUrl ? <img src={post.imageUrl} alt={post.altText}>
                        </img> : null}
                        <p><Link id={`post${post.id}`} className="text focus find-out-more regular-font-size"
                            href="" to={"/post"} onClick={this.handleLinkClick} >Mehr</Link></p>
                    </article>
                )
            })

            return page;
        }
    }

    renderPostsSwedish() {
        if (this.state.postsSwedish.length) {
            let posts     = [];
            let page      = [];
            let lastIndex = this.state.index + 5;

            for (let i = this.state.index; i < lastIndex; i++) {
                if (this.state.postsSwedish[i]) {
                    posts.push(this.state.postsSwedish[i])
                
                } else {
                    break;
                } 
            }

            posts.forEach((post) => {
                page.push(
                    <article key={post.id} className="post">
                    <h2 className="text h2-font-size">{post.title}</h2>
                    <p className="date text small-font-size">{post.date.slice(0, 10)}</p>
                    <p className="text regular-font-size">{post.content[0].slice(0, 150) + ' ...'}</p>
                    {post.imageUrl ? <img src={post.imageUrl} alt={post.altText}>
                    </img> : null}
                    <p><Link id={`post${post.id}`} className="text focus find-out-more regular-font-size"
                        href="" to={"/post"} onClick={this.handleLinkClick} >Läs mer</Link></p>
                </article>
                )
            })

            return page;
        }
    }

    handleLinkClick(e) {
        localStorage.setItem('postId', e.target.id.slice(4));
        const id = e.target.id.slice(4);
        document.getElementById('blog').style.display = 'none';

        if (localStorage.getItem('language') == 'Deutsch') {
            this.state.postsGerman.map((post) => {
                if (post.id == id) {
                    this.setState({
                        post: post,
                    })
                }
            })

        } else {
            this.state.postsSwedish.map((post) => {
                if (post.id == id) {
                    this.setState({
                        post: post,
                    })
                }
            })
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
export default Blog;