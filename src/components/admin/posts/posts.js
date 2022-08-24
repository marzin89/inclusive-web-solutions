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
        this.form                = React.createRef();
        this.handleTitleChange   = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleImageChange   = this.handleImageChange.bind(this);
        this.handleAltTextChange = this.handleAltTextChange.bind(this);
        /*
        this.validateTitle       = this.validateTitle.bind(this);
        this.validateContent     = this.validateContent.bind(this);
        this.validateAltText     = this.validateAltText.bind(this);
        */
        this.handleLinkClick     = this.handleLinkClick.bind(this);
        this.handleSubmit        = this.handleSubmit.bind(this);
        this.validateForm        = this.validateForm.bind(this);
        this.upload              = this.upload.bind(this);

        /* Här lagras befintliga inlägg, användarnamn och -behörighet,
            uppgifter om den tjänst som läggs till/redigeras samt felmeddelanden */
        this.state = {
            posts:                 this.props.posts,
            username:              this.props.username,
            userRole:              this.props.userRole,
            title:                 '',
            date:                  '',
            content:               '',
            author:                '',
            image:                 '',
            imageUrl:              '',
            altText:               '',
            language:              '',
            error:                 false,
            errorCountTitle:       0,
            errorCountContent:     0,
            errorCountImageSize:   0,
            errorCountImageFormat: 0,
            errorCountAltText:     0,
            errorPosts:            this.props.errorPosts,
            confirm:               false,
            confirmPosts:          this.props.confirmPosts,
            titleEmpty:            '',
            // dateEmpty:             '',
            contentEmpty:          '',
            imageTooBig:           '',
            imageWrongFormat:      '',
            altTextEmpty:          '',
        }
    }

    // Rendrering
    render() {
        return (
            <div id="main" className="admin-form">
                <section id="admin-form">
                    <h2 className="h2-admin">Inlägg</h2>
                    <p style={this.state.error ? {display: 'block'} : {display: 'none'}} 
                        className="text h2-error h3-font-size" role="alert">
                        Formuläret innehåller {this.state.errorCountTitle + this.state.errorCountContent + 
                            + this.state.errorCountImageSize + this.state.errorCountImageFormat + 
                            this.state.errorCountAltText} fel</p>
                    <form ref={this.form}>
                        <p>Fält märkta med * är obligatoriska.</p>
                        <label htmlFor="post-name-input">Namn *</label>
                        <input id="post-name-input" className="focus" type="text" 
                            aria-required="true" aria-describedby="post-name-error" autoComplete='on'
                            onChange={this.handleTitleChange}></input>
                        <p id="post-name-error" className="error" role="alert" style={this.state.titleEmpty ?
                            {display: 'block'} : {display: 'none'}}>{this.state.titleEmpty}</p>
                        <label htmlFor="post-content-input">Text *</label>
                        <textarea id="post-content-input" className="focus" aria-required="true" autoComplete='on' 
                            aria-describedby="post-content-error" onChange={this.handleContentChange}></textarea>
                        <p id="post-content-error" className="error" role="alert" style={this.state.contentEmpty ?
                            {display: 'block'} : {display: 'none'}}>{this.state.contentEmpty}</p>
                        <label htmlFor="language-switcher-admin">Språk *</label>
                        <select id="language-switcher-admin" className="focus text-input-main" aria-required="true">
                            <option value="Svenska">Svenska</option>
                            <option value="Deutsch">Deutsch</option>
                        </select>
                        <label htmlFor="image-upload-input">Ladda upp en bild</label>
                        <p>Max 500 kB. Endast JPG/JPEG eller PNG.</p>
                        <input id="image-upload-input" className="focus" type="file" aria-required="false"
                            aria-describedby="image-size-error image-format-error" onChange={this.handleImageChange}>
                        </input>
                        <p id="image-size-error" className="error" role="alert" style={this.state.imageTooBig ?
                            {display: 'block'} : {display: 'none'}}>{this.state.imageTooBig}</p>
                        <p id="image-format-error" className="error" role="alert" style={this.state.imageWrongFormat ?
                            {display: 'block'} : {display: 'none'}}>{this.state.imageWrongFormat}</p>
                        <label htmlFor="alt-text-input">Alt-text</label>
                        <input id="alt-text-input" className="focus text-input-main admin-input" type="text" 
                            aria-required="false" aria-describedby="alt-text-error" autoComplete='on' 
                            onChange={this.handleAltTextChange}>
                        </input>
                        <p id="alt-text-error" className="error" role="alert" style={this.state.altTextEmpty ?
                            {display: 'block'} : {display: 'none'}}>{this.state.altTextEmpty}</p>
                        <button type="reset" className="reset-btn">Rensa</button>
                        <button type="submit" className="submit-btn" onClick={this.handleSubmit}>
                            Skicka</button>
                    </form>
                    {/* Här skrivs eventuella felmeddelanden ut (inga poster, serverfel) */}
                    <p className="error" role="alert" style={this.props.errorPosts ?
                        {display: 'block'} : {display: 'none'}}>{this.props.errorPosts}
                    </p>
                        {/* Här skrivs övriga bekräftelsemeddelanden ut (uppdatering, borttagning) */}
                    <p className="confirm" role="alert" style={this.props.confirmPosts ? 
                        {display: 'block'} : {display: 'none'}}>{this.props.confirmPosts}
                    </p>
                </section>

                {/* Här skrivs alla inlägg ut (via props) med länkar för redigering, 
                    publicering (om inlägget inte är publicerat och användaren har full behörighet) 
                    och radering */}
                <div className="admin-output">
                    {this.props.posts.map((post) => {
                        if (this.props.userRole == 'Medarbetare') {
                            return (
                                <article key={post.id}>
                                    <h3>{post.title}</h3>
                                    <p className="date">{post.updated.slice(0, 10)}</p>
                                    <p>{post.content}</p>
                                    {post.published ? 
                                    <div>
                                        <p className="edit"><a id={`edit${post.id}`} className="focus" 
                                            href="" onClick={this.handleLinkClick}>Redigera</a></p>
                                        <p className="delete"><a id={`delete${post.id}`} className="focus" 
                                            href="" onClick={this.handleLinkClick}>Radera</a></p> 
                                    </div>
                                    :
                                    <div>
                                        <p className="edit-not-published"><a id={`edit${post.id}`} className="focus" 
                                            href="" onClick={this.handleLinkClick}>Redigera</a></p>
                                        <p className="publish-posts"><a id={`publish${post.id}`} className="focus" 
                                            href="" onClick={this.handleLinkClick}>Publicera</a></p> 
                                        <p className="delete-not-published"><a id={`delete${post.id}`} className="focus" 
                                            href="" onClick={this.handleLinkClick}>Radera</a></p>
                                    </div>
                                    }
                                </article>
                            )
                        
                        } else if (this.props.userRole == 'Gästskribent') {
                            return (
                                <article key={post.id}>
                                    <h3>{post.title}</h3>
                                    <p className="date">{post.updated.slice(0, 10)}</p>
                                    <p>{post.content}</p> 
                                    <div>
                                        <p className="edit"><a id={`edit${post.id}`} className="focus" 
                                            href="" onClick={this.handleLinkClick}>Redigera</a></p>
                                        <p className="delete"><a id={`delete${post.id}`} className="focus" 
                                            href="" onClick={this.handleLinkClick}>Radera</a></p> 
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
            error: false,
            title: e.target.value,
        })

        if (e.target.value) {
            this.setState({
                errorCountTitle: 0,
                titleEmpty:      '',
            })

            e.target.setAttribute('aria-invalid', false);
        }
    }

    handleContentChange(e) {
        this.setState({
            error:   false,
            content: e.target.value,
        })

        if (e.target.value) {
            this.setState({
                errorCountContent: 0,
                contentEmpty:      '',
            })

            e.target.setAttribute('aria-invalid', false);
        }
    }

    /* Funktionen kontrollerar den uppladdade bildens storlek och filformat.
        Om användaren inte har laddat upp någon bild, lagras en tom sträng */
    handleImageChange(e) {
        const altTextInput = document.getElementById('alt-text-input');

        this.setState({
            error:    false,
            image:    e.target.files[0],
            imageUrl: e.target.value,
        })

        if (e.target.value) {
            const size = e.target.files[0].size;
            const jpg  = e.target.value.indexOf('jpg');
            const jpeg = e.target.value.indexOf('jpeg');
            const png  = e.target.value.indexOf('png');

            altTextInput.setAttribute('aria-required', true);

            // Skriver ut ett felmeddelande om bilden är för stor
            if (size > 500000) {
                this.setState({
                    errorCountImageSize: 1,
                    imageTooBig:         'Bilden är för stor.',
                })

                e.target.setAttribute('aria-invalid', true);
                
            
            } else {
                this.setState ({
                    errorCountImageSize: 0,
                    imageTooBig:         '',
                })
            }

            // Skriver ut ett felmeddelande om bilden har fel filformat
            if (jpg < 0 && jpeg < 0 && png < 0) {
                this.setState({
                    errorCountImageFormat: 1,
                    imageWrongFormat:      'Bilden har fel filformat.',
                })

                e.target.setAttribute('aria-invalid', true);
                

            } else {
                this.setState({ 
                    errorCountImageFormat: 0,
                    imageWrongFormat:      '',
                })
            }

            // Om bilden inte är för stor och har rätt filformat, lagras sökvägen
            if (size <= 500000) {
                this.setState({
                    errorCountImageSize: 0,
                    imageTooBig:         '',
                })

                if (jpg >= 0 || jpeg >= 0 && png >= 0) {
                    this.setState({
                        errorCountImageFormat: 0,
                        imageWrongFormat:      '',
                    })
    
                    e.target.setAttribute('aria-invalid', false);
                }
            }

        } else {
            this.setState({
                errorCountImageSize:   0,
                errorCountImageFormat: 0,
                imageTooBig:           '',
                imageWrongFormat:      '',
            })

            e.target.setAttribute('aria-invalid', false);
            altTextInput.setAttribute('aria-required', false);
        }
    }

    handleAltTextChange(e) {
        const imageInput = document.getElementById('image-upload-input');

        this.setState({
            error:   false,
            altText: e.target.value,
        })

        if (e.target.value) {
            this.setState({
                errorCountAltText: 0,
                altTextEmpty:      '',
            })

            e.target.setAttribute('aria-invalid', false);
            imageInput.setAttribute('aria-required', true);

        } else {
            imageInput.setAttribute('aria-required', false);
        }
    }

    /*
    validateTitle(e) {
        if (!e.target.value) {
            this.setState({
                errorCountTitle: 1,
                titleEmpty:      'Du måste ange ett namn.',
            })

            e.target.setAttribute('aria-invalid', true);
            
        }
    }

    validateContent(e) {
        if (!e.target.value) {
            this.setState({
                errorCountContent: 1,
                contentEmpty:      'Du måste skriva ett inlägg.',
            })

            e.target.setAttribute('aria-invalid', true);
            
        }
    }

    validateAltText(e) {
        if (this.state.imageUrl) {
            if (!e.target.value) {
                this.setState({
                    errorCountAltText: 1,
                    altTextEmpty:      'Du måste skriva en alt-text.',
                })

                e.target.setAttribute('aria-invalid', true);
                
            }
        }
    }
    */

    /* Här valideras uppgifterna. För varje uppgift som saknas,
        skrivs ett felmeddelande ut under inmatningsfältet.
        För bilder kontrolleras även storleken och filformatet. */
    validateForm() {
        const nameInput        = document.getElementById('post-name-input');
        const contentInput     = document.getElementById('post-content-input');
        const imageInput       = document.getElementById('image-upload-input');
        const altTextInput     = document.getElementById('alt-text-input');

        if (!nameInput.value) {
            this.setState({
                error:           true,
                errorCountTitle: 1,
                titleEmpty:      'Du måste ange ett namn.',
            })

            nameInput.setAttribute('aria-invalid', true);
            
        
        } else {
            this.setState({
                errorCountTitle: 0,
                titleEmpty:      '',
            })

            nameInput.setAttribute('aria-invalid', false);
        }

        if (!contentInput.value) {
            this.setState({
                error:             true,
                errorCountContent: 1,
                contentEmpty:      'Du måste skriva ett inlägg.',
            })

            contentInput.setAttribute('aria-invalid', true);
            
        
        } else {
            this.setState({
                errorCountContent: 0,
                contentEmpty:      '',
            })

            contentInput.setAttribute('aria-invalid', false);
        }

        if (imageInput.value) {
            const size = imageInput.files[0].size;
            const jpg  = imageInput.value.indexOf('jpg');
            const jpeg = imageInput.value.indexOf('jpeg');
            const png  = imageInput.value.indexOf('png');

            altTextInput.setAttribute('aria-required', true);

            // Skriver ut ett felmeddelande om bilden är för stor
            if (size > 500000) {
                this.setState({
                    error:               true,
                    errorCountImageSize: 1,
                    imageTooBig:         'Bilden är för stor.',
                })

                imageInput.setAttribute('aria-invalid', true);
                
            
            } else {
                this.setState ({
                    errorCountImageSize: 0,
                    imageTooBig:         '',
                })
            }

            // Skriver ut ett felmeddelande om bilden har fel filformat
            if (jpg < 0 && jpeg < 0 && png < 0) {
                this.setState({
                    error:                 true,
                    errorCountImageFormat: 1,
                    imageWrongFormat:      'Bilden har fel filformat.',
                })

                imageInput.setAttribute('aria-invalid', true);
                

            } else {
                this.setState({ 
                    errorCountImageFormat: 0,
                    imageWrongFormat:      '',
                })
            }

            // Om bilden inte är för stor och har rätt filformat, lagras sökvägen
            if (size <= 500000) {
                this.setState({
                    errorCountImageSize: 0,
                    imageTooBig:         '',
                })

                if (jpg >= 0 || jpeg >= 0 || png >= 0) {
                    this.setState({
                        error:                 false,
                        errorCountImageFormat: 0,
                        imageWrongFormat:      '',
                    })
    
                    imageInput.setAttribute('aria-invalid', false);
                }
            }

            if (!altTextInput.value) {
                this.setState({
                    error:             true,
                    errorCountAltText: 1,
                    altTextEmpty:      'Du måste skriva en alt-text.',
                })

                altTextInput.setAttribute('aria-invalid', true);
                
            
            } else {
                this.setState({
                    errorCountAltText: 0,
                    altTextEmpty:      '',
                })

                altTextInput.setAttribute('aria-invalid', false);
            }
        } else {
            this.setState({
                errorCountImageSize:   0,
                errorCountImageFormat: 0,
                imageTooBig:      '',
                imageWrongFormat: '',
            })

            altTextInput.setAttribute('aria-required', false);
        }
        
        if (nameInput.value !== '' && contentInput.value !== '' && !imageInput.value) {
            this.setState({
                error: false,
            })
  
            return true;    
        
        } else if (nameInput.value !== '' && contentInput.value !== '' && imageInput.value !== ''
            && altTextInput.value !== '') {

            const size = imageInput.files[0].size;
            const jpg  = imageInput.value.indexOf('jpg');
            const jpeg = imageInput.value.indexOf('jpeg');
            const png  = imageInput.value.indexOf('png');

            if (size <= 500000) {
                if (jpg >= 0 || jpeg >= 0 || png >= 0) {
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
        
        } else {
            return false;
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
                errorMessage: 'Ett serverfel har uppstått. Det gick inte att lägga till inlägget. ' 
                + 'Försök igen lite senare.',
            })
        })
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
            localStorage.setItem('actionPosts', action);

            const nameInput        = document.getElementById('post-name-input');
            const contentInput     = document.getElementById('post-content-input');
            const languageInput    = document.getElementById('language-switcher-admin');
            const altTextInput     = document.getElementById('alt-text-input');

            this.props.posts.map((post) => {
                if (post.id == id) {
                    this.setState({
                        author: post.author,
                    })

                    nameInput.value        = post.title;
                    contentInput.value     = post.content;
                    altTextInput.value     = post.altText;

                    localStorage.setItem('imageUrlPosts', post.imageUrl);

                    if (post.language == 'german') {
                        languageInput.value = 'Deutsch';

                    } else {
                        languageInput.value = 'Svenska';
                    }
                }
            })

            nameInput.focus();
        
        } else if (e.target.id.indexOf('delete') >= 0) {
            document.getElementById('admin-form').scrollIntoView({behavior: 'smooth'});

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
    }

    /* Denna funktion validerar uppgifterna och lägger till tjänster
        när formuläret skickas */
    handleSubmit(e) {
        e.preventDefault();

        if (this.validateForm()) {
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

            if (!localStorage.getItem('actionPosts')) {
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
                    date:      date,
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

            if (localStorage.getItem('actionPosts') == 'edit') {
                const nameInput        = document.getElementById('post-name-input');
                const contentInput     = document.getElementById('post-content-input');
                const imageInput       = document.getElementById('image-upload-input');
                const altTextInput     = document.getElementById('alt-text-input');
                let published;
                let comments;
                let publishDate;

                this.props.posts.map((post) => {
                    if (post.id == localStorage.getItem('id')) {
                        published   = post.published;
                        comments    = post.comments;
                        publishDate = post.date;
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
                    date:      publishDate,
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
                    if (localStorage.getItem('imageUrlPosts')) {
                        body.imageUrl = localStorage.getItem('imageUrlPosts');
                    }

                    this.props.put(localStorage.getItem('id'), body);
                }
            }

            this.form.current.reset();
        }
    }
}

// Exporterar komponenten
export default Posts;