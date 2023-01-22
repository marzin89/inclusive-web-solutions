import { useSelector, useDispatch } from 'react-redux';
import { pageActions } from '../../../store/slices/page-slice';

function StaticGerman() {
    const accessibility = useSelector((state) => state.page.accessibility);
    const previous = useSelector((state) => state.page.previous);
    const dispatch = useDispatch();

    function handleBtnClick(e) {
        const id = e.target.id;
        e.preventDefault();

        if (id == 'stop-btn') {
            dispatch(pageActions.setAccessibility('standard'));
        
        } else {
            dispatch(pageActions.setAccessibility(id));
        }

        const link         = document.querySelectorAll('link');
        // const stopBtn      = document.getElementById('stop-btn');
        // const explanations = document.getElementsByClassName('explanation');
        // const buttons      = document.getElementsByClassName('btn');

        // stopBtn.style.display = 'block';
        /*
        for (let i = 0; i < buttons.length; i++) {
            if (e.target.id == buttons[i].id) {
                buttons[i].setAttribute('aria-pressed', true);
            
            } else {
                buttons[i].setAttribute('aria-pressed', false);
            }
        }
        */

        switch(id) {
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
                // stopBtn.setAttribute('aria-expanded', true); 

                link[0].href = './css/styles.css';
                /*
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
                */
            break;
        }        
    }

    return (
        <section id="accessibility">
            <h1 id="main" className="h1-font-size">Barrierefreiheit</h1>
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
                {accessibility != 'standard' ? <button id="stop-btn" aria-haspopup="true" 
                    aria-expanded="false" onClick={(e) => handleBtnClick(e)}>
                        Beenden</button> : null}
                <h3 className="h3-accessibility h3-font-size">Kontrast</h3>
                <p className="regular-font-size line-height">
                    Drücken Sie auf den Knopf, um die
                    Website mit unzureichendem Kontrast zu erleben.</p>
                {accessibility == 'contrast' ?
                <button id="contrast" className="focus focus-invisible-btns 
                    regular-font-size btn active-accessibility-btn" aria-pressed="false" 
                        onClick={(e) => handleBtnClick(e)}>Kontrast</button> :
                <button id="contrast" className="focus focus-invisible-btns 
                    regular-font-size btn accessibility-btn" aria-pressed="false" 
                        onClick={(e) => handleBtnClick(e)}>Kontrast</button>}
                {previous == 'contrast' ?
                <p id="contrast-explanation" className="explanation regular-font-size 
                    contrast line-height">
                    Wer nicht unter Sehbeschwerden
                    leidet, konnte wahrscheinlich den 
                    Großteil des Textes lesen - wenn auch
                    mit Mühe. Sorgen Sie stehts dafür,
                    dass der Kontrast auf Ihrer Website
                    ausreichend ist.</p> : null}
                <h3 className="h3-accessibility h3-font-size">Responsivität</h3>
                <p className="regular-font-size line-height">
                    Drücken Sie auf den Knopf und 
                    verringern Sie, für den Fall dass Sie
                    einen Desktop-Computer benutzen,
                    die Breite des Browser-Fensters.</p>
                {accessibility == 'responsiveness' ?
                <button id="responsiveness" className="focus focus-invisible-btns 
                    regular-font-size btn active-accessibility-btn" aria-pressed="false" 
                        onClick={(e) => handleBtnClick(e)}>Responsivität</button> :
                <button id="responsiveness" className="focus focus-invisible-btns 
                    regular-font-size btn accessibility-btn" aria-pressed="false" 
                        onClick={(e) => handleBtnClick(e)}>Responsivität</button>}
                {previous == 'responsiveness' ?
                <p id="responsivity-explanation" className="explanation regular-font-size 
                    responsiveness line-height">
                    Das nervt vielleicht, waagerecht 
                    zu scrollen. Sorgen Sie stehts dafür,
                    dass sich Ihre Website der Größe des
                    Bildschirms anpasst.</p> : null}
                <h3 className="h3-accessibility h3-font-size">Tab-Fokus</h3>
                <p className="regular-font-size line-height">
                    Drücken Sie auf den Knopf und 
                    versuchen Sie, die Website mit der
                    Tabulatortaste anstatt der Maus zu 
                    benutzen.</p>   
                {accessibility == 'tab-focus' ?
                <button id="tab-focus" className="focus focus-invisible-btns 
                    regular-font-size btn active-accessibility-btn" aria-pressed="false" 
                        onClick={(e) => handleBtnClick(e)}>Tab-Fokus</button> :
                <button id="tab-focus" className="focus focus-invisible-btns 
                    regular-font-size btn accessibility-btn" aria-pressed="false" 
                        onClick={(e) => handleBtnClick(e)}>Tab-Fokus</button>}
                {previous == 'tab-focus' ?
                <p id="tab-focus-explanation" className="explanation regular-font-size 
                    tab-focus line-height">
                    Konnten Sie sich zurechtfinden? 
                    Personen mit motorischen 
                    Behinderungen sind häufig auf die 
                    Tabulatortaste angewiesen. Sorgen 
                    Sie stehts dafür, dass jeder Teil der 
                    Website deutlich hervorsticht, wenn 
                    er sich im Fokus befindet.</p> : null}
                <h3 className="h3-accessibility h3-font-size">Textgröße und Zeilenabstand</h3>
                <p className="regular-font-size line-height">
                    Drücken Sie auf den Knopf und 
                    versuchen Sie, den Text auf der 
                    Website zu vergrößern (ctrl+). </p>
                {accessibility == 'font-size' ?
                <button id="font-size" className="focus focus-invisible-btns 
                    regular-font-size btn active-accessibility-btn" aria-pressed="false" 
                        onClick={(e) => handleBtnClick(e)}>Textgröße/Zeilenabstand</button> :
                <button id="font-size" className="focus focus-invisible-btns 
                    regular-font-size btn accessibility-btn" aria-pressed="false" 
                        onClick={(e) => handleBtnClick(e)}>Textgröße/Zeilenabstand</button>}
                {previous == 'font-size' ? 
                <p id="font-size-explanation" className="explanation regular-font-size font-size
                line-height">
                    Wer nicht unter Sehbeschwerden
                    leidet, konnte wahrscheinlich den 
                    Großteil des Textes lesen - wenn auch
                    mit Mühe. Die Größe des Textes auf 
                    einer Website sowie der 
                    Zeilenabstand sollten genügend sein 
                    und es sollte möglich sein, den Text 
                    zu vergrößern.</p> : null}
            </section>
        </section>
    );
}

export default StaticGerman;