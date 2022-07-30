// Imports
import React from 'react';
import { Link } from 'react-router-dom';

function StaticSwedish() {
    return (
        <section id="home" className="home-left">
            <h1 id="h1-home" className="h1-font-size">Inclusive Web Solutions</h1>
            <h2 className="h3-font-size">Tillgängliga webbplatser utan krångel</h2>
            <div id="home-welcome">
                <p className="regular-font-size line-height">
                    Vill du nå ut till alla potentiella kunder med din webbplats? 
                    Vi på Inclusive Web Solutions kan webbtillgänglighet.
                    Vi hjälper ditt företag att uppnå god tillgänglighet på din webbplats. 
                    Vår vision är en värld där alla, oavsett förutsättningar, 
                    ska kunna ta del av innehåll på webben.</p>
                <button id="about-btn" className="focus focus-invisible regular-font-size"
                    aria-label="Öppnar sidan Om oss" 
                    onClick={() => window.open('/about', '_self')}>Om oss</button>
                <button id="contact-btn" className="focus focus-invisible regular-font-size"
                    aria-label="Öppnar sidan Kontakt" onClick={() => window.open('/contact', '_self')}>
                        Kontakt</button>
            </div>
            <section id="home-services">
                <h2 className="h2-home h2-font-size">Tjänster</h2>
                <div id="home-services-wrapper">
                    <article className="tests">
                        <h3 className="h3-font-size">Testning</h3>
                        <p className="regular-font-size line-height">
                            Vi testar tillgängligheten på din webbplats och ger förslag på hur du
                            kan åtgärda eventuella brister.</p>
                        <p><Link className="focus focus-invisible find-out-more regular-font-size"
                            to={"/services"} >Läs mer</Link></p>
                    </article>
                    <article className="solutions">
                        <h3 className="h3-font-size">Utveckling</h3>
                        <p className="regular-font-size line-height">
                            Vi testar tillgängligheten på din webbplats och åtgärdar eventuella 
                            brister.</p>
                        <p><Link className="focus focus-invisible find-out-more regular-font-size"
                            to={"/services"} >Läs mer</Link></p>
                    </article>
                </div>
                <article className="courses">
                    <h3 className="h3-font-size">Utbildning</h3>
                    <p className="regular-font-size line-height">
                        Bredda dina kunskaper inom webbtillgänglighet och testa att surfa 
                        med olika hjälpmedel.</p>
                    <p><Link className="focus focus-invisible find-out-more regular-font-size"
                        to={"/services"} >Läs mer</Link></p>
                </article>
                <button id="services-btn" className="focus focus-invisible regular-font-size"
                    aria-label="Öppnar sidan Tjänster"
                    onClick={() => window.open('/services', '_self')}>Tjänster</button>
            </section>
        </section>
    ) 
}

export default StaticSwedish;