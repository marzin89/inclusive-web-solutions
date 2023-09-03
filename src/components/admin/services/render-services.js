function RenderServices(props) {
    return(
    <div className="admin-output">
        {props.data.map((service) => {
        <article key={service.id}>
            <h3>{service.name}</h3>
            {service.language == 'swedish' ?
            <p className="price">{service.price}</p> :
            <p className="price">Preis: {service.price}</p>}
            <p>{service.description}</p>
            <div>
                <p className="edit"><a id={service.id} className="focus" 
                    href="" onClick={(e) => props.function(e)}>Redigera</a></p>
                <p className="delete"><a id={service.id} className="focus"
                    href="" onClick={(e) => props.function(e)}>Radera</a></p>
            </div>
        </article>
        })};
    </div>
    );
}

export default RenderServices;