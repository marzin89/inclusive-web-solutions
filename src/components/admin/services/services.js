import { useState, useRef } from 'react';

function Services(props) {
    const formRef                             = useRef();
    const imageRef                            = useRef();
    const altTextRef                          = useRef();
    const altTextLabelRef                     = useRef();
    const [name, setName]                     = useState('');
    const [price, setPrice]                   = useState('');
    const [description, setDescription]       = useState('');
    const [image, setImage]                   = useState('');
    const [imageUrl, setImageUrl]             = useState('');
    const [altText, setAltText]               = useState('');
    const [language, setLanguage]             = useState('');
    const [hasName, setHasName]               = useState(true);
    const [hasPrice, setHasPrice]             = useState(true);
    const [hasDescription, setHasDescription] = useState(true);
    const [isValidSize, setIsValidSize]       = useState(true);
    const [isValidFormat, setIsValidFormat]   = useState(true);
    const [hasAltText, setHasAltText]         = useState(true);
    const [errorCount, setErrorCount]         = useState(0);

    constructor(props) {
        super(props);
        this.handleSubmit            = this.handleSubmit.bind(this);
        this.handleLinkClick         = this.handleLinkClick.bind(this);
        this.validateForm            = this.validateForm.bind(this);
        this.upload                  = this.upload.bind(this);
        this.state = {
            language:         '',
            error:            false,
            errorCountName:        0,
            errorCountPrice:       0,
            errorCountDescription: 0,
            errorCountImageSize:   0,
            errorCountImageFormat: 0,
            errorCountAltText:     0,
            nameEmpty:        '',
            priceEmpty:       '',
            descriptionEmpty: '',
            imageTooBig:      '',
            imageWrongFormat: '',
            altTextEmpty:     '',
        }
    }

    return (
        <div id="main" className="admin-form">
            <section id="admin-form">
                {/* Rubriken anpassas baserat på vilken tjänst som är vald */}
                {this.props.service == 'tests' ? <h2 className="h2-admin">Tester</h2> : ''}
                {this.props.service == 'solutions' ? <h2 className="h2-admin">Utveckling</h2> : ''}
                {this.props.service == 'courses' ? <h2 className="h2-admin">Utbildningar</h2> : ''}
                {errorCount ? <p className="text h2-error h3-font-size" role="alert">
                    Formuläret innehåller {errorCount} fel</p> : null}
                <form ref={formRef}>
                    <p>Fält märkta med * är obligatoriska.</p>
                    {/* Tjänstens namn */}
                    <div className="form-left">
                        <label htmlFor="service-name-input">Namn *</label>
                        <input id="service-name-input" className="focus text-input-main admin-input admin-input-required" 
                            type="text" aria-required="true" aria-describedby="service-name-error" 
                            autoComplete='on' onChange={(e) => handleNameChange(e.target.value)}>
                        </input>
                        {/* Här skrivs ett felmeddelande ut om inget namn har angetts */}
                        <p id="service-name-error" className="error" role="alert" style={this.state.nameEmpty ?
                            {display: 'block'} : {display: 'none'}}>{this.state.nameEmpty}</p>
                    </div>
                    {/* Tjänstens pris */}
                    <div className="form-right">
                        <label id="service-price-label" htmlFor="service-price-input">Pris (t.ex. 1 000 :-) *</label>
                        <input id="service-price-input" className="focus text-input-main admin-input admin-input-required" 
                            type="text" aria-required="true" aria-describedby="service-price-error" 
                            autoComplete='on' onChange={(e) => handlePriceChange(e)}></input>
                        {/* Här skrivs ett felmeddelande ut om inget pris har angetts */}
                        <p id="service-price-error" className="error" role="alert" style={this.state.priceEmpty ?
                            {display: 'block'} : {display: 'none'}}>{this.state.priceEmpty}</p>
                    </div>
                    {/* Beskrivning av tjänsten */}
                    <label htmlFor="service-description-input">Beskrivning *</label>
                    <textarea id="service-description-input" className="focus admin-input admin-input-required"
                        aria-required="true" aria-describedby="service-description-error" 
                        autoComplete='on' onChange={(e) => handleDescriptionChange(e)}></textarea>
                    {/* Här skrivs ett felmeddelande ut om ingen beskrivning har skrivits */}
                    <p id="service-description-error" className="error" role="alert" 
                        style={this.state.descriptionEmpty ? {display: 'block'} : {display: 'none'}}>
                        {this.state.descriptionEmpty}</p>
                    {/* Val av språk */}
                    <label htmlFor="language-switcher-admin">Språk *</label>
                    <select id="language-switcher-admin" className="focus text-input-main admin-input" 
                        aria-required="true" onChange={this.changePricePlaceholder}>
                        <option value="Svenska">Svenska</option>
                        <option value="Deutsch">Deutsch</option>
                    </select>
                    {/* Bilduppladdning */}
                    <label htmlFor="image-upload-input">Ladda upp en bild</label>
                    <p>Max 500 kB. Endast JPG/JPEG eller PNG.</p>
                    <input id="image-upload-input" className="focus admin-input" type="file" 
                        aria-required="false" aria-describedby="image-size-error image-format-error" 
                        ref={imageRef} onChange={(e) => handleImageChange(e)}></input>
                    {/* Här skrivs felmeddelanden ut om bilden är för stor och/eller har fel filformat */}
                    {!isValidSize ? <p id="image-size-error" className="error" role="alert">
                        Bilden är för stor.</p> : null}
                    {!isValidFormat ? <p id="image-format-error" className="error" role="alert">
                        Bilden har fel filformat.</p> : null}
                    <label id="alt-text-label" htmlFor="alt-text-input" ref={altTextLabelRef}>Alt-text</label>
                    <input id="alt-text-input" className="focus text-input-main admin-input" type="text" 
                        aria-required="false" aria-describedby="alt-text-error" onChange={(e) => handleAltTextChange(e)}
                        autoComplete='on' ref={altTextRef}></input>
                    {!hasAltText ? <p id="alt-text-error" className="error" role="alert">
                        Du måste skriva en alt-text.</p> : null}
                    <button type="reset" id="reset-btn" className="reset-btn">Rensa</button>
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
                                <p className="edit"><a id={`edit${element.id}`} className="focus" 
                                    href="" onClick={this.handleLinkClick}>Redigera</a></p>
                                <p className="delete"><a id={`delete${element.id}`} className="focus"
                                    href="" onClick={this.handleLinkClick}>Radera</a></p>
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    )

    function handleNameChange(e) {
        const isValid = e.target.value != false;
        setHasName(isValid);
        setName(e.target.value);
        setErrorCount(prev => isValid ? prev : prev + 1);
        e.target.setAttribute('aria-invalid', e.target.value != false);
    }

    function handlePriceChange(e) {
        const isValid = e.target.value != false;
        setHasPrice(isValid);
        setPrice(e.target.value);
        setErrorCount(prev => isValid ? prev : prev + 1);
        e.target.setAttribute('aria-invalid', e.target.value != false);
    }

    function handleDescriptionChange(e) {
        const isValid = e.target.value != false;
        setHasDescription(isValid);
        setDescription(e.target.value);
        setErrorCount(prev => isValid ? prev : prev + 1);
        e.target.setAttribute('aria-invalid', e.target.value != false);
    }

    function handleImageChange(e) {
        if (!e.target.value) return;

        const isValidSize   = e.target.files[0].size < 500000;
        const isValidFormat = e.target.files[0].type.includes('image');
        const isValid       = isValidSize && isValidFormat;

        setIsValidSize(isValidSize);
        setIsValidFormat(isValidFormat);

        if (isValid) {
            setImage(e.target.files[0]);
            setImageUrl(e.target.value);
        }

        altTextRef.current.style.setAttribute('aria-required', true);
        altTextLabelRef.current.innerHTML = 'Alt-text *';
        e.target.setAttribute('aria-invalid', !isValid);

        setErrorCount(prev => isValid ? prev : prev + 1);
    }

    function handleAltTextChange(e) {
        let isValid = true;
        const isRequired = image != false;

        if (isRequired) {
            isValid = isRequired && e.target.value != false;

        }

        setHasAltText(isValid);
        setErrorCount(prev => isValid ? prev : prev + 1);
        e.target.setAttribute('aria-invalid', !isValid);
        imageInput.setAttribute('aria-required', isRequired);

        if (e.target.value) {
            setAltText(e.target.value);
        } 

        imageRef.current.setAttribute('aria-required', isRequired);
    }

    changePricePlaceholder(e) {
        const priceLabel = document.getElementById('service-price-label');

        if (e.target.value == 'Deutsch') {
            priceLabel.innerHTML = 'Preis (z.B. 1 000 EUR) *';
        
        } else {
            priceLabel.innerHTML = 'Pris (t.ex. 1 000 :-) *';
        }
    }

    /*
    validateName(e) {
        if (!e.target.value) {
            this.setState({
                errorCountName: 1,
                nameEmpty:      'Du måste ange ett namn.',
            })

            e.target.setAttribute('aria-invalid', true);
            
        }
    }

    validatePrice(e) {
        if (!e.target.value) {
            this.setState({
                errorCountPrice: 1,
                priceEmpty:      'Du måste ange ett pris.',
            })

            e.target.setAttribute('aria-invalid', true);
            
        }
    }

    validateDescription(e) {
        if (!e.target.value) {
            this.setState({
                errorCountDescription: 1,
                descriptionEmpty:      'Du måste skriva en beskrivning.',
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
            localStorage.setItem('actionServices', action);

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
                    
                    localStorage.setItem('imageUrlServices', service.imageUrl);

                    if (service.language == 'german') {
                        languageInput.value = 'Deutsch';

                    } else {
                        languageInput.value = 'Svenska';
                    }
                }
            })
            
            nameInput.focus();
        
        } else if (e.target.id.indexOf('delete') >= 0) {
            document.getElementById('reset-btn').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

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

        if (this.validateForm()) {
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

            if (!localStorage.getItem('actionServices')) {
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

            if (localStorage.getItem('actionServices') == 'edit') {
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
                    if (localStorage.getItem('imageUrlServices')) {
                        body.imageUrl = localStorage.getItem('imageUrlServices');
                    }

                    this.props.put(localStorage.getItem('id'), body);
                    localStorage.removeItem('imageUrlServices');
                }
            }

            this.form.current.reset();
            document.getElementById('reset-btn').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        
        }
    }

    /* Här valideras uppgifterna. För varje uppgift som saknas,
        skrivs ett felmeddelande ut under inmatningsfältet.
        För bilder kontrolleras även storleken och filformatet. */
    validateForm() {
        const nameInput        = document.getElementById('service-name-input');
        const priceInput       = document.getElementById('service-price-input');
        const descriptionInput = document.getElementById('service-description-input');
        const imageInput       = document.getElementById('image-upload-input')
        const altTextInput     = document.getElementById('alt-text-input');

        if (!nameInput.value) {
            this.setState({
                error:          true,
                errorCountName: 1,
                nameEmpty:      'Du måste ange ett namn.',
            })

            nameInput.setAttribute('aria-invalid', true);
            
        
        } else {
            this.setState({
                errorCountName: 0,
                nameEmpty:      '',
            })

            nameInput.setAttribute('aria-invalid', false);
        }

        if (!priceInput.value) {
            this.setState({
                error:           true,
                errorCountPrice: 1,
                priceEmpty:      'Du måste ange ett pris.',
            })

            priceInput.setAttribute('aria-invalid', true);
            
        
        } else {
            this.setState({
                errorCountPrice: 0,
                priceEmpty:      '',
            })

            priceInput.setAttribute('aria-invalid', false);
        }

        if (!descriptionInput.value) {
            this.setState({
                error:                 true,
                errorCountDescription: 1,
                descriptionEmpty:      'Du måste skriva en beskrivning.',
            })

            descriptionInput.setAttribute('aria-invalid', true);
            
        
        } else {
            this.setState({
                errorCountDescription: 0,
                descriptionEmpty:      '',
            })

            descriptionInput.setAttribute('aria-invalid', false);
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

        if (nameInput.value !== '' && priceInput.value !== '' && descriptionInput.value !== ''
            && !imageInput.value) {

            this.setState({
                error: false,
            })

            
            return true;
    
        } else if (nameInput.value !== '' && priceInput.value !== '' && descriptionInput.value !== ''
            && imageInput.value !== '' && altTextInput.value !== '') {

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
        })
    }
}

// Exporterar komponenten
export default Services;