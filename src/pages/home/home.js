import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StaticGerman from './german/static-german';
import StaticSwedish from './swedish/static-swedish';
import PostsGerman from './german/posts-german';
import PostsSwedish from './swedish/posts-swedish';

function Home(props) {
    return (
        <main id="main">
            <div className="row">
                <p id="logout" style={this.props.signedIn ? {display: 'block'} : {display: 'none'}}>
                    <Link className="focus focus-invisible regular-font-size" to={"/home"} 
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
    );

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Start');
        localStorage.setItem('pageGerman', 'Home');

        if (localStorage.getItem('language') == 'Deutsch') {
            document.title = 'Home';

        } else {
            document.title = 'Start';
        }
    }

    // Utloggning
    handleLogout() {
        this.props.logout();
    }
}

// Exporterar komponenten
export default Home;