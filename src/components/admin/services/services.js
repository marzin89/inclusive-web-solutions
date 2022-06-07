// Imports
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import { findDOMNode } from 'react-dom';
import {Link} from 'react-router-dom';

// Formulär för hantering av tjänster
class Services extends React.Component {

    // Konstruktor
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState                = this.setState.bind(this);
        this.handleNameChange        = this.handleNameChange.bind(this);
        this.handlePriceChange       = this.handlePriceChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleImageChange       = this.handleImageChange.bind(this);
        this.handleAltTextChange     = this.handleAltTextChange.bind(this);
        this.handleSubmit            = this.handleSubmit.bind(this);
        this.handleLinkClick         = this.handleLinkClick.bind(this);
        this.validateName            = this.validateName.bind(this);
        this.validatePrice           = this.validatePrice.bind(this);
        this.validateDescription     = this.validateDescription.bind(this);
        this.validateAltText         = this.validateAltText.bind(this);
        this.validateForm            = this.validateForm.bind(this);
        this.upload                  = this.upload.bind(this);

        /* Här lagras befintliga tjänster, uppgifter om den tjänst som 
            läggs till/redigeras samt felmeddelanden */
        this.state = {
            service:          this.props.service,
            data:             this.props.data,
            search:           this.props.search,         
            name:             '',
            price:            '',
            description:      '',
            imageUrl:         '',
            altText:          '',
            language:         '',
            error:            false,
            errorTests:       this.props.errorTests,
            errorSolutions:   this.props.errorSolutions,
            errorCourses:     this.props.errorCourses,
            confirm:          false,
            confirmTests:     this.props.confirmTests,
            confirmSolutions: this.props.confirmSolutions,
            confirmCourses:   this.props.confirmCourses,
            nameEmpty:        '',
            priceEmpty:       '',
            descriptionEmpty: '',
            imageTooBig:      '',
            imageWrongFormat: '',
            altTextEmpty:     '',
        }
    }

    // Rendrering
    render() {
        return (
            <div className="admin-form">
                <section id="admin-form">
                    {/* Rubriken anpassas baserat på vilken tjänst som är vald */}
                    {this.props.service == 'tests' ? <h2 className="h2-admin">Tester</h2> : ''}
                    {this.props.service == 'solutions' ? <h2 className="h2-admin">Utveckling</h2> : ''}
                    {this.props.service == 'courses' ? <h2 className="h2-admin">Utbildningar</h2> : ''}
                    <form>
                        <p>Fält märkta med * är obligatoriska.</p>
                        {/* Tjänstens namn */}
                        <div className="form-left">
                            <label htmlFor="service-name-input">Namn *</label>
                            <input id="service-name-input" className="focus text-input-main admin-input" type="text"
                                aria-required="true" onChange={this.handleNameChange}
                                onBlur={this.validateName}></input>
                            {/* Här skrivs ett felmeddelande ut om inget namn har angetts */}
                            <p className="error" role="alert" style={this.state.nameEmpty ?
                                {display: 'block'} : {display: 'none'}}>{this.state.nameEmpty}</p>
                        </div>
                        {/* Tjänstens pris */}
                        <div className="form-right">
                            <label htmlFor="service-price-input">Pris *</label>
                            <input id="service-price-input" className="focus text-input-main admin-input" type="text" 
                                aria-required="true" onChange={this.handlePriceChange}
                                onBlur={this.validatePrice}></input>
                            {/* Här skrivs ett felmeddelande ut om inget pris har angetts */}
                            <p className="error" role="alert" style={this.state.priceEmpty ?
                                {display: 'block'} : {display: 'none'}}>{this.state.priceEmpty}</p>
                        </div>
                        {/* Beskrivning av tjänsten */}
                        <label htmlFor="service-description-input">Beskrivning *</label>
                        <textarea id="service-description-input" className="focus admin-input"
                            aria-required="true" onChange={this.handleDescriptionChange}
                            onBlur={this.validateDescription}>
                            </textarea>
                        {/* Här skrivs ett felmeddelande ut om ingen beskrivning har skrivits */}
                        <p className="error" role="alert" style={this.state.descriptionEmpty ?
                            {display: 'block'} : {display: 'none'}}>{this.state.descriptionEmpty}</p>
                        {/* Val av språk */}
                        <label htmlFor="language-switcher-admin">Språk *</label>
                        <select id="language-switcher-admin" className="focus text-input-main admin-input" 
                            aria-required="true">
                            <option value="Svenska">Svenska</option>
                            <option value="Deutsch">Deutsch</option>
                        </select>
                        {/* Bilduppladdning */}
                        <label htmlFor="image-upload-input">Ladda upp en bild</label>
                        <p>Max 500 kB. Endast JPG/JPEG eller PNG.</p>
                        <input id="image-upload-input" className="focus admin-input" type="file" 
                            aria-required="false" onChange={this.handleImageChange}></input>
                        {/* Här skrivs felmeddelanden ut om bilden är för stor och/eller har fel filformat */}
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
                        <button type="submit" className="submit-btn" onClick={this.handleSubmit}>Skicka</button>
                    </form>
                    {/* Här skrivs övriga felmeddelanden ut (inga poster, serverfel) */}
                    <p className="error" role="alert" style={this.props.errorTests ? 
                        {display: 'block'} : {display: 'none'}}>{this.props.errorTests}
                    </p>
                    <p className="error" role="alert" style={this.props.errorSolutions ? 
                        {display: 'block'} : {display: 'none'}}>{this.props.errorSolutions}
                    </p>
                    <p className="error" role="alert" style={this.props.errorCourses ? 
                        {display: 'block'} : {display: 'none'}}>{this.props.errorCourses}
                    </p>
                    {/* Här skrivs övriga bekräftelsemeddelanden ut (uppdatering, borttagning) */}
                    <p className="confirm" role="alert" style={this.props.confirmTests ? 
                        {display: 'block'} : {display: 'none'}}>{this.props.confirmTests}
                    </p>
                    <p className="confirm" role="alert" style={this.props.confirmSolutions ? 
                        {display: 'block'} : {display: 'none'}}>{this.props.confirmSolutions}
                    </p>
                    <p className="confirm" role="alert" style={this.props.confirmCourses ? 
                        {display: 'block'} : {display: 'none'}}>{this.props.confirmCourses}
                    </p>
                </section>

                {/* Här skrivs alla tjänster inom respektive kategori ut (via props) med länkar för
                    redigering och radering */}
                <div className="admin-output">
                    {this.props.data.map((element) => {
                        return (
                            <article key={element.id}>
                                <h3>{element.name}</h3>
                                {element.language == 'swedish' ?
                                <p className="price">Pris: {element.price}</p> :
                                <p className="price">Preis: {element.price}</p>}
                                <p>{element.description}</p>
                                <div>
                                    <p className="edit"><a id={`edit${element.id}`} className="focus" href="#admin-form" 
                                        onClick={this.handleLinkClick}>Redigera</a></p>
                                    <p className="delete"><Link id={`delete${element.id}`} className="focus" to={"/admin"} 
                                        onClick={this.handleLinkClick}>Radera</Link></p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        )
    }

    /* Dessa funktioner lagrar namn, pris, beskrivning, sökväg
        och språk i state när användaren skriver */
    handleNameChange(e) {
        this.setState({
            error:     false,
            nameEmpty: '',
            name:      e.target.value,
        })
    }

    handlePriceChange(e) {
        this.setState({
            error:      false,
            priceEmpty: '',
            price:      e.target.value,
        })
    }

    handleDescriptionChange(e) {
        this.setState({
            error:            false,
            descriptionEmpty: '',
            description:      e.target.value,
        })
    }

    /* Funktionen kontrollerar den uppladdade bildens storlek och filformat.
        Om användaren inte har laddat upp någon bild, lagras en tom sträng */
    handleImageChange(e) {
        if (e.target.value) {
            const imageInput = document.getElementById('image-upload-input');
            const altTextInput = document.getElementById('alt-text-input');
            const label = document.getElementById('alt-text-input-label');

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

    validateName(e) {
        if (!e.target.value) {
            this.setState({
                error:     true,
                nameEmpty: 'Du måste ange ett namn.',
            })

            localStorage.setItem('error', true);
        }
    }

    validatePrice(e) {
        if (!e.target.value) {
            this.setState({
                error:      true,
                priceEmpty: 'Du måste ange ett pris.',
            })

            localStorage.setItem('error', true);
        }
    }

    validateDescription(e) {
        if (!e.target.value) {
            this.setState({
                error:            true,
                descriptionEmpty: 'Du måste skriva en beskrivning.',
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

    handleLinkClick(e) {
        let action;
        let id;

        if (e.target.id.indexOf('edit') >= 0) {
            action = 'edit';
            id     = e.target.id.slice(4);

            localStorage.setItem('id', id);
            localStorage.setItem('action', action);

            const nameInput        = document.getElementById('service-name-input');
            const priceInput       = document.getElementById('service-price-input');
            const descriptionInput = document.getElementById('service-description-input');
            const languageInput    = document.getElementById('language-switcher-admin');
            const altTextInput     = document.getElementById('alt-text-input');

            this.props.data.map((service) => {
                if (service.id == id) {
                    nameInput.value        = service.name;
                    priceInput.value       = service.price;
                    descriptionInput.value = service.description;
                    altTextInput.value     = service.altText;  
                    
                    localStorage.setItem('imageUrl', service.imageUrl);

                    if (service.language == 'german') {
                        languageInput.value = 'Deutsch';

                    } else {
                        languageInput.value = 'Svenska';
                    }
                }
            })
        
        } else if (e.target.id.indexOf('delete') >= 0) {
            action      = 'delete';
            id          = e.target.id.slice(6);
            let service = this.props.service.slice(0, -1);

            this.props.search.map((page) => {
                if (page.foreignKey) {
                    if (page.foreignKey.indexOf(service) >= 0 && page.foreignKey.indexOf(id) >= 0) {
                        localStorage.setItem('searchId', page.foreignKey);
                    }
                }
            })
        }

        if (action == 'delete') {
            this.props.delete(id);
        }
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
            let description = [];
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
                if (this.state.description.indexOf('\n\n') >= 0) {
                    description = this.state.description.split("\n\n")
                
                } else {
                    description.push(this.state.description);
                }

                const imageInput = document.getElementById('image-upload-input');

                let path = `/${this.props.service.slice(0, -1)}`;

                const body = {
                    id:          0,
                    name:        this.state.name,
                    price:       this.state.price,
                    description: description,
                    imageUrl:    '',
                    altText:     this.state.altText,
                    language:    language,
                    path:        path,
                    updated:     date, 
                }

                let imageUrl;
                let folder = this.props.service;
                let publicId;

                if (imageInput.value) {
                    let name      = imageInput.files[0].name.slice(0, imageInput.files[0].name.indexOf('.'));
                    let extension = imageInput.files[0].name.slice(imageInput.files[0].name.indexOf('.'));            
                    publicId      = name;
                    imageUrl      = `https://res.cloudinary.com/inclusivewebsolutions/image/upload/${folder}/${publicId}${extension}`;
                    body.imageUrl = imageUrl;

                    this.upload(imageInput.files[0], name);
                    this.props.post(body);
                
                } else {
                    this.props.post(body);
                }
            }

            if (localStorage.getItem('action') == 'edit') {
                const nameInput        = document.getElementById('service-name-input');
                const priceInput       = document.getElementById('service-price-input');
                const descriptionInput = document.getElementById('service-description-input');
                const imageInput       = document.getElementById('image-upload-input');
                const altTextInput     = document.getElementById('alt-text-input');

                /* Eftersom beskrivningen ska skrivas ut stycke för stycke,
                delas den upp där det finns blanksteg och lagras som en array */
                if (descriptionInput.value.indexOf('\n\n') >= 0) {
                    description = descriptionInput.value.split("\n\n")
                
                } else {
                    description.push(descriptionInput.value);
                }

                let id      = localStorage.getItem('id');
                let service = this.props.service.slice(0, -1);

                this.props.search.map((page) => {
                    if (page.foreignKey) {
                        if (page.foreignKey.indexOf(service) >= 0 && page.foreignKey.indexOf(id) >= 0) {
                            localStorage.setItem('searchId', page.foreignKey);
                        }
                    }
                })

                let path = `/${this.props.service.slice(0, -1)}`;

                const body = {
                    id:          localStorage.getItem('id'),
                    name:        nameInput.value,
                    price:       priceInput.value,
                    description: description,
                    imageUrl:    '',
                    altText:     altTextInput.value,
                    language:    language,
                    path:        path,
                    updated:     date, 
                }

                let url;
                let folder = this.props.service;
                let publicId;

                if (imageInput.files[0]) {
                    let name      = imageInput.files[0].name.slice(0, imageInput.files[0].name.indexOf('.'));
                    let extension = imageInput.files[0].name.slice(imageInput.files[0].name.indexOf('.'));            
                    publicId      = name;
                    url           = `https://res.cloudinary.com/inclusivewebsolutions/image/upload/${folder}/${publicId}${extension}`;
                    body.imageUrl = url;
                    
                    this.upload(imageInput.files[0], name);
                    this.props.put(localStorage.getItem('id'), body);
                
                } else {
                    if (localStorage.getItem('imageUrl')) {
                        body.imageUrl = localStorage.getItem('imageUrl');
                    }

                    this.props.put(localStorage.getItem('id'), body);
                    localStorage.removeItem('imageUrl');
                }
            }
        }
    }

    /* Här valideras uppgifterna. För varje uppgift som saknas,
        skrivs ett felmeddelande ut under inmatningsfältet.
        För bilder kontrolleras även storleken och filformatet. */
    validateForm() {
        const nameInput        = document.getElementById('service-name-input');
        const priceInput       = document.getElementById('service-price-input');
        const descriptionInput = document.getElementById('service-description-input');
        const altTextInput     = document.getElementById('alt-text-input');

        if (!nameInput.value) {
            this.setState({
                error:     true,
                nameEmpty: 'Du måste ange ett namn.',
            })

            localStorage.setItem('error', true);
        }

        if (!priceInput.value) {
            this.setState({
                error:      true,
                priceEmpty: 'Du måste ange ett pris.',
            })

            localStorage.setItem('error', true);
        }

        if (!descriptionInput.value) {
            this.setState({
                error:            true,
                descriptionEmpty: 'Du måste skriva en beskrivning.',
            })

            localStorage.setItem('error', true);
        }

        if (nameInput.value !== '' && priceInput.value !== '' && descriptionInput.value !== '') {
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
        data.append('folder', this.props.service)
        data.append('public_id', name)

        // let url;

        fetch('https://api.cloudinary.com/v1_1/inclusivewebsolutions/image/upload', {
            method: 'POST',
            body:   data,
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                imageUrl: data.url.replace('http', 'https'),
            })
        })
        .catch(err => {
            console.log(err);

            this.setState({
                error: true,
            })
        })
    }
}

// Exporterar komponenten
export default Services;