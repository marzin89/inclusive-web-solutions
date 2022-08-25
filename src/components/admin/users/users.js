// Imports
import { toBeInTheDocument, toContainHTML } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import { findAllInRenderedTree } from 'react-dom/test-utils';
import {Link} from 'react-router-dom';

let oldUsername;
let oldPassword;
let emailPoints;
let usernamePoints;
let passwordPoints;

// Formulär för hantering av användare
class Users extends React.Component { 
    
    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState                = this.setState.bind(this);
        this.form                    = React.createRef();
        this.handleFirstNameChange   = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange    = this.handleLastNameChange.bind(this);
        this.handleEmailChange       = this.handleEmailChange.bind(this);
        this.handlePhoneChange       = this.handlePhoneChange.bind(this);
        this.handleUsernameChange    = this.handleUsernameChange.bind(this);
        this.handlePasswordChange    = this.handlePasswordChange.bind(this);
        this.handleUserRoleChange    = this.handleUserRoleChange.bind(this);
        this.handleUserBlockedChange = this.handleUserBlockedChange.bind(this);
        /*
        this.validateFirstName       = this.validateFirstName.bind(this);
        this.validateLastName        = this.validateLastName.bind(this);
        this.validateEmail           = this.validateEmail.bind(this);
        this.validatePhone           = this.validatePhone.bind(this);
        this.validateUsername        = this.validateUsername.bind(this);
        this.validatePassword        = this.validatePassword.bind(this);
        */
        this.handleLinkClick         = this.handleLinkClick.bind(this);
        this.handleSubmit            = this.handleSubmit.bind(this);
        this.validateForm            = this.validateForm.bind(this);

