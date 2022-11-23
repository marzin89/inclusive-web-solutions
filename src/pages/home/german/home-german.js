import StaticGerman from './static-german';
import PostsGerman from './posts-german';
import { useEffect } from 'react';

function HomeGerman() {
    useEffect(() => {
        document.title = 'Home';
    });

    return (
        <main id="main">
            <div className="row">
                <StaticGerman />
                <PostsGerman />
            </div>
        </main>
    );
}

export default HomeGerman;