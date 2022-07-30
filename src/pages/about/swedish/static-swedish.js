// Imports
import React from 'react';
import rasmus from '../../../images/om-oss/rasmus.png';
import joel from '../../../images/om-oss/joel.png';
import marco from '../../../images/om-oss/marco.png';

function StaticSwedish() {
    return (
        <section id="about">
                    <h1 className="h1-about h1-font-size">Om oss</h1>
                    <div id="about-iws">
                        <article>
                            <h2 className="h2-font-size">Historia</h2>
                            <p className="regular-font-size line-height">
                                Inclusive Web Solutions består av tre
                                juniora webbutvecklare. Affärsidén 
                                kläcktes under sista terminen på 
                                Webbutvecklingsprogrammet på 
                                Mittuniversitetet. Företaget startades
                                under våren 2022.</p>   
                        </article>
                        <article>
                            <h2 className="h2-font-size">Vision och mission</h2>
                            <p className="body-text regular-font-size line-height">
                                Vår vision är en värld där alla, oavsett 
                                förutsättningar, ska kunna ta del av 
                                innehåll på webben.</p>
                            <p className="regular-font-size line-height">
                                Vi erbjuder tjänster inom 
                                webbtillgänglighet till företag. Den
                                ökande digitaliseringen har lett till att
                                allt fler människor använder internet
                                för att sköta vardagliga ärenden. 
                                Behovet av tillgängliga digitala 
                                tjänster har ökat, vilket även 
                                återspeglas i lagstiftningen.
                                Vi på Inclusive Web Solutions brinner 
                                för it och tillgänglighet. Med vår 
                                kompetens och kunskap vill vi bidra 
                                till att undanröja barriärer på webben.</p>   
                        </article>
                    </div>
                    <section id="about-employees">
                        <h2 className="h2-font-size">Medarbetare</h2>
                        <div id="about-employees-wrapper">
                            <article id="rasmus">
                                <img src={rasmus} alt="Rasmus Fogelberg"></img>  
                                <h3 className="h3-font-size">Rasmus Fogelberg</h3>
                                <h4 className="regular-font-size">Projektledning och utveckling</h4>
                                <p><a className="focus focus-invisible regular-font-size email-about" 
                                    href="mailto:rasmus.fogelberg@epost.se">rasmus.fogelberg@epost.se</a></p>
                                <p className="regular-font-size">073-123 45 67</p>
                            </article>
                            <article id="joel">
                                <img src={joel} alt="Joel Karlsson"></img>  
                                <h3 className="h3-font-size">Joel Karlsson</h3>
                                <h4 className="regular-font-size">Kundrelationer och utveckling</h4>
                                <p><a className="focus focus-invisible regular-font-size email-about"
                                    href="mailto:joel.karlsson@epost.se">joel.karlsson@epost.se</a></p>
                                <p className="regular-font-size">073-765 43 21</p>
                            </article>
                            <article id="marco">
                                <img src={marco} alt="Marco Zintl"></img>  
                                <h3 className="h3-font-size">Marco Zintl</h3>
                                <h4 className="regular-font-size">Kvalitetssäkring och utveckling</h4>
                                <p><a className="focus focus-invisible regular-font-size email-about" 
                                    href="mailto:mazi2001@student.miun.se">mazi2001@student.miun.se</a></p>
                                <p className="regular-font-size">073-123 45 67</p>
                            </article>
                        </div>
                    </section>
                </section>
    )
}

export default StaticSwedish;