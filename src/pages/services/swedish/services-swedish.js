import Breadcrumbs from '../../../components/breadcrumbs/breadcrumbs';
import TestsSwedish from './tests-swedish';
import SolutionsSwedish from './solutions-swedish';
import CoursesSwedish from './courses-swedish';
import { useEffect } from 'react';

function ServicesSwedish(props) {
    const breadcrumbs =
    [
        {
            page: 'Start',
            path: '/',
            isCurrentPage: false,
        },
        {
            page: 'Tjänster',
            path: '/services',
            isCurrentPage: true,
        }
    ];

    useEffect(() => {
        document.title = 'Tjänster';
    });

    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} currentPage="Tjänster"
                language={props.language} />
            <section id="services">
                <h1 id="main" className="h1-font-size">Tjänster</h1>
                <TestsSwedish />
                <SolutionsSwedish />
                <CoursesSwedish />
            </section>
        </main>
    );
}

export default ServicesSwedish;