import { useState, useRef } from 'react';

function ServiceForm(props) {
    const formRef                             = useRef();
    const nameRef                             = useRef();
    const priceLabelRef                       = useRef();
    const priceRef                            = useRef();
    const descriptionRef                      = useRef();
    const imageRef                            = useRef();
    const altTextLabelRef                     = useRef();
    const altTextRef                          = useRef();
    const languageRef                         = useRef();
    const resetBtnRef                         = useRef();
    const [hasName, setHasName]               = useState(true);
    const [hasPrice, setHasPrice]             = useState(true);
    const [hasDescription, setHasDescription] = useState(true);
    const [isValidSize, setIsValidSize]       = useState(true);
    const [isValidFormat, setIsValidFormat]   = useState(true);
    const [hasAltText, setHasAltText]         = useState(true);
    const [errorCount, setErrorCount]         = useState(0);
    const [crudAction, setCrudAction]         = useState('post');
    const [id, setId]                         = useState('');

    function handleNameChange() {
        const isValid = nameRef.current.value != false;
        setHasName(isValid);
        setErrorCount(prev => isValid ? prev : prev + 1);
        nameRef.current.setAttribute('aria-invalid', !isValid);
    }

    function handlePriceChange() {
        const isValid = priceRef.current.value != false;
        setHasPrice(isValid);
        setErrorCount(prev => isValid ? prev : prev + 1);
        priceRef.current.setAttribute('aria-invalid', !isValid);
    }

    function handleDescriptionChange() {
        const isValid = descriptionRef.current.value != false;
        setHasDescription(isValid);
        setErrorCount(prev => isValid ? prev : prev + 1);
        descriptionRef.current.setAttribute('aria-invalid', !isValid);
    }

    function handleImageChange() {
        if (!imageRef.current.value) return;

        const isValidSize   = imageRef.current.files[0].size < 500000;
        const isValidFormat = imageRef.current.files[0].type.includes('image');
        const isValid       = isValidSize && isValidFormat;

        setIsValidSize(isValidSize);
        setIsValidFormat(isValidFormat);

        altTextRef.current.style.setAttribute('aria-required', true);
        altTextLabelRef.current.innerHTML = 'Alt-text *';
        imageRef.current.setAttribute('aria-invalid', !isValid);

        setErrorCount(prev => isValid ? prev : prev + 1);
    }

    function handleAltTextChange() {
        let isValid = true;
        const isRequired = imageRef.current.value != false;

        if (isRequired) {
            isValid = isRequired && altTextRef.current.value != false;
        }

        setHasAltText(isValid);
        setErrorCount(prev => isValid ? prev : prev + 1);

        altTextRef.current.setAttribute('aria-invalid', !isValid);
        imageRef.current.setAttribute('aria-required', isRequired);
        imageRef.current.setAttribute('aria-required', isRequired);
    }

    function changePricePlaceholder() {
        priceLabelRef.current.placeholder = languageRef.current.value == 'Deutsch' ? 
            'Preis (z.B. 1 000 EUR) *' : 'Pris (t.ex. 1 000 :-) *'
    }

    function scrollComponent(ref) {
        ref.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    function populateForm(id) {
        const service = props.data.find((element) => element.id == id);

        if (service) {
            nameRef.current.value        = service.name;
            priceRef.current.value       = service.price;
            descriptionRef.current.value = service.description;
            altTextRef.current.value     = service.altText;  
            languageRef.current.value    = service.language == 'german' ? 'Deutsch' : 'Svenska';
        }
        
        nameRef.focus();
    }

    function handleLinkClick(e) {
        e.preventDefault();
        setCrudAction(e.target.className);
        scrollComponent(e.target.className == 'edit' ? formRef : resetBtnRef);
        setId(e.target.id);

        if (e.target.className == 'edit') {
            populateForm(e.target.id);
        
        } else {  
            localStorage.setItem('searchId', getForeignKey());
            props.delete(id);
        }
    }

    function getForeignKey() {
        let service = this.props.service.slice(0, -1);
        const foreignKey = props.search.find((page) => page.foreignKey.indexOf(id) >= 0);
        return foreignKey;
    }

    function handleSubmit() {
        if (isValid()) {
            let date            = new Date().toLocaleDateString('sv-SE', {timeZone: 'CET'});
            const hasLineBreaks = descriptionRef.current.value.indexOf("\n\n") > 0;
            let description     = hasLineBreaks ? descriptionRef.current.value.split("\n\n") : 
                descriptionRef.current.value;
            const language      = languageRef.current.value == 'Svenska' ? 'swedish' : 'german';
            let path            = `/${this.props.service.slice(0, -1)}`;
            let folder          = this.props.service;
            let imageUrl;
            let publicId;

            if (imageRef.current.files[0]) {
                let name      = imageInput.files[0].name.slice(0, imageInput.files[0].name.indexOf('.'));
                let extension = imageInput.files[0].name.slice(imageInput.files[0].name.indexOf('.'));            
                publicId      = name;
                imageUrl      = `https://res.cloudinary.com/inclusivewebsolutions/image/upload/${folder}/${publicId}${extension}`;
                body.imageUrl = imageUrl;               
                this.upload(imageInput.files[0], name);
            }

            const body = {
                name:        nameRef.current.value,
                price:       priceRef.current.value,
                description: description,
                imageUrl:    imageUrl,
                altText:     altTextRef.current.value,
                language:    language,
                path:        path,
                updated:     date, 
            }

            if (crudAction == 'post') {
                props.post(body);
            
            } else {
                localStorage.setItem('searchId', getForeignKey());
                props.put(id, body)
            }

            formRef.current.reset();
            scrollComponent(resetBtnRef);
        }
    }

    function isValid() {
        handleNameChange();
        handlePriceChange();
        handleDescriptionChange();
        handleImageChange();
        handleAltTextChange();       
        return errorCount == 0;
    }

    return (
        <section id="admin-form">
            {errorCount ? <p className="text h2-error h3-font-size" role="alert">
                Formuläret innehåller {errorCount} fel</p> : null}
            <form ref={formRef} onSubmit={() => handleSubmit()}>
                <p>Fält märkta med * är obligatoriska.</p>
                <div className="form-left">
                    <label htmlFor="service-name-input">Namn *</label>
                    <input id="service-name-input" className="focus text-input-main admin-input admin-input-required" 
                        type="text" aria-required="true" aria-describedby="service-name-error" 
                        autoComplete='on' onChange={() => handleNameChange()}>
                    </input>
                    {!hasName ? <p id="service-name-error" className="error" role="alert">
                        Du måste ange ett namn.</p> : null}
                </div>
                <div className="form-right">
                    <label id="service-price-label" htmlFor="service-price-input">Pris (t.ex. 1 000 :-) *</label>
                    <input id="service-price-input" className="focus text-input-main admin-input admin-input-required" 
                        type="text" aria-required="true" aria-describedby="service-price-error" 
                        autoComplete='on' ref={priceLabelRef} onChange={() => handlePriceChange()}></input>
                    {!hasPrice ? <p id="service-price-error" className="error" role="alert">
                        Du måste ange ett pris.</p> : null}
                </div>
                <label htmlFor="service-description-input">Beskrivning *</label>
                <textarea id="service-description-input" className="focus admin-input admin-input-required"
                    aria-required="true" aria-describedby="service-description-error" 
                    autoComplete='on' onChange={() => handleDescriptionChange()}></textarea>
                {!hasDescription ? <p id="service-description-error" className="error" role="alert">
                    Du måste skriva en beskrivning.</p> : null}
                <label htmlFor="language-switcher-admin">Språk *</label>
                <select id="language-switcher-admin" className="focus text-input-main admin-input" 
                    aria-required="true" ref={languageRef} onChange={() => changePricePlaceholder()}>
                    <option value="Svenska">Svenska</option>
                    <option value="Deutsch">Deutsch</option>
                </select>
                <label htmlFor="image-upload-input">Ladda upp en bild</label>
                <p>Max 500 kB. Endast JPG/JPEG eller PNG.</p>
                <input id="image-upload-input" className="focus admin-input" type="file" 
                    aria-required="false" aria-describedby="image-size-error image-format-error" 
                    ref={imageRef} onChange={() => handleImageChange()}></input>
                {!isValidSize ? <p id="image-size-error" className="error" role="alert">
                    Bilden är för stor.</p> : null}
                {!isValidFormat ? <p id="image-format-error" className="error" role="alert">
                    Bilden har fel filformat.</p> : null}
                <label id="alt-text-label" htmlFor="alt-text-input" ref={altTextLabelRef}>Alt-text</label>
                <input id="alt-text-input" className="focus text-input-main admin-input" type="text" 
                    aria-required="false" aria-describedby="alt-text-error" onChange={() => handleAltTextChange()}
                    autoComplete='on' ref={altTextRef}></input>
                {!hasAltText ? <p id="alt-text-error" className="error" role="alert">
                    Du måste skriva en alt-text.</p> : null}
                <button type="reset" id="reset-btn" className="reset-btn" ref={resetBtnRef}>Rensa</button>
                <button type="submit" className="submit-btn">Skicka</button>
            </form>
            {props.errorMessage ? <p className="error" role="alert">{props.errorMessage}</p> : null}
            {props.confirmMessage ? <p className="confirm" role="alert">{props.confirmMessage}</p> : null}
        </section>
    );
}

export default ServiceForm;