// Imports
import { toBeInTheDocument, toContainHTML } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import { findAllInRenderedTree } from 'react-dom/test-utils';
import {Link} from 'react-router-dom';

let oldUsername;
let oldPassword;

// Formulär för hantering av användare
class Users extends React.Component { 
    
    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState                = this.setState.bind(this);
        this.handleFirstNameChange   = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange    = this.handleLastNameChange.bind(this);
        this.handleEmailChange       = this.handleEmailChange.bind(this);
        this.handlePhoneChange       = this.handlePhoneChange.bind(this);
        this.handleUsernameChange    = this.handleUsernameChange.bind(this);
        this.handlePasswordChange    = this.handlePasswordChange.bind(this);
        this.handleUserRoleChange    = this.handleUserRoleChange.bind(this);
        this.handleUserBlockedChange = this.handleUserBlockedChange.bind(this);
        this.validateFirstName       = this.validateFirstName.bind(this);
        this.validateLastName        = this.validateLastName.bind(this);
        this.validateEmail           = this.validateEmail.bind(this);
        this.validatePhone           = this.validatePhone.bind(this);
        this.validateUsername        = this.validateUsername.bind(this);
        this.validatePassword        = this.validatePassword.bind(this);
        this.handleLinkClick         = this.handleLinkClick.bind(this);
        this.handleSubmit            = this.handleSubmit.bind(this);
        this.validateForm            = this.validateForm.bind(this);

