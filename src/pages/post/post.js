// Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Inlägg
class Post extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState                         = this.setState.bind(this);
        this.getPost                          = this.getPost.bind(this);
        this.getComments                      = this.getComments.bind(this);
        this.renderNavbar                     = this.renderNavbar.bind(this);
        this.renderPost                       = this.renderPost.bind(this);
        this.renderMultipleParagraphs         = this.renderMultipleParagraphsAndImage.bind(this);
        this.renderMultipleParagraphsAndImage = this.renderMultipleParagraphsAndImage.bind(this);
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
        this.handleLogout                     = this.handleLogout.bind(this);
        this.handlePageTitle                  = this.handlePageTitle.bind(this);
        this.handleLinkClick                  = this.handleLinkClick.bind(this);

        this.state = {
            signedIn:       this.props.signedIn,
            comment:        '',
            email:          '',
            signature:      '',
            consent:        false,
            error:          false,
            commentEmpty:   '',
            emailEmpty:     '',
            emailInvalid:   '',
            signatureEmpty: '',
            consentEmpty:   '',
            confirm:        false,
        }

        // this.getPosts();
        this.getPost();
        // this.getComments();
    }

    // Rendrering
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
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/blog"}
                                onClick={this.handleLinkClick}> Blog</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/post"}
                                onClick={this.handleLinkClick}> {localStorage.getItem('title')}</Link></li>
                        </ul>
                    </nav>
                    :
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/"}
                                onClick={this.handleLinkClick}>Start</Link>/</li>
                            <li><Link className="inactive-breadcrumb text focus regular-font-size" to={"/blog"}
                                onClick={this.handleLinkClick}> Blogg</Link>/</li>
                            <li><Link className="active-breadcrumb text focus regular-font-size" to={"/post"}
                                onClick={this.handleLinkClick}>{localStorage.getItem('title')}</Link></li>
                        </ul>
                    </nav>
                    }
                    <p id="logout" style={this.props.signedIn ? {display: 'block'} :
                        {display: 'none'}}><Link className="text focus regular-font-size" to={"/login"} 
                        onClick={this.handleLinkClick}>Logga ut</Link></p>
                </div>   
                <section id="subpage">
                    <section id="subnav">
                        {this.renderNavbar()}
                    </section>
                    <div id="subpage-right">
                        <section id="subpage-content">
                            <h1 className="text h1-font-size">{localStorage.getItem('title')}</h1>
                            {this.renderPost()}
                            {/* this.renderMultipleParagraphsAndImage() */}
                            {/* this.renderMultipleParagraphs() */}
                        </section>               
                        {localStorage.getItem('language') == 'Deutsch' ?
                        <section id="comment-form">
                            <h2 className="text h2-font-size">Schreiben Sie einen Kommentar</h2>
                            <p className="text regular-font-size">Pflichtfelder sind mit * gekennzeichnet.</p>
                            <form>
                                {/* Kommentar */}
                                <label htmlFor="comment" className="text h3-font-size">Kommentar *</label>
                                <textarea id="comment" className="text focus regular-font-size" name="comment"
                                    aria-required="true" onChange={this.handleCommentChange} 
                                    onBlur={this.validateComment}></textarea>
                                {/* Här skrivs ett felmeddelande om användaren inte har skrivit någon kommentar */}
                                <p className="text regular-font-size error" role="alert" 
                                        style={this.state.commentEmpty ? {display: 'block'} : {display: 'none'}}>
                                            {this.state.commentEmpty}</p>
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
                                    {/* Signatur */}
                                    <div className="form-right">
                                        <label htmlFor="signature" className="text h3-font-size">Pseudonym *</label>
                                        <input id="signature" className="text focus text-input text-input-main regular-font-size" 
                                            name="phone" type="phone" aria-required="true" 
                                            onChange={this.handleSignatureChange} onBlur={this.validateSignature}></input>
                                        <p className="text regular-font-size error" role="alert" 
                                            style={this.state.signatureEmpty ? {display: 'block'} : {display: 'none'}}>
                                                {this.state.signatureEmpty}</p>
                                    </div>
                                </div>
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
                                    <button className="reset-btn text focus">Alle Felder löschen</button>
                                    <button className="submit-btn text focus" onClick={this.handleSubmit}>Senden</button>
                                    <p className="text error regular-font-size error" role="alert" 
                                        style={localStorage.getItem('errorGerman') != '' ? {display: 'block'} : 
                                        {display: 'none'}}>{localStorage.getItem('errorGerman')}</p>
                                    <p className="text error regular-font-size error" role="alert" 
                                        style={localStorage.getItem('errorSwedish') != '' ? {display: 'block'} : 
                                        {display: 'none'}}>{localStorage.getItem('errorSwedish')}</p>
                                    <p className="text confirm regular-font-size confirm" role="alert" 
                                        style={localStorage.getItem('confirmGerman') != '' ? {display: 'block'} : 
                                        {display: 'none'}}>{localStorage.getItem('confirmGerman')}</p>
                                    <p className="text confirm regular-font-size confirm" role="alert" 
                                        style={localStorage.getItem('confirmSwedish') != '' ? {display: 'block'} : 
                                        {display: 'none'}}>{localStorage.getItem('confirmSwedish')}</p>
                                </div>
                            </form>
                        </section>
                        :
                        <section id="comment-form">
                            <h2 className="text h2-font-size">Skriv en kommentar</h2>
                            <p className="text regular-font-size">Fält märkta med * är obligatoriska.</p>
                            <form>
                                {/* Kommentar */}
                                <label htmlFor="comment" className="text h3-font-size">Kommentar *</label>
                                <textarea id="comment" className="text focus regular-font-size" name="comment"
                                    aria-required="true" onChange={this.handleCommentChange} 
                                    onBlur={this.validateComment}></textarea>
                                {/* Här skrivs ett felmeddelande om användaren inte har skrivit någon kommentar */}
                                <p className="text regular-font-size error" role="alert" 
                                        style={this.state.commentEmpty ? {display: 'block'} : {display: 'none'}}>
                                            {this.state.commentEmpty}</p>
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
                                    {/* Signatur */}
                                    <div className="form-right">
                                        <label htmlFor="signature" className="text h3-font-size">Signatur *</label>
                                        <input id="signature" className="text focus text-input text-input-main regular-font-size" 
                                            name="phone" type="phone" aria-required="true" 
                                            onChange={this.handleSignatureChange} onBlur={this.validateSignature}></input>
                                        <p className="text regular-font-size error" role="alert" 
                                            style={this.state.signatureEmpty ? {display: 'block'} : {display: 'none'}}>
                                                {this.state.signatureEmpty}</p>
                                    </div>
                                </div>
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
                                    <button className="reset-btn text focus">Rensa</button>
                                    <button className="submit-btn text focus" onClick={this.handleSubmit}>Skicka</button>
                                    <p className="text regular-font-size error" role="alert" 
                                        style={localStorage.getItem('errorMessage') != '' ? {display: 'block'} : 
                                        {display: 'none'}}>{localStorage.getItem('errorMessage')}</p>
                                    <p className="text regular-font-size confirm" role="alert" 
                                        style={localStorage.getItem('confirmSwedish') != '' ? {display: 'block'} : 
                                        {display: 'none'}}>{localStorage.getItem('confirmSwedish')}</p>
                                </div>
                            </form>
                        </section>         
                        }
                        <section id="comment-section">
                            <h2 className="text h2-font-size">{localStorage.getItem('language') == 'Deutsch' ? 
                                'Kommentare' : 'Kommentarer'}</h2>
                            {localStorage.getItem('comments') ?
                            this.renderComments() :
                            <p className="error text regular-font-size">
                                {localStorage.getItem('language') == 'Deutsch' ?
                            'Schreiben Sie den ersten Kommentar' : 'Skriv den första kommentaren'}</p> }
                        </section>
                    </div>
                </section>
            </main>
        )
    }

    componentDidMount() {
        let title = localStorage.getItem('title');
        localStorage.setItem('pageSwedish', title);
        localStorage.setItem('pageGerman', title);
        document.title = title;

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

    // Funktionen hämtar alla publicerade inlägg
  getPosts() {
    /* GET-anrop till webbtjänsten */
    fetch('https://iws-rest-api.herokuapp.com/posts')

    // Konverterar svaret från JSON
    .then(response => response.json())

    // Skriver ut ett felmeddelande om inga inlägg hittades
    .then(data => {
        if (!data.length) {
            localStorage.setItem('errorPosts', 'Inga inlägg hittades.');

            this.setState({
                error:      true,
            })
        
        // Lagrar inläggen i state-arrayen
        } else {
            localStorage.removeItem('errorPosts');
            localStorage.setItem('posts', JSON.stringify(data));

            this.setState({
                error:      false,
                posts:      data,
            })
        }
    })

    // Skriver ut ett felmeddelande om ett serverfel har uppstått
    .catch(() => {
        localStorage.setItem('errorPosts', 'Ett serverfel har uppstått. Det gick inte att hämta inlägg.' 
            + 'Försök igen lite senare.');

        this.setState({             
            error:      true,
        })
    })
}

    renderPost() {
        let content = localStorage.getItem('content');
        content = JSON.parse(content);
        let content1 = content[0];
        let content2 = [];
        let image;

        if (content.length > 1) {
            for (let i = 1; i <= content.length; i++) {
                content2.push(
                    <p className="text body-text regular-font-size">{content[i]}</p>
                )
            }
        }

        if (localStorage.getItem('imageUrl')) {
            image = <img src={localStorage.getItem('imageUrl')} 
            alt={localStorage.getItem('altText')}></img>;

        } else {
            image = '';
        }

        let render;

        if (content2.length && image) {
            render = 
                <article>
                    <p className="date text small-font-size">{localStorage.getItem('date').slice(0, 10)}</p>
                    <p className="text body-text regular-font-size">{content1}</p>
                    {image}
                    {content2}
                    <p id="author" className="text regular-font-size">{localStorage.getItem('author')}</p>
                </article>
        
        } else if (content2.length && !image) {
            render = 
                <article>
                    <p className="date text small-font-size">{localStorage.getItem('date').slice(0, 10)}</p>
                    <p className="text body-text regular-font-size">{content1}</p>
                    {content2}
                    <p id="author" className="text regular-font-size">{localStorage.getItem('author')}</p>
                </article>
        
        } else if (!content2.length && image) {
            render = 
                <article>
                    <p className="date text small-font-size">{localStorage.getItem('date').slice(0, 10)}</p>
                    <p className="text body-text regular-font-size">{content1}</p>
                    {image}
                    <p id="author" className="text regular-font-size">{localStorage.getItem('author')}</p>
                </article>
        
        } else if (!content2.length && !image) {
            render = 
                <article>
                    <p className="date text small-font-size">{localStorage.getItem('date').slice(0, 10)}</p>
                    <p className="text body-text regular-font-size">{content1}</p>
                    <p id="author" className="text regular-font-size">{localStorage.getItem('author')}</p>
                </article>
        }

        return render;
    }

    renderMultipleParagraphsAndImage() {
        let content = localStorage.getItem('content');
        content = JSON.parse(content);
        let render;

        // if (content.length > 1 && localStorage.getItem('imageUrl')) {
            let content1 = content[0];
            let content2 = [];
            let image;

            if (localStorage.getItem('imageUrl')) {
                image = <img src={localStorage.getItem('imageUrl')} 
                alt={localStorage.getItem('altText')}></img>;
            
            } else {
                image = '';
            }

            for (let i = 1; i <= content.length; i++) {
                content2.push(<p className="text body-text regular-font-size">{content[i]}</p>);
            }

            render = 
                <article>
                    <p className="date text small-font-size">{localStorage.getItem('date').slice(0, 10)}</p>
                    <p className="text body-text regular-font-size">{content1}</p>
                    {image}
                    {content2}
                    <p id="author" className="text regular-font-size">{localStorage.getItem('author')}</p>
                </article>
            
            return render;
        // }
    }

    renderMultipleParagraphs() {
        let content = localStorage.getItem('content');
        content = JSON.parse(content);
        let render;

        if (content.length > 1 && !localStorage.getItem('imageUrl')) {
            let paragraphs = [];

            content.map((paragraph) => {
                paragraphs.push(<p className="text body-text regular-font-size">{paragraph}</p>);
            })

            render =
                <article>
                    <p className="date text small-font-size">{localStorage.getItem('date').slice(0, 10)}</p>
                    {paragraphs}
                    <p id="author" className="text regular-font-size">{localStorage.getItem('author')}</p>
                </article>
            
            return render;
        }
    }

    renderNavbar() {
        let posts = [];

        if (this.props.posts) {
            posts = this.props.posts;

        } else {
            posts = localStorage.getItem('posts');
            posts = JSON.parse(posts);
        }

        let links = [];

        posts.map((post) => {
            if (post.id == localStorage.getItem('postId')) {
                links.push(<li id="open-subpage"><Link id={`post${post.id}`}
                    className="text focus regular-font-size subnav-link open-subpage-link" 
                    to={'/post'} onClick={this.handleLinkClick}>{post.title}</Link></li>);
            
            } else {
                links.push(<li><Link id={`post${post.id}`} className="text focus regular-font-size subnav-link" 
                    to={'/post'} onClick={this.handleLinkClick}>{post.title}</Link></li>);
            }
        })


        let navbar =
            <nav aria-label={localStorage.getItem('language') == 'Deutsch' ?
                "Unternavigation mit Posts" : "Undermeny med befintliga blogginlägg"}>
                <ul>
                    <li id="subnav-first-item"><Link className="text focus regular-font-size" to={'/blog'}>
                        {localStorage.getItem('language') == 'Deutsch' ? 'Blog' : 'Blogg'}</Link></li>
                    {links}
                </ul>
            </nav>


        return navbar;
    }

    renderComments() {
        let comments = [];

        this.props.comments.map((comment) => {
            if (comment.postId == localStorage.getItem('postId')) {
                comments.push(comment);
            }
        });

        let render = [];

        if (comments.length) {
            comments.map((comment) => {
                render.push(
                    <article key={comment.id}>
                        <h3 className="text h3-font-size">{comment.author}</h3>
                        <p className="text date small-font-size">{comment.date.slice(0, 10)}</p>
                        <p className="text regular-font-size">{comment.content}</p>
                        <p className="respond"><a id={`comment${comment.id}`} 
                            className="text focus respond-link regular-font-size" 
                            href="#subpage-content" onClick={this.handleLinkClick}>
                            {localStorage.getItem('language') == 'Deutsch' ? 'Antworten' : 'Svara'}
                        </a></p>
                    </article>
                )
            })
        }

        return render;
    }

    handleCommentChange(e) {
        this.setState({
            error:        false,
            commentEmpty: '',
            comment:      e.target.value,
        })

        localStorage.removeItem('error');
    }

    handleEmailChange(e) {
        this.setState({
            error:        false,
            emailEmpty:   '',
            emailInvalid: '',
            email:        e.target.value,
        })

        localStorage.removeItem('error');
    }

    handleSignatureChange(e) {
        this.setState({
            error:          false,
            signatureEmpty: '',
            signature:      e.target.value,
        })

        localStorage.removeItem('error');
    }

    handleConsentChange(e) {
        this.setState({
            error:        false,
            consentEmpty: '',
            consent:      true,
        })

        localStorage.removeItem('error');
    }

    validateComment(e) {
        if (!e.target.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:        true,
                    commentEmpty: 'Bitte schreiben Sie einen Kommentar.',
                })
            
            } else {
                this.setState({
                    error:          true,
                    commentEmpty: 'Du måste skriva en kommentar.',
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

    validateSignature(e) {
        if (!e.target.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:          true,
                    signatureEmpty: 'Bitte geben Sie ein Pseudonym ein.',
                    signature:      '',
                })
            
            } else {
                this.setState({
                    error:          true,
                    signatureEmpty: 'Du måste ange en signatur.',
                    signature:      '',
                })
            }

            localStorage.setItem('error', true)
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

    validateForm() {
        const comment   = document.getElementById('comment');
        const email     = document.getElementById('email');
        const signature = document.getElementById('signature');
        const consent   = document.getElementById('consent');

        if (!comment.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:        true,
                    commentEmpty: 'Bitte schreiben Sie einen Kommentar.',
                })
            
            } else {
                this.setState({
                    error:          true,
                    commentEmpty: 'Du måste skriva en kommentar.',
                })
            }

            localStorage.setItem('error', true);
        }

        if (!email.value) {
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
        
        } else {
            if (email.value.indexOf('@') < 0) {
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

        if (!signature.value) {
            if (localStorage.getItem('language') == 'Deutsch') {
                this.setState({
                    error:          true,
                    signatureEmpty: 'Bitte geben Sie ein Pseudonym ein.',
                    signature:      '',
                })
            
            } else {
                this.setState({
                    error:          true,
                    signatureEmpty: 'Du måste ange en signatur.',
                    signature:      '',
                })
            }

            localStorage.setItem('error', true)
        }

        if (!consent.checked) {
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

        if (comment.value !== '' && email.value !== '' && signature.value !== ''
            && consent.checked) {
                if (email.value.indexOf('@') >= 0) {
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
            let commentArr = this.props.comments;
            let id;

            let content = [];

            if (comment.value.indexOf('\n\n') >= 0) {
                content = comment.value.split("\n\n")
            
            } else {
                content.push(comment.value);
            }

            if (commentArr.length) {
                commentArr.sort((a, b) => {
                    return a.id - b.id;
                })

                id = commentArr[commentArr.length - 1].id + 1;
            
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

    getComments() {
        fetch(`https://iws-rest-api.herokuapp.com/comments/id/${localStorage.getItem('postId')}`)
        .then(response => response.json())
        .then(data => {
            if (!data.length) {
                this.setState({
                    error: true,
                })
            
            } else {
                this.setState({
                    error:    false,
                    comments: data,
                })

                localStorage.setItem('comments', JSON.stringify(data)); 
            }
        })
        .catch(() => {
            this.setState({
                error: true
            })
        })
    }

    addComment(body) {
        fetch('https://iws-rest-api.herokuapp.com/comments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
        .then(response => response.json())
        .then(() => {
            localStorage.removeItem('errorSwedish');
            localStorage.removeItem('errorGerman');
            localStorage.setItem('confirmSwedish', 'Din kommentar har skickats.');
            localStorage.setItem('confirmGerman', 'Ihr Kommentar wurde gesendet.');

            this.setState({
                error:          false,
                confirm:        true,
            })
        })
        .catch(() => {
            localStorage.removeItem('confirmSwedish');
            localStorage.removeItem('confirmGerman');
            localStorage.setItem('errorSwedish', 'Ett serverfel har uppstått. ' +
                'Det gick inte att skicka kommentaren. Försök igen senare.');
            localStorage.setItem('errorGerman', 'Ein Serverfehler ist aufgetreten. ' +
                'Ihr Kommentar konnte leider nicht gesendet werden ' +
                'Versuchen Sie es später erneut.');

            this.setState({
                error:          true,
                confirm:        false,
                confirmMessage: 'Ein Serverfehler ist aufgetreten. ' +
                'Ihr Kommentar konnte leider nicht gesendet werden ' +
                'Versuchen Sie es später erneut.',
            })
        })

        localStorage.removeItem('response');
    }

    // Funktionen hämtar alla publicerade inlägg
    getPost() {
        this.props.posts.map((post) => {
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

    handleLinkClick(e) {
        if (e.target.className.indexOf('respond-link') >= 0) {
            localStorage.setItem('response', true);
            localStorage.setItem('commentId', e.target.id.slice(7))
        
        } else {
            localStorage.setItem('postId', e.target.id.slice(4));
        }

        if (e.target.className.indexOf('subnav-link') >= 0) {
            this.getPost();
            window.location.reload();
        }

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
export default Post;