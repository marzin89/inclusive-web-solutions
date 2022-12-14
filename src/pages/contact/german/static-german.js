// Imports
import React from 'react';
import emailjs from '@emailjs/browser';

class StaticGerman extends React.Component {
    constructor(props) {
        super(props);

        this.setState              = this.setState.bind(this);
        this.form                  = React.createRef();
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange  = this.handleLastNameChange.bind(this);
        this.handleEmailChange     = this.handleEmailChange.bind(this);
        this.handlePhoneChange     = this.handlePhoneChange.bind(this);
        this.handleMessageChange   = this.handleMessageChange.bind(this);
        this.handleConsentChange   = this.handleConsentChange.bind(this);
        /*
        this.validateFirstName     = this.validateFirstName.bind(this);
        this.validateLastName      = this.validateLastName.bind(this);
        this.validateEmail         = this.validateEmail.bind(this);
        this.validateMessage       = this.validateMessage.bind(this);
        this.validateConsent       = this.validateConsent.bind(this);
        */
        this.validateForm          = this.validateForm.bind(this);
        this.handleSubmit          = this.handleSubmit.bind(this);

        this.state = {
            firstName:      '',
            lastName:       '',
            email:          '',
            phone:          '',
            message:        '',
            consent:        false,
            error:          false,
            errorCountFirstName:    0,
            errorCountLastName:     0,
            errorCountEmailEmpty:   0,
            errorCountEmailInvalid: 0,
            errorCountMessage:      0,
            errorCountConsent:      0,
            errorMessage:   '',
            confirmMessage: '',
            firstNameEmpty: '',
            lastNameEmpty:  '',
            emailEmpty:     '',
            emailInvalid:   '',
            messageEmpty:   '',
            consentEmpty:   '',
        }
    }

