import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { userActions } from '../../store/slices/user-slice';

function Login() {
    const usernameRef                       = useRef();
    const passwordRef                       = useRef();
    const [errorCount, setErrorCount]       = useState(0);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorMessage, setErrorMessage]   = useState('');
    const dispatch = useDispatch();

    function validateForm() {
        setUsernameError(usernameRef.current.value ? '' : 'Du måste ange ditt användarnamn.');
        setErrorCount(usernameRef.current.value ? 0 : 1);
        setPasswordError(passwordRef.current.value ? '' : 'Du måste ange ditt lösenord.');
        setErrorCount((prev) => passwordRef.current.value ? prev : prev + 1);
    }

    function handleSubmit(e) {
        e.preventDefault();
        validateForm();

        if (!errorCount) {
            const body = {
                username: usernameRef.current.value,
                password: usernameRef.current.value,
            }

            login(body);
        }
    }

    function login(body) {
        fetch('https://iws-rest-api.herokuapp.com/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
        .then(response => {
            setErrorMessage(response.status == 404 ? 'Fel användarnamn eller lösenord.' : '');
            const data = response.json();
            dispatch(userActions.login(data));
        })
        .catch(() => {
            setErrorMessage('Ett serverfel har uppstått. Det gick inte att logga in.' 
                + 'Försök igen lite senare.');
        })
    }

    useEffect(() => {
        document.title = 'Logga in';
    });

    return(
        <main>
            <div className="row">
                {/* Länkstig */}
                <nav className="breadcrumbs" aria-label="Länkstig">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus" to={"/"}>Start</Link>/</li>
                        <li><Link className="active-breadcrumb focus" to={"/login"}> Logga in</Link></li>
                    </ul>
                </nav>
            </div>
            <h1 id="main">Logga in</h1>
            {/* Formulär */}
            <form id="login-form" onSubmit={(e) => handleSubmit(e)}>  
                <p id="login-text">Fält märkta med * är obligatoriska.</p>
                {errorCount > 0 ? <p className="text h2-error h3-font-size" role="alert">
                    Formuläret innehåller {errorCount} fel</p> : null}
                <div className="row">
                    <div className="form-left">
                        {/* Användarnamn */}
                        <label htmlFor="login-username">Användarnamn *</label>
                        <input id="login-username" className="focus text-input text-input-main" 
                            type="text" aria-required="true" aria-describedby="login-username-error" 
                                autoComplete="username" ref={usernameRef}></input>
                        {/* Felmeddelandet visas om användaren inte har angett ett användarnamn */}
                        {usernameError ? <p id="login-username-error" className="error" 
                            role="alert" aria-invalid="true">{usernameError}</p> : null}
                    </div>
                    <div className="form-right">
                        {/* Lösenord */}
                        <label htmlFor="login-password" className="text">Lösenord *</label>
                        <input id="login-password" className="focus text-input text-input-main" 
                            type="password" aria-required="true" aria-describedby="login-password-error" 
                                autoComplete="new-password" ref={passwordRef}>
                        </input>
                        {/* Felmeddelandet visas om användaren inte har angett ett lösenord */}
                        {passwordError ? <p id="login-password-error" className="error" role="alert"
                            aria-invalid="true">{passwordError}</p> : null}
                        {errorMessage ? <p className="error" role="alert">{errorMessage}</p> : null}
                    </div>
                </div>
                <div className="row">
                    <button type="reset" className="reset-btn focus">Rensa</button>
                    <button type="submit" className="submit-btn focus">Logga in</button>
                    {errorMessage ? <p className="error" role="alert">{errorMessage}</p> : null}
                </div>
            </form>
        </main>
    );
}

export default Login;