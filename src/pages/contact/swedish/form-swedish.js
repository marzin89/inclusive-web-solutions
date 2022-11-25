import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

function FormSwedish() {
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
        if (!firstNameRef.current.value) {
            setFirstNameError('Du måste ange ditt förnamn.');
            setErrorCount(1);
        
        } else {
            setFirstNameError('');
            setErrorCount(0);
        }

        if (!lastNameRef.current.value) {
            setLastNameError('Du måste ange ditt efternamn.');
            setErrorCount((prev) => prev + 1);
        
        } else {
            setLastNameError('');
            
            if (errorCount > 0) {
                setErrorCount((prev) => prev - 1);
            }
        }

        if (!emailRef.current.value) {
            setEmailError('Du måste ange din e-postadress.');
            setErrorCount((prev) => prev + 1);
        
        } else if (!emailRef.current.value.indexOf('@') < 1) {
            setEmailError('Ange en giltig e-postadress.');
            setErrorCount((prev) => prev + 1);
                
        } else {
            setEmailError('');

            if (errorCount > 0) {
                setErrorCount((prev) => prev - 1);
            }
        }

        if (!messageRef.current.value) {
            setMessageError('Du måste skriva ett meddelande.');
            setErrorCount((prev) => prev + 1);            
        
        } else {
            setMessageError('');

            if (errorCount > 0) {
                setErrorCount((prev) => prev - 1);
            }
        }

        if (!consentRef.current.checked) {
            setConsentError('Du måste samtycka till att IWS behandlar dina personuppgifter.');
            setErrorCount((prev) => prev + 1);
        
        } else {
            setConsentError('');
            
            if (errorCount > 0) {
                setErrorCount((prev) => prev - 1);
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        validateForm();

        if (!errorCount) {
            emailjs.sendForm('service_005r77b', 'contact_form', formRef.current, '7V3K7ahJFB30PLvxy')
            .then(result => {
                setConfirmMessage('Tack för ditt meddelande! Vi svarar på ditt meddelande så snart vi kan.');
                console.log(result.text);

            }, (error) => {
                setErrorMessage('Ett fel har uppstått. ' +
                    'Det gick inte att skicka meddelandet. Försök igen lite senare.');
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
            <p className="regular-font-size">Fält märkta med * är obligatoriska.</p>
            {errorCount ? <p className="h2-error h3-font-size" role="alert">
                Formuläret innehåller {errorCount} fel</p> : null}
            <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                    {/* Förnamn */}
                    <div className="form-left">
                        <label htmlFor="first-name" className="h3-font-size">Förnamn *</label>
                        <input id="first-name" className="focus focus-invisible-input text-input 
                            text-input-main regular-font-size" name="first_name" type="text" 
                                aria-required="true" aria-describedby="first-name-empty" 
                                    autoComplete="given-name" ref={firstNameRef}></input>
                        {/* Här skrivs ett felmeddelande ut om inget förnamn har angetts */}
                        {firstNameError ? <p id="first-name-empty" className="regular-font-size 
                            error empty" role="alert" aria-invalid="true">{firstNameError}</p> 
                                : null}
                    </div>
                    {/* Efternamn */}
                    <div className="form-right">
                        <label htmlFor="last-name" className="h3-font-size">Efternamn *</label>
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
                        <label htmlFor="email" className="h3-font-size">E-post *</label>
                        <input id="email" className="focus focus-invisible-input text-input 
                            text-input-main regular-font-size" name="email" type="email" 
                                aria-required="true" aria-describedby="email-error" 
                                    autoComplete="email" ref={emailRef}>
                        </input>
                        {/* Här skrivs ett felmeddelande ut om ingen e-postadress har angetts, 
                            eller om e-postadressen är ogiltig*/}
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
                <label htmlFor="message" className="h3-font-size">Meddelande *</label>
                <textarea id="message" className="focus focus-invisible-input regular-font-size" 
                    name="message" aria-required="true" aria-describedby="message-empty" 
                        autoComplete="on" ref={messageRef}>
                </textarea>
                {/* Här skrivs ett felmeddelande om användaren inte har skrivit något meddelande */}
                {messageError ? <p id="message-empty" className="regular-font-size error" 
                    role="alert" aria-invalid="true">{messageError}</p> : null}
                {/* Samtycke */}
                <p id="consent-heading" className="h3-font-size">Samtycke *</p>
                <input id="consent" className="focus focus-invisible-input" type="checkbox" 
                    aria-required="true" aria-describedby="consent-empty" ref={consentRef}>
                </input>  
                <label id="consent-label" htmlFor="consent" className="regular-font-size 
                    line-height">Jag samtycker till att mina personuppgifter behandlas i 
                        enlighet med IWS <a className="focus focus-invisible regular-font-size 
                            line-height" href=""> integritetspolicy</a> <b className="regular-font-size">
                                *</b></label>
                {/* Här skrivs ett felmeddelande om användaren inte har samtyckt */}
                {consentError ? <p id="consent-empty" className="regular-font-size error" 
                    role="alert" aria-invalid="true">{consentError}</p> : null}
                <div className="row">
                    <button type="reset" id="reset-btn" className="reset-btn focus focus-invisible 
                        regular-font-size">Rensa</button>
                    <button type="submit" className="submit-btn focus focus-invisible 
                        regular-font-size">Skicka</button>
                    {errorMessage ? <p className="regular-font-size error" role="alert">
                        {errorMessage}</p> : null}
                    {confirmMessage ? <p className="regular-font-size confirm" role="alert">
                        {confirmMessage}</p> : null}
                </div>
            </form>
        </section>
    );
}

export default FormSwedish;