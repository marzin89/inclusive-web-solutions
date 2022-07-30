// Imports
import React from 'react';

class AccessibilityGerman extends React.Component {
    constructor(props) {
        super(props);

        this.handleBtnClick  = this.handleBtnClick.bind(this);
    }

    // Rendering
    render() {
        return (
            <section id="accessibility">
                <h1 className="h1-font-size">Barrierefreiheit</h1>
                <p className="body-text regular-font-size line-height">
                    Barrierefreiheit im Internet bedeutet, dass 
                    Websites so konstruiert sind, dass sie
                    von allen benutzt werden können. Es
                    gibt viele Gründe, die für Barrierefreiheit im Internet 
                    sprechen. Laut der 
                    Barrierefreie-Informationstechnik-
                    Verordnung (BITV) müssen Websites
                    öffentlicher Stellen barrierefrei sein.</p>
                <p className="body-text regular-font-size line-height">
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
                    <h2 className="h2-font-size">Erleben Sie den Unterschied</h2>
                    <p className="regular-font-size line-height">
                        Erlebnisse sagen mehr als Worte. 
                        Hier können Sie selbst eine unzugängliche Website erleben.</p>
                        <button id="stop-btn" style={localStorage.getItem('accessibility-error') ?
                            {display: 'block'} : {display: 'none'}}
                            aria-label="Zugänglichkeit der Website wiederherstellen.
                            Bei Knopfdruck erscheint eine Erklärung under dem Knopf,
                            der zuvor gedrückt wurde (Kontrast, Responsivität,
                            Tab-Fokus oder Textgröße/Zeilenabstand)." aria-haspopup="true" 
                            aria-controls="contrast-explanation
                            responsivity-explanation tab-focus-explanation font-size-explanation"
                            aria-expanded="false" onClick={this.handleBtnClick}>Beenden</button>
                    <h3 className="h3-accessibility h3-font-size">Kontrast</h3>
                    <p className="regular-font-size line-height">
                        Drücken Sie auf den Knopf, um die
                        Website mit unzureichendem Kontrast zu erleben.</p>
                    <button id="contrast" className="focus focus-invisible-btns regular-font-size 
                        accessibility-btn" aria-label="Niedrigkontrast-Modus aktivieren" aria-pressed="false" 
                        aria-controls="stop-btn" onClick={this.handleBtnClick}>Kontrast</button>
                    <p id="contrast-explanation" className="explanation regular-font-size contrast
                        line-height">
                        Wer nicht unter Sehbeschwerden
                        leidet, konnte wahrscheinlich den 
                        Großteil des Textes lesen - wenn auch
                        mit Mühe. Sorgen Sie stehts dafür,
                        dass der Kontrast auf Ihrer Website
                        ausreichend ist.</p>
                    <h3 className="h3-accessibility h3-font-size">Responsivität</h3>
                    <p className="regular-font-size line-height">
                        Drücken Sie auf den Knopf und 
                        verringern Sie, für den Fall dass Sie
                        einen Desktop-Computer benutzen,
                        die Breite des Browser-Fensters.</p>
                    <button id="responsiveness" className="focus focus-invisible-btns regular-font-size 
                        accessibility-btn" aria-label="Responsivität der Website deaktivieren" aria-pressed="false" 
                        aria-controls="stop-btn" onClick={this.handleBtnClick}>Responsivität</button>
                    <p id="responsivity-explanation" className="explanation regular-font-size responsiveness
                        line-height">
                        Das nervt vielleicht, waagerecht 
                        zu scrollen. Sorgen Sie stehts dafür,
                        dass sich Ihre Website der Größe des
                        Bildschirms anpasst.</p>
                    <h3 className="h3-accessibility h3-font-size">Tab-Fokus</h3>
                    <p className="regular-font-size line-height">
                        Drücken Sie auf den Knopf und 
                        versuchen Sie, die Website mit der
                        Tabulatortaste anstatt der Maus zu 
                        benutzen.</p>   
                    <button id="tab-focus" className="focus focus-invisible-btns regular-font-size 
                        accessibility-btn" aria-label="Fokus bei der Navigation mittels der Tabulatortaste unsichtbar machen" 
                        aria-controls="stop-btn" aria-pressed="false" onClick={this.handleBtnClick}>Tab-Fokus
                    </button>
                    <p id="tab-focus-explanation" className="explanation regular-font-size tab-focus
                        line-height">
                        Konnten Sie sich zurechtfinden? 
                        Personen mit motorischen 
                        Behinderungen sind häufig auf die 
                        Tabulatortaste angewiesen. Sorgen 
                        Sie stehts dafür, dass jeder Teil der 
                        Website deutlich hervorsticht, wenn 
                        er sich im Fokus befindet.</p>
                    <h3 className="h3-accessibility h3-font-size">Textgröße und Zeilenabstand</h3>
                    <p className="regular-font-size line-height">
                        Drücken Sie auf den Knopf und 
                        versuchen Sie, den Text auf der 
                        Website zu vergrößern (ctrl+). </p>
                    <button id="font-size" className="focus focus-invisible-btns regular-font-size 
                        accessibility-btn" aria-label="Textgröße und Zeilenabstand verkleinern" aria-pressed="false"
                        aria-controls="stop-btn" onClick={this.handleBtnClick}>Textgröße/Zeilenabstand
                    </button>
                    <p id="font-size-explanation" className="explanation regular-font-size font-size
                        line-height">
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
        )
    }

    handleBtnClick(e) {
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
                stopBtn.setAttribute('aria-expanded', true);
                stopBtn.style.display = 'none';

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

export default AccessibilityGerman;