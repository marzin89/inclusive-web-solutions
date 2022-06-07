// Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Om webbtillgänglighet
class Accessibility extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState        = this.setState.bind(this);
        this.handleBtnClick  = this.handleBtnClick.bind(this);
        this.handleLogout    = this.handleLogout.bind(this);

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
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/"}>
                                Home</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/accessibility"}> 
                                Barrierefreiheit</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/"}>
                                Start</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/accessibility"}> 
                                Om webbtillgänglighet</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="text focus regular-font-size" to={"/login"} 
                        onClick={this.handleLogout}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ?
                <section id="accessibility">
                    <h1 className="text h1-font-size">Barrierefreiheit</h1>
                    <p className="text body-text regular-font-size">
                        Barrierefreiheit im Internet bedeutet, dass 
                        Websites so konstruiert sind, dass sie
                        von allen benutzt werden können. Es
                        gibt viele Gründe, die für Barrierefreiheit im Internet 
                        sprechen. Laut der 
                        Barrierefreie-Informationstechnik-
                        Verordnung (BITV) müssen Websites
                        öffentlicher Stellen barrierefrei sein.</p>
                    <p className="text body-text regular-font-size">
                        Doch was ist mit privaten 
                        Unternehmen? Lohnt sich der 
                        Aufwand? Auf jeden Fall! Eine
                        barrierefreie Website erreicht 
                        mehr potentielle Kunden, was sich 
                        wiederum positiv auf Ihren Umsatz
                        auswirken kann. Und auch auf das 
                        Ansehen Ihres Unternehmens. 
                        Niedrigere Kosten, weniger 
                        Beschwerden und zufriedenere 
                        Kunden und Mitarbeiter sind weitere
                        Vorteile. Kurz gesagt: Sie können 
                        nur gewinnen.</p>
                    <section>
                        <h2 className="text h2-font-size">Erleben Sie den Unterschied</h2>
                        <p className="text regular-font-size">
                            Erlebnisse sagen mehr als Worte. 
                            Hier können Sie selbst eine unzugängliche Website erleben.</p>
                            <button id="stop-btn" 
                                aria-label="Zugänglichkeit der Website wiederherstellen.
                                Bei Knopfdruck erscheint eine Erklärung under dem Knopf,
                                der zuvor gedrückt wurde (Kontrast, Responsivität,
                                Tab-Fokus oder Textgröße/Zeilenabstand)." aria-haspopup="true"
                                aria-expanded="false" onClick={this.handleBtnClick}>Beenden</button>
                        <h3 className="text h3-accessibility h3-font-size">Kontrast</h3>
                        <p className="text regular-font-size">
                            Drücken Sie auf den Knopf, um die
                            Website mit unzureichendem Kontrast zu erleben.</p>
                        <button id="contrast" className="text focus regular-font-size accessibility-btn" 
                            aria-label="Niedrigkontrast-Modus aktivieren" aria-pressed="false" 
                            onClick={this.handleBtnClick}>Kontrast</button>
                        <p className="text explanation regular-font-size">
                            Wer nicht unter Sehbeschwerden
                            leidet, konnte wahrscheinlich den 
                            Großteil des Textes lesen - wenn auch
                            mit Mühe. Sorgen Sie stehts dafür,
                            dass der Kontrast auf Ihrer Website
                            ausreichend ist.</p>
                        <h3 className="text h3-accessibility h3-font-size">Responsivität</h3>
                        <p className="text regular-font-size">
                            Drücken Sie auf den Knopf und 
                            verringern Sie, für den Fall dass Sie
                            einen Desktop-Computer benutzen,
                            die Breite des Browser-Fensters.</p>
                        <button id="responsiveness" className="text focus regular-font-size admin-btn accessibility-btn" 
                            aria-label="Responsivität der Website deaktivieren" aria-pressed="false" 
                            onClick={this.handleBtnClick}>Responsivität</button>
                        <p className="text explanation regular-font-size">
                            Das nervt vielleicht, waagerecht 
                            zu scrollen. Sorgen Sie stehts dafür,
                            dass sich Ihre Website der Größe des
                            Bildschirms anpasst.</p>
                        <h3 className="text h3-accessibility h3-font-size">Tab-Fokus</h3>
                        <p className="text regular-font-size">
                            Drücken Sie auf den Knopf und 
                            versuchen Sie, die Website mit der
                            Tabulatortaste anstatt der Maus zu 
                            benutzen.</p>   
                        <button id="tab-focus" className="text focus regular-font-size admin-btn accessibility-btn" 
                            aria-label="Fokus bei der Navigation mittels der Tabulatortaste unsichtbar machen" 
                            aria-pressed="false" onClick={this.handleBtnClick}>Tab-Fokus</button>
                        <p className="text explanation regular-font-size">
                            Konnten Sie sich zurechtfinden? 
                            Personen mit motorischen 
                            Behinderungen sind häufig auf die 
                            Tabulatortaste angewiesen. Sorgen 
                            Sie stehts dafür, dass jeder Teil der 
                            Website deutlich hervorsticht, wenn 
                            er sich im Fokus befindet.</p>
                        <h3 className="text h3-accessibility h3-font-size">Textgröße und Zeilenabstand</h3>
                        <p className="text regular-font-size">
                            Drücken Sie auf den Knopf und 
                            versuchen Sie, den Text auf der 
                            Website zu vergrößern (ctrl+). </p>
                        <button id="font-size" className="text focus regular-font-size admin-btn accessibility-btn" 
                            aria-label="Textgröße und Zeilenabstand verkleinern" aria-pressed="false"
                            onClick={this.handleBtnClick}>Textgröße/Zeilenabstand</button>
                        <p className="text explanation regular-font-size">
                            Wer nicht unter Sehbeschwerden
                            leidet, konnte wahrscheinlich den 
                            Großteil des Textes lesen - wenn auch
                            mit Mühe. Die Größe des Textes auf 
                            einer Website sowie der 
                            Zeilenabstand sollten genügend sein 
                            und es sollte möglich sein, den Text 
                            zu vergrößern.</p>
                    </section>
                </section>
                :
                <section id="accessibility">
                    <h1 className="text h1-font-size">Om webbtillgänglighet</h1>
                    <p className="text body-text regular-font-size">
                        Webbtillgänglighet innebär att 
                        webbplatser utformas så att de kan 
                        användas av alla. Det finns många 
                        goda skäl till att ha en tillgänglig 
                        webbplats. Enligt lagen om 
                        tillgänglighet till digital offentlig 
                        service (DOS-lagen) måste offentliga 
                        webbplatser vara tillgängliga och 
                        lagen gäller även privata 
                        verksamheter som finansieras med 
                        offentliga medel. När 
                        tillgänglighetsdirektivet träder i kraft 
                        2025, kommer många fler privata
                        aktörer att omfattas av kraven på 
                        tillgänglighet.</p>
                    <p className="text body-text regular-font-size">
                        Men även om du inte omfattas av 
                        lagkraven, har du allt att vinna på att
                        ha en tillgänglig webbplats. Vad sägs 
                        om ökad trafik (och därmed 
                        konvertering och försäljning), ett 
                        bättre rykte, minskade kostnader för
                        support, ökad nöjdhet hos kunder 
                        och medarbetare och färre klagomål?
                        Ja, listan på fördelar kan göras lång.</p>
                    <section>
                        <h2 className="text h2-font-size">Se skillnaden</h2>
                        <p className="text regular-font-size">
                            Upplevelser säger mer än ord. 
                            Här kan du uppleva en otillgänglig webbplats.</p>
                            <button id="stop-btn"
                                aria-label="Återställer webbplatsens tillgänglighet.
                                Vid knapptryck visas en förklaring under den knapp som trycktes
                                tidigare (Kontrast, Responsivitet, Tabbfokus eller 
                                Teckenstorlek/radavstånd)." aria-haspopup="true"
                                aria-expanded="false" onClick={this.handleBtnClick}>Avsluta</button>
                        <h3 className="text h3-accessibility h3-font-size">Kontrast</h3>
                        <p className="text regular-font-size">
                            Tryck på knappen för att uppleva 
                            webbplatsen med låg kontrast.</p>
                        <button id="contrast" className="text focus regular-font-size accessibility-btn" 
                            aria-label="Aktiverar lågkontrastläget" aria-pressed="false" 
                            onClick={this.handleBtnClick}>Kontrast</button>
                        <p className="text explanation regular-font-size">
                            Har du inte nedsatt syn, så kunde du
                            förmodligen läsa mycket av texten
                            ändå. Men det var nog betydligt 
                            jobbigare än tidigare. Se till att ha 
                            tillräcklig kontrast på webbplatsen 
                            och överdriv gärna.</p>
                        <h3 className="text h3-accessibility h3-font-size">Responsivitet</h3>
                        <p className="text regular-font-size">
                            Tryck på knappen och minska webbläsarfönstrets bredd rejält om 
                            du använder en desktop.</p>
                        <button id="responsiveness" className="text focus regular-font-size accessibility-btn" 
                            aria-label="Avaktiverar webbplatsens responsivitet" aria-pressed="false"
                            onClick={this.handleBtnClick}>Responsivitet</button>
                        <p className="text explanation regular-font-size">
                            Visst är det jobbigt att behöva skrolla
                            vågrätt? Det är viktigt att ha en
                            mobilanpassad webbplats som 
                            anpassar sig efter skärmstorleken.</p>
                        <h3 className="text h3-accessibility h3-font-size">Tabbfokus</h3>
                        <p className="text regular-font-size">
                            Tryck på knappen och försök tabba igenom webbplatsen.</p>
                        <button id="tab-focus" className="text focus regular-font-size accessibility-btn" 
                            aria-label="Döljer fokus vid navigering med tabben" aria-pressed="false" 
                            onClick={this.handleBtnClick}>Tabbfokus</button>
                        <p className="text explanation regular-font-size">
                            Hur gick det att navigera? 
                            Personer med nedsatt motorik 
                            använder ofta tabben för att 
                            navigera. Det är viktigt att den del 
                            som är i fokus framhävs tydligt.</p>
                        <h3 className="text h3-accessibility h3-font-size">Teckenstorlek och radavstånd</h3>
                        <p className="text regular-font-size">
                            Tryck på knappen och försök förstora 
                            texten på webbplatsen (ctrl+).</p>
                        <button id="font-size" className="text focus regular-font-size accessibility-btn" 
                            aria-label="Minskar teckenstorleken och radavståndet" aria-pressed="false" 
                            onClick={this.handleBtnClick}>Teckenstorlek/radavstånd</button>
                        <p className="text explanation regular-font-size">
                            Du som inte har nedsatt syn kunde
                            förmodligen läsa mycket av texten
                            ändå, men jobbigt var det nog. 
                            Teckenstorlek och radavstånd ska 
                            vara tillräckliga och det måste gå att 
                            förstora texten.</p>
                    </section>
                </section>}
            </main>
        )
    }

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Om webbtillgänglighet');
        localStorage.setItem('pageGerman', 'Barrierefreiheit');

        if (localStorage.getItem('language') == 'Deutsch') {
            document.title = 'Barrierefreiheit';

        } else {
            document.title = 'Om webbtillgänglighet';
        }

        if (localStorage.getItem('accessibility-error')) {
            const text         = document.getElementsByClassName('text');
            const buttons      = document.getElementsByClassName('accessibility-btn');
            const stopBtn      = document.getElementById('stop-btn');

            stopBtn.style.display = 'block';

            for (let i = 0; i < buttons.length; i++) {
                if (localStorage.getItem('accessibility-error') == buttons[i].id) {
                    buttons[i].style.color           = '#517788';
                    buttons[i].style.backgroundColor = 'white';
                    buttons[i].style.border          = '2px solid #517788';
                    buttons[i].setAttribute('aria-pressed', true);
                
                } else {
                    buttons[i].style.color           = 'white';
                    buttons[i].style.backgroundColor = '#517788';
                    buttons[i].style.border          = '1px solid #517788';
                    buttons[i].setAttribute('aria-pressed', false);
                }
            }

            switch(localStorage.getItem('accessibility-error')) {
                case 'contrast':
                    for (let i = 0; i < text.length; i++) {
                        text[i].style.opacity = 0.1;
                    }
                break;
    
                case 'responsiveness':

                    /*
                    const meta = document.getElementsByName('viewport');
                    meta[0].remove();
                    */
                break;
    
                case 'tab-focus':
                    const focus = document.getElementsByClassName('focus');
    
                    for (let i = 0; i < document.getElementsByClassName('focus').length; i++) {
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

    handleBtnClick(e) {
        const text         = document.getElementsByClassName('text');
        const stopBtn      = document.getElementById('stop-btn');
        const explanations = document.getElementsByClassName('explanation');
        const buttons      = document.getElementsByClassName('accessibility-btn');

        stopBtn.style.display = 'block';

        for (let i = 0; i < buttons.length; i++) {
            if (e.target.id == buttons[i].id) {
                buttons[i].style.color           = '#517788';
                buttons[i].style.backgroundColor = 'white';
                buttons[i].style.border          = '2px solid #517788';
                buttons[i].setAttribute('aria-pressed', true);
            
            } else {
                buttons[i].style.color           = 'white';
                buttons[i].style.backgroundColor = '#517788';
                buttons[i].style.border          = '1px solid #517788';
                buttons[i].setAttribute('aria-pressed', false);
            }
        }

        if (e.target.id !== 'stop-btn') {
            localStorage.setItem('accessibility-error', e.target.id);
        
        } else {
            localStorage.removeItem('accessibility-error');
        }

        switch(e.target.id) {
            case 'contrast':
                for (let i = 0; i < text.length; i++) {
                    text[i].style.opacity = 0.1;
                }

                /*
                const element = document.createElement('meta');
                element.setAttribute('name', 'viewport');
                element.setAttribute('content', 'width=device-width, initial-scale=1.0');
                document.getElementsByTagName('head')[0].appendChild(element);
                */

                for (let i = 0; i < text.length; i++) {
                    if (text[i].className.indexOf('h1-font-size') >= 0) {
                        text[i].style.fontSize = '2.375em';
                    
                    } else if (text[i].className.indexOf('h2-font-size') >= 0) {
                        text[i].style.fontSize = '1.875em';
                    
                    } else if (text[i].className.indexOf('h3-font-size') >= 0) {
                        text[i].style.fontSize = '1.5em';

                    } else if (text[i].className.indexOf('regular-font-size')) {
                        text[i].style.fontSize   = '1.125em';
                        text[i].style.lineHeight = '1.875em'
                    
                    } else if (text[i].className.indexOf('small-font-size')) {
                        text[i].style.fontSize = '1em';
                    }
                }
            break;

            case 'responsiveness':
                for (let i = 0; i < text.length; i++) {
                    text[i].style.opacity = 1;
                }

                /*
                const meta = document.getElementsByName('viewport');
                meta[0].remove();
                */

                for (let i = 0; i < text.length; i++) {
                    if (text[i].className.indexOf('h1-font-size') >= 0) {
                        text[i].style.fontSize = '2.375em';
                    
                    } else if (text[i].className.indexOf('h2-font-size') >= 0) {
                        text[i].style.fontSize = '1.875em';
                    
                    } else if (text[i].className.indexOf('h3-font-size') >= 0) {
                        text[i].style.fontSize = '1.5em';

                    } else if (text[i].className.indexOf('regular-font-size')) {
                        text[i].style.fontSize   = '1.125em';
                        text[i].style.lineHeight = '1.875em'
                    
                    } else if (text[i].className.indexOf('small-font-size')) {
                        text[i].style.fontSize = '1em';
                    }
                }
            break;

            case 'tab-focus':
                for (let i = 0; i < text.length; i++) {
                    text[i].style.opacity = 1;
                }

                /*
                const el = document.createElement('meta');
                el.setAttribute('name', 'viewport');
                el.setAttribute('content', 'width=device-width, initial-scale=1.0');
                document.getElementsByTagName('head')[0].appendChild(el);
                */

                const focus = document.getElementsByClassName('focus');

                for (let i = 0; i < document.getElementsByClassName('focus').length; i++) {
                    focus[i].className = focus[i].className.replace('focus', 'focus-invisible');
                }

                for (let i = 0; i < text.length; i++) {
                    if (text[i].className.indexOf('h1-font-size') >= 0) {
                        text[i].style.fontSize = '2.375em';
                    
                    } else if (text[i].className.indexOf('h2-font-size') >= 0) {
                        text[i].style.fontSize = '1.875em';
                    
                    } else if (text[i].className.indexOf('h3-font-size') >= 0) {
                        text[i].style.fontSize = '1.5em';

                    } else if (text[i].className.indexOf('regular-font-size')) {
                        text[i].style.fontSize   = '1.125em';
                        text[i].style.lineHeight = '1.875em'
                    
                    } else if (text[i].className.indexOf('small-font-size')) {
                        text[i].style.fontSize = '1em';
                    }
                }
            break;

            case 'font-size':
                for (let i = 0; i < text.length; i++) {
                    text[i].style.opacity = 1;
                }

                /*
                const metaEl = document.createElement('meta');
                metaEl.setAttribute('name', 'viewport');
                metaEl.setAttribute('content', 'width=device-width, initial-scale=1.0');
                document.getElementsByTagName('head')[0].appendChild(metaEl);
                */

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

            case 'stop-btn':
                stopBtn.setAttribute('aria-expanded', true);

                for (let i = 0; i < explanations.length; i++) {
                    if (explanations[i].id == localStorage.getItem('accessibility-error')) {
                        explanations[i].style.display = 'block';
                    
                    } else {
                        explanations[i].style.display = 'none';
                    }
                }

                for (let i = 0; i < text.length; i++) {
                    text[i].style.opacity = 1;
                }

                /*
                const metaElement = document.createElement('meta');
                metaElement.setAttribute('name', 'viewport');
                metaElement.setAttribute('content', 'width=device-width, initial-scale=1.0');
                document.getElementsByTagName('head')[0].appendChild(metaElement);
                */

                for (let i = 0; i < text.length; i++) {
                    if (text[i].className.indexOf('h1-font-size') >= 0) {
                        text[i].style.fontSize = '2.375em';
                    
                    } else if (text[i].className.indexOf('h2-font-size') >= 0) {
                        text[i].style.fontSize = '1.875em';
                    
                    } else if (text[i].className.indexOf('h3-font-size') >= 0) {
                        text[i].style.fontSize = '1.5em';

                    } else if (text[i].className.indexOf('regular-font-size')) {
                        text[i].style.fontSize   = '1.125em';
                        text[i].style.lineHeight = '1.875em'
                    
                    } else if (text[i].className.indexOf('small-font-size')) {
                        text[i].style.fontSize = '1em';
                    }
                }
            break;
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
export default Accessibility;