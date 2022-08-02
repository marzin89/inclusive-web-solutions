// Imports
import React from 'react';

class CommentFormSwedish extends React.Component {
    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState                         = this.setState.bind(this);
        this.getPost                          = this.getPost.bind(this);
        this.handleCommentChange              = this.handleCommentChange.bind(this);
        this.handleEmailChange                = this.handleEmailChange.bind(this);
        this.handleSignatureChange            = this.handleSignatureChange.bind(this);
        this.handleConsentChange              = this.handleConsentChange.bind(this);
        this.validateComment                  = this.validateComment.bind(this);
        this.validateEmail                    = this.validateEmail.bind(this);
        this.validateSignature                = this.validateSignature.bind(this);
        this.validateConsent                  = this.validateConsent.bind(this);
        this.validateForm                     = this.validateForm.bind(this);
        this.handleSubmit                     = this.handleSubmit.bind(this);
        this.addComment                       = this.addComment.bind(this);

        this.state = {
            content:                '',
            email:                  '',
            signature:              '',
            consent:                false,
            error:                  false,
            errorCountComment:      0,
            errorCountEmailEmpty:   0,
            errorCountEmailInvalid: 0,
            errorCountSignature:    0,
            errorCountConsent:      0,
            errorMessage:           '',
            commentEmpty:           '',
            emailEmpty:             '',
            emailInvalid:           '',
            signatureEmpty:         '',
            consentEmpty:           '',
            confirmMessage:         '',
        }