    // Rendering
    render() {
        return (
            <section id="contact">
                <h1 id="main" className="h1-font-size">Kontakt</h1>
                <p className="regular-font-size">Pflichtfelder sind mit * gekennzeichnet.</p>
                <p style={this.state.error ? {display: 'block'} : {display: 'none'}} 
                    className="h2-error h3-font-size" role="alert">
                    Das Formular enth??lt {this.state.errorCountFirstName + this.state.errorCountLastName
                        + this.state.errorCountEmailEmpty + this.state.errorCountEmailInvalid +
                        this.state.errorCountMessage + this.state.errorCountConsent} Fehler</p>
                <form ref={this.form}>
                    <div className="row">
                        {/* F??rnamn */}
                        <div className="form-left">
                            <label htmlFor="first-name" className="h3-font-size">Vorname *</label>
                            <input id="first-name" className="focus focus-invisible-input text-input text-input-main 
                                regular-font-size" name="first_name" type="text" aria-required="true" 
                                aria-describedby="first-name-empty" autoComplete='given-name' 
                                onChange={this.handleFirstNameChange}></input>
                            {/* H??r skrivs ett felmeddelande ut om inget f??rnamn har angetts */}
                            <p id="first-name-empty" className="regular-font-size error empty" role="alert" 
                                style={this.state.firstNameEmpty ? {display: 'block'} : {display: 'none'}}>
                                {this.state.firstNameEmpty}</p>
                        </div>
                        {/* Efternamn */}
                        <div className="form-right">
                            <label htmlFor="last-name" className="h3-font-size">Nachname *</label>
                            <input id="last-name" className="focus focus-invisible-input text-input text-input-main 
                                regular-font-size" name="last_name" type="text" aria-required="true" aria-describedby="last-name-empty"
                                autoComplete='family-name' onChange={this.handleLastNameChange}></input>
                            {/* H??r skrivs ett felmeddelande ut om inget efternamn har angetts */}
                            <p id="last-name-empty" className="regular-font-size error empty" role="alert" 
                                style={this.state.lastNameEmpty ? {display: 'block'} : {display: 'none'}}>
                                    {this.state.lastNameEmpty}</p>
                        </div>
                    </div>
                    <div className="row">
                        {/* E-post */}
                        <div className="form-left">
                            <label htmlFor="email" className="h3-font-size">E-Mail-Adresse *</label>
                            <input id="email" className="focus focus-invisible-input text-input text-input-main 
                                regular-font-size" name="email" type="email" aria-required="true" 
                                aria-describedby="email-empty email-invalid" autoComplete='email' 
                                onChange={this.handleEmailChange}>
                            </input>
                            {/* H??r skrivs ett felmeddelande ut om ingen e-postadress har angetts */}
                            <p id="email-empty" className="regular-font-size error empty" role="alert" 
                                style={this.state.emailEmpty ? {display: 'block'} : {display: 'none'}}>
                                    {this.state.emailEmpty}</p>
                            {/* H??r skrivs ett felmeddelande om e-postadressen ??r ogiltig */}
                            <p id="email-invalid" className="regular-font-size error" role="alert" 
                                style={this.state.emailInvalid ? {display: 'block'} : {display: 'none'}}>
                                    {this.state.emailInvalid}</p>
                        </div>
                        {/* Telefon */}
                        <div className="form-right">
                            <label htmlFor="phone" className="h3-font-size">Telefon</label>
                            <input id="phone" className="focus focus-invisible-input text-input text-input-main 
                                regular-font-size" name="phone" type="tel" aria-required="false" autoComplete='tel' 
                                onChange={this.handlePhoneChange}></input>
                        </div>
                    </div>
                    {/* Meddelande */}
                    <label htmlFor="message" className="h3-font-size">Mitteilung *</label>
                    <textarea id="message" className="focus focus-invisible-input regular-font-size" 
                        name="message" aria-required="true" aria-describedby="message-empty" autoComplete='on'
                        onChange={this.handleMessageChange}>
                    </textarea>
                    {/* H??r skrivs ett felmeddelande om anv??ndaren inte har skrivit n??got meddelande */}
                    <p id="message-empty" className="regular-font-size error" role="alert" 
                        style={this.state.messageEmpty ? {display: 'block'} : {display: 'none'}}>
                        {this.state.messageEmpty}</p>
                    {/* Samtycke */}
                    <p id="consent-heading" className="h3-font-size">Einwilligung *</p>
                    <input id="consent" className="focus focus-invisible-input" type="checkbox" 
                        aria-required="true" aria-describedby="consent-empty" 
                        onChange={this.handleConsentChange}></input>  
                    <label id="consent-label" htmlFor="consent" className="regular-font-size line-height">
                        Hiermit stimme ich der Bearbeitung meiner Personenbezogenen Daten gem???? der 
                        <a className="focus focus-invisible regular-font-size line-height" href=""> Datenschutzerkl??rung</a> zu. 
                        <b className="regular-font-size"></b></label>
                    {/* H??r skrivs ett felmeddelande om anv??ndaren inte har samtyckt */}
                    <p id="consent-empty" className="regular-font-size error" role="alert" 
                        style={this.state.consentEmpty ? {display: 'block'} : {display: 'none'}}>
                        {this.state.consentEmpty}</p>
                    <div className="row">
                        <button type="reset" id="reset-btn" className="reset-btn focus focus-invisible regular-font-size">
                            Alle Felder l??schen</button>
                        <button type="submit" className="submit-btn focus focus-invisible regular-font-size" 
                            onClick={this.handleSubmit}>Senden</button>
                        <p className="regular-font-size error" role="alert" 
                            style={this.state.errorMessage != '' ? {display: 'block'} : 
                            {display: 'none'}}>{this.state.errorMessage}</p>
                        <p className="regular-font-size confirm" role="alert" 
                            style={this.state.confirmMessage != '' ? {display: 'block'} : 
                            {display: 'none'}}>{this.state.confirmMessage}</p>
                    </div>
                </form>
            </section>
        )
    }

    /* Dessa funktioner lagrar f??rnamn, efternamn, e-post, telefon,
        meddelande och samtycke i state n??r anv??ndaren skriver */
    handleFirstNameChange(e) {
        this.setState({
            error:     false,
            firstName: e.target.value,
        })

        if (e.target.value) {
            this.setState({
                errorCountFirstName: 0,
                firstNameEmpty:      '',
            })

            e.target.setAttribute('aria-invalid', false);
        }
    }

