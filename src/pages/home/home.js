// Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Start
class Home extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState        = this.setState.bind(this);
        this.getPosts        = this.getPosts.bind(this);
        this.handleLogout    = this.handleLogout.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);

        this.state = {
            postsSwedish: [],
            postsGerman:  [],
            errorSwedish: '',
            errorGerman:  '',
            signedIn:     this.props.signedIn,
        }

        this.getPosts();
    }

    render() {
        return (
            <main id="main">
                <div className="row">
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} : 
                        {display: 'none'}}><Link className="text focus regular-font-size" to={"/login"} 
                        onClick={this.handleLogout}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ?
                <div className="row">
                    <section id="home" className="home-left">
                        <h1 id="h1-home" className="text h1-font-size">Inclusive Web Solutions</h1>
                        <div id="home-welcome">
                            <p className="text regular-font-size">
                                Sie möchten mit Ihrer Website alle 
                                potentiellen Kunden erreichen? Wir 
                                helfen Ihnen dabei. Wir von Inclusive 
                                Web Solutions kennen uns mit Barrierefreiheit im Internet aus. 
                                Unsere Vision ist es, ein barrierefreies Internet zu schaffen.</p>
                            <button id="about-btn" className="text focus regular-font-size"
                                aria-label="Seite Über uns öffnen"
                                onClick={() => window.open('/about', '_self')}>Über uns</button>
                            <button id="contact-btn" className="text focus regular-font-size"
                                aria-label="Seite Kontakt öffnen"
                                onClick={() => window.open('/contact', '_self')}>Kontakt</button>
                        </div>
                        <section id="home-services">
                            <h2 className="h2-home text h2-font-size">Dienstleistungen</h2>
                            <div id="home-services-wrapper">
                                <article className="tests">
                                    <h3 className="text h3-font-size">Tests</h3>
                                    <p className="text regular-font-size">
                                        Wir testen die Zugänglichkeit Ihrer
                                        Website und bieten 
                                        Lösungsvorschläge an.</p>
                                    <p><Link className="text focus find-out-more regular-font-size"
                                        to={"/services"} >Mehr</Link></p>
                                </article>
                                <article className="solutions">
                                    <h3 className="text h3-font-size">Entwicklung</h3>
                                    <p className="text regular-font-size">
                                        Wir testen Ihre Website und beheben
                                        eventuelle Mängel für Sie.</p>
                                    <p><Link className="text focus find-out-more regular-font-size"
                                        to={"/services"} >Mehr</Link></p>
                                </article>
                            </div>
                            <article className="courses">
                                <h3 className="text h3-font-size">Kurse</h3>
                                <p className="text regular-font-size">
                                    Barrierefreies Internet lernen und erleben.
                                    Surfen Sie mit verschiedenen 
                                    Hilfsmitteln.</p>
                                <p><Link className="text focus find-out-more regular-font-size"
                                    to={"/services"} >Mehr</Link></p>
                            </article>
                            <button id="services-btn" className="text focus regular-font-size"
                                aria-label="Seite Dienstleistungen öffnen" 
                                onClick={() => window.open('/services', '_self')}>Dienstleistungen</button>
                        </section>
                    </section>
                    <section className="home-right">
                        <h2 className="h2-home text h2-font-size">Neues</h2>
                        {this.state.postsGerman ? this.state.postsGerman.map((post) => {
                            return (
                                <article key={post.id}>
                                    <h3 className="text h3-font-size">{post.title}</h3>
                                    <p className="date text small-font-size">{post.date.slice(0, 10)}</p>
                                    <p className="text regular-font-size">{post.content[0].slice(0, 150) + ' ...'}</p>
                                    <p><Link id={`post${post.id}`} className="text focus find-out-more regular-font-size"
                                        to={"/posts"} onClick={this.handleLinkClick}>Mehr</Link></p>
                                </article>
                            )
                        }) : null}
                        <p className="error text regular-font-size" role="alert" style={this.state.errorGerman ?
                                {display: 'block'} : {display: 'none'}}>{this.state.errorGerman}</p>
                        <button id="posts-btn" className="text focus regular-font-size"
                            aria-label="Seite Blog öffnen" onClick={() => window.open('/blog', '_self')} 
                            style={this.state.errorGerman ? {display: 'none'} : {display: 'block'}}>
                                Alle Posts</button>
                    </section>
                </div>
                :
                <div className="row">
                    <section id="home" className="home-left">
                        <h1 id="h1-home" className="text h1-font-size">Inclusive Web Solutions</h1>
                        <div id="home-welcome">
                            <p className="text regular-font-size">
                                Vill du nå ut till alla potentiella kunder 
                                med din webbplats? Vi på Inclusive 
                                Web Solutions kan 
                                webbtillgänglighet. Vår vision är en 
                                värld där alla, oavsett förutsättningar, 
                                ska kunna ta del av innehåll på 
                                webben.</p>
                            <button id="about-btn" className="text focus regular-font-size"
                                aria-label="Öppnar sidan Om oss" 
                                onClick={() => window.open('/about', '_self')}>Om oss</button>
                            <button id="contact-btn" className="text focus regular-font-size"
                                aria-label="Öppnar sidan Kontakt" onClick={() => window.open('/contact', '_self')}>
                                    Kontakt</button>
                        </div>
                        <section id="home-services">
                            <h2 className="h2-home text h2-font-size">Tjänster</h2>
                            <div id="home-services-wrapper">
                                <article className="tests">
                                    <h3 className="text h3-font-size">Testning</h3>
                                    <p className="text regular-font-size">
                                        Vi testar tillgängligheten på din 
                                        webbplats och ger förslag på hur du
                                        kan åtgärda eventuella brister.</p>
                                    <p><Link className="text focus find-out-more regular-font-size"
                                        to={"/services"} >Läs mer</Link></p>
                                </article>
                                <article className="solutions">
                                    <h3 className="text h3-font-size">Utveckling</h3>
                                    <p className="text regular-font-size">
                                        Vi testar tillgängligheten på din 
                                        webbplats och åtgärdar eventuella 
                                        brister.</p>
                                    <p><Link className="text focus find-out-more regular-font-size"
                                        to={"/services"} >Läs mer</Link></p>
                                </article>
                            </div>
                            <article className="courses">
                                <h3 className="text h3-font-size">Utbildning</h3>
                                <p className="text regular-font-size">
                                    Bredda dina kunskaper inom 
                                    webbtillgänglighet och testa att surfa 
                                    med olika hjälpmedel.</p>
                                <p><Link className="text focus find-out-more regular-font-size"
                                    to={"/services"} >Läs mer</Link></p>
                            </article>
                            <button id="services-btn" className="text focus regular-font-size"
                                aria-label="Öppnar sidan Tjänster"
                                onClick={() => window.open('/services', '_self')}>Tjänster</button>
                        </section>
                    </section>
                    <section className="home-right">
                        <h2 className="h2-home text h2-font-size">Senaste nytt</h2>
                        {this.state.postsSwedish ? this.state.postsSwedish.map((post) => {
                            return (
                                <article key={post.id}>
                                    <h3 className="text h3-font-size">{post.title}</h3>
                                    <p className="date text small-font-size">{post.date.slice(0, 10)}</p>
                                    <p className="text regular-font-size">{post.content[0].slice(0, 150) + ' ...'}</p>
                                    <p><Link id={`post${post.id}`} className="text focus find-out-more regular-font-size"
                                        to={"/post"} onClick={this.handleLinkClick}>Läs mer</Link></p>
                                </article>
                            )
                        }) : null}
                        <p className="error text regular-font-size" role="alert" style={this.state.errorSwedish ?
                                {display: 'block'} : {display: 'none'}}>{this.state.errorSwedish}</p>
                        <button id="posts-btn" className="text focus regular-font-size" aria-label="Öppnar sidan Blogg"
                            onClick={() => window.open('/blog', '_self')} 
                            style={this.state.errorSwedish ? {display: 'none'} : {display: 'block'}}>
                                Alla inlägg</button>
                    </section>
                </div>
            }
            </main>
        )
    }

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Start');
        localStorage.setItem('pageGerman', 'Home');

        if (localStorage.getItem('language') == 'Deutsch') {
            document.title = 'Home';

        } else {
            document.title = 'Start';
        }

        if (localStorage.getItem('accessibility-error')) {
            const text  = document.getElementsByClassName('text');

            switch(localStorage.getItem('accessibility-error')) {
                case 'contrast':
                    for (let i = 0; i < text.length; i++) {
                        text[i].style.opacity = 0.1;
                    }
                break;
    
                case 'responsiveness':

                    /*
                    const meta = document.getElementsByName('viewport');
                    meta[0].remove();
                    */
                break;
    
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

    handleLinkClick(e) {
        localStorage.setItem('postId', e.target.id.slice(4));

        if (e.target.id == 'about-btn') {
            if (localStorage.getItem('language') == 'Deutsch') {
                document.title = 'Über uns';
            
            } else {
                document.title = 'Om oss';
            }

        } else if (e.target.id == 'contact-btn') {
            document.title = 'Kontakt';
        
        } else if (e.target.id == 'services-btn') {
            if (localStorage.getItem('language') == 'Deutsch') {
                document.title = 'Dienstleistungen';
            
            } else {
                document.title = 'Tjänster';
            }
        
        } else if (e.target.id == 'posts-btn') {
            if (localStorage.getItem('language') == 'Deutsch') {
                document.title = 'Blog';
            
            } else {
                document.title = 'Blogg';
            }
        
        }
    }

    // Utloggning
    handleLogout(e) {

        // Förhidrar att sidan laddas om
        e.preventDefault();

        this.props.logout();
    }

    getPosts() {
        fetch('https://iws-rest-api.herokuapp.com/posts')
        .then(response => response.json())
        .then(data => {
            if (!data.length) {
                this.setState({
                    error:        true,
                    errorSwedish: 'Inga inlägg hittades.',
                    errorGerman:  'Es wurden keine Posts gefunden.',
                })
            
            } else {
                let filterSwedish  = [];
                let filterGerman   = [];
                let postArrSwedish = [];
                let postArrGerman  = [];

                data.forEach((post) => {
                    if (post.language == 'german') {
                        filterGerman.push(post);
                    
                    } else if (post.language == 'swedish') {
                        filterSwedish.push(post);
                    }
                });

                for (let i = 0; i < 3; i++) {
                    if (filterSwedish[i]) {
                        postArrSwedish.push(filterSwedish[i]);
                    }

                    if (filterGerman[i]) {
                        postArrGerman.push(filterGerman[i]);
                    }
                }

                this.setState({
                    error:        false,
                    postsSwedish: postArrSwedish,
                    postsGerman:  postArrGerman,
                })
            }
        })
        .catch(() => {
            this.setState({
                error:        true,
                errorSwedish: 'Ett serverfel har uppstått. Det gick inte att hämta inlägg.' 
                                + 'Försök igen lite senare.',
                errorGerman:  'Ein Serverfehler ist aufgetreten. Es konnten keine Posts abgerufen werden. '
                                + 'Versuchen Sie es später erneut.',
            })
        })
    }
}

// Exporterar komponenten
export default Home;