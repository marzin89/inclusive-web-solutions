// Imports
import React from 'react';

class AccessibilitySwedish extends React.Component {
    constructor(props) {
        super(props);

        this.handleBtnClick  = this.handleBtnClick.bind(this);
    }

    // Rendering
    render() {
        return (
            <section id="accessibility">
                <h1 className="text h1-font-size">Om webbtillgänglighet</h1>
                <p className="text body-text regular-font-size line-height">
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
                <p className="text body-text regular-font-size line-height">
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
                    <p className="text regular-font-size line-height">
                        Upplevelser säger mer än ord. 
                        Här kan du uppleva en otillgänglig webbplats.</p>
                        <button id="stop-btn" style={localStorage.getItem('accessibility-error') ?
                            {display: 'block'} : {display: 'none'}}
                            aria-label="Återställer webbplatsens tillgänglighet.
                            Vid knapptryck visas en förklaring under den knapp som trycktes
                            tidigare (Kontrast, Responsivitet, Tabbfokus eller 
                            Teckenstorlek/radavstånd)." aria-haspopup="true" aria-controls="contrast-explanation
                            responsivity-explanation tab-focus-explanation font-size-explanation"
                            aria-expanded="false" onClick={this.handleBtnClick}>Avsluta</button>
                    <h3 className="text h3-accessibility h3-font-size">Kontrast</h3>
                    <p className="text regular-font-size line-height">
                        Tryck på knappen för att uppleva 
                        webbplatsen med låg kontrast.</p>
                    <button id="contrast" className={localStorage.getItem('accessibility-error') == 
                        'tab-focus' ? 'text focus-invisible-btns regular-font-size accessibility-btn' : 
                        'text focus regular-font-size accessibility-btn'} 
                        aria-label="Aktiverar lågkontrastläget" aria-pressed="false" 
                        aria-controls="stop-btn" onClick={this.handleBtnClick}>Kontrast</button>
                    <p id="contrast-explanation" className="text explanation regular-font-size contrast
                        line-height">
                        Har du inte nedsatt syn, så kunde du
                        förmodligen läsa mycket av texten
                        ändå. Men det var nog betydligt 
                        jobbigare än tidigare. Se till att ha 
                        tillräcklig kontrast på webbplatsen 
                        och överdriv gärna.</p>
                    <h3 className="text h3-accessibility h3-font-size">Responsivitet</h3>
                    <p className="text regular-font-size line-height">
                        Tryck på knappen och minska webbläsarfönstrets bredd rejält om 
                        du använder en desktop.</p>
                    <button id="responsiveness" className={localStorage.getItem('accessibility-error') == 
                        'tab-focus' ? 'text focus-invisible-btns regular-font-size accessibility-btn' : 
                        'text focus regular-font-size accessibility-btn'} 
                        aria-label="Avaktiverar webbplatsens responsivitet" aria-pressed="false" 
                        aria-controls="stop-btn" onClick={this.handleBtnClick}>Responsivitet</button>
                    <p id="responsivity-explanation" className="text explanation regular-font-size responsiveness
                        line-height">
                        Visst är det jobbigt att behöva skrolla
                        vågrätt? Det är viktigt att ha en
                        mobilanpassad webbplats som 
                        anpassar sig efter skärmstorleken.</p>
                    <h3 className="text h3-accessibility h3-font-size">Tabbfokus</h3>
                    <p className="text regular-font-size line-height">
                        Tryck på knappen och försök tabba igenom webbplatsen.</p>
                    <button id="tab-focus" className={localStorage.getItem('accessibility-error') == 
                        'tab-focus' ? 'text focus-invisible-btns regular-font-size accessibility-btn' : 
                        'text focus regular-font-size accessibility-btn'} 
                        aria-label="Döljer fokus vid navigering med tabben" aria-pressed="false" 
                        aria-controls="stop-btn" onClick={this.handleBtnClick}>Tabbfokus</button>
                    <p id="tab-focus-explanation" className="text explanation regular-font-size tab-focus
                        line-height">
                        Hur gick det att navigera? 
                        Personer med nedsatt motorik 
                        använder ofta tabben för att 
                        navigera. Det är viktigt att den del 
                        som är i fokus framhävs tydligt.</p>
                    <h3 className="text h3-accessibility h3-font-size">Teckenstorlek och radavstånd</h3>
                    <p className="text regular-font-size line-height">
                        Tryck på knappen och försök förstora 
                        texten på webbplatsen (ctrl+).</p>
                    <button id="font-size" className={localStorage.getItem('accessibility-error') == 
                        'tab-focus' ? 'text focus-invisible-btns regular-font-size accessibility-btn' : 
                        'text focus regular-font-size accessibility-btn'} 
                        aria-label="Minskar teckenstorleken och radavståndet" aria-pressed="false" 
                        aria-controls="stop-btn" onClick={this.handleBtnClick}>Teckenstorlek/radavstånd
                    </button>
                    <p id="font-size-explanation" className="text explanation regular-font-size font-size
                        line-height">
                        Du som inte har nedsatt syn kunde
                        förmodligen läsa mycket av texten
                        ändå, men jobbigt var det nog. 
                        Teckenstorlek och radavstånd ska 
                        vara tillräckliga och det måste gå att 
                        förstora texten.</p>
                </section>
            </section>
        )
    }

