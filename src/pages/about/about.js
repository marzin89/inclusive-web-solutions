// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import rasmus from '../../images/om-oss/rasmus.png';
import joel from '../../images/om-oss/joel.png';
import marco from '../../images/om-oss/marco.png';

// Om oss
class About extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState        = this.setState.bind(this);
        this.handleLogout    = this.handleLogout.bind(this);
        this.handlePageTitle = this.handlePageTitle.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);

        this.state = {
            signedIn: this.props.signedIn,
        }
    }

    // Rendrering
    render() {
        return (
            <main id="main">
                <div className="row">
                    {/* Länkstig */}
                    {localStorage.getItem('language') == 'Deutsch' ?
                    <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                        <ul>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/"}
                                onClick={this.handleLinkClick}>Home</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/about"}
                                onClick={this.handleLinkClick}> Über uns</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/"}
                                onClick={this.handleLinkClick}>Start</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/about"}
                                onClick={this.handleLinkClick}> Om oss</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="text focus regular-font-size" to={"/login"} 
                        onClick={this.handleLinkClick}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ?
                <section id="about">
                    <h1 className="text h1-about h1-font-size">Über uns</h1>
                        <section id="about-iws">
                            <article>
                                <h2 className="text h2-font-size">Geschichte</h2>
                                <p className="text regular-font-size">
                                    Inclusive Web Solutions besteht aus
                                    drei Junior-Webentwicklern. Die 
                                    Geschäftsidee entstand im letzten 
                                    Semester an der Mittuniversitetet. 
                                    Das Unternehmen wurde im Frühjahr 
                                    2022 gegründet.</p>   
                            </article>
                            <article>
                                <h2 className="text h2-font-size">Vision und Mission</h2>
                                <p className="text regular-font-size">
                                    Unsere Vision ist es, ein barrierefreies 
                                    Internet zu schaffen.</p>
                                <p className="text regular-font-size">
                                    Wir bieten Dienstleistungen im 
                                    Bereich Web Accessibility an 
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
                        </section>
                        <section id="about-employees">
                            <h2 className="text h2-font-size">Mitarbeiter</h2>
                            <div id="about-employees-wrapper">
                                <article id="rasmus">
                                    <img src={rasmus} alt="Rasmus Fogelberg"></img>  
                                    <h3 className="text h3-font-size">Rasmus Fogelberg</h3>
                                    <h4 className="text regular-font-size">Projekmanagement und Entwicklung</h4>
                                    <p><a className="text focus regular-font-size" href="mailto:rasmus.fogelberg@epost.se">
                                        rasmus.fogelberg@epost.se</a></p>
                                    <p className="text regular-font-size">073-123 45 67</p>
                                </article>
                                <article id="joel">
                                    <img src={joel} alt="Joel Karlsson"></img>  
                                    <h3 className="text h3-font-size">Joel Karlsson</h3>
                                    <h4 className="text regular-font-size">CRM und Entwicklung</h4>
                                    <p><a className="text focus regular-font-size" href="mailto:joel.karlsson@epost.se">
                                        joel.karlsson@epost.se</a></p>
                                    <p className="text regular-font-size">073-765 43 21</p>
                                </article>
                                <article id="marco">
                                    <img src={marco} alt="Marco Zintl"></img>  
                                    <h3 className="text h3-font-size">Marco Zintl</h3>
                                    <h4 className="text regular-font-size">Qualitätssicherung und Entwicklung</h4>
                                    <p><a className="text focus regular-font-size" href="mailto:mazi2001@student.miun.se">
                                        mazi2001@student.miun.se</a></p>
                                    <p className="text regular-font-size">073-123 45 67</p>
                                </article>
                            </div>
                        </section>
                </section>
                :
                <section id="about">
                    <h1 className="h1-about text h1-font-size">Om oss</h1>
                    <section id="about-iws">
                        <article>
                            <h2 className="text h2-font-size">Historia</h2>
                            <p className="text regular-font-size">
                                Inclusive Web Solutions består av tre
                                juniora webbutvecklare. Affärsidén 
                                kläcktes under sista terminen på 
                                Webbutvecklingsprogrammet på 
                                Mittuniversitetet. Företaget startades
                                under våren 2022.</p>   
                        </article>
                        <article>
                            <h2 className="text h2-font-size">Vision och mission</h2>
                            <p className="text regular-font-size">
                                Vår vision är en värld där alla, oavsett 
                                förutsättningar, ska kunna ta del av 
                                innehåll på webben.</p>
                            <p className="text regular-font-size">
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
                    </section>
                    <section id="about-employees">
                        <h2 className="text h2-font-size">Medarbetare</h2>
                        <div id="about-employees-wrapper">
                            <article id="rasmus">
                                <img src={rasmus} alt="Rasmus Fogelberg"></img>  
                                <h3 className="text h3-font-size">Rasmus Fogelberg</h3>
                                <h4 className="text regular-font-size">Projektledning och utveckling</h4>
                                <p><a className="text focus regular-font-size email-about" href="mailto:rasmus.fogelberg@epost.se">
                                    rasmus.fogelberg@epost.se</a></p>
                                <p className="text regular-font-size">073-123 45 67</p>
                            </article>
                            <article id="joel">
                                <img src={joel} alt="Joel Karlsson"></img>  
                                <h3 className="text h3-font-size">Joel Karlsson</h3>
                                <h4 className="text regular-font-size">Kundrelationer och utveckling</h4>
                                <p><a className="text focus regular-font-size email-about" href="mailto:joel.karlsson@epost.se">
                                    joel.karlsson@epost.se</a></p>
                                <p className="text regular-font-size">073-765 43 21</p>
                            </article>
                            <article id="marco">
                                <img src={marco} alt="Marco Zintl"></img>  
                                <h3 className="text h3-font-size">Marco Zintl</h3>
                                <h4 className="text regular-font-size">Kvalitetssäkring och utveckling</h4>
                                <p><a className="text focus regular-font-size email-about" href="mailto:mazi2001@student.miun.se">
                                    mazi2001@student.miun.se</a></p>
                                <p className="text regular-font-size">073-123 45 67</p>
                            </article>
                        </div>
                    </section>
                </section>
                }
            </main>
        )
    }

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Om oss');
        localStorage.setItem('pageGerman', 'Über uns');

        if (localStorage.getItem('language') == 'Deutsch') {
            document.title = 'Über uns';

        } else {
            document.title = 'Om oss';
        }

        if (localStorage.getItem('accessibility-error')) {
            const text = document.getElementsByClassName('text');

            switch(localStorage.getItem('accessibility-error')) {
                case 'contrast':
                    for (let i = 0; i < text.length; i++) {
                        text[i].style.opacity = 0.1;
                    }
                break;
    
                /*
                case 'responsiveness':
                    const meta = document.getElementsByName('viewport');
                    meta[0].remove();
                break;
                */
    
                case 'tab-focus':
                    const focus = document.getElementsByClassName('focus');
    
                    for (let i = 0; i < document.getElementsByClassName('focus').length; i++) {
                        console.log('foo');
                        focus[i].className = focus[i].className.replace('focus', 'focus-invisible');
                    }
                break;
    
                case 'font-size':
                    for (let i = 0; i < text.length; i++) {
                        if (text[i].className.indexOf('h1-font-size') >= 0) {
                            text[i].style.fontSize = '19px';
                        
                        } else if (text[i].className.indexOf('h2-font-size') >= 0) {
                            text[i].style.fontSize = '15px';
                        
                        } else if (text[i].className.indexOf('h3-font-size') >= 0) {
                            text[i].style.fontSize = '12px';
    
                        } else if (text[i].className.indexOf('regular-font-size')) {
                            text[i].style.fontSize   = '8px';
                            text[i].style.lineHeight = '8px'
                        
                        } else if (text[i].className.indexOf('small-font-size')) {
                            text[i].style.fontSize = '8px';
                        }
                    }
                break;
            }
        }
    }

    handleLinkClick(e) {
        if (e.target.innerHTML == 'Logga ut') {
            this.handleLogout(e);

        } else {
            this.handlePageTitle(e);
        }
    }

    handlePageTitle(e) {
        if (e.target.id == 'logo') {
            if (localStorage.getItem('language') == 'Deutsch') {
                localStorage.setItem('page', 'Home');
                document.title = 'Home';
            
            } else {
                localStorage.setItem('page', 'Start');
                document.title = 'Start';
            }

        } else {
            localStorage.setItem('page', e.target.innerHTML);
            document.title = e.target.innerHTML;
        }
    }

    // Utloggning
    handleLogout(e) {

        // Förhidrar att sidan laddas om
        e.preventDefault();

        this.props.logout();
    }
}

// Exporterar komponenten
export default About;