import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormGerman from './form-german';

function ContactGerman() {
    useEffect(() => {
        document.title = 'Kontakt';
    });

    return (
        <main>
            <div className="row">
                {/* Länkstig */}
                <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus 
                            focus-invisible regular-font-size" to={"/"}>Home</Link>/</li>
                        <li><Link className="active-breadcrumb focus focus-invisible 
                            regular-font-size" to={"/contact"}> Kontakt</Link></li>
                    </ul>
                </nav>
            </div>
            <FormGerman />
        </main>
    );
}

export default ContactGerman;