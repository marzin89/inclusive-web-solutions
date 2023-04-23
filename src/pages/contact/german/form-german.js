import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

function FormGerman() {
    const formRef      = useRef();
    const firstNameRef = useRef();
    const lastNameRef  = useRef();
    const emailRef     = useRef();
    const phoneRef     = useRef();
    const messageRef   = useRef();
    const consentRef   = useRef();
    const [errorCount, setErrorCount]         = useState(0);
    const [errorMessage, setErrorMessage]     = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError]   = useState('');
    const [emailError, setEmailError]         = useState('');
    const [messageError, setMessageError]     = useState('');
    const [consentError, setConsentError]     = useState('');

    /* Här valideras uppgifterna. För varje uppgift som saknas,
        skrivs ett felmeddelande ut under inmatningsfältet. */
    function validateForm() {
        setFirstNameError(firstNameRef.current.value ? '' : 'Bitte geben Sie Ihren Vornamen ein.');
        setErrorCount(firstNameRef.current.value ? 0 : 1);
        setLastNameError(lastNameRef.current.value ? '' : 'Bitte geben Sie Ihren Nachnamen ein.');
        setErrorCount((prev) => lastNameRef.current.value ? prev : prev + 1);

        if (!emailRef.current.value) {
            setEmailError('Bitte geben Sie Ihre E-Mail-Adresse ein.');
            setErrorCount((prev) => prev + 1);
        
        } else if (!emailRef.current.value.indexOf('@') < 1) {
            setEmailError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            setErrorCount((prev) => prev + 1);
                
        } else {
            setEmailError('');

            if (errorCount > 0) {
                setErrorCount((prev) => prev - 1);
            }
        }

        setMessageError(messageRef.current.value ? '' : 'Bitte schreiben Sie eine Mitteilung.');
        setErrorCount((prev) => messageRef.current.value ? prev : prev + 1);
        setConsentError(consentRef.current.checked ? '' : 'Bitte stimmen Sie der Bearbeitung Ihrer personenbezogenen Daten zu.');
        setErrorCount((prev) => consentRef.current.checked ? prev : prev + 1);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        validateForm();

        if (!errorCount) {
            emailjs.sendForm('service_005r77b', 'contact_form', formRef.current, '7V3K7ahJFB30PLvxy')
            .then(result => {
                setConfirmMessage('Vielen Dank für Ihre Mitteilung. Wir melden uns sobald wie möglich bei Ihnen.');
                console.log(result.text);

            }, (error) => {
                setErrorMessage('Ein Fehler ist aufgetreten. ' +
                    'Ihre Mitteilung konnte leider nicht gesendet werden. ' +
                    'Versuchen Sie es später erneut.');
                console.log(error.text);
            })

            formRef.current.reset();
            document.getElementById('reset-btn').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    return (
        <section id="contact">
            <h1 id="main" className="h1-font-size">Kontakt</h1>
            <p className="regular-font-size">Pflichtfelder sind mit * gekennzeichnet.</p>
            {errorCount ? <p className="h2-error h3-font-size" role="alert">
                Das Formular enthält {errorCount} Fehler</p> : null}
            <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                    {/* Förnamn */}
                    <div className="form-left">
                        <label htmlFor="first-name" className="h3-font-size">Vorname *</label>
                        <input id="first-name" className="focus focus-invisible-input text-input 
                            text-input-main regular-font-size" name="first_name" type="text" 
                                aria-required="true" aria-describedby="first-name-empty" 
                                    autoComplete='given-name' ref={firstNameRef}></input>
                        {/* Här skrivs ett felmeddelande ut om inget förnamn har angetts */}
                        {firstNameError ? <p id="first-name-empty" className="regular-font-size 
                            error empty" role="alert" aria-invalid="true">{firstNameError}</p> 
                                : null}
                    </div>
                    {/* Efternamn */}
                    <div className="form-right">
                        <label htmlFor="last-name" className="h3-font-size">Nachname *</label>
                        <input id="last-name" className="focus focus-invisible-input text-input 
                            text-input-main regular-font-size" name="last_name" type="text" 
                                aria-required="true" aria-describedby="last-name-empty"
                                    autoComplete="family-name" ref={lastNameRef}></input>
                        {/* Här skrivs ett felmeddelande ut om inget efternamn har angetts */}
                        {lastNameError ? <p id="last-name-empty" className="regular-font-size 
                            error empty" role="alert" aria-invalid="true">{lastNameError}</p>
                                : null}
                    </div>
                </div>
                <div className="row">
                    {/* E-post */}
                    <div className="form-left">
                        <label htmlFor="email" className="h3-font-size">E-Mail-Adresse *</label>
                        <input id="email" className="focus focus-invisible-input text-input 
                            text-input-main regular-font-size" name="email" type="email" 
                                aria-required="true" aria-describedby="email-error" 
                                    autoComplete="email" ref={emailRef}>
                        </input>
                        {/* Här skrivs ett felmeddelande ut om ingen e-postadress har angetts,
                            eller om e-postadressen är ogiltig */}
                        {emailError ? <p id="email-error" className="regular-font-size 
                            error empty" role="alert" aria-invalid="true">{emailError}</p> 
                                : null}
                    </div>
                    {/* Telefon */}
                    <div className="form-right">
                        <label htmlFor="phone" className="h3-font-size">Telefon</label>
                        <input id="phone" className="focus focus-invisible-input text-input 
                            text-input-main regular-font-size" name="phone" type="tel" 
                                aria-required="false" autoComplete="tel" ref={phoneRef}>
                        </input>
                    </div>
                </div>
                {/* Meddelande */}
                <label htmlFor="message" className="h3-font-size">Mitteilung *</label>
                <textarea id="message" className="focus focus-invisible-input regular-font-size" 
                    name="message" aria-required="true" aria-describedby="message-empty" 
                        autoComplete="on" ref={messageRef}>
                </textarea>
                {/* Här skrivs ett felmeddelande om användaren inte har skrivit något meddelande */}
                {messageError ? <p id="message-empty" className="regular-font-size error" 
                    role="alert" aria-invalid="true">{messageError}</p> : null}
                {/* Samtycke */}
                <p id="consent-heading" className="h3-font-size">Einwilligung *</p>
                <input id="consent" className="focus focus-invisible-input" type="checkbox" 
                    aria-required="true" aria-describedby="consent-empty" ref={consentRef}>
                </input>  
                <label id="consent-label" htmlFor="consent" className="regular-font-size 
                    line-height">Hiermit stimme ich der Bearbeitung meiner Personenbezogenen 
                        Daten gemäß der <a className="focus focus-invisible regular-font-size 
                            line-height" href=""> Datenschutzerklärung</a> zu. 
                                <b className="regular-font-size"></b></label>
                {/* Här skrivs ett felmeddelande om användaren inte har samtyckt */}
                {consentError ? <p id="consent-empty" className="regular-font-size error" 
                    role="alert" aria-invalid="true">{consentError}</p> : null}
                <div className="row">
                    <button type="reset" id="reset-btn" className="reset-btn focus 
                        focus-invisible regular-font-size">Alle Felder löschen</button>
                    <button type="submit" className="submit-btn focus focus-invisible 
                        regular-font-size">Senden</button>
                    {errorMessage ? <p className="regular-font-size error" role="alert">
                        {errorMessage}</p> : null}
                    {confirmMessage ? <p className="regular-font-size confirm" 
                        role="alert">{confirmMessage}</p> : null}
                </div>
            </form>
        </section>
    );
}

export default FormGerman;