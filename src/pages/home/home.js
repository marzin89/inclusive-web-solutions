// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import StaticGerman from './german/static-german';
import StaticSwedish from './swedish/static-swedish';
import PostsGerman from './german/posts-german';
import PostsSwedish from './swedish/posts-swedish';

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
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} : {display: 'none'}}>
                        <Link className="focus focus-invisible regular-font-size" to={"/login"} 
                        onClick={this.handleLogout}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ?
                <div className="row">
                    <StaticGerman />
                    <PostsGerman />
                </div>
                :
                <div className="row">
                    <StaticSwedish />
                    <PostsSwedish />
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