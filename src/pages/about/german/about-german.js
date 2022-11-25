import { Link } from 'react-router-dom';
import StaticGerman from './german/static-german';
import { useEffect } from 'react';

function AboutGerman() {
    useEffect(() => {
        document.title = 'Über uns';
    });

    return (
        <main>
            <div className="row">
                {/* Länkstig */}
                <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb 
                            focus focus-invisible regular-font-size" to={"/"}>Home</Link>/</li>
                        <li><Link className="inactive-breadcrumb focus focus-invisible 
                            regular-font-size" to={"/about"}> Über uns</Link></li>
                    </ul>
                </nav>
            </div>
            <StaticGerman />
        </main>
    );
}

export default AboutGerman;