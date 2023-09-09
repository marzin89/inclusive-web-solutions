import Breadcrumbs from '../../../components/breadcrumbs/breadcrumbs';
import TestsGerman from './tests-german';
import SolutionsGerman from './solutions-german';
import CoursesGerman from './courses-german';
import { useEffect } from 'react';

function ServicesGerman(props) {
    const breadcrumbs =
    [
        {
            page: 'Home',
            path: '/',
            isCurrentPage: false,
        },
        {
            page: 'Dienstleistungen',
            path: '/services',
            isCurrentPage: true,
        }
    ];


    useEffect(() => {
        document.title = 'Tjänster';
    });

    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} currentPage="Dienstleistungen"  
                language={props.language} />
            <section id="services">
                <h1 id="main" className="h1-font-size">Dienstleistungen</h1>
                <TestsGerman />
                <SolutionsGerman />
                <CoursesGerman />
            </section>
        </main>
    );
}

export default ServicesGerman;