    handleBtnClick(e) {
        const text         = document.getElementsByClassName('text');
        const link         = document.querySelectorAll('link');
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
        }

        switch(e.target.id) {
            case 'contrast':
                for (let i = 0; i < text.length; i++) {
                    if (text[i].className.indexOf('h1-font-size') >= 0) {
                        text[i].style.fontSize = '2.375em';
                    
                    } else if (text[i].className.indexOf('h2-font-size') >= 0) {
                        text[i].style.fontSize = '1.875em';
                    
                    } else if (text[i].className.indexOf('h3-font-size') >= 0) {
                        text[i].style.fontSize = '1.5em';

                    } else if (text[i].className.indexOf('regular-font-size')) {
                        text[i].style.fontSize   = '1.125em';

                        if (text[i].className.indexOf('line-height') > 0) {
                            text[i].style.lineHeight = '1.875em'
                        }
                    
                    } else if (text[i].className.indexOf('small-font-size')) {
                        text[i].style.fontSize = '1em';
                    }
                }
            break;

            case 'responsiveness':
                for (let i = 0; i < text.length; i++) {
                    text[i].style.opacity = 1;
                }

                link[0].href = './css/unresponsive.css';

                for (let i = 0; i < text.length; i++) {
                    if (text[i].className.indexOf('h1-font-size') >= 0) {
                        text[i].style.fontSize = '2.375em';
                    
                    } else if (text[i].className.indexOf('h2-font-size') >= 0) {
                        text[i].style.fontSize = '1.875em';
                    
                    } else if (text[i].className.indexOf('h3-font-size') >= 0) {
                        text[i].style.fontSize = '1.5em';

                    } else if (text[i].className.indexOf('regular-font-size')) {
                        text[i].style.fontSize   = '1.125em';
                        
                        if (text[i].className.indexOf('line-height') > 0) {
                            text[i].style.lineHeight = '1.875em'
                        }
                    
                    } else if (text[i].className.indexOf('small-font-size')) {
                        text[i].style.fontSize = '1em';
                    }
                }
            break;

            case 'tab-focus':
                for (let i = 0; i < text.length; i++) {
                    text[i].style.opacity = 1;
                }

                link[0].href = './css/styles.css';

                const focus = document.getElementsByClassName('focus');

                /*
                for (let i = 0; i < document.getElementsByClassName('focus').length; i++) {
                    focus[i].className = focus[i].className.replace('focus', 'focus-invisible');
                }
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
                        
                        if (text[i].className.indexOf('line-height') > 0) {
                            text[i].style.lineHeight = '1.875em'
                        }
                    
                    } else if (text[i].className.indexOf('small-font-size')) {
                        text[i].style.fontSize = '1em';
                    }
                }
            break;

            case 'font-size':
                link[0].href = './css/small-font-size.css';
            break;

            case 'stop-btn':
                stopBtn.setAttribute('aria-expanded', true);
                stopBtn.style.display = 'none';

                for (let i = 0; i < explanations.length; i++) {
                    if (explanations[i].className.indexOf(localStorage.getItem('accessibility-error')) >= 0) {
                        explanations[i].style.display = 'block';
                    
                    } else {
                        explanations[i].style.display = 'none';
                    }
                }

                for (let i = 0; i < text.length; i++) {
                    text[i].style.opacity = 1;
                }

                link[0].href = './css/styles.css';

                for (let i = 0; i < text.length; i++) {
                    if (text[i].className.indexOf('h1-font-size') >= 0) {
                        text[i].style.fontSize = '2.375em';
                    
                    } else if (text[i].className.indexOf('h2-font-size') >= 0) {
                        text[i].style.fontSize = '1.875em';
                    
                    } else if (text[i].className.indexOf('h3-font-size') >= 0) {
                        text[i].style.fontSize = '1.5em';

                    } else if (text[i].className.indexOf('regular-font-size')) {
                        text[i].style.fontSize   = '1.125em';
                        
                        if (text[i].className.indexOf('line-height') > 0) {
                            text[i].style.lineHeight = '1.875em'
                        }
                    
                    } else if (text[i].className.indexOf('small-font-size')) {
                        text[i].style.fontSize = '1em';
                    }
                }

                localStorage.removeItem('accessibility-error');
            break;
        }
    }
}

export default AccessibilitySwedish;