        // Här lagras användaruppgifter, fel- och bekräftelsemeddelanden
        this.state = {
            users:            this.props.users,
            firstName:        '',
            lastName:         '',
            email:            '',
            phone:            '',
            username:         '',
            password:         '',
            userRole:         '',
            blocked:          '',
            error:            false,
            errorUsers:       this.props.errorUsers,
            confirm:          false,
            confirmUsers:     this.props.confirmUsers,
            firstNameEmpty:   '',
            lastNameEmpty:    '',
            emailEmpty:       '',
            emailInvalid:     '',
            phoneEmpty:       '',
            usernameEmpty:    '',
            usernameTaken:    '',
            passwordEmpty:    '',
            passwordTooShort: '',
            passwordInsecure: '',
            passwordTaken:    '',
        }
    }
    
    // Rendrering
    render() {
        return (
            <div className="admin-form">
                <section id="admin-form">
                    <h2 className="h2-admin">Användare</h2>
                    <form>
                        <p>Fält märkta med * är obligatoriska.</p>
                        <div className="row">
                            {/* Förnamn */}
                            <div className="form-left">
                                <label htmlFor="user-first-name-input">Förnamn *</label>
                                <input id="user-first-name-input" className="focus text-input-main" type="text" 
                                    aria-required="true" onChange={this.handleFirstNameChange}
                                    onBlur={this.validateFirstName}></input>
                                {/* Här skrivs ett felmeddelande ut om inget förnamn har angetts */}
                                <p className="error empty" role="alert" style={this.state.firstNameEmpty ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.firstNameEmpty}</p>
                            </div>
                            {/* Förnamn */}
                            <div className="form-right">
                                <label htmlFor="user-last-name-input">Efternamn *</label>
                                <input id="user-last-name-input" className="focus text-input-main" type="text" 
                                    aria-required="true" onChange={this.handleLastNameChange}
                                    onBlur={this.validateLastName}></input>
                                {/* Här skrivs ett felmeddelande ut om inget efternamn har angetts */}
                                <p className="error empty" role="alert" style={this.state.lastNameEmpty ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.lastNameEmpty}</p>
                            </div>
                        </div>
                        <div className="row">
                            {/* E-post */}
                            <div className="form-left">
                                <label htmlFor="user-email-input">E-post *</label>
                                <input id="user-email-input" className="focus text-input-main" type="email" 
                                    aria-required="true" onChange={this.handleEmailChange}
                                    onBlur={this.validateEmail}></input>
                                {/* Här skrivs ett felmeddelande ut om ingen e-postadress har angetts */}
                                <p className="error empty" role="alert" style={this.state.emailEmpty ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.emailEmpty}</p>
                                {/* Här skrivs ett felmeddelande om e-postadressen är ogiltig */}
                                <p className="error" role="alert" style={this.state.emailInvalid ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.emailInvalid}</p>
                            </div>
                            {/* Telefon */}
                            <div className="form-right">
                                <label htmlFor="user-phone-input">Telefon *</label>
                                <input id="user-phone-input" className="focus text-input-main" type="tel" 
                                    aria-required="true" onChange={this.handlePhoneChange}
                                    onBlur={this.validatePhone}></input>
                                {/* Här skrivs ett felmeddelande ut om inget telefonnummer har angetts */}
                                <p className="error empty" role="alert" style={this.state.phoneEmpty ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.phoneEmpty}</p>
                            </div>
                        </div>
                        <div className="row">
                            {/* Användarnamn */}
                            <div className="form-left">
                                <label htmlFor="username-input">Användarnamn *</label>
                                <input id="username-input" className="focus text-input-main" type="text" 
                                    aria-required="true" onChange={this.handleUsernameChange}
                                    onBlur={this.validateUsername}></input>
                                {/* Här skrivs ett felmeddelande ut om inget användarnamn har angetts */}
                                <p className="error emtpy" role="alert" style={this.state.usernameEmpty ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.usernameEmpty}</p>
                                {/* Här skrivs ett felmeddelande ut om användarnamnet är upptaget */}
                                <p className="error" role="alert" style={this.state.usernameTaken ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.usernameTaken}</p>
                            </div>
                            {/* Lösenord */}
                            <div className="form-right">
                                <label htmlFor="password-input">Lösenord *</label>
                                <input id="password-input" className="focus text-input-main" type="password" 
                                    aria-required="true" onChange={this.handlePasswordChange}
                                    onBlur={this.validatePassword}></input>
                                {/* Här skrivs ett felmeddelande ut om inget lösenord har angetts */}
                                <p className="error empty" role="alert" style={this.state.passwordEmpty ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.passwordEmpty}</p>
                                {/* Här skrivs ett felmeddelande ut om lösenordet är för kort */}
                                <p className="error" role="alert" style={this.state.passwordTooShort ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.passwordTooShort}</p>
                                {/* Här skrivs ett felmeddelande ut om lösenordet är osäkert */}
                                <p className="error" role="alert" style={this.state.passwordInsecure ? 
                                    {display: 'block'} : {display: 'none'}}>{this.state.passwordInsecure}</p>
                                {/* Här skrivs ett felmeddelande ut om lösenordet är upptaget */}
                                <p className="error" role="alert" style={this.state.passwordTaken ? 
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
                        <button type="reset" className="reset-btn">Rensa</button>
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
                                            href="#admin-form" onClick={this.handleLinkClick}>Redigera</a></td>
                                        <td className="delete-users"><Link id={`delete${user.id}`} className="focus" 
                                            to={"/admin"} onClick={this.handleLinkClick}>Radera</Link></td>
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
            error:          false,
            firstNameEmpty: '',
            firstName:      e.target.value,
        })

        localStorage.removeItem('error');
    }

    handleLastNameChange(e) {
        this.setState({
            error:         false,
            lastNameEmpty: '',
            lastName:       e.target.value,
        })

        localStorage.removeItem('error');
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
            error:      false,
            phoneEmpty: '',
            phone:      e.target.value,
        })

        localStorage.removeItem('error');
    }

    handleUsernameChange(e) {
        this.setState({
            error:         false,
            usernameEmpty: '',
            usernameTaken: '',
            username:      e.target.value,
        })

        localStorage.removeItem('error');
    }

    handlePasswordChange(e) {
        this.setState({
            error:            false,
            passwordEmpty:    '',
            passwordTaken:    '',
            passwordTooShort: '',
            passwordInsecure: '',
            password:         e.target.value,
        })

        localStorage.removeItem('error');
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

    validateFirstName(e) {
        if (!e.target.value) {
            this.setState({
                error:          true, 
                firstNameEmpty: 'Du måste ange ett förnamn.',
            })

            localStorage.setItem('error', true);
        }
    }

    validateLastName(e) {
        if (!e.target.value) {
            this.setState({
                error:         true, 
                lastNameEmpty: 'Du måste ange ett efternamn.',
            })

            localStorage.setItem('error', true);
        }
    }
    
    validateEmail(e) {
        if (!e.target.value) {
            this.setState({
                error:        true, 
                emailEmpty:   'Du måste ange en e-postadress.',
                emailInvalid: '',
                email:        '',
            })
    
            localStorage.setItem('error', true);
        
        } else {
            if (e.target.value.indexOf('@') < 0) {
                this.setState({
                    error:        true,
                    emailEmpty:   '',
                    emailInvalid: 'Ange en giltig e-postadress.',
                    email:        '',
                })
    
                localStorage.setItem('error', true);
            }
        }
    }

    validatePhone(e) {
        if (!e.target.value) {
            this.setState({
                error:      true, 
                phoneEmpty: 'Du måste ange ett telefonnummer.',
            })

            localStorage.setItem('error', true);
        }
    }

    validateUsername(e) {
        if (!e.target.value) {
            this.setState({
                error:      true, 
                usernameEmpty: 'Du måste ange ett användarnamn.',
                usernameTaken: '',
            })

            localStorage.setItem('error', true);
        
        } else {
            if (!localStorage.getItem('action')) {
                this.props.users.forEach((user) => {
                    if (user.username == e.target.value) {
                        this.setState({
                            error:         true,
                            usernameEmpty: '',
                            usernameTaken: 'Användarnamnet är upptaget.',
                            username:      '',
                        })
    
                        localStorage.setItem('error', true);
                    }
                })
            
            } else if (localStorage.getItem('action') == 'edit') {
                this.props.users.forEach((user) => {
                    if (user.username == e.target.value &&
                        e.target.value !== oldUsername) {

                        this.setState({
                            error:         true,
                            usernameEmpty: '',
                            usernameTaken: 'Användarnamnet är upptaget.',
                            username:      '',
                        })

                        localStorage.setItem('error', true);
                    }
                })
            }   
        }
    }

    validatePassword(e) {
        if (!e.target.value) {
            this.setState({
                error:            true, 
                passwordEmpty:    'Du måste ange ett lösenord.',
                passwordTaken:    '',
                passwordTooShort: '',
                passwordInsecure: '',
            })
    
            localStorage.setItem('error', true);
        
        } else {
            const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");

            if (!pattern.test(e.target.value)) {
                this.setState({
                    error:            true,
                    passwordEmpty:    '',
                    passwordInsecure: 'Lösenordet måste innehålla versaler, gemener och siffror.',
                })

                localStorage.setItem('error', true);
            
            }

            if (e.target.value.length < 10) {
                this.setState({
                    error:            true,
                    passwordEmpty:    '',
                    passwordTooShort: 'Lösenordet måste vara minst 10 tecken långt.',
                })
    
                localStorage.setItem('error', true);
            }

            if (!localStorage.getItem('action')) {
                for (let i = 0; i < this.state.users.length; i++) {
                    if (this.state.users[i].password == e.target.value) {
                        this.setState({
                            error:         true,
                            passwordTaken: 'Lösenordet är upptaget.',
                            password:       '',
                        })
        
                        localStorage.setItem('error', true);
                    }
                }
            
            } else if (localStorage.getItem('action') == 'edit') {
                for (let i = 0; i < this.state.users.length; i++) {
                    if (this.state.users[i].password == e.target.value &&
                        e.target.value !== oldPassword) {
                        alert(i);

                        this.setState({
                            error:         true,
                            passwordTaken: 'Lösenordet är upptaget.',
                            password:       '',
                        })

                        localStorage.setItem('error', true);
                    }
                }
            }
        }
    }

    validateForm(e) {
        const firstNameInput = document.getElementById('user-first-name-input');
        const lastNameInput  = document.getElementById('user-last-name-input');
        const emailInput     = document.getElementById('user-email-input');
        const phoneInput     = document.getElementById('user-phone-input');
        const usernameInput  = document.getElementById('username-input');
        const passwordInput  = document.getElementById('password-input');

        if (!firstNameInput.value) {
            this.setState({
                error:          true, 
                firstNameEmpty: 'Du måste ange ett förnamn.',
            })

            localStorage.setItem('error', true);
        }

        if (!lastNameInput.value) {
            this.setState({
                error:         true, 
                lastNameEmpty: 'Du måste ange ett efternamn.',
            })

            localStorage.setItem('error', true);
        }

        if (!emailInput.value) {
            this.setState({
                error:        true, 
                emailEmpty:   'Du måste ange en e-postadress.',
                emailInvalid: '',
                email:        '',
            })
    
            localStorage.setItem('error', true);
        
        } else {
            if (emailInput.value.indexOf('@') < 0) {
                this.setState({
                    error:        true,
                    emailEmpty:   '',
                    emailInvalid: 'Ange en giltig e-postadress.',
                    email:        '',
                })
    
                localStorage.setItem('error', true);
            }
        }

        if (!usernameInput.value) {
            this.setState({
                error:      true, 
                usernameEmpty: 'Du måste ange ett användarnamn.',
                usernameTaken: '',
            })

            localStorage.setItem('error', true);
        
        } else {
            if (!localStorage.getItem('action')) {
                this.props.users.forEach((user) => {
                    if (user.username == usernameInput.value) {
                        this.setState({
                            error:         true,
                            usernameEmpty: '',
                            usernameTaken: 'Användarnamnet är upptaget.',
                            username:      '',
                        })
    
                        localStorage.setItem('error', true);
                    }
                })
            
            } else if (localStorage.getItem('action') == 'edit') {
                this.props.users.forEach((user) => {
                    if (user.username == usernameInput.value &&
                        usernameInput.value !== oldUsername) {

                        this.setState({
                            error:         true,
                            usernameEmpty: '',
                            usernameTaken: 'Användarnamnet är upptaget.',
                            username:      '',
                        })

                        localStorage.setItem('error', true);
                    }
                })
            }   
        }

        if (!passwordInput.value) {
            this.setState({
                error:            true, 
                passwordEmpty:    'Du måste ange ett lösenord.',
                passwordTaken:    '',
                passwordTooShort: '',
                passwordInsecure: '',
            })
    
            localStorage.setItem('error', true);
        
        } else {
            const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");

            if (!pattern.test(passwordInput.value)) {
                this.setState({
                    error:            true,
                    passwordEmpty:    '',
                    passwordInsecure: 'Lösenordet måste innehålla versaler, gemener och siffror.',
                })

                localStorage.setItem('error', true);
            
            }

            if (passwordInput.value.length < 10) {
                this.setState({
                    error:            true,
                    passwordEmpty:    '',
                    passwordTooShort: 'Lösenordet måste vara minst 10 tecken långt.',
                })
    
                localStorage.setItem('error', true);
            }

            if (!localStorage.getItem('action')) {
                for (let i = 0; i < this.state.users.length; i++) {
                    if (this.state.users[i].password == passwordInput.value) {
                        this.setState({
                            error:         true,
                            passwordTaken: 'Lösenordet är upptaget.',
                            password:       '',
                        })
        
                        localStorage.setItem('error', true);
                    }
                }
            
            } else if (localStorage.getItem('action') == 'edit') {
                for (let i = 0; i < this.state.users.length; i++) {
                    if (this.state.users[i].password == passwordInput.value &&
                        passwordInput.value !== oldPassword) {
                        alert(i);

                        this.setState({
                            error:         true,
                            passwordTaken: 'Lösenordet är upptaget.',
                            password:       '',
                        })

                        localStorage.setItem('error', true);
                    }
                }
            }
        }
    }

    handleLinkClick(e) {
        let action;
        let id;

        if (e.target.id.indexOf('edit') >= 0) {
            action = 'edit';
            id     = e.target.id.slice(4);

            localStorage.setItem('id', id);
            localStorage.setItem('action', action);

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
        
        } else if (e.target.id.indexOf('delete') >= 0) {
            action = 'delete';
            id     = e.target.id.slice(6);
        
        }

        if (action == 'delete') {
            this.props.delete(id);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.validateForm(e);

        if (!localStorage.getItem('error')) {
            let date        = new Date().toLocaleDateString('sv-SE', {timeZone: 'CET'});
            let userRole    = document.getElementById('user-role-input');
            let userBlocked = document.getElementById('user-blocked-input');
            let blocked;

            if (userBlocked.value == 'Ja') {
                blocked = true;
            
            } else if (userBlocked.value == 'Nej') {
                blocked = false;
            }

            if (!localStorage.getItem('action')) {
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

            if (localStorage.getItem('action') == 'edit') {
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
    }
}

// Exporterar komponenten
export default Users;