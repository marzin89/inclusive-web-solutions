import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Navbar from '../../components/navbar/navbar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Test(props) {
    const service = useSelector((state) => {
        if (props.service == 'test') {
            return state.test.test;
        
        } else if (props.service == 'solution') {
            return state.solution.solution;
        
        } else {
            return state.course.course;
        }
    });
    const mainPage     = props.language == 'Swedish' ? 'Start' : 'Home';
    const firstSubPage = props.language == 'Swedish' ? 'Tjänster' : 'Dienstleistungen';
    let ariaLabel;

    if (props.language == 'Swedish') {
        ariaLabel = service.imageUrl ? 'Pris, beskrivning och bild' : 'Pris och beskrivning';
    
    } else {
        ariaLabel = service.imageUrl ? 'Preis, Beschreibung und Bild' : 'Preis und Beschreibung';
    }

    const breadcrumbs =
    [
        {
            page: mainPage,
            path: '/',
            isCurrentPage: false,
        },
        {
            page: firstSubPage,
            path: '/services',
            isCurrentPage: false,
        },
        {
            page: service.name,
            path: `/${props.service}`,
            isCurrentPage: true,
        }
    ];

    useEffect(() => {
        document.title = service.name;
    });

    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} currentPage={service.name}
                language={props.language} />  
            <div id="subpage">
                <Navbar service={props.service} language={props.language} id={service.id} />
                <div id="subpage-right">
                    <section id="subpage-content">
                        <h1 id="main" className="h1-font-size">{service.name}</h1>
                        <div role="article" aria-label={ariaLabel}>
                            <p className="price regular-font-size">{service.price}</p>
                            <p className="body-text regular-font-size line-height">{service.description[0]}</p>
                            <img src={service.imageUrl} alt={service.altText}></img>
                            {service.description.length > 0 ? service.description.slice(1).map((paragraph, index) => {
                                return (
                                    <p key={index} className="body-text regular-font-size line-height">{paragraph}</p>
                                );
                            }) : null}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default Test;