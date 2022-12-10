import { Link } from 'react-router-dom'
import StaticGerman from './static-german';
import { useEffect } from 'react';

function AccessibilityGerman() {
    useEffect(() => {
        document.title = 'Barrierefreiheit';
    });

    return (
        <main>
            <div className="row">
                {/* Länkstig */}
                <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus 
                            focus-invisible regular-font-size" to={"/"}>Home</Link>/</li>
                        <li><Link className="active-breadcrumb focus focus-invisible regular-font-size" 
                            to={"/accessibility"}> Barrierefreiheit</Link></li>
                    </ul>
                </nav>
            </div>
            <StaticGerman />
        </main>
    );
}

export default AccessibilityGerman;