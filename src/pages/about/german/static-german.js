// Imports
import React from 'react';
import rasmus from '../../../images/om-oss/rasmus.png';
import joel from '../../../images/om-oss/joel.png';
import marco from '../../../images/om-oss/marco.png';

function StaticGerman() {
    return (
        <section id="about">
            <h1 className="h1-about h1-font-size">Über uns</h1>
                <div id="about-iws">
                    <article>
                        <h2 className="h2-font-size">Geschichte</h2>
                        <p className="regular-font-size line-height">
                            Inclusive Web Solutions besteht aus
                            drei Junior-Webentwicklern. Die 
                            Geschäftsidee entstand im letzten 
                            Semester an der Mittuniversitetet. 
                            Das Unternehmen wurde im Frühjahr 
                            2022 gegründet.</p>   
                    </article>
                    <article>
                        <h2 className="h2-font-size">Vision und Mission</h2>
                        <p className="body-text regular-font-size line-height">
                            Unsere Vision ist es, ein barrierefreies 
                            Internet zu schaffen.</p>
                        <p className="regular-font-size line-height">
                            Wir bieten IT-Dienstleistungen im 
                            Bereich Barrierefreiheit an 
                            Unternehmen an. Die Digitalisierung
                            führt dazu, dass immer mehr 
                            Menschen auf das Internet 
                            angewiesen sind, was wiederum den
                            Bedarf nach barrierefreien Lösungen
                            steigert, ein Umstand, der sich 
                            zunehmend in der Gesetzgebung 
                            durchsetzt. IT und Barrierefreiheit sind
                            unsere Leidenschaft. Mit unserem 
                            Wissen und Können wollen wir die 
                            Barrieren im Internet dorthin schaffen, 
                            wo sie hingehören: in die Mottenkiste.</p>   
                    </article>
                </div>
                <section id="about-employees">
                    <h2 className="h2-font-size">Mitarbeiter</h2>
                    <div id="about-employees-wrapper">
                        <article id="rasmus">
                            <img src={rasmus} alt="Rasmus Fogelberg"></img>  
                            <h3 className="h3-font-size">Rasmus Fogelberg</h3>
                            <h4 className="regular-font-size">Projektmanagement und Entwicklung</h4>
                            <p><a className="focus focus-invisible regular-font-size email-about"
                                href="mailto:rasmus.fogelberg@epost.se">rasmus.fogelberg@epost.se</a></p>
                            <p className="regular-font-size">073-123 45 67</p>
                        </article>
                        <article id="joel">
                            <img src={joel} alt="Joel Karlsson"></img>  
                            <h3 className="h3-font-size">Joel Karlsson</h3>
                            <h4 className="regular-font-size">CRM und Entwicklung</h4>
                            <p><a className="focus focus-invisible regular-font-size email-about" 
                                href="mailto:joel.karlsson@epost.se">joel.karlsson@epost.se</a></p>
                            <p className="regular-font-size">073-765 43 21</p>
                        </article>
                        <article id="marco">
                            <img src={marco} alt="Marco Zintl"></img>  
                            <h3 className="h3-font-size">Marco Zintl</h3>
                            <h4 className="regular-font-size">Qualitätssicherung und Entwicklung</h4>
                            <p><a className="focus focus-invisible regular-font-size email-about" 
                                href="mailto:mazi2001@student.miun.se">mazi2001@student.miun.se</a></p>
                            <p className="regular-font-size">073-123 45 67</p>
                        </article>
                    </div>
                </section>
        </section>
    )
}

export default StaticGerman;