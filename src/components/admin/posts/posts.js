// Imports
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

// Formulär för hantering av inlägg
class Posts extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState            = this.setState.bind(this);
        this.handleTitleChange   = this.handleTitleChange.bind(this);
        this.handleDateChange    = this.handleDateChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleImageChange   = this.handleImageChange.bind(this);
        this.handleAltTextChange = this.handleAltTextChange.bind(this);
        this.validateTitle       = this.validateTitle.bind(this);
        this.validateDate        = this.validateDate.bind(this);
        this.validateContent     = this.validateContent.bind(this);
        this.validateAltText     = this.validateAltText.bind(this);
        this.handleLinkClick     = this.handleLinkClick.bind(this);
        this.handleSubmit        = this.handleSubmit.bind(this);
        this.validateForm        = this.validateForm.bind(this);
        this.upload              = this.upload.bind(this);

        /* Här lagras befintliga inlägg, användarnamn och -behörighet,
            uppgifter om den tjänst som läggs till/redigeras samt felmeddelanden */
        this.state = {
            posts:            this.props.posts,
            username:         this.props.username,
            userRole:         this.props.userRole,
            title:            '',
            date:             '',
            content:          '',
            author:           '',
            image:            '',
            imageUrl:         '',
            altText:          '',
            language:         '',
            error:            false,
            titleEmpty:       '',
            dateEmpty:        '',
            contentEmpty:     '',
            imageTooBig:      '',
            imageWrongFormat: '',
            altTextEmpty:     '',
        }
    }

    // Rendrering
    render() {
        return (
            <div className="admin-form">
                <section>
                    <h2 className="h2-admin">Inlägg</h2>
                    <form>
                        <p>Fält märkta med * är obligatoriska.</p>
                        <div className="form-left">
                            <label htmlFor="post-name-input">Namn *</label>
                            <input id="post-name-input" className="focus text-input-main" type="text" 
                                aria-required="true" onChange={this.handleTitleChange}
                                onBlur={this.validateTitle}></input>
                            <p className="error" role="alert" style={this.state.titleEmpty ?
                                {display: 'block'} : {display: 'none'}}>{this.state.titleEmpty}</p>
                        </div>
                        <div className="form-right">
                            <label htmlFor="post-date-input">Datum *</label>
                            <input id="post-date-input" className="focus text-input-main" type="text" 
                                aria-required="true" placeholder="åååå-mm-dd"
                                onChange={this.handleDateChange} onBlur={this.validateDate}></input>
                            <p className="error" role="alert" style={this.state.dateEmpty ?
                                {display: 'block'} : {display: 'none'}}>{this.state.dateEmpty}</p>
                        </div>
                        <label htmlFor="post-content-input">Text *</label>
                        <textarea id="post-content-input" className="focus" aria-required="true" 
                            onChange={this.handleContentChange} onBlur={this.validateContent}></textarea>
                        <p className="error" role="alert" style={this.state.contentEmpty ?
                            {display: 'block'} : {display: 'none'}}>{this.state.contentEmpty}</p>
                        <label htmlFor="language-switcher-admin">Språk *</label>
                        <select id="language-switcher-admin" className="focus text-input-main" aria-required="true">
                            <option value="Svenska">Svenska</option>
                            <option value="Deutsch">Deutsch</option>
                        </select>
                        <label htmlFor="image-upload-input">Ladda upp en bild</label>
                        <p>Max 500 kB. Endast JPG/JPEG eller PNG.</p>
                        <input id="image-upload-input" className="focus" type="file" aria-required="false"
                            onChange={this.handleImageChange}></input>
                        <p className="error" role="alert" style={this.state.imageTooBig ?
                            {display: 'block'} : {display: 'none'}}>{this.state.imageTooBig}</p>
                        <p className="error" role="alert" style={this.state.imageWrongFormat ?
                            {display: 'block'} : {display: 'none'}}>{this.state.imageWrongFormat}</p>
                        <label htmlFor="alt-text-input">Alt-text</label>
                        <input id="alt-text-input" className="focus text-input-main admin-input" type="text" 
                            aria-required="false" onChange={this.handleAltTextChange} 
                            onBlur={this.validateAltText}></input>
                        <p className="error" role="alert" style={this.state.altTextEmpty ?
                            {display: 'block'} : {display: 'none'}}>{this.state.altTextEmpty}</p>
                        <button type="reset" className="reset-btn">Rensa</button>
                        <button type="submit" className="submit-btn" onClick={this.handleSubmit}>
                            Skicka</button>
                    </form>
                    {/* Här skrivs eventuella felmeddelanden ut (inga poster, serverfel) */}
                    <p className="error" role="alert" style={localStorage.getItem('errorPosts') ?
                        {display: 'block'} : {display: 'none'}}>{localStorage.getItem('errorPosts')}
                    </p>
                        {/* Här skrivs övriga bekräftelsemeddelanden ut (uppdatering, borttagning) */}
                    <p className="confirm" role="alert" style={localStorage.getItem('confirmPosts') ? 
                        {display: 'block'} : {display: 'none'}}>{localStorage.getItem('confirmPosts')}
                    </p>
                </section>

                {/* Här skrivs alla inlägg ut (via props) med länkar för redigering, 
                    publicering (om inlägget inte är publicerat och användaren har full behörighet) 
                    och radering */}
                <div className="admin-output">
                    {this.props.posts.map((post) => {
                        if (this.props.userRole == 'Medarbetare') {
                            return (
                                <article>
                                    <h3 key={post.id}>{post.title}</h3>
                                    <p className="date">{post.updated.slice(0, 10)}</p>
                                    <p>{post.content}</p>
                                    {post.published ? 
                                    <div>
                                        <p className="edit"><Link id={`edit${post.id}`} className="focus" to={"/admin"}
                                            onClick={this.handleLinkClick}>Redigera</Link></p>
                                        <p className="delete"><Link id={`delete${post.id}`} className="focus" to={"/admin"}
                                            onClick={this.handleLinkClick}>Radera</Link></p> 
                                    </div>
                                    :
                                    <div>
                                        <p className="edit-not-published"><Link id={`edit${post.id}`} className="focus" 
                                            to={"/admin"} onClick={this.handleLinkClick}>Redigera</Link></p>
                                        <p className="publish-posts"><Link id={`publish${post.id}`} className="focus" 
                                            to={"/admin"}onClick={this.handleLinkClick}>Publicera</Link></p> 
                                        <p className="delete-not-published"><Link id={`delete${post.id}`} className="focus" 
                                            to={"/admin"} onClick={this.handleLinkClick}>Radera</Link></p>
                                    </div>
                                    }
                                </article>
                            )
                        
                        } else if (this.props.userRole == 'Gästskribent') {
                            return (
                                <article>
                                    <h3 key={post.id}>{post.title}</h3>
                                    <p className="date">{post.updated.slice(0, 10)}</p>
                                    <p>{post.content}</p> 
                                    <div>
                                        <p className="edit"><Link id={`edit${post.id}`} className="focus" 
                                            to={"/admin"} onClick={this.handleLinkClick}>Redigera</Link></p>
                                        <p className="delete"><Link id={`delete${post.id}`} className="focus" 
                                            to={"/admin"} onClick={this.handleLinkClick}>Radera</Link></p> 
                                    </div>
                                </article>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }

    handleTitleChange(e) {
        this.setState({
            error:      false,
            titleEmpty: '',
            title:      e.target.value,
        })
    }

    handleDateChange(e) {
        this.setState({
            error:     false,
            dateEmpty: '',
            date:      e.target.value,
        })
    }

    handleContentChange(e) {
        this.setState({
            error:        false,
            contentEmpty: '',
            content:      e.target.value,
        })
    }

    /* Funktionen kontrollerar den uppladdade bildens storlek och filformat.
        Om användaren inte har laddat upp någon bild, lagras en tom sträng */
    handleImageChange(e) {
        if (e.target.value) {
            const imageInput = document.getElementById('image-upload-input');
            const altTextInput = document.getElementById('alt-text-input');

            const size = imageInput.files[0].size;
            const jpg  = imageInput.value.indexOf('jpg');
            const jpeg = imageInput.value.indexOf('jpeg');
            const png  = imageInput.value.indexOf('png');

            altTextInput.setAttribute('aria-required', false);

            // Skriver ut ett felmeddelande om bilden är för stor
            if (size > 500000) {
                this.setState({
                    error:       true,
                    imageTooBig: 'Bilden är för stor.',
                    image:       '',
                    imageUrl:    '',
                })

                localStorage.setItem('error', true);
            
            } else {
                this.setState ({
                    imageTooBig: '',
                })
            }

            // Skriver ut ett felmeddelande om bilden har fel filformat
            if (jpg < 0 && jpeg < 0 && png < 0) {
                this.setState({
                    error:            true,
                    imageWrongFormat: 'Bilden har fel filformat.',
                    image:            '',
                    imageUrl:         '',
                })

                localStorage.setItem('error', true);

            } else {
                this.setState({ 
                    imageWrongFormat: '',
                })
            }

            // Om bilden inte är för stor och har rätt filformat, lagras sökvägen
            if (size <= 500000 && jpg >= 0 || jpeg >= 0 && png >= 0) {
                this.setState({
                    error:            false,
                    imageTooBig:      '',
                    imageWrongFormat: '',
                    image:            e.target.files[0],
                    imageUrl:         e.target.value,
                })

                altTextInput.setAttribute('aria-required', true);

                localStorage.removeItem('error');
            }

        } else {
            this.setState({
                error:            false,
                imageTooBig:      '',
                imageWrongFormat: '',
                imageUrl:         e.target.value,
            })
        }
    }

    handleAltTextChange(e) {
        const imageInput = document.getElementById('image-upload-input');

        if (e.target.value) {
            this.setState({
                error:        false,
                altTextEmpty: '',
                altText:      e.target.value,
            })

            imageInput.setAttribute('aria-required', true);

        } else {
            imageInput.setAttribute('aria-required', false);
        }
    }

    validateTitle(e) {
        if (!e.target.value) {
            this.setState({
                error:      true,
                titleEmpty: 'Du måste ange ett namn.',
            })

            localStorage.setItem('error', true);
        }
    }

    validateDate(e) {
        if (!e.target.value) {
            this.setState({
                error:      true,
                dateEmpty: 'Du måste ange ett datum.',
            })
    
            localStorage.setItem('error', true);
        }
    }

    validateContent(e) {
        if (!e.target.value) {
            this.setState({
                error:        true,
                contentEmpty: 'Du måste skriva ett inlägg.',
            })

            localStorage.setItem('error', true);
        }
    }

    validateAltText(e) {
        if (this.state.imageUrl) {
            if (!e.target.value) {
                this.setState({
                    error:        true,
                    altTextEmpty: 'Du måste skriva en alt-text.',
                })

                localStorage.setItem('error', true);
            }

        } else {
            e.target.setAttribute('aria-required', false);
        }
    }

    /* Här valideras uppgifterna. För varje uppgift som saknas,
        skrivs ett felmeddelande ut under inmatningsfältet.
        För bilder kontrolleras även storleken och filformatet. */
    validateForm() {
        const nameInput        = document.getElementById('post-name-input');
        const dateInput        = document.getElementById('post-date-input');
        const contentInput     = document.getElementById('post-content-input');
        const altTextInput     = document.getElementById('alt-text-input');

        if (!nameInput.value) {
            this.setState({
                error:      true,
                titleEmpty: 'Du måste ange ett namn.',
            })

            localStorage.setItem('error', true);
        }

        if (!dateInput.value) {
            this.setState({
                error:      true,
                dateEmpty: 'Du måste ange ett datum.',
            })
    
            localStorage.setItem('error', true);
        }

        if (!contentInput.value) {
            this.setState({
                error:        true,
                contentEmpty: 'Du måste skriva ett inlägg.',
            })

            localStorage.setItem('error', true);
        }

        if (nameInput.value !== '' && dateInput.value !== '' && contentInput.value !== '') {
            localStorage.removeItem('error');
        
        } else {
            localStorage.setItem('error', true);
        }

        if (altTextInput.ariaRequired == true) {
            if (!altTextInput.value) {
                this.setState({
                    error:        true,
                    altTextEmpty: 'Du måste skriva en alt-text.',
                })

                localStorage.setItem('error', true);
            
            } else {
                localStorage.removeItem('error');
            }
        }     
    }

    upload(image, name) {

        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'iws_upload')
        data.append('cloud_name', 'inclusivewebsolutions')
        data.append('folder', 'posts')
        data.append('public_id', name)

        fetch('https://api.cloudinary.com/v1_1/inclusivewebsolutions/image/upload', {
            method: 'POST',
            body:   data,
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                imageUrl: data.url
            })
        })
        .catch(err => {
            console.log(err);

            this.setState({
                error: true,
            })
        })
    }

    addPost() {
        // Datum för uppdatering
        let date = new Date();

        // Här lagras beskrivningen
        let content = [];
        let select = document.getElementById('language-switcher-admin');
        let language;

        /* Eftersom beskrivningen ska skrivas ut stycke för stycke,
            delas den upp där det finns blanksteg och lagras som en array */
        if (this.state.content.indexOf('\n\n') >= 0) {
            content = this.state.content.split("\n\n")
        
        } else {
            content.push(this.state.content);
        }

        // Värdena i rullgardinslistan och databasen skiljer sig åt
        if (select.value == 'Svenska') {
            language = 'swedish';
        
        } else if (select.value == 'Deutsch') {
            language = 'german';
        }

        const body = {
            id:        this.state.length + 1,
            title:     this.state.title,
            date:      this.state.date,
            content:   content,
            imageUrl:  this.state.imageUrl,
            altText:   this.state.altText,
            author:    this.state.username,
            published: false,
            comments:  false,
            language:  language,
            updated:   date.toLocaleString(), 
        }

        fetch('https://iws-rest-api.herokuapp.com/posts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
        .then(response => response.json())
        .then(data => {
            let postArr = [];
            /* Lägger till den nya tjänsten is arrayen (utanför komponenten)
                och uppdaterar sedan state-arrayen */
            postArr.unshift(data);

            this.setState({
                posts: postArr,
            })
        })
        .catch(() => {
            this.setState({
                error:        true,
                errorMessage: 'Ett serverfel har uppstått. Det gick inte att lägga till inlägget. ' 
                + 'Försök igen lite senare.',
            })
        })
    }

    handleLinkClick(e) {
        let action;
        let id;

        if (e.target.id.indexOf('edit') >= 0) {
            action = 'edit';
            id     = e.target.id.slice(4);

            localStorage.setItem('id', id);
            localStorage.setItem('action', action);

            const nameInput        = document.getElementById('post-name-input');
            const dateInput        = document.getElementById('post-date-input');
            const contentInput     = document.getElementById('post-content-input');
            const languageInput    = document.getElementById('language-switcher-admin');
            const altTextInput     = document.getElementById('alt-text-input');

            this.props.posts.map((post) => {
                if (post.id == id) {
                    this.setState({
                        author: post.author,
                    })

                    nameInput.value        = post.title;
                    dateInput.value        = post.date.slice(0, 10);
                    contentInput.value     = post.content;
                    altTextInput.value     = post.altText;

                    if (post.language == 'german') {
                        languageInput.value = 'Deutsch';

                    } else {
                        languageInput.value = 'Svenska';
                    }
                }
            })
        
        } else if (e.target.id.indexOf('delete') >= 0) {
            action      = 'delete';
            id          = e.target.id.slice(6);
            let published;

            this.props.search.map((page) => {
                if (page.foreignKey) {
                    if (page.foreignKey.indexOf('post') >= 0 && page.foreignKey.indexOf(id) >= 0) {
                        localStorage.setItem('searchId', page.foreignKey);
                    }
                }
            })

            this.props.posts.map((post) => {
                if (post.id == id) {
                    published = post.published;
                }
            })

            this.props.delete(id, published);

        } else if (e.target.id.indexOf('publish') >= 0) {
            action = 'publish';
            id     = e.target.id.slice(7);

            let body = {}

            this.props.posts.map((post) => {
                if (post.id == id) {
                    body = {
                        id:         post.id,
                        foreignKey: post.id,
                        title:      post.title,
                        content:    JSON.stringify(post.content),
                        language:   post.language,
                        path:       '/post',
                    }
                }
            })

            this.props.publish(id, body);
        }

        /*
        if (action == 'delete') {
            this.props.delete(id);
        }

        if (e.target.id.indexOf('edit') >= 0) {
            action = 'edit';
            id     = e.target.id.slice(4);
        
        } else if (e.target.id.indexOf('delete') >= 0) {
            action = 'delete';
            id     = e.target.id.slice(6);
        
        } else if (e.target.id.indexOf('publish') >= 0) {
            action = 'publish';
            id     = e.target.id.slice(7);
        }

        if (action == 'publish') {
            this.props.publish(id);

        } else if (action == 'delete') {
            this.props.delete(id);
        }
        */
    }

    /* Denna funktion validerar uppgifterna och lägger till tjänster
        när formuläret skickas */
    handleSubmit(e) {
        e.preventDefault();
        this.validateForm();

        if (!localStorage.getItem('error')) {
            // Datum för uppdatering
            let date = new Date().toLocaleDateString('sv-SE', {timeZone: 'CET'});

            // Här lagras beskrivningen
            let content = [];
            let select = document.getElementById('language-switcher-admin');
            let language;

            // Värdena i rullgardinslistan och databasen skiljer sig åt
            if (select.value == 'Svenska') {
                language = 'swedish';
            
            } else if (select.value == 'Deutsch') {
                language = 'german';
            }

            if (!localStorage.getItem('action')) {
                /* Eftersom beskrivningen ska skrivas ut stycke för stycke,
                delas den upp där det finns blanksteg och lagras som en array */
                if (this.state.content.indexOf('\n\n') >= 0) {
                    content = this.state.content.split("\n\n")
                
                } else {
                    content.push(this.state.content);
                }

                const body = {
                    id:        0,
                    title:     this.state.title,
                    date:      this.state.date,
                    content:   content,
                    imageUrl:  '',
                    altText:   this.state.altText,
                    author:    this.state.username,
                    published: false,
                    comments:  false,
                    language:  language,
                    path:      '/post',
                    updated:   date, 
                }

                let imageUrl;
                let publicId;

                const imageInput = document.getElementById('image-upload-input');

                if (imageInput.files[0]) {
                    let name      = imageInput.files[0].name.slice(0, imageInput.files[0].name.indexOf('.'));
                    let extension = imageInput.files[0].name.slice(imageInput.files[0].name.indexOf('.'));            
                    publicId      = name;
                    imageUrl      = `https://res.cloudinary.com/inclusivewebsolutions/image/upload/posts/${publicId}${extension}`;
                    body.imageUrl = imageUrl;

                    this.upload(imageInput.files[0], name);
                    this.props.post(body);
                
                } else {
                    this.props.post(body);
                }
            }  

            if (localStorage.getItem('action') == 'edit') {
                const nameInput        = document.getElementById('post-name-input');
                const dateInput        = document.getElementById('post-date-input');
                const contentInput     = document.getElementById('post-content-input');
                const imageInput       = document.getElementById('image-upload-input');
                const altTextInput     = document.getElementById('alt-text-input');
                let published;
                let comments;

                this.props.posts.map((post) => {
                    if (post.id == localStorage.getItem('id')) {
                        published = post.published;
                        comments  = post.comments;
                    }
                })

                if (contentInput.value.indexOf('\n\n') >= 0) {
                    content = contentInput.value.split("\n\n")
                
                } else {
                    content.push(contentInput.value);
                }

                let id      = localStorage.getItem('id');

                this.props.search.map((page) => {
                    if (page.foreignKey) {
                        if (page.foreignKey.indexOf('post') >= 0 && page.foreignKey.indexOf(id) >= 0) {
                            localStorage.setItem('searchId', page.foreignKey);
                        }
                    }
                })

                const body = {
                    id:        localStorage.getItem('id'),
                    title:     nameInput.value,
                    date:      dateInput.value,
                    content:   content,
                    imageUrl:  '',
                    altText:   altTextInput.value,
                    author:    this.state.author,
                    published: published,
                    comments:  comments,
                    language:  language,
                    path:      '/post',
                    updated:   date, 
                }

                let url;
                let publicId;

                if (imageInput.files[0]) {
                    let name      = imageInput.files[0].name.slice(0, imageInput.files[0].name.indexOf('.'));
                    let extension = imageInput.files[0].name.slice(imageInput.files[0].name.indexOf('.'));            
                    publicId      = name;
                    url           = `https://res.cloudinary.com/inclusivewebsolutions/image/upload/posts/${publicId}${extension}`;
                    body.imageUrl = url;

                    this.upload(imageInput.files[0], name);
                    this.props.put(localStorage.getItem('id'), body);
                
                } else {
                    this.props.put(localStorage.getItem('id'), body);
                }
            }
        }
    }
}

// Exporterar komponenten
export default Posts;