        // Här lagras användaruppgifter, fel- och bekräftelsemeddelanden
        this.state = {
            users:                      this.props.users,
            firstName:                  '',
            lastName:                   '',
            email:                      '',
            phone:                      '',
            username:                   '',
            password:                   '',
            userRole:                   '',
            blocked:                    '',
            error:                      false,
            errorUsers:                 this.props.errorUsers,
            confirmUsers:               this.props.confirmUsers,
            errorCountFirstName:        0,
            errorCountLastName:         0,
            errorCountEmailEmpty:       0,
            errorCountEmailInvalid:     0,
            errorCountPhone:            0,
            errorCountUsernameEmpty:    0,
            errorCountUsernameTaken:    0,
            errorCountPasswordEmpty:    0,
            errorCountPasswordTooShort: 0,
            errorCountPasswordInsecure: 0,
            errorCountPasswordTaken:    0,
            firstNameEmpty:             '',
            lastNameEmpty:              '',
            emailEmpty:                 '',
            emailInvalid:               '',
            phoneEmpty:                 '',
            usernameEmpty:              '',
            usernameTaken:              '',
            passwordEmpty:              '',
            passwordTooShort:           '',
            passwordInsecure:           '',
            passwordTaken:              '',
        }
    }
    
    // Rendrering
    render() {
        return (
            <div id="main" className="admin-form">
                <section id="admin-form">
                    <h2 className="h2-admin">Användare</h2>
                    <p style={this.state.error ? {display: 'block'} : {display: 'none'}} 
                        className="text h2-error h3-font-size" role="alert">
                        Formuläret innehåller {this.state.errorCountFirstName + 
                            this.state.errorCountLastName + this.state.errorCountEmailEmpty + 
                            this.state.errorCountEmailInvalid + this.state.errorCountPhone + 
                            this.state.errorCountUsernameEmpty + this.state.errorCountUsernameTaken + 
                            this.state.errorCountPasswordEmpty + this.state.errorCountPasswordTooShort + 
                            this.state.errorCountPasswordInsecure + this.state.errorCountPasswordTaken} fel</p>
                    <form ref={this.form}>
                        <p>Fält märkta med * är obligatoriska.</p>
                        <div className="row">
                            {/* Förnamn */}
                            <div className="form-left">
                                <label htmlFor="user-first-name-input">Förnamn *</label>
                                <input id="user-first-name-input" className="focus text-input-main" 
                                    type="text" aria-required="true" aria-describedby="first-name-empty" 
                                    autoComplete='given-name' onChange={this.handleFirstNameChange}>
                                </input>
                                {/* Här skrivs ett felmeddelande ut om inget förnamn har angetts */}
                                <p id="first-name-empty" className="error empty" role="alert" 
                                    style={this.state.firstNameEmpty ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.firstNameEmpty}</p>
                            </div>
                            {/* Förnamn */}
                            <div className="form-right">
                                <label htmlFor="user-last-name-input">Efternamn *</label>
                                <input id="user-last-name-input" className="focus text-input-main" 
                                    type="text" aria-required="true" aria-describedby="last-name-empty" 
                                    autoComplete='family-name' onChange={this.handleLastNameChange}></input>
                                {/* Här skrivs ett felmeddelande ut om inget efternamn har angetts */}
                                <p id="last-name-empty" className="error empty" role="alert" 
                                    style={this.state.lastNameEmpty ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.lastNameEmpty}</p>
                            </div>
                        </div>
                        <div className="row">
                            {/* E-post */}
                            <div className="form-left">
                                <label htmlFor="user-email-input">E-post *</label>
                                <input id="user-email-input" className="focus text-input-main" type="email" 
                                    aria-required="true" aria-describedby="email-empty email-invalid" 
                                    autoComplete='email' onChange={this.handleEmailChange}></input>
                                {/* Här skrivs ett felmeddelande ut om ingen e-postadress har angetts */}
                                <p id="email-empty" className="error empty" role="alert" 
                                    style={this.state.emailEmpty ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.emailEmpty}</p>
                                {/* Här skrivs ett felmeddelande om e-postadressen är ogiltig */}
                                <p id="email-invalid" className="error" role="alert" 
                                    style={this.state.emailInvalid ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.emailInvalid}</p>
                            </div>
                            {/* Telefon */}
                            <div className="form-right">
                                <label htmlFor="user-phone-input">Telefon *</label>
                                <input id="user-phone-input" className="focus text-input-main" type="tel" 
                                    aria-required="true" aria-describedby="phone-empty" 
                                    autoComplete='tel' onChange={this.handlePhoneChange}></input>
                                {/* Här skrivs ett felmeddelande ut om inget telefonnummer har angetts */}
                                <p id="phone-empty" className="error empty" role="alert" 
                                    style={this.state.phoneEmpty ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.phoneEmpty}</p>
                            </div>
                        </div>
                        <div className="row">
                            {/* Användarnamn */}
                            <div className="form-left">
                                <label htmlFor="username-input">Användarnamn *</label>
                                <input id="username-input" className="focus text-input-main" type="text" 
                                    aria-required="true" aria-describedby="username-empty username-taken" 
                                    autoComplete='username' onChange={this.handleUsernameChange}></input>
                                {/* Här skrivs ett felmeddelande ut om inget användarnamn har angetts */}
                                <p id="username-empty" className="error emtpy" role="alert" 
                                    style={this.state.usernameEmpty ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.usernameEmpty}</p>
                                {/* Här skrivs ett felmeddelande ut om användarnamnet är upptaget */}
                                <p id="username-taken" className="error" role="alert" 
                                    style={this.state.usernameTaken ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.usernameTaken}</p>
                            </div>
                            {/* Lösenord */}
                            <div className="form-right">
                                <label htmlFor="password-input">Lösenord *</label>
                                <input id="password-input" className="focus text-input-main" type="password" 
                                    aria-required="true" aria-describedby="password-empty password-too-short
                                    password-insecure password-taken" autoComplete='new-password' 
                                    onChange={this.handlePasswordChange}></input>
                                {/* Här skrivs ett felmeddelande ut om inget lösenord har angetts */}
                                <p id="password-empty" className="error empty" role="alert" 
                                    style={this.state.passwordEmpty ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.passwordEmpty}</p>
                                {/* Här skrivs ett felmeddelande ut om lösenordet är för kort */}
                                <p id="password-too-short" className="error" role="alert" 
                                    style={this.state.passwordTooShort ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.passwordTooShort}</p>
                                {/* Här skrivs ett felmeddelande ut om lösenordet är osäkert */}
                                <p id="password-insecure" className="error" role="alert" 
                                    style={this.state.passwordInsecure ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.passwordInsecure}</p>
                                {/* Här skrivs ett felmeddelande ut om lösenordet är upptaget */}
                                <p id="password-taken" className="error" role="alert" 
                                    style={this.state.passwordTaken ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.passwordTaken}</p>
                            </div>
                        </div>
                        <div className="row">
                            {/* Behörighet */}
                            <div className="form-left">
                                <label htmlFor="user-role-input">Behörighet *</label>
                                <select id="user-role-input" className="focus text-input-main" 
                                    aria-required="true" onChange={this.handleUserRoleChange}>
                                    <option value="Gästskribent">Gästskribent</option>
                                    <option value="Medarbetare">Medarbetare</option>
                                </select>
                            </div>
                            {/* Blockering */}
                            <div className="form-right">
                                <label htmlFor="user-blocked-input">Blockerad *</label>
                                <select id="user-blocked-input" className="focus text-input-main" 
                                    aria-required="true" onChange={this.handleUserBlockedChange}>
                                    <option value="Nej">Nej</option>
                                    <option value="Ja">Ja</option>
                                </select>
                            </div>
                        </div>
                        <button type="reset" id="reset-btn" className="reset-btn">Rensa</button>
                        <button type="submit" className="submit-btn" onClick={this.handleSubmit}>
                            Skicka</button>
                    </form>
                    {/* Här skrivs eventuella felmeddelanden ut (inga poster, serverfel) */}
                    <p className="error" role="alert" style={this.props.errorUsers ? 
                        {display: 'block'} : {display: 'none'}}>{this.props.errorUsers}
                    </p> 
                    {/* Här skrivs övriga bekräftelsemeddelanden ut (uppdatering, borttagning) */}
                    <p className="confirm" role="alert" style={this.props.confirmUsers ? 
                        {display: 'block'} : {display: 'none'}}>{this.props.confirmUsers}
                    </p>
                </section>

                {/* Här skrivs alla användare ut (via props) med länkar för redigering och radering */}
                <div className="admin-output">
                    {this.props.users.map((user) => {
                        return (
                            <table className="user" key={user.id}>
                                <caption>{user.firstName} {user.lastName}</caption>
                                <tbody>
                                    <tr>
                                        <th scope="row">E-post:</th>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Telefon:</th>
                                        <td>{user.phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Användarnamn:</th>
                                        <td>{user.username}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Lösenord:</th>
                                        <td className="password">{user.password.replace(/./g, '*')}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Behörighet:</th>
                                        <td>{user.userRole}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Blockerad:</th>
                                        <td>{user.blocked ? 'Ja' : 'Nej'}</td>
                                    </tr>
                                    <tr>
                                        <td className="edit-users"><a id={`edit${user.id}`} className="focus" 
                                            href="" onClick={this.handleLinkClick}>Redigera</a></td>
                                        <td className="delete-users"><a id={`delete${user.id}`} className="focus" 
                                            href="" onClick={this.handleLinkClick}>Radera</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        )
                    })}
                </div>
            </div>
        )
    }

    /* Dessa funktioner lagrar förnamn, efternamn, e-post, telefon,
        användarnamn, lösenord, behörighet och blockering och språk 
        i state när användaren skriver */
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
        är ogiltig, annars lagras den */
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
                    emailInvalid:           'Ange en giltig e-postadress.',
                })
    
                e.target.setAttribute('aria-invalid', true);
            }
        
        } else {
            this.setState({
                errorCountEmailEmpty:   1,
                errorCountEmailInvalid: 0,
                emailEmpty:             'Du måste ange en e-postadress.',
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

        if (e.target.value) {
            this.setState({
                errorCountPhone: 0,
                phoneEmpty:      '',
            })

            e.target.setAttribute('aria-invalid', false);
        }
    }

    handleUsernameChange(e) {
        this.setState({
            error:    false,
            username: e.target.value,
        })

        let count = 0;

        if (e.target.value) {
            this.setState({
                errorCountUsernameEmpty: 0,
                usernameEmpty:           '',
            })

            if (!localStorage.getItem('actionUsers')) {
                this.props.users.forEach((user) => {
                    if (user.username == e.target.value) {

                        count = 1;

                        this.setState({
                            errorCountUsernameTaken: 1,
                            usernameTaken:           'Användarnamnet är upptaget.',
                        })
    
                        e.target.setAttribute('aria-invalid', true);
                        
                    }
                })
            
            } else if (localStorage.getItem('actionUsers') == 'edit') {
                this.props.users.forEach((user) => {
                    if (user.username == e.target.value &&
                        e.target.value !== oldUsername) {

                        count = 1;

                        this.setState({
                            errorCountUsernameTaken: 1,
                            usernameTaken:           'Användarnamnet är upptaget.',
                        })

                        e.target.setAttribute('aria-invalid', true);
                        
                    }
                })
            }
        }

        if (!count) {
            this.setState({
                errorCountUsernameTaken: 0,
                usernameTaken:           '',
            })
        }
    }

    handlePasswordChange(e) {
        this.setState({
            error:    false,
            password: e.target.value,
        })
        
        if (e.target.value) {
            this.setState({
                errorCountPasswordEmpty: 0,
                passwordEmpty:           '',
            })

            const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");

            if (!pattern.test(e.target.value)) {
                this.setState({
                    errorCountPasswordInsecure: 1,
                    passwordInsecure:           'Lösenordet måste innehålla versaler, gemener och siffror.',
                })
    
                e.target.setAttribute('aria-invalid', true);
                    
            
            } else {
                this.setState({
                    errorCountPasswordInsecure: 0,
                    passwordInsecure:           '',
                })
            }
    
            if (e.target.value.length < 10) {
                this.setState({
                    errorCountPasswordTooShort: 1,
                    passwordTooShort:           'Lösenordet måste vara minst 10 tecken långt.',
                })
    
                e.target.setAttribute('aria-invalid', true);
                
            
            } else {
                this.setState({
                    errorCountPasswordTooShort: 0,
                    passwordTooShort:           '',
                })
            }
    
            let count = 0;
    
            if (!localStorage.getItem('actionUsers')) {
                for (let i = 0; i < this.state.users.length; i++) {
                    if (this.state.users[i].password == e.target.value) {
    
                        count = 1;
                        
                        this.setState({
                            errorCountPasswordTaken: 1,
                            passwordTaken:           'Lösenordet är upptaget.',
                        })
        
                        e.target.setAttribute('aria-invalid', true);
                        
                    }
                }
            
            } else if (localStorage.getItem('actionUsers') == 'edit') {
                for (let i = 0; i < this.state.users.length; i++) {
                    if (this.state.users[i].password == e.target.value &&
                        e.target.value !== oldPassword) {
                        
                        count = 1;
    
                        this.setState({
                            errorCountPasswordTaken: 1,
                            passwordTaken:           'Lösenordet är upptaget.',
                        })
    
                        e.target.setAttribute('aria-invalid', true);
                        
                    }
                }
            }
    
            if (!count) {
                this.setState({
                    errorCountPasswordTaken: 0,
                    passwordTaken:           '',
                })
            }
        }
    }

    handleUserRoleChange(e) {
        this.setState({
            userRole: e.target.value,
        })
    }

    handleUserBlockedChange(e) {
        this.setState({
            blocked: e.target.value,
        })
    }

    /*
    validateFirstName(e) {
        if (!e.target.value) {
            this.setState({
                errorCountFirstName: 1, 
                firstNameEmpty:      'Du måste ange ett förnamn.',
            })

            e.target.setAttribute('aria-invalid', true);
            
        }
    }

    validateLastName(e) {
        if (!e.target.value) {
            this.setState({
                errorCountLastName: 1, 
                lastNameEmpty:      'Du måste ange ett efternamn.',
            })

            e.target.setAttribute('aria-invalid', true);
            
        }
    }
    
    validateEmail(e) {
        if (!e.target.value) {
            this.setState({
                errorCountEmailEmpty:   1,
                errorCountEmailInvalid: 0,
                emailEmpty:             'Du måste ange en e-postadress.',
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
                    emailInvalid:           'Ange en giltig e-postadress.',
                    email:                  e.target.value,
                })
    
                e.target.setAttribute('aria-invalid', true);
                
            }
        }
    }

    validatePhone(e) {
        if (!e.target.value) {
            this.setState({
                errorCountPhone: 1,
                phoneEmpty:      'Du måste ange ett telefonnummer.',
            })

            e.target.setAttribute('aria-invalid', true);
            
        }
    }

    validateUsername(e) {
        if (!e.target.value) {
            this.setState({
                errorCountUsernameEmpty: 1, 
                usernameEmpty:           'Du måste ange ett användarnamn.',
                usernameTaken:           '',
            })

            e.target.setAttribute('aria-invalid', true);
            
        
        } else {
            if (!localStorage.getItem('actionUsers')) {
                this.props.users.forEach((user) => {
                    if (user.username == e.target.value) {
                        this.setState({
                            errorCountUsernameTaken: 1,
                            usernameEmpty:           '',
                            usernameTaken:           'Användarnamnet är upptaget.',
                            username:                '',
                        })
    
                        e.target.setAttribute('aria-invalid', true);
                        
                    }
                })
            
            } else if (localStorage.getItem('actionUsers') == 'edit') {
                this.props.users.forEach((user) => {
                    if (user.username == e.target.value &&
                        e.target.value !== oldUsername) {

                        this.setState({
                            errorCountUsernameTaken: 1,
                            usernameEmpty:           '',
                            usernameTaken:           'Användarnamnet är upptaget.',
                            username:                '',
                        })

                        e.target.setAttribute('aria-invalid', true);
                        
                    }
                })
            }   
        }
    }

    validatePassword(e) {
        if (!e.target.value) {
            this.setState({
                errorCountPasswordEmpty: 1,
                passwordEmpty:           'Du måste ange ett lösenord.',
                passwordTaken:           '',
                passwordTooShort:        '',
                passwordInsecure:        '',
            })
    
            e.target.setAttribute('aria-invalid', true);
            
        
        } else {
            const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");

            if (!pattern.test(e.target.value)) {
                this.setState({
                    errorCountPasswordInsecure: 1,
                    passwordEmpty:              '',
                    passwordInsecure:           'Lösenordet måste innehålla versaler, gemener och siffror.',
                })

                e.target.setAttribute('aria-invalid', true);
                
            
            }

            if (e.target.value.length < 10) {
                this.setState({
                    errorCountPasswordTooShort: 1,
                    passwordEmpty:              '',
                    passwordTooShort:           'Lösenordet måste vara minst 10 tecken långt.',
                })
    
                e.target.setAttribute('aria-invalid', true);
                
            }

            if (!localStorage.getItem('actionUsers')) {
                for (let i = 0; i < this.state.users.length; i++) {
                    if (this.state.users[i].password == e.target.value) {
                        this.setState({
                            errorCountPasswordTaken: 1,
                            passwordTaken:           'Lösenordet är upptaget.',
                            password:                '',
                        })
        
                        e.target.setAttribute('aria-invalid', true);
                        
                    }
                }
            
            } else if (localStorage.getItem('actionUsers') == 'edit') {
                for (let i = 0; i < this.state.users.length; i++) {
                    if (this.state.users[i].password == e.target.value &&
                        e.target.value !== oldPassword) {

                        this.setState({
                            errorCountPasswordTaken: 1,
                            passwordTaken:           'Lösenordet är upptaget.',
                            password:                '',
                        })

                        e.target.setAttribute('aria-invalid', true);
                        
                    }
                }
            }
        }
    }
    */

    validateForm() {
        const firstNameInput = document.getElementById('user-first-name-input');
        const lastNameInput  = document.getElementById('user-last-name-input');
        const emailInput     = document.getElementById('user-email-input');
        const phoneInput     = document.getElementById('user-phone-input');
        const usernameInput  = document.getElementById('username-input');
        const passwordInput  = document.getElementById('password-input');

        emailPoints    = 0;
        usernamePoints = 0;
        passwordPoints = 0;

        if (!firstNameInput.value) {
            this.setState({
                error:               true, 
                errorCountFirstName: 1,
                firstNameEmpty:      'Du måste ange ett förnamn.',
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
                lastNameEmpty:      'Du måste ange ett efternamn.',
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
                emailEmpty:           'Du måste ange en e-postadress.',
            })

            emailInput.setAttribute('aria-invalid', true);
            
        
        } else {
            if (emailInput.value.indexOf('@') < 1) {
                this.setState({
                    error:                  true,
                    errorCountEmailEmpty:   0,
                    errorCountEmailInvalid: 1,
                    emailEmpty:             '',
                    emailInvalid:           'Ange en giltig e-postadress.',
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
                emailPoints = 1;
            }
        }

        if (!phoneInput.value) {
            this.setState({
                error:           true,
                errorCountPhone: 1,
                phoneEmpty:      'Du måste ange ett telefonnummer.',
            })

            phoneInput.setAttribute('aria-invalid', true);
            
        
        } else {
            this.setState({
                errorCountPhone: 0,
                phoneEmpty:      '',
            })

            phoneInput.setAttribute('aria-invalid', false);
        }

        if (!usernameInput.value) {
            this.setState({
                error:                   true,
                errorCountUsernameEmpty: 1, 
                usernameEmpty:           'Du måste ange ett användarnamn.',
            })

            usernameInput.setAttribute('aria-invalid', true);
            
        
        } else {
            this.setState({
                errorCountUsernameEmpty: 0, 
                usernameEmpty:           '',
            })

            let count = 0;

            if (!localStorage.getItem('actionUsers')) {
                this.props.users.forEach((user) => {
                    if (user.username == usernameInput.value) {

                        count += 1;

                        this.setState({
                            error:                   true,
                            errorCountUsernameTaken: 1,
                            usernameTaken:           'Användarnamnet är upptaget.',
                        })
    
                        usernameInput.setAttribute('aria-invalid', true);
                        
                    }
                })
            
            } else if (localStorage.getItem('actionUsers') == 'edit') {
                this.props.users.forEach((user) => {
                    if (user.username == usernameInput.value &&
                        usernameInput.value !== oldUsername) {

                        count += 1;

                        this.setState({
                            error:                   true,
                            errorCountUsernameTaken: 1,
                            usernameTaken:           'Användarnamnet är upptaget.',
                        })

                        usernameInput.setAttribute('aria-invalid', true);
                        
                    }
                })
            }   

            if (!count) {
                this.setState({
                    errorCountUsernameTaken: 0,
                    usernameTaken:           '',
                })

                usernamePoints = 1;
            }
        }

        if (!passwordInput.value) {
            this.setState({
                error:                   true,
                errorCountPasswordEmpty: 1,
                passwordEmpty:           'Du måste ange ett lösenord.',
            })
    
            passwordInput.setAttribute('aria-invalid', true);
            
        
        } else {
            this.setState({
                errorCountPasswordEmpty: 0,
                passwordEmpty:           '',
            })

            const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");

            if (!pattern.test(passwordInput.value)) {
                this.setState({
                    error:                      true,
                    errorCountPasswordInsecure: 1,
                    passwordInsecure:           'Lösenordet måste innehålla versaler, gemener och siffror.',
                })

                passwordInput.setAttribute('aria-invalid', true);
                
            
            } else {
                this.setState({
                    errorCountPasswordInsecure: 0,
                    passwordInsecure:           '',
                })

                passwordPoints = 1;
            }

            if (passwordInput.value.length < 10) {
                this.setState({
                    error:                      true,    
                    errorCountPasswordTooShort: 1,
                    passwordTooShort:           'Lösenordet måste vara minst 10 tecken långt.',
                })
    
                passwordInput.setAttribute('aria-invalid', true);
                
            
            } else {
                this.setState({    
                    errorCountPasswordTooShort: 0,
                    passwordTooShort:           '',
                })

                passwordPoints += 1;
            }

            let count = 0;

            if (!localStorage.getItem('actionUsers')) {
                for (let i = 0; i < this.state.users.length; i++) {
                    if (this.state.users[i].password == passwordInput.value) {

                        count += 1;

                        this.setState({
                            error:                   true,
                            errorCountPasswordTaken: 1,
                            passwordTaken:           'Lösenordet är upptaget.',
                        })
        
                        passwordInput.setAttribute('aria-invalid', true);
                        
                    }
                }
            
            } else if (localStorage.getItem('actionUsers') == 'edit') {
                for (let i = 0; i < this.state.users.length; i++) {
                    if (this.state.users[i].password == passwordInput.value &&
                        passwordInput.value !== oldPassword) {

                        count += 1;

                        this.setState({
                            error:                   true,
                            errorCountPasswordTaken: 1,
                            passwordTaken:           'Lösenordet är upptaget.',
                        })

                        passwordInput.setAttribute('aria-invalid', true);
                        
                    }
                }
            }

            if (!count) {
                this.setState({
                    errorCountPasswordTaken: 0,
                    passwordTaken:           '',
                })

                passwordPoints += 1;
            }
        }

        if (firstNameInput.value != '' && lastNameInput.value != '' && 
            emailInput.value != '' && phoneInput.value != '' && usernameInput.value
            != '' && passwordInput.value != '') {

            const validationResult = emailPoints + usernamePoints + passwordPoints;

            if (validationResult == 5) {
                return true;
            
            } else {
                return false;
            }
        }
    }

    handleLinkClick(e) {
        e.preventDefault();
        
        let action;
        let id;

        if (e.target.id.indexOf('edit') >= 0) {
            document.getElementById('admin-form').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            action = 'edit';
            id     = e.target.id.slice(4);

            localStorage.setItem('id', id);
            localStorage.setItem('actionUsers', action);

            const firstNameInput   = document.getElementById('user-first-name-input');
            const lastNameInput    = document.getElementById('user-last-name-input');
            const emailInput       = document.getElementById('user-email-input');
            const phoneInput       = document.getElementById('user-phone-input');
            const usernameInput    = document.getElementById('username-input');
            const passwordInput    = document.getElementById('password-input');
            const userRoleInput    = document.getElementById('user-role-input');
            const userBlockedInput = document.getElementById('user-blocked-input');

            this.props.users.forEach((user) => {
                if (user.id == id) {
                    firstNameInput.value   = user.firstName;
                    lastNameInput.value    = user.lastName;
                    emailInput.value       = user.email;
                    phoneInput.value       = user.phone;
                    usernameInput.value    = user.username;
                    passwordInput.value    = user.password;
                    userRoleInput.value    = user.userRole;

                    if (user.blocked) {
                        userBlockedInput.value = 'Ja';
                    
                    } else {
                        userBlockedInput.value = 'Nej';
                    }

                    oldUsername = user.username;
                    oldPassword = user.password;
                }
            })

            firstNameInput.focus();
        
        } else if (e.target.id.indexOf('delete') >= 0) {
            document.getElementById('reset-btn').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            action = 'delete';
            id     = e.target.id.slice(6);
        
        }

        if (action == 'delete') {
            this.props.delete(id);
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validateForm()) {
            let date        = new Date().toLocaleDateString('sv-SE', {timeZone: 'CET'});
            let userRole    = document.getElementById('user-role-input');
            let userBlocked = document.getElementById('user-blocked-input');
            let blocked;

            if (userBlocked.value == 'Ja') {
                blocked = true;
            
            } else if (userBlocked.value == 'Nej') {
                blocked = false;
            }

            if (!localStorage.getItem('actionUsers')) {
                const body = {
                    id:        0,
                    firstName: this.state.firstName,
                    lastName:  this.state.lastName,
                    email:     this.state.email,
                    phone:     this.state.phone,
                    username:  this.state.username,
                    password:  this.state.password,
                    userRole:  userRole.value,
                    blocked:   blocked,
                    updated:   date
                }

                this.props.post(body);
            }

            if (localStorage.getItem('actionUsers') == 'edit') {
                const firstNameInput = document.getElementById('user-first-name-input');
                const lastNameInput  = document.getElementById('user-last-name-input');
                const emailInput     = document.getElementById('user-email-input');
                const phoneInput     = document.getElementById('user-phone-input');
                const usernameInput  = document.getElementById('username-input');
                const passwordInput  = document.getElementById('password-input');

                const body = {
                    id:        localStorage.getItem('id'),
                    firstName: firstNameInput.value,
                    lastName:  lastNameInput.value,
                    email:     emailInput.value,
                    phone:     phoneInput.value,
                    username:  usernameInput.value,
                    password:  passwordInput.value,
                    userRole:  userRole.value,
                    blocked:   blocked,
                    updated:   date
                }

                this.props.put(localStorage.getItem('id'), body);
            }
        }

        this.form.current.reset();
        document.getElementById('reset-btn').scrollIntoView({behavior: 'smooth'});
    }
}

// Exporterar komponenten
export default Users;