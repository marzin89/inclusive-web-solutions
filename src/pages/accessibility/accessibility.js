import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import StaticSwedish from './static-swedish';
import StaticGerman from './static-german';
import { useEffect } from 'react';

function Accessibility(props) {
    const mainPage    = props.language == 'Swedish' ? 'Start' : 'Home';
    const currentPage = props.language == 'Swedish' ? 'Om webbtillgänglighet' : 'Barrierefreiheit';

    const breadcrumbs =
    [
        {
            page: mainPage,
            path: '/',
            isCurrentPage: false,
        },
        {
            page: currentPage,
            path: '/accessibility',
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
            {props.language == 'Swedish' ? <StaticSwedish /> : <StaticGerman />}
        </main>
    );
}

export default Accessibility;