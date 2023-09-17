import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

function FormGerman() {
    const formRef      = useRef();
    const firstNameRef = useRef();
    const lastNameRef  = useRef();
    const emailRef     = useRef();
    const phoneRef     = useRef();
    const messageRef   = useRef();
    const consentRef   = useRef();
    const [isSubmitted, setIsSubmitted]       = useState(false);
    const [errorCount, setErrorCount]         = useState(0);
    const [errorMessage, setErrorMessage]     = useState('');
    const [hasFirstName, setHasFirstName]     = useState(true);
    const [hasLastName, setHasLastName]       = useState(true);
    const [hasEmail, setHasEmail]             = useState(true);
    const [isValidEmail, setIsValidEmail]     = useState(true);
    const [hasMessage, setHasMessage]         = useState(true);
    const [hasConsent, setHasConsent]         = useState(true);
    const [confirmMessage, setConfirmMessage] = useState('');

    function handleFirstNameChange() {
        setHasFirstName(firstNameRef.current.value != false);
    }

    function handleLastNameChange() {
        setHasLastName(lastNameRef.current.value != false);
    }

    function handleEmailChange() {
        setHasEmail(emailRef.current.value != false);
        setIsValidEmail(emailRef.current.value.indexOf('@') > 0);
    }

    function handleMessageChange() {
        setHasMessage(messageRef.current.value != false);
    }

    function handleConsentChange() {
        setHasConsent(consentRef.current.checked);
    }

    function validateForm() {
        handleFirstNameChange();
        handleLastNameChange();
        handleEmailChange();
        handleMessageChange();
        handleConsentChange();
        setErrorCount(0);
        setErrorCount((prev) => hasFirstName ? prev : prev + 1);
        setErrorCount((prev) => hasLastName ? prev : prev + 1);
        setErrorCount((prev) => isValidEmail ? prev : prev + 1);
        setErrorCount((prev) => hasMessage ? prev : prev + 1);
        setErrorCount((prev) => hasConsent ? prev : prev + 1);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitted(true);
        validateForm();
    }

    function sendMail() {
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

    useEffect(() => {
        if (isSubmitted && hasFirstName && hasLastName && isValidEmail && hasMessage && hasConsent) {
            sendMail();
        }
    })

    return (
        <section id="contact">
            <h1 id="main" className="h1-font-size">Kontakt</h1>
            <p className="regular-font-size">Pflichtfelder sind mit * gekennzeichnet.</p>
            {errorCount ? <p className="h2-error h3-font-size" role="alert">
                Das Formular enthält {errorCount} Fehler</p> : null}
            <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                    <div className="form-left">
                        <label htmlFor="first-name" className="h3-font-size">Vorname *</label>
                        <input id="first-name" className="focus focus-invisible-input text-input 
                            text-input-main regular-font-size" name="first_name" type="text" 
                                aria-required="true" aria-describedby="first-name-empty" 
                                    autoComplete='given-name' ref={firstNameRef} onBlur={() => 
                                        handleFirstNameChange()}></input>
                        {!hasFirstName ? <p id="first-name-empty" className="regular-font-size error empty" 
                            role="alert" aria-invalid="true">Bitte geben Sie Ihren Vornamen ein.</p> : null}
                    </div>
                    <div className="form-right">
                        <label htmlFor="last-name" className="h3-font-size">Nachname *</label>
                        <input id="last-name" className="focus focus-invisible-input text-input 
                            text-input-main regular-font-size" name="last_name" type="text" 
                                aria-required="true" aria-describedby="last-name-empty"
                                    autoComplete="family-name" ref={lastNameRef} onBlur={() =>
                                        handleLastNameChange()}></input>
                        {!hasLastName ? <p id="last-name-empty" className="regular-font-size error empty" 
                            role="alert" aria-invalid="true">Bitte geben Sie Ihren Nachnamen ein.</p> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="form-left">
                        <label htmlFor="email" className="h3-font-size">E-Mail-Adresse *</label>
                        <input id="email" className="focus focus-invisible-input text-input 
                            text-input-main regular-font-size" name="email" type="email" 
                                aria-required="true" aria-describedby="email-empty-error email-invalid-error" 
                                    autoComplete="email" ref={emailRef} onBlur={() => handleEmailChange()}>
                        </input>
                        {!hasEmail ? <p id="email-empty-error" className="regular-font-size error empty" 
                            role="alert" aria-invalid="true">Bitte geben Sie Ihre E-Mail-Adresse ein.</p> : null}
                        {!isValidEmail ? <p id="email-invalid-error" className="regular-font-size error empty" 
                            role="alert" aria-invalid="true">Bitte geben Sie eine gültige E-Mail-Adresse ein.</p> : null}
                    </div>
                    <div className="form-right">
                        <label htmlFor="phone" className="h3-font-size">Telefon</label>
                        <input id="phone" className="focus focus-invisible-input text-input 
                            text-input-main regular-font-size" name="phone" type="tel" 
                                aria-required="false" autoComplete="tel" ref={phoneRef}>
                        </input>
                    </div>
                </div>
                <label htmlFor="message" className="h3-font-size">Mitteilung *</label>
                <textarea id="message" className="focus focus-invisible-input regular-font-size" 
                    name="message" aria-required="true" aria-describedby="message-empty" 
                        autoComplete="on" ref={messageRef} onBlur={() => handleMessageChange()}>
                </textarea>
                {!hasMessage ? <p id="message-empty" className="regular-font-size error" role="alert" 
                    aria-invalid="true">Bitte schreiben Sie eine Mitteilung.</p> : null}
                <p id="consent-heading" className="h3-font-size">Einwilligung *</p>
                <input id="consent" className="focus focus-invisible-input" type="checkbox" 
                    aria-required="true" aria-describedby="consent-empty" ref={consentRef}
                        onChange={() => handleConsentChange()}>
                </input>  
                <label id="consent-label" htmlFor="consent" className="regular-font-size 
                    line-height">Hiermit stimme ich der Bearbeitung meiner Personenbezogenen 
                        Daten gemäß der <a className="focus focus-invisible regular-font-size 
                            line-height" href=""> Datenschutzerklärung</a> zu. 
                                <b className="regular-font-size"></b></label>
                {!hasConsent ? <p id="consent-empty" className="regular-font-size error" role="alert" 
                    aria-invalid="true">Bitte stimmen Sie der Bearbeitung Ihrer personenbezogenen Daten zu.</p> 
                        : null}
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