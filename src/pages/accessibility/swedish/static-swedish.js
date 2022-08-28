// Imports
import React from 'react';

class StaticSwedish extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accessibilityError: '',
        }

        this.handleBtnClick  = this.handleBtnClick.bind(this);
    }

    // Rendering
    render() {
        return (
            <section id="accessibility">
                <h1 id="main" className="h1-font-size">Om webbtillgänglighet</h1>
                <p className="body-text regular-font-size line-height">
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
                <p className="body-text regular-font-size line-height">
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
                    <h2 className="h2-font-size">Se skillnaden</h2>
                    <p className="regular-font-size line-height">
                        Upplevelser säger mer än ord. 
                        Här kan du uppleva en otillgänglig webbplats.</p>
                        <button id="stop-btn" style={localStorage.getItem('accessibility-error') ?
                            {display: 'block'} : {display: 'none'}} aria-haspopup="true" aria-expanded="false"
                            onClick={this.handleBtnClick}>Avsluta</button>
                    <h3 className="h3-accessibility h3-font-size">Kontrast</h3>
                    <p className="regular-font-size line-height">
                        Tryck på knappen för att uppleva 
                        webbplatsen med låg kontrast.</p>
                    {localStorage.getItem('accessibility-error') == 'contrast' ? 
                    <button id="contrast" className="focus focus-invisible-btns regular-font-size 
                        btn active-accessibility-btn" aria-pressed="false" 
                        onClick={this.handleBtnClick}>Kontrast</button> :
                    <button id="contrast" className="focus focus-invisible-btns regular-font-size btn 
                        accessibility-btn" aria-pressed="false" 
                        onClick={this.handleBtnClick}>Kontrast</button>}
                    <p id="contrast-explanation" className="explanation regular-font-size contrast
                        line-height">
                        Har du inte nedsatt syn, så kunde du
                        förmodligen läsa mycket av texten
                        ändå. Men det var nog betydligt 
                        jobbigare än tidigare. Se till att ha 
                        tillräcklig kontrast på webbplatsen 
                        och överdriv gärna.</p>
                    <h3 className="h3-accessibility h3-font-size">Responsivitet</h3>
                    <p className="regular-font-size line-height">
                        Tryck på knappen och minska webbläsarfönstrets bredd rejält om 
                        du använder en desktop.</p>
                        {localStorage.getItem('accessibility-error') == 'responsiveness' ? 
                        <button id="responsiveness" className="focus focus-invisible-btns regular-font-size 
                            btn active-accessibility-btn" aria-pressed="false" onClick={this.handleBtnClick}>
                                Responsivitet</button> :
                        <button id="responsiveness" className="focus focus-invisible-btns regular-font-size 
                            btn accessibility-btn" aria-pressed="false" onClick={this.handleBtnClick}>
                                Responsivitet</button>}
                    <p id="responsivity-explanation" className="explanation regular-font-size responsiveness
                        line-height">
                        Visst är det jobbigt att behöva skrolla
                        vågrätt? Det är viktigt att ha en
                        mobilanpassad webbplats som 
                        anpassar sig efter skärmstorleken.</p>
                    <h3 className="h3-accessibility h3-font-size">Tabbfokus</h3>
                    <p className="regular-font-size line-height">
                        Tryck på knappen och försök tabba igenom webbplatsen.</p>
                    {localStorage.getItem('accessibility-error') == 'tab-focus' ?
                    <button id="tab-focus" className="focus focus-invisible-btns regular-font-size 
                        btn active-accessibility-btn" aria-pressed="false" onClick={this.handleBtnClick}>
                            Tabbfokus</button> :
                    <button id="tab-focus" className="focus focus-invisible-btns regular-font-size 
                        btn accessibility-btn" aria-pressed="false" onClick={this.handleBtnClick}>
                            Tabbfokus</button>}
                    <p id="tab-focus-explanation" className="explanation regular-font-size tab-focus
                        line-height">
                        Hur gick det att navigera? 
                        Personer med nedsatt motorik 
                        använder ofta tabben för att 
                        navigera. Det är viktigt att den del 
                        som är i fokus framhävs tydligt.</p>
                    <h3 className="h3-accessibility h3-font-size">Teckenstorlek och radavstånd</h3>
                    <p className="regular-font-size line-height">
                        Tryck på knappen och försök förstora 
                        texten på webbplatsen (ctrl+).</p>
                    {localStorage.getItem('accessibility-error') == 'font-size' ?
                    <button id="font-size" className="focus focus-invisible-btns regular-font-size 
                        btn active-accessibility-btn" aria-pressed="false" onClick={this.handleBtnClick}>
                            Teckenstorlek/radavstånd</button> :
                    <button id="font-size" className="focus focus-invisible-btns regular-font-size 
                        btn accessibility-btn" aria-pressed="false" onClick={this.handleBtnClick}>
                            Teckenstorlek/radavstånd</button>}
                    <p id="font-size-explanation" className="explanation regular-font-size font-size
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

    componentDidMount() {
        const buttons      = document.getElementsByClassName('btn');

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].id == localStorage.getItem('accessibility-error')) {
                buttons[i].setAttribute('aria-pressed', true);
            
            } else {
                buttons[i].setAttribute('aria-pressed', false);
            }
        }
    }

    handleBtnClick(e) {
        this.setState({
            accessibilityError: e.target.id,
        })

        const link         = document.querySelectorAll('link');
        const stopBtn      = document.getElementById('stop-btn');
        const explanations = document.getElementsByClassName('explanation');
        const buttons      = document.getElementsByClassName('btn');

        stopBtn.style.display = 'block';

        for (let i = 0; i < buttons.length; i++) {
            if (e.target.id == buttons[i].id) {
                buttons[i].setAttribute('aria-pressed', true);
            
            } else {
                buttons[i].setAttribute('aria-pressed', false);
            }
        }

        if (e.target.id !== 'stop-btn') {
            localStorage.setItem('accessibility-error', e.target.id); 
        }

        switch(e.target.id) {
            case 'contrast':
                link[0].href = './css/low-contrast.css';
            break;

            case 'responsiveness':
                link[0].href = './css/unresponsive.css';
            break;

            case 'tab-focus':
                link[0].href = './css/no-tab-focus.css';
            break;

            case 'font-size':
                link[0].href = './css/small-font-size.css';
            break;

            case 'stop-btn':
                stopBtn.style.display = 'none';
                stopBtn.setAttribute('aria-expanded', true); 

                link[0].href = './css/styles.css';

                if (localStorage.getItem('accessibility-error') == 'contrast') {
                    explanations[0].style.display = 'block';
                
                } else if (localStorage.getItem('accessibility-error') == 'responsiveness') {
                    explanations[1].style.display = 'block';
                
                } else if (localStorage.getItem('accessibility-error') == 'tab-focus') {
                    explanations[2].style.display = 'block';
                
                } else if (localStorage.getItem('accessibility-error') == 'font-size') {
                    explanations[3].style.display = 'block';
                }

                localStorage.removeItem('accessibility-error');
            break;
        }
    }
}

export default StaticSwedish;