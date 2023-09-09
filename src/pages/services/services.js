import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Tests from './tests';
import Solutions from './solutions';
import Courses from './courses';
import { useEffect } from 'react';

function Services(props) {
    const mainPage    = props.language == 'Swedish' ? 'Start' : 'Home';
    const currentPage = props.language == 'Swedish' ? 'Tjänster' : 'Dienstleistungen';
    const linkText    = props.language == 'Swedish' ? 'Läs mer' : 'Mehr';

    const breadcrumbs =
    [
        {
            page: mainPage,
            path: '/',
            isCurrentPage: false,
        },
        {
            page: currentPage,
            path: '/services',
            isCurrentPage: true,
        }
    ];

    useEffect(() => {
        document.title = currentPage;
    });

    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} currentPage={currentPage}
                language={props.language} />
            <section id="services">
                <h1 id="main" className="h1-font-size">{currentPage}</h1>
                <Tests language={props.language} linkText={linkText} />
                <Solutions language={props.language} linkText={linkText} />
                <Courses language={props.language} linkText={linkText} />
            </section>
        </main>
    );
}

export default Services;