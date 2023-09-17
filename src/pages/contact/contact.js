import { useEffect } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import FormSwedish from './form-swedish';
import FormGerman from './form-german';

function Contact(props) {
    const mainPage = props.language == 'Swedish' ? 'Start' : 'Home';

    const breadcrumbs =
    [
        {
            page: mainPage,
            path: '/',
            isCurrentPage: false,
        },
        {
            page: 'Kontakt',
            path: '/contact',
            isCurrentPage: true,
        }
    ];

    useEffect(() => {
        document.title = 'Kontakt';
    });

    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} currentPage={'Kontakt'}
                language={props.language} />
            {props.language == 'Swedish' ? <FormSwedish /> : <FormGerman />}
        </main>
    );
}

export default Contact;