function Service(props) {
    return(
    <article key={props.service.id}>
        <h3>{props.service.name}</h3>
        {props.service.language == 'swedish' ?
        <p className="price">{props.service.price}</p> :
        <p className="price">Preis: {props.service.price}</p>}
        <p>{props.service.description}</p>
        <div>
            <p className="edit"><a id={props.service.id} className="focus" 
                href="" onClick={(e) => props.function(e)}>Redigera</a></p>
            <p className="delete"><a id={props.service.id} className="focus"
                href="" onClick={(e) => props.function(e)}>Radera</a></p>
        </div>
    </article>
    );
}

export default Service;