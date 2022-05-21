// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

// Kontaktformulär
class Contact extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState              = this.setState.bind(this);
        this.form                  = React.createRef();
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange  = this.handleLastNameChange.bind(this);
        this.handleEmailChange     = this.handleEmailChange.bind(this);
        this.handlePhoneChange     = this.handlePhoneChange.bind(this);
        this.handleMessageChange   = this.handleMessageChange.bind(this);
        this.handleConsentChange   = this.handleConsentChange.bind(this);
        this.validateFirstName     = this.validateFirstName.bind(this);
        this.validateLastName      = this.validateLastName.bind(this);
        this.validateForm          = this.validateForm.bind(this);
        this.validateEmail         = this.validateEmail.bind(this);
        this.validateMessage       = this.validateMessage.bind(this);
        this.validateConsent       = this.validateConsent.bind(this);
        this.handleSubmit          = this.handleSubmit.bind(this);
        this.handlePageTitle       = this.handlePageTitle.bind(this);
        this.handleLinkClick       = this.handleLinkClick.bind(this);
        this.handleLogout          = this.handleLogout.bind(this);

        this.state = {
            signedIn: this.props.signedIn,
            firstName:      '',
            lastName:       '',
            email:          '',
            phone:          '',
            message:        '',
            consent:        false,
            error:          false,
            firstNameEmpty: '',
            lastNameEmpty:  '',
            emailEmpty:     '',
            emailInvalid:   '',
            messageEmpty:   '',
            consentEmpty:   '',
        }
    }

    //Rendrering
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
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/contact"}
                                onClick={this.handleLinkClick}> Kontakt</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/"}
                                onClick={this.handleLinkClick}>Start</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/contact"}
                                onClick={this.handleLinkClick}> Kontakt</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="text focus regular-font-size" to={"/login"} 
                        onClick={this.handleLinkClick}>Logga ut</Link></p>
                </div>
                {localStorage.getItem('language') == 'Deutsch' ?
                <section id="contact">
                    <h1 className="text h1-font-size">Kontakt</h1>
                    <p className="text regular-font-size">Pflichtfelder sind mit * gekennzeichnet.</p>
                    <form ref={this.form}>
                        <div className="row">
                            {/* Förnamn */}
                            <div className="form-left">
                                <label htmlFor="first-name" className="text h3-font-size">Vorname *</label>
                                <input id="first-name" className="text text-input text-input-main regular-font-size" 
                                    name="first_name" type="text" aria-required="true" 
                                    onChange={this.handleFirstNameChange} onBlur={this.validateFirstName}></input>
                                {/* Här skrivs ett felmeddelande ut om inget förnamn har angetts */}
                                <p className="text regular-font-size error empty" role="alert" 
                                    style={this.state.firstNameEmpty ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.firstNameEmpty}</p>
                            </div>
                            {/* Efternamn */}
                            <div className="form-right">
                                <label htmlFor="last-name" className="text h3-font-size">Nachname *</label>
                                <input id="last-name" className="text text-input text-input-main regular-font-size" 
                                    name="last_name" type="text" aria-required="true" 
                                    onChange={this.handleLastNameChange} onBlur={this.validateLastName}></input>
                                {/* Här skrivs ett felmeddelande ut om inget efternamn har angetts */}
                                <p className="text regular-font-size error empty" role="alert" 
                                    style={this.state.lastNameEmpty ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.lastNameEmpty}</p>
                            </div>
                        </div>
                        <div className="row">
                            {/* E-post */}
                            <div className="form-left">
                                <label htmlFor="email" className="text h3-font-size">E-Mail-Adresse *</label>
                                <input id="email" className="text focus text-input text-input-main regular-font-size" 
                                    name="email" type="email" aria-required="true" 
                                    onChange={this.handleEmailChange} onBlur={this.validateEmail}></input>
                                {/* Här skrivs ett felmeddelande ut om ingen e-postadress har angetts */}
                                <p className="text regular-font-size error empty" role="alert" 
                                    style={this.state.emailEmpty ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.emailEmpty}</p>
                                {/* Här skrivs ett felmeddelande om e-postadressen är ogiltig */}
                                <p className="text regular-font-size error" role="alert" 
                                    style={this.state.emailInvalid ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.emailInvalid}</p>
                            </div>
                            {/* Telefon */}
                            <div className="form-right">
                                <label htmlFor="phone" className="text h3-font-size">Telefon</label>
                                <input id="phone" className="text focus text-input text-input-main regular-font-size" 
                                    name="phone" type="phone" aria-required="false" 
                                    onChange={this.handlePhoneChange}></input>
                            </div>
                        </div>
                        {/* Meddelande */}
                        <label htmlFor="message" className="text h3-font-size">Mitteilung *</label>
                        <textarea id="message" className="text focus regular-font-size" name="message"
                            aria-required="true" onChange={this.handleMessageChange} 
                            onBlur={this.validateMessage}></textarea>
                        {/* Här skrivs ett felmeddelande om användaren inte har skrivit något meddelande */}
                        <p className="text regular-font-size error" role="alert" 
                                style={this.state.messageEmpty ? {display: 'block'} : {display: 'none'}}>
                                    {this.state.messageEmpty}</p>
                        {/* Samtycke */}
                        <input id="consent" className="focus" type="checkbox" aria-required="true" 
                            onChange={this.handleConsentChange} onBlur={this.validateConsent}></input>  
                        <label id="consent-label" htmlFor="consent" className="text regular-font-size">
                            Hiermit stimme ich der Bearbeitung meiner Personenbezogenen Daten gemäß der 
                            <a className="text focus regular-font-size" href=""> Datenschutzerklärung</a> zu. 
                            <b className="text regular-font-size">*</b></label>
                        {/* Här skrivs ett felmeddelande om användaren inte har samtyckt */}
                        <p className="text regular-font-size error" role="alert" 
                            style={this.state.consentEmpty ? {display: 'block'} : {display: 'none'}}>
                                {this.state.consentEmpty}</p>
                        <div className="row">
                            <button type="reset" className="reset-btn text focus">
                                Alle Felder löschen</button>
                            <button type="submit" className="submit-btn text focus" onClick={this.handleSubmit}>
                                Senden</button>
                            <p className="text regular-font-size error" role="alert" 
                                style={localStorage.getItem('errorMessage') != '' ? {display: 'block'} : 
                                {display: 'none'}}>{localStorage.getItem('errorMessage')}</p>
                            <p className="text regular-font-size confirm" role="alert" 
                                style={localStorage.getItem('confirmMessage') != '' ? {display: 'block'} : 
                                {display: 'none'}}>{localStorage.getItem('confirmMessage')}</p>
                        </div>
                    </form>
                </section>
                :
                <section id="contact">
                    <h1 className="text h1-font-size">Kontakt</h1>
                    <p className="text regular-font-size">Fält märkta med * är obligatoriska.</p>
                    <form ref={this.form}>
                        <div className="row">
                            {/* Förnamn */}
                            <div className="form-left">
                                <label htmlFor="first-name" className="text h3-font-size">Förnamn *</label>
                                <input id="first-name" className="text focus text-input text-input-main regular-font-size" 
                                    name="first_name" type="text" aria-required="true" 
                                    onChange={this.handleFirstNameChange} onBlur={this.validateFirstName}></input>
                                {/* Här skrivs ett felmeddelande ut om inget förnamn har angetts */}
                                <p className="text regular-font-size error empty" role="alert" 
                                    style={this.state.firstNameEmpty ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.firstNameEmpty}</p>
                            </div>
                            {/* Efternamn */}
                            <div className="form-right">
                                <label htmlFor="last-name" className="text h3-font-size">Efternamn *</label>
                                <input id="last-name" className="text focus text-input text-input-main regular-font-size" 
                                    name="last_name" type="text" aria-required="true" 
                                    onChange={this.handleLastNameChange} onBlur={this.validateLastName}></input>
                                {/* Här skrivs ett felmeddelande ut om inget efternamn har angetts */}
                                <p className="text regular-font-size error empty" role="alert" 
                                    style={this.state.lastNameEmpty ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.lastNameEmpty}</p>
                            </div>
                        </div>
                        <div className="row">
                            {/* E-post */}
                            <div className="form-left">
                                <label htmlFor="email" className="text h3-font-size">E-post *</label>
                                <input id="email" className="text focus text-input text-input-main regular-font-size" 
                                    name="email" type="email" aria-required="true" 
                                    onChange={this.handleEmailChange} onBlur={this.validateEmail}></input>
                                {/* Här skrivs ett felmeddelande ut om ingen e-postadress har angetts */}
                                <p className="text regular-font-size error empty" role="alert" 
                                    style={this.state.emailEmpty ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.emailEmpty}</p>
                                {/* Här skrivs ett felmeddelande om e-postadressen är ogiltig */}
                                <p className="text regular-font-size error" role="alert" 
                                    style={this.state.emailInvalid ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.emailInvalid}</p>
                            </div>
                            {/* Telefon */}
                            <div className="form-right">
                                <label htmlFor="phone" className="text h3-font-size">Telefon</label>
                                <input id="phone" className="text focus text-input text-input-main regular-font-size" 
                                    name="phone" type="tel" aria-required="false" 
                                    onChange={this.handlePhoneChange}></input>
                            </div>
                        </div>
                        {/* Meddelande */}
                        <label htmlFor="message" className="text h3-font-size">Meddelande *</label>
                        <textarea id="message" className="text focus regular-font-size" name="message" 
                            onChange={this.handleMessageChange} onBlur={this.validateMessage}></textarea>
                        {/* Här skrivs ett felmeddelande om användaren inte har skrivit något meddelande */}
                        <p className="text regular-font-size error" role="alert" 
                                style={this.state.messageEmpty ? {display: 'block'} : {display: 'none'}}>
                                    {this.state.messageEmpty}</p>
                        {/* Samtycke */}
                        <input id="consent" className="focus" type="checkbox" aria-required="true" 
                            onChange={this.handleConsentChange} onBlur={this.validateConsent}></input>  
                        <label id="consent-label" htmlFor="consent" className="text regular-font-size">
                            Jag samtycker till att mina personuppgifter behandlas i enlighet med IWS 
                            <a className="text focus regular-font-size" href=""> integritetspolicy</a> 
                            <b className="text regular-font-size">*</b></label>
                        {/* Här skrivs ett felmeddelande om användaren inte har samtyckt */}
                        <p className="text regular-font-size error" role="alert" 
                            style={this.state.consentEmpty ? {display: 'block'} : {display: 'none'}}>
                                {this.state.consentEmpty}</p>
                        <div className="row">
                            <button type="reset" className="reset-btn text focus">
                                Rensa</button>
                            <button type="submit" className="submit-btn text focus" onClick={this.handleSubmit}>
                                Skicka</button>
                            <p className="text regular-font-size error" role="alert" 
                                style={localStorage.getItem('errorMessage') != '' ? {display: 'block'} : 
                                {display: 'none'}}>{localStorage.getItem('errorMessage')}</p>
                            <p className="text regular-font-size confirm" role="alert" 
                                style={localStorage.getItem('confirmMessage') != '' ? {display: 'block'} : 
                                {display: 'none'}}>{localStorage.getItem('confirmMessage')}</p>
                        </div>
                    </form>
                </section>}
            </main>
        )
    }

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Kontakt');
        localStorage.setItem('pageGerman', 'Kontakt');
        document.title = 'Kontakt'; 
        
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

    /* Dessa funktioner lagrar förnamn, efternamn, e-post, telefon,
        meddelande och samtycke i state när användaren skriver */
    handleFirstNameChange(e) {
        this.setState({
            error:          false,
            firstNameEmpty: '',
            firstName:      e.target.value,
        })
    }

    handleLastNameChange(e) {
        this.setState({
            error:         false,
            lastNameEmpty: '',
            lastName:      e.target.value,
        })
    }

    /* Funktionen skriver ut ett felmeddelande om e-postadressen
        är ogiltig, annars lagras den */
    handleEmailChange(e) {
        this.setState({
            error:        false,
            emailEmpty:   '',
            emailInvalid: '',
            email:        e.target.value,
        })

        localStorage.removeItem('error');
    }

    handlePhoneChange(e) {
        this.setState({
            phone: e.target.value,
        })
    }

    handleMessageChange(e) {
        this.setState({
            error:        false,
            messageEmpty: '',
            message:      e.target.value,
        })
    }

    handleConsentChange(e) {
        this.setState({
            error:        false,
            consentEmpty: '',
            consent:      true,
        })
    }

    validateFirstName(e) {
        if (!e.target.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:          true,
                    firstNameEmpty: 'Bitte geben Sie Ihren Vornamen ein.',
                })
            
            } else {
                this.setState({
                    error:          true,
                    firstNameEmpty: 'Du måste ange ditt förnamn.',
                })
            }

            localStorage.setItem('error', true);
        }
    }

    validateLastName(e) {
        if (!e.target.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:         true,
                    lastNameEmpty: 'Bitte geben Sie Ihren Nachnamen ein.',
                })
            
            } else {
                this.setState({
                    error:         true,
                    lastNameEmpty: 'Du måste ange ditt efternamn.',
                })
            }

            localStorage.setItem('error', true);
        }
    }

    validateEmail(e) {
        if (!e.target.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:        true,
                    emailEmpty:   'Bitte geben Sie Ihre E-Mail-Adresse ein.',
                    emailInvalid: '',
                    email:        '',
                })
            
            } else {
                this.setState({
                    error:      true,
                    emailEmpty: 'Du måste ange din e-postadress.',
                    emailInvalid: '',
                    email:        '',
                })
            }

            localStorage.setItem('error', true);
        
        } else {
            if (e.target.value.indexOf('@') < 0) {
                if (localStorage.getItem('language') == 'Deutsch') {
                    this.setState({
                        error:        true,
                        emailEmpty:   '',
                        emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
                        email:        '',
                    })
    
                } else {
                    this.setState({
                        error:        true,
                        emailEmpty:   '',
                        emailInvalid: 'Ange en giltig e-postadress.',
                        email:        '',
                    })
                }
    
                localStorage.setItem('error', true);
    
            }
        }
    }

    validateMessage(e) {
        if (!e.target.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:        true,
                    messageEmpty: 'Bitte schreiben Sie eine Mitteilung.',
                })
            
            } else {
                this.setState({
                    error:        true,
                    messageEmpty: 'Du måste skriva ett meddelande.',
                })
            }

            localStorage.setItem('error', true);
        }
    }

    validateConsent(e) {
        if (!e.target.checked) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:        true,
                    consentEmpty: 'Bitte stimmen Sie der Bearbeitung Ihrer personenbezogenen Daten zu.',
                })
            
            } else {
                this.setState({
                    error:        true,
                    consentEmpty: 'Du måste samtycka till att IWS behandlar dina personuppgifter.',
                })
            } 

            localStorage.setItem('error', true);
        }
    }

    /* Här valideras uppgifterna. För varje uppgift som saknas,
        skrivs ett felmeddelande ut under inmatningsfältet. */
    validateForm() {
        const firstNameInput   = document.getElementById('first-name');
        const lastNameInput    = document.getElementById('last-name');
        const emailInput       = document.getElementById('email');
        const messageInput     = document.getElementById('message');
        const consentInput     = document.getElementById('consent');

        if (!firstNameInput.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:          true,
                    firstNameEmpty: 'Bitte geben Sie Ihren Vornamen ein.',
                })
            
            } else {
                this.setState({
                    error:          true,
                    firstNameEmpty: 'Du måste ange ditt förnamn.',
                })
            }
        
            localStorage.setItem('error', true);
        
        } else {
            this.setState({
                error:          false,
                firstNameEmpty: '',
            })
        }

        if (!lastNameInput.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:         true,
                    lastNameEmpty: 'Bitte geben Sie Ihren Nachnamen ein.',
                })
            
            } else {
                this.setState({
                    error:         true,
                    lastNameEmpty: 'Du måste ange ditt efternamn.',
                })
            }

            localStorage.setItem('error', true);
        
        } else {
            this.setState({
                error:         false,
                lastNameEmpty: '',
            })
        }

        if (!emailInput.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:      true,
                    emailEmpty: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
                })
            
            } else {
                this.setState({
                    error:      true,
                    emailEmpty: 'Du måste ange din e-postadress.',
                })
            }

            localStorage.setItem('error', true);
        
        } else {
            this.setState({
                error:      false,
                emailEmpty: '',
            })
        }

        if (!messageInput.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:        true,
                    messageEmpty: 'Bitte schreiben Sie eine Mitteilung.',
                })
            
            } else {
                this.setState({
                    error:        true,
                    messageEmpty: 'Du måste skriva ett meddelande.',
                })
            }

            localStorage.setItem('error', true);
        
        } else {
            this.setState({
                error:      false,
                emailEmpty: '',
            })
        }

        if (!consentInput.checked) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:        true,
                    consentEmpty: 'Bitte stimmen Sie der Bearbeitung Ihrer personenbezogenen Daten zu.',
                })
            
            } else {
                this.setState({
                    error:        true,
                    consentEmpty: 'Du måste samtycka till att IWS behandlar dina personuppgifter.',
                })
            }

            localStorage.setItem('error', true);
        
        } else {
            this.setState({
                error:        false,
                consentEmpty: '',
            })
        }

        if (firstNameInput.value !== '' && lastNameInput.value !== '' && emailInput.value !== '' &&
            messageInput.value !== '' && consentInput.checked !== '') {
            localStorage.removeItem('error');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.validateForm();

        if (!localStorage.getItem('error')) {
            emailjs.sendForm('service_005r77b', 'contact_form', this.form.current, '7V3K7ahJFB30PLvxy')
            .then(result => {
                this.setState({
                    error:        false,
                    result: result.text,
                })

                localStorage.removeItem('errorMessage');

                if (localStorage.getItem('language') == 'Deutsch') {
                    localStorage.setItem(
                        'confirmMessage', 'Vielen Dank für Ihre Mitteilung. Wir melden uns sobald wie möglich bei Ihnen.'
                    );
                
                } else {
                    localStorage.setItem(
                        'confirmMessage', 'Tack för ditt meddelande! Vi svarar på ditt meddelande så snart vi kan.'
                    );
                }

            }, (error) => {
                this.setState({
                    error:          true,
                    result:         error.text,
                })

                localStorage.removeItem('confirmMessage');

                if (localStorage.getItem('language') == 'Deutsch') {
                    localStorage.setItem('errorMessage', 'Ein Fehler ist aufgetreten. ' +
                        'Ihre Mitteilung konnte leider nicht gesendet werden. ' +
                        'Versuchen Sie es später erneut.'
                    );
                
                } else {
                    localStorage.setItem('errorMessage', 'Ett fel har uppstått. ' +
                        'Det gick inte att skicka meddelandet. Försök igen lite senare.'
                    );
                }
            })
        }
    }

    handleLinkClick(e) {
        if (e.target.innerHTML == 'Logga ut') {
            this.handleLogout(e);
        
        } else {
            this.handlePageTitle(e);
        }
    }

    // Utloggning
    handleLogout(e) {

        // Förhidrar att sidan laddas om
        e.preventDefault();

        this.props.logout();
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
}

// Exporterar komponenten
export default Contact;