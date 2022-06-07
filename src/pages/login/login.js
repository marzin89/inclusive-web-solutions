// Imports
import React from 'react';
import {Link} from 'react-router-dom';

// Inloggning
class Login extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState             = this.setState.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.validateUsername     = this.validateUsername.bind(this);
        this.validatePassword     = this.validatePassword.bind(this);
        this.validateForm         = this.validateForm.bind(this);
        this.handleSubmit         = this.handleSubmit.bind(this);

        this.state = {
            username:        '',
            password:        '',
            error:           false,
            userError:       '',
            passwordError:   '',
            validationError: this.props.validationError,
            serverError:     this.props.serverError,
        }
    }

    // Rendrering
    render() {
        return(
            <main id="main">
                <div className="row">
                    {/* Länkstig */}
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb focus" to={"/"}>Start</Link>/</li>
                            <li><Link className="active-breadcrumb focus" to={"/login"}> Logga in</Link></li>
                        </ul>
                    </nav>
                </div>
                <h1>Logga in</h1>
                {/* Formulär */}
                <form id="login-form">  
                    <p id="login-text">Fält märkta med * är obligatoriska.</p>
                    <div className="row">
                        <div className="form-left">
                            {/* Användarnamn. Värdet lagras i state vid inmatning. */}
                            <label htmlFor="login-username">Användarnamn *</label>
                            <input id="login-username" className="focus text-input text-input-main" type="text" 
                                aria-required="true" onChange={this.handleUsernameChange}
                                onBlur={this.validateUsername}></input>
                            {/* Felmeddelandet visas om användaren inte har angett ett användarnamn 
                                (state.error: true) */ }
                            <p style={this.state.userError != '' ? {display: 'block'} : {display: 'none'}} 
                                className="error" role="alert">{this.state.userError}</p>
                        </div>
                        <div className="form-right">
                            {/* Lösenord. Värdet lagras i state vid inmatning. */}
                            <label htmlFor="login-password" className="text">Lösenord *</label>
                            <input id="login-password" className="focus text-input text-input-main" type="password" 
                                aria-required="true" onChange={this.handlePasswordChange}
                                onBlur={this.validatePassword}></input>
                            {/* Felmeddelandet visas om användaren inte har angett ett lösenord 
                                (state.error: true) */ }
                            <p className="error" role="alert" style={this.state.passwordError != '' ? 
                                {display: 'block'} : {display: 'none'}}>{this.state.passwordError}</p>
                            <p className="error" role="alert" style={this.props.validationError != '' ? 
                                {display: 'block'} : {display: 'none'}}>{this.props.validationError}</p>
                        </div>
                    </div>
                    <div className="row">
                        <button type="reset" className="reset-btn focus">Rensa</button>
                        <button type="submit" className="submit-btn focus" onClick={this.handleSubmit}>
                            Logga in</button>
                        <p style={this.props.serverError != '' ? {display: 'block'} : {display: 'none'}} 
                            className="error" role="alert">{this.props.serverError}</p>
                    </div>
                </form>
            </main>
        )
    }

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Logga in');
        localStorage.setItem('pageGerman', 'Logga in');
        document.title = 'Logga in';
    }

    // Lagrar användarnamnet i state
    handleUsernameChange(e) {
        this.setState({
            error:     false,
            userError: '',
            username:  e.target.value,
        })
    }

    // Lagrar användarnamnet i state
    handlePasswordChange(e) {
        this.setState({
            error:         false,
            passwordError: '',
            password:      e.target.value,
        })
    }

    validateUsername(e) {
        if (!e.target.value) {
            if (!this.state.username) {
                this.setState({
                    error:     true,
                    userError: 'Du måste ange ditt användarnamn.'
                })
            }
        }
    }

    validatePassword(e) {
        if (!e.target.value) {
            if (!this.state.password) {
                this.setState({
                    error:         true,
                    passwordError: 'Du måste ange ditt lösenord.',
                })
            }
        }
    }

    validateForm() {
        if (!this.state.username) {
            this.setState({
                error:     true,
                userError: 'Du måste ange ditt användarnamn.'
            })
        }

        if (!this.state.password) {
            this.setState({
                error:         true,
                passwordError: 'Du måste ange ditt lösenord.',
            })
        }
    }

    // Validering, körs när formuläret skickas
    handleSubmit(e) {

        // Förhindrar att sidan laddas om
        e.preventDefault();
        this.validateForm();

        // Här kontrolleras uppgifterna
        if (this.state.username && this.state.password) {

            // Body till POST-anropet
            const body = {
                username: this.state.username,
                password: this.state.password,
            }

            this.props.function(body);
        }
    }
}

// Exporterar komponenten
export default Login;