    handleLastNameChange(e) {
        this.setState({
            error:    false,
            lastName: e.target.value,
        })

        if (e.target.value) {
            this.setState({
                errorCountLastName: 0,
                lastNameEmpty:      '',
            })

            e.target.setAttribute('aria-invalid', false);
        }
    }

    /* Funktionen skriver ut ett felmeddelande om e-postadressen
        ??r ogiltig, annars lagras den */
    handleEmailChange(e) {
        this.setState({
            error: false,
            email: e.target.value,
        })

        if (e.target.value) {
            if (e.target.value.indexOf('@') > 0) {
                this.setState({
                    errorCountEmailEmpty:   0,
                    errorCountEmailInvalid: 0,
                    emailEmpty:             '',
                    emailInvalid:           '',
                })

                e.target.setAttribute('aria-invalid', false);
            
            } else {
                this.setState({
                    errorCountEmailEmpty:   0,
                    errorCountEmailInvalid: 1,
                    emailEmpty:             '',
                    emailInvalid:           'Bitte geben Sie eine g??ltige E-Mail-Adresse ein.',
                })
    
                e.target.setAttribute('aria-invalid', true);
            }
        
        } else {
            this.setState({
                errorCountEmailEmpty:   1,
                errorCountEmailInvalid: 0,
                emailEmpty:             'Bitte geben Sie Ihre E-Mail-Adresse ein.',
                emailInvalid:           '',
            })

            e.target.setAttribute('aria-invalid', true);
        }
    }

    handlePhoneChange(e) {
        this.setState({
            error: false,
            phone: e.target.value,
        })
    }

    handleMessageChange(e) {
        this.setState({
            error:   false,
            message: e.target.value,
        })

        if (e.target.value) {
            this.setState({
                errorCountMessage: 0,
                messageEmpty:      '',
            })

            e.target.setAttribute('aria-invalid', false);
        }
    }

    handleConsentChange(e) {
        this.setState({
            error: false,
        })

        if (e.target.checked) {
            this.setState({
                errorCountConsent: 0,
                consentEmpty:      '',
                consent:           true,
            })

            e.target.setAttribute('aria-invalid', false);
        }
    }

    /*
    validateFirstName(e) {
        if (!e.target.value) {
            this.setState({
                errorCountFirstName: 1,
                firstNameEmpty:      'Bitte geben Sie Ihren Vornamen ein.',
            })

            e.target.setAttribute('aria-invalid', true);
            
        }
    }

    validateLastName(e) {
        if (!e.target.value) {
            this.setState({
                errorCountLastName: 1,
                lastNameEmpty:      'Bitte geben Sie Ihren Nachnamen ein.',
            })

            e.target.setAttribute('aria-invalid', true);
            
        }
    }

    validateEmail(e) {
        if (!e.target.value) {
            this.setState({
                errorCountEmailEmpty:   1,
                errorCountEmailInvalid: 0,
                emailEmpty:             'Bitte geben Sie Ihre E-Mail-Adresse ein.',
                emailInvalid:           '',
                email:                  e.target.value,
            })

            e.target.setAttribute('aria-invalid', true);
            
        
        } else {
            if (e.target.value.indexOf('@') < 1) {
                this.setState({
                    errorCountEmailEmpty:   0,
                    errorCountEmailInvalid: 1,
                    emailEmpty:             '',
                    emailInvalid:           'Bitte geben Sie eine g??ltige E-Mail-Adresse ein.',
                    email:                  e.target.value,
                })
    
                e.target.setAttribute('aria-invalid', true);
                      
            }
        }
    }

    validateMessage(e) {
        if (!e.target.value) {
            this.setState({
                errorCountMessage: 1,
                messageEmpty:      'Bitte schreiben Sie eine Mitteilung.',
            })

            e.target.setAttribute('aria-invalid', true);
            
        }
    }

    validateConsent(e) {
        if (!e.target.checked) {
            this.setState({
                errorCountConsent: 1,
                consentEmpty:      'Bitte stimmen Sie der Bearbeitung Ihrer personenbezogenen Daten zu.',
            })

            e.target.setAttribute('aria-invalid', true);
            
        }
    }
    */