        this.getPost();
    }

    render() {
        return (
            <section id="comment-form">
                <h2 className="h2-font-size">Skriv en kommentar</h2>
                <p className="regular-font-size">Fält märkta med * är obligatoriska.</p>
                <p style={this.state.error ? {display: 'block'} : {display: 'none'}} 
                    className="h2-error h3-font-size" role="alert">
                    Formuläret innehåller {this.state.errorCountComment + this.state.errorCountEmailEmpty 
                        + this.state.errorCountEmailInvalid + this.state.errorCountSignature + 
                        this.state.errorCountConsent} fel</p>
                <form>
                    {/* Kommentar */}
                    <label htmlFor="comment" className="h3-font-size">Kommentar *</label>
                    <textarea id="comment" className="focus focus-invisible-input regular-font-size" name="comment"
                        aria-required="true" aria-describedby="comment-empty" autoComplete='on'
                        onChange={this.handleCommentChange} onBlur={this.validateComment}></textarea>
                    {/* Här skrivs ett felmeddelande om användaren inte har skrivit någon kommentar */}
                    <p id="comment-empty" className="regular-font-size error" role="alert" 
                            style={this.state.commentEmpty ? {display: 'block'} : {display: 'none'}}>
                                {this.state.commentEmpty}</p>
                    <div className="row">
                        {/* E-post */}
                        <div className="form-left" onBlur={this.validateEmail}>
                            <label htmlFor="email" className="h3-font-size">E-post *</label>
                            <input id="email" className="focus focus-invisible-input text-input text-input-main regular-font-size" 
                                name="email" type="email" aria-required="true" aria-describedby="email-empty email-invalid" 
                                autoComplete='email' onChange={this.handleEmailChange}></input>
                            {/* Här skrivs ett felmeddelande ut om ingen e-postadress har angetts */}
                            <p id="email-empty" className="regular-font-size error" role="alert" 
                                style={this.state.emailEmpty ? {display: 'block'} : {display: 'none'}}>
                                    {this.state.emailEmpty}</p>
                            {/* Här skrivs ett felmeddelande om e-postadressen är ogiltig */}
                            <p id="email-invalid" className="regular-font-size error" role="alert" 
                                style={this.state.emailInvalid ? {display: 'block'} : {display: 'none'}}>
                                    {this.state.emailInvalid}</p>
                        </div>
                        {/* Signatur */}
                        <div className="form-right" onBlur={this.validateSignature}>
                            <label htmlFor="signature" className="h3-font-size">Signatur *</label>
                            <input id="signature" className="focus focus-invisible-input text-input text-input-main regular-font-size" 
                                name="phone" type="text" aria-required="true" aria-describedby="signature-empty"
                                autoComplete='on' onChange={this.handleSignatureChange}></input>
                            <p id="signature-empty" className="error regular-font-size" role="alert" 
                                style={this.state.signatureEmpty ? {display: 'block'} : {display: 'none'}}>
                                    {this.state.signatureEmpty}</p>
                        </div>
                    </div>
                    {/* Samtycke */}
                    <p id="consent-heading" className="h3-font-size">Samtycke *</p>
                    <input id="consent" className="focus focus-invisible-input" type="checkbox" aria-required="true"
                        aria-describedby="consent-empty" onChange={this.handleConsentChange} 
                        onBlur={this.validateConsent}></input>  
                    <label id="consent-label" htmlFor="consent" className="regular-font-size">
                        Jag samtycker till att mina personuppgifter behandlas i enlighet med IWS 
                        <a className="focus focus-invisible regular-font-size" href=""> integritetspolicy</a> 
                        <b className="regular-font-size"></b></label>
                    {/* Här skrivs ett felmeddelande om användaren inte har samtyckt */}
                    <p id="consent-empty" className="regular-font-size error" role="alert" 
                        style={this.state.consentEmpty ? {display: 'block'} : {display: 'none'}}>
                            {this.state.consentEmpty}</p>
                    <div className="row">
                        <button type="reset" className="reset-btn focus focus-invisible regular-font-size">
                            Rensa</button>
                        <button type="submit" className="submit-btn focus focus-invisible regular-font-size" 
                            onClick={this.handleSubmit}>Skicka</button>
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

    handleCommentChange(e) {
        this.setState({
            error:   false,
            content: e.target.value,
        })

        if (e.target.value) {
            this.setState({
                errorCountComment: 0,
                commentEmpty:      '',
            })

            e.target.setAttribute('aria-invalid', false);
        }
    }

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
                })

                this.setState({
                    emailInvalid: 'Ange en giltig e-postadress.',
                })
    
                e.target.setAttribute('aria-invalid', true);
            }
        
        } else {
            this.setState({
                errorCountEmailEmpty:   1,
                errorCountEmailInvalid: 0,
                emailInvalid:           '',
            })

            this.setState({
                emailInvalid: 'Du måste ange din e-postadress.',
            })

            e.target.setAttribute('aria-invalid', true);
        }
    }

    handleSignatureChange(e) {
        this.setState({
            error:     false,
            signature: e.target.value,
        })

        if (e.target.value) {
            this.setState({
                errorCountSignature: 0,
                signatureEmpty:      '',
                signature:      e.target.value,
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

    validateComment(e) {
        if (!e.target.value) {
            this.setState({
                errorCountComment: 1,
                commentEmpty:      'Du måste skriva en kommentar.',
            })

            localStorage.setItem('error', true);
            e.target.setAttribute('aria-invalid', true);
        }
    }

    validateEmail(e) {
        if (!e.target.value) {
            this.setState({
                errorCountEmailEmpty:   1,
                errorCountEmailInvalid: 0,
                emailEmpty:             'Du måste ange din e-postadress.',
                emailInvalid:           '',
                email:                  '',
            })

            e.target.setAttribute('aria-invalid', true);
            localStorage.setItem('error', true);
        
        } else {
            if (e.target.value.indexOf('@') < 1) {
                this.setState({
                    errorCountEmailEmpty:   0,
                    errorCountEmailInvalid: 1,
                    emailEmpty:   '',
                    emailInvalid: 'Ange en giltig e-postadress.',
                    email:        '',
                })

                e.target.setAttribute('aria-invalid', true);
                localStorage.setItem('error', true);
            }
        }
    }

    validateSignature(e) {
        if (!e.target.value) {
            this.setState({
                errorCountSignature: 1,
                signatureEmpty:      'Du måste ange en signatur.',
                signature:           '',
            })

            e.target.setAttribute('aria-invalid', true);
            localStorage.setItem('error', true)
        }
    }

    validateConsent(e) {
        if (!e.target.checked) {
            this.setState({
                errorCountConsent: 1,
                consentEmpty:      'Du måste samtycka till att IWS behandlar dina personuppgifter.',
            })

            e.target.setAttribute('aria-invalid', true);
            localStorage.setItem('error', true);
        }
    }

    validateForm() {
        const comment   = document.getElementById('comment');
        const email     = document.getElementById('email');
        const signature = document.getElementById('signature');
        const consent   = document.getElementById('consent');

        if (!comment.value) {
            this.setState({
                error:             true,
                errorCountComment: 1,
                commentEmpty:      'Du måste skriva en kommentar.',
            })

            comment.setAttribute('aria-invalid', true);
            localStorage.setItem('error', true);
        
        } else {
            this.setState({
                errorCountComment: 0,
                commentEmpty:      '',
            })

            comment.setAttribute('aria-invalid', false);
        }

        if (!email.value) {
            this.setState({
                error:                true,
                errorCountEmailEmpty: 1,
                emailEmpty:           'Du måste ange din e-postadress.',
                emailInvalid:         '',
                email:                '',
            })

            email.setAttribute('aria-invalid', true);
            localStorage.setItem('error', true);
        
        } else {
            if (email.value.indexOf('@') < 1) {
                this.setState({
                    error:                  true,
                    errorCountEmailEmpty:   0,
                    errorCountEmailInvalid: 1,
                    emailEmpty:             '',
                    emailInvalid:           'Ange en giltig e-postadress.',
                    email:                  '',
                })

                email.setAttribute('aria-invalid', true);
                localStorage.setItem('error', true);   
            
            } else {
                this.setState({
                    errorCountEmailEmpty:   0,
                    errorCountEmailInvalid: 0,
                    emailEmpty:             '',
                })

                email.setAttribute('aria-invalid', false);
            }
        }

        if (!signature.value) {
            this.setState({
                error:               true,
                errorCountSignature: 1,
                signatureEmpty:      'Du måste ange en signatur.',
                signature:           '',
            })

            signature.setAttribute('aria-invalid', true);
            localStorage.setItem('error', true)
        
        } else {
            this.setState({
                errorCountSignature: 0,
                signatureEmpty:      '',
            })

            signature.setAttribute('aria-invalid', false);
        }

        if (!consent.checked) {
            this.setState({
                error:             true,
                errorCountConsent: 1,
                consentEmpty:      'Du måste samtycka till att IWS behandlar dina personuppgifter.',
            })

            consent.setAttribute('aria-invalid', true);
            localStorage.setItem('error', true);
        
        } else {
            this.setState({
                errorCountConsent: 0,
                consentEmpty:      '',
            })

            consent.setAttribute('aria-invalid', false);
        }

        if (comment.value !== '' && email.value !== '' && signature.value !== ''
            && consent.checked) {

            if (email.value.indexOf('@') > 0) {
                this.setState({
                    error: false,
                })
    
                localStorage.removeItem('error');
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.validateForm();

        const comment   = document.getElementById('comment');
        const email     = document.getElementById('email');
        const signature = document.getElementById('signature');
        const consent   = document.getElementById('consent');

        if (!localStorage.getItem('error')) {
            let comments = this.props.comments;

            let id;
            let content = [];

            if (comment.value.indexOf('\n\n') >= 0) {
                content = comment.value.split("\n\n")
            
            } else {
                content.push(comment.value);
            }

            if (comments.length) {
                comments.sort((a, b) => {
                    return a.id - b.id;
                })

                id = comments[comments.length - 1].id + 1;
            
            } else {
                id = 1;
            }

            let date = new Date();
            let body;

            if (!localStorage.getItem('response')) {
                body = {
                    id:         id,
                    author:     signature.value,
                    email:      email.value,
                    content:    content,
                    postId:     localStorage.getItem('postId'),
                    postTitle:  localStorage.getItem('title'),
                    responses:  false,
                    published:  false,
                    responseTo: 0,
                    date:       date.toLocaleString(),
                    updated:    date.toLocaleString(),
                }
            
            } else {
                body = {
                    id:         id,
                    author:     signature.value,
                    email:      email.value,
                    content:    content,
                    postId:     localStorage.getItem('postId'),
                    postTitle:  localStorage.getItem('title'),
                    responses:  false,
                    published:  false,
                    responseTo: localStorage.getItem('commentId'),
                    date:       date.toLocaleString(),
                    updated:    date.toLocaleString(),
                }
            }
            
            this.addComment(body);
        }
    }

    addComment(body) {
        fetch('https://iws-rest-api.herokuapp.com/comments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
        .then(response => response.json())
        .then(() => {
            this.setState({
                confirmMessage: 'Din kommentar har skickats.',
            })

            setTimeout(() => window.location.reload(), 3000);
        })
        .catch(() => {
            this.setState({
                errorMessage: 'Ett serverfel har uppstått. ' +
                                'Det gick inte att skicka kommentaren. Försök igen senare.',
            })
        })

        localStorage.removeItem('response');
    }

    // Funktionen hämtar alla publicerade inlägg
    getPost() {
        let posts = localStorage.getItem('posts');
        posts     = JSON.parse(posts);

        posts.map((post) => {
            if (post.id == localStorage.getItem('postId')) {
                localStorage.setItem('title', post.title);
                localStorage.setItem('date', post.date);
                localStorage.setItem('content', JSON.stringify(post.content));
                localStorage.setItem('imageUrl', post.imageUrl);
                localStorage.setItem('altText', post.altText);
                localStorage.setItem('author', post.author);
                localStorage.setItem('published', post.published);
                localStorage.setItem('comments', post.comments);
                localStorage.setItem('postLanguage', post.language);
                localStorage.setItem('updated', post.updated);
            }
        })
    }
}

export default CommentFormSwedish;