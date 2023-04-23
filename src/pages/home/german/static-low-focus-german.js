// Imports
import React from 'react';
import { Link } from 'react-router-dom';

function StaticLowFocusGerman() {
    return (
        <section id="home" className="home-left">
            <h1 id="h1-home" className="text h1-font-size">Inclusive Web Solutions</h1>
            <h3 className="text h3-font-size">Barrierefreie Websites leicht gemacht</h3>
            <div id="home-welcome">
                <p className="text regular-font-size line-height">
                    Sie möchten mit Ihrer Website alle potentiellen Kunden erreichen? 
                    Wir helfen Ihnen dabei. Wir von Inclusive Web Solutions kennen uns mit 
                    Barrierefreiheit im Internet aus. Gerne helfen wir Ihrem Unternehmen, 
                    Ihre Website auf einen barrierefreien Stand zu bringen.
                    Unsere Vision ist es, ein barrierefreies Internet zu schaffen.</p>
                <button id="about-btn" className="text focus-invisible regular-font-size" 
                    aria-label="Seite Über uns öffnen" onClick={() => window.open('/about', '_self')}>
                        Über uns</button>
                <button id="contact-btn" className="text focus-invisible regular-font-size"
                    aria-label="Seite Kontakt öffnen"
                    onClick={() => window.open('/contact', '_self')}>Kontakt</button>
            </div>
            <section id="home-services">
                <h2 className="h2-home text h2-font-size">Dienstleistungen</h2>
                <div id="home-services-wrapper">
                    <article className="tests">
                        <h3 className="text h3-font-size">Tests</h3>
                        <p className="text regular-font-size line-height">
                            Wir testen die Zugänglichkeit Ihrer
                            Website und bieten 
                            Lösungsvorschläge an.</p>
                        <p><Link className="text focus-invisible find-out-more regular-font-size"
                            to={"/services"} >Mehr</Link></p>
                    </article>
                    <article className="solutions">
                        <h3 className="text h3-font-size">Entwicklung</h3>
                        <p className="text regular-font-size line-height">
                            Wir testen Ihre Website und beheben
                            eventuelle Mängel für Sie.</p>
                        <p><Link className="text focus-invisible find-out-more regular-font-size"
                            to={"/services"} >Mehr</Link></p>
                    </article>
                </div>
                <article className="courses">
                    <h3 className="text h3-font-size">Kurse</h3>
                    <p className="text regular-font-size line-height">
                        Barrierefreies Internet lernen und erleben.
                        Surfen Sie mit verschiedenen 
                        Hilfsmitteln.</p>
                    <p><Link className="text focus-invisible find-out-more regular-font-size"
                        to={"/services"} >Mehr</Link></p>
                </article>
                <button id="services-btn" className="text focus-invisible regular-font-size"
                    aria-label="Seite Dienstleistungen öffnen" 
                    onClick={() => window.open('/services', '_self')}>Dienstleistungen</button>
            </section>
        </section>
    ) 
}

export default StaticLowFocusGerman;