    /* H??r valideras uppgifterna. F??r varje uppgift som saknas,
        skrivs ett felmeddelande ut under inmatningsf??ltet. */
    validateForm() {
        const firstNameInput   = document.getElementById('first-name');
        const lastNameInput    = document.getElementById('last-name');
        const emailInput       = document.getElementById('email');
        const messageInput     = document.getElementById('message');
        const consentInput     = document.getElementById('consent');

        if (!firstNameInput.value) {
            this.setState({
                error:               true,
                errorCountFirstName: 1,
                firstNameEmpty:      'Bitte geben Sie Ihren Vornamen ein.',
            })
               
            firstNameInput.setAttribute('aria-invalid', true);
            
        
        } else {
            this.setState({
                errorCountFirstName: 0,
                firstNameEmpty:      '',
            })

            firstNameInput.setAttribute('aria-invalid', false);
        }

        if (!lastNameInput.value) {
            this.setState({
                error:              true,
                errorCountLastName: 1,
                lastNameEmpty:      'Bitte geben Sie Ihren Nachnamen ein.',
            })

            lastNameInput.setAttribute('aria-invalid', true);
            
        
        } else {
            this.setState({
                errorCountLastName: 0,
                lastNameEmpty:      '',
            })

            lastNameInput.setAttribute('aria-invalid', false);
        }

        if (!emailInput.value) {
            this.setState({
                error:                true,
                errorCountEmailEmpty: 1,
                emailEmpty:           'Bitte geben Sie Ihre E-Mail-Adresse ein.',
            })

            emailInput.setAttribute('aria-invalid', true);
            
        
        } else {
            if (emailInput.value.indexOf('@') < 1) {
                this.setState({
                    error:                  true,
                    errorCountEmailEmpty:   0,
                    errorCountEmailInvalid: 1,
                    emailEmpty:             '',
                    emailInvalid:           'Bitte geben Sie eine g??ltige E-Mail-Adresse ein.',
                    email:                  '',
                })

                emailInput.setAttribute('aria-invalid', true);
                

            } else {
                this.setState({
                    errorCountEmailEmpty:   0,
                    errorCountEmailInvalid: 0,
                    emailEmpty:             '',
                })

                emailInput.setAttribute('aria-invalid', false);
            }
        }

        if (!messageInput.value) {
            this.setState({
                error:             true,
                errorCountMessage: 1,
                messageEmpty:      'Bitte schreiben Sie eine Mitteilung.',
            })

            messageInput.setAttribute('aria-invalid', true);
            
        
        } else {
            this.setState({
                errorCountMessage: 0,
                emailEmpty:        '',
            })

            messageInput.setAttribute('aria-invalid', false);
        }

        if (!consentInput.checked) {
            this.setState({
                error:             true,
                errorCountConsent: 1,
                consentEmpty:      'Bitte stimmen Sie der Bearbeitung Ihrer personenbezogenen Daten zu.',
            })

            consentInput.setAttribute('aria-invalid', true);
            
        
        } else {
            this.setState({
                errorCountConsent: 0,
                consentEmpty:      '',
            })

            consentInput.setAttribute('aria-invalid', false);
        }

        if (firstNameInput.value !== '' && lastNameInput.value !== '' && emailInput.value !== '' &&
            messageInput.value !== '' && consentInput.checked) {

            if (emailInput.value.indexOf('@') > 0) {
                this.setState({
                    error: false,
                })
    
                
                return true;
            
            } else {
                return false;
            }
        
        } else {
            return false;
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validateForm()) {
            emailjs.sendForm('service_005r77b', 'contact_form', this.form.current, '7V3K7ahJFB30PLvxy')
            .then(result => {
                this.setState({
                    confirmMessage: 'Vielen Dank f??r Ihre Mitteilung. Wir melden uns sobald wie m??glich bei Ihnen.',
                    result:         result.text,
                })

            }, (error) => {
                this.setState({
                    errorMessage: 'Ein Fehler ist aufgetreten. ' +
                                    'Ihre Mitteilung konnte leider nicht gesendet werden. ' +
                                    'Versuchen Sie es sp??ter erneut.',
                    result:       error.text,
                })
            })

            this.form.current.reset();
            document.getElementById('reset-btn').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
}

export default StaticGerman;