// Imports
import React from 'react';
import {Link} from 'react-router-dom';
import Services from '../../components/admin/services/services';
import Posts from '../../components/admin/posts/posts';
import Users from '../../components/admin/users/users';
import Comments from '../../components/admin/comments/comments';
import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/to-have-accessible-description';

const buttons = document.getElementsByClassName('admin-btn');
let userPosts = [];

// Admin
class Admin extends React.Component {

    // Konstruktor med props
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState             = this.setState.bind(this);
        this.handleBtnClick       = this.handleBtnClick.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.getSearch            = this.getSearch.bind(this);
        this.addSearch            = this.addSearch.bind(this);
        this.updateSearch         = this.updateSearch.bind(this);
        this.deleteSearch         = this.deleteSearch.bind(this);
        this.getTests             = this.getTests.bind(this);
        this.getSolutions         = this.getSolutions.bind(this);
        this.getCourses           = this.getCourses.bind(this);
        this.getAllPosts          = this.getAllPosts.bind(this);
        this.getContributorPosts  = this.getContributorPosts.bind(this);
        this.getComments          = this.getComments.bind(this);
        this.addTest              = this.addTest.bind(this);
        this.addSolution          = this.addSolution.bind(this);
        this.addCourse            = this.addCourse.bind(this);
        this.addPost              = this.addPost.bind(this);
        this.addUser              = this.addUser.bind(this);
        this.updateTest           = this.updateTest.bind(this);
        this.updateSolution       = this.updateSolution.bind(this);
        this.updateCourse         = this.updateCourse.bind(this);
        this.updatePost           = this.updatePost.bind(this);
        this.updateUser           = this.updateUser.bind(this);
        this.deleteTest           = this.deleteTest.bind(this);
        this.deleteSolution       = this.deleteSolution.bind(this);
        this.deleteCourse         = this.deleteCourse.bind(this);
        this.deletePost           = this.deletePost.bind(this);
        this.deleteUser           = this.deleteUser.bind(this);
        this.deleteComment        = this.deleteComment.bind(this);
        this.publishComment       = this.publishComment.bind(this);
        this.publishPost          = this.publishPost.bind(this);
        this.handleLogout         = this.handleLogout.bind(this);
        this.handlePageTitle      = this.handlePageTitle.bind(this);
        this.handleLinkClick      = this.handleLinkClick.bind(this);

        this.state = {
            username:           this.props.username,
            userRole:           this.props.userRole,
            component:          localStorage.getItem('component'),
            search:             [],
            tests:              [],
            solutions:          [],
            courses:            [],
            posts:              [],
            userPosts:          [],
            users:              [],
            comments:           [],
            error:              false,
            confirm:            false,
        }

        this.getSearch();
        this.getTests();
        this.getSolutions();
        this.getCourses();
        this.getAllPosts();
        this.getContributorPosts();
        this.getUsers();
        this.getComments();
    }

    // Rendrering
    render() {
        return (
            <main id="main">
                <div className="row">
                    {/* Länkstig */}
                    <nav className="breadcrumbs" aria-label="Länkstig">
                        <ul>
                            <li><Link className="inactive-breadcrumb focus" to={"/"}>Start</Link>/</li>
                            <li><Link className="active-breadcrumb focus" to={"/admin"}> Admin</Link></li>
                        </ul>
                    </nav>
                    <p id="logout"><Link className="focus" to={"/login"} onClick={this.handleLogout}>Logga ut</Link></p>
                </div>
                <h1>Admin</h1>
                {/* Huvudmenyns utseende varierar beroende på användarens behörighet */}
                {this.state.userRole == 'Medarbetare' ?
                <div className="admin-menu">
                    <p>Här kan du administrera 
                    webbplatsens innehåll. Välj kategori
                    med hjälp av knapparna nedan. 
                    Gränssnittet anpassas efter den valda 
                    kategorin.</p>
                    {/* Medarbetare */}
                    <div className="row">
                        <button id="tests" className="focus admin-btn admin-btn-left" 
                            aria-label="Visar formuläret för tester samt befintliga tester" 
                            aria-pressed="false" onClick={this.handleBtnClick}>
                                Tester</button>
                        <button id="solutions" className="focus admin-btn admin-btn-right" 
                            aria-label="Visar formuläret för utvecklingspaket samt befintliga utvecklingspaket"
                            aria-pressed="false" onClick={this.handleBtnClick}>
                                Utveckling</button>
                    </div>
                    <div className="row">
                        <button id="courses" className="focus admin-btn admin-btn-left" 
                            aria-label="Visar formuläret för utbildningar samt befintliga utbildningar"
                            aria-pressed="false" onClick={this.handleBtnClick}>
                                Utbildningar</button>
                        <button id="posts" className="focus admin-btn admin-btn-right" 
                            aria-label="Visar formuläret för inlägg samt befintliga inlägg"
                            aria-pressed="false" onClick={this.handleBtnClick}>
                                Inlägg</button>
                    </div>
                    <div className="row">
                        <button id="comments" className="focus admin-btn admin-btn-left" 
                            aria-label="Visar befintliga kommentarer" 
                            aria-pressed="false" onClick={this.handleBtnClick}>
                                Kommentarer</button>
                        <button id="users" className="focus admin-btn admin-btn-right" 
                            aria-label="Visar formuläret för användare samt befintliga användare" 
                            aria-pressed="false" onClick={this.handleBtnClick}>
                                Användare</button>
                    </div>
                </div> 
                :
                // Gästskribenter
                <section className="admin-menu">
                    <p>Här kan du administrera 
                    webbplatsens innehåll. Välj kategori
                    med hjälp av knapparna nedan. 
                    Gränssnittet anpassas efter den valda 
                    kategorin.</p>
                    <button id="posts" className="focus admin-btn admin-btn-contributors" 
                        aria-label="Visar formuläret för inlägg samt befintliga inlägg" 
                        aria-pressed="false" onClick={this.handleBtnClick}>
                            Inlägg</button>
                </section>
                }
                {/* Formulär för att lägga till och redigera tjänster, användare, inlägg och kommentarer.
                    Vilket formulär som visas beror på vilket val som gjorts i menyn ovan. 
                    Data i form av poster och eventuella felmeddelanden skickas med i props. */}
                
                {this.state.component == 'tests' && this.state.userRole  == 'Medarbetare' ? 
                    <Services service="tests" data={this.state.tests} search={this.state.search} 
                    post={this.addTest} delete={this.deleteTest} put={this.updateTest} /> : null}
                {this.state.component == 'solutions' && this.state.userRole == 'Medarbetare' ? 
                    <Services service="solutions" data={this.state.solutions} search={this.state.search}
                    post={this.addSolution} delete={this.deleteSolution} put={this.updateSolution} /> : null}
                {this.state.component == 'courses' && this.state.userRole == 'Medarbetare' ? 
                    <Services service="courses" data={this.state.courses} search={this.state.search} 
                    post={this.addCourse} delete={this.deleteCourse} put={this.updateCourse} /> : null}
                {this.state.component == 'posts' ? <Posts posts={this.state.userRole == 'Medarbetare' ? 
                    this.state.posts : this.state.userPosts} search={this.state.search} 
                    username={this.state.username} userRole={this.state.userRole} post={this.addPost} 
                    delete={this.deletePost} publish={this.publishPost} put={this.updatePost} /> : null}
                {this.state.component == 'users' && this.state.userRole == 'Medarbetare' ? <Users 
                    users={this.state.users} post={this.addUser} delete={this.deleteUser} 
                    errorMessage={this.state.errorUsers} put={this.updateUser} 
                    confirmMessage={this.state.confirmUsers}/> : null}
                {this.state.component == 'comments' && this.state.userRole == 'Medarbetare' ? 
                    <Comments comments={this.state.comments} publish={this.publishComment} 
                    delete={this.deleteComment} errorMessage={this.state.errorComments} 
                    confirmMessage={this.state.confirmComments}/> : null}
            </main>
        )
    }

    // Kör funktionen nedan och hämtar alla poster inom den valda kategorin
    handleBtnClick(e) {
        this.handleCategoryChange(e);
    }

    // Funktionen anpassar gränssnittet (via state) samt knapparnas utseende och aria-pressed 
    handleCategoryChange(e) {
        const id = e.target.id;

        localStorage.setItem('component', id);
        localStorage.removeItem('error');
        localStorage.removeItem('errorTests');
        localStorage.removeItem('confirmTests');
        localStorage.removeItem('errorSolutions');
        localStorage.removeItem('confirmSolutions');
        localStorage.removeItem('errorCourses');
        localStorage.removeItem('confirmCourses');
        localStorage.removeItem('errorPosts');
        localStorage.removeItem('confirmPosts');
        localStorage.removeItem('errorUsers');
        localStorage.removeItem('confirmUsers');
        localStorage.removeItem('errorComments');
        localStorage.removeItem('confirmComments');

        this.setState({
            component: id,
        })

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].id == id) {
                buttons[i].style.color           = '#517788';
                buttons[i].style.backgroundColor = 'white';
                buttons[i].style.border          = '2px solid #517788';

                buttons[i].setAttribute('aria-pressed', true);

            } else {
                buttons[i].style.color           = 'white';
                buttons[i].style.backgroundColor = '#517788';
                buttons[i].style.border          = '1px solid #517788';

                buttons[i].setAttribute('aria-pressed', false);
            }
        }
    }

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Admin');
        localStorage.setItem('pageGerman', 'Admin');
        document.title = 'Admin';

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].id == this.state.component) {
                buttons[i].style.color           = '#517788';
                buttons[i].style.backgroundColor = 'white';
                buttons[i].style.border          = '2px solid #517788';

                buttons[i].setAttribute('aria-pressed', true);

            } else {
                buttons[i].style.color           = 'white';
                buttons[i].style.backgroundColor = '#517788';
                buttons[i].style.border          = '1px solid #517788';

                buttons[i].setAttribute('aria-pressed', false);
            }
        }
    }

    getSearch() {
        fetch('https://iws-rest-api.herokuapp.com/search')
        .then(response => response.json())
        .then((data) => {
            let searchArr = data;
            searchArr.sort((a, b) => {
                return a.id - b.id;
            })

            this.setState({
                search: searchArr,
            })
        })
    }

    // Funktionen hämtar alla tester
    getTests() {

        // GET-anrop till webbtjänsten om användaren har tryckt på Tester
        fetch('https://iws-rest-api.herokuapp.com/tests/admin')

        // Konverterar svaret från JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga tester hittades
        .then(data => {
            if (!data.length) {
                localStorage.setItem('errorTests', 'Inga tester hittades.');

                this.setState({
                    error:      true,
                })
            
            // Lagrar testerna i state-arrayen
            } else {
                localStorage.removeItem('errorTests');

                this.setState({
                    error:      false,
                    tests:      data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => { 
            localStorage.setItem('errorTests', 'Ett serverfel har uppstått. Det gick inte att hämta tester.' 
            + 'Försök igen lite senare.');

            this.setState({
                error:      true,
            })
        })
    }

    // Funktionen hämtar alla anpassningar
    getSolutions() {

        // GET-anrop till webbtjänsten om användaren har tryckt på Anpassningar
        fetch('https://iws-rest-api.herokuapp.com/solutions/admin')

        // Konverterar svaret från JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga anpassningar hittades
        .then(data => {
            if (!data.length) {
                localStorage.setItem('errorSolutions', 'Inga utvecklingspaket hittades.');

                this.setState({
                    error:          true,
                })
            
            // Lagrar anpassningarna i state-arrayen
            } else {
                localStorage.removeItem('errorSolutions');

                this.setState({
                    error:          false,
                    solutions:      data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => { 
            localStorage.setItem('errorSolutions', 'Ett serverfel har uppstått. Det gick inte att hämta utvecklingspaket.' 
            + 'Försök igen lite senare.');

            this.setState({
                error:          true,
            })
        })
    }

    // Funktionen hämtar alla utbildningar
    getCourses() {

        // GET-anrop till webbtjänsten om användaren har tryckt på Utbildningar
        fetch('https://iws-rest-api.herokuapp.com/courses/admin')

        // Konverterar svaret från JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga utbildningar hittades
        .then(data => {
            if (!data.length) {
                localStorage.setItem('errorCourses', 'Inga utbildningar hittades.');

                this.setState({
                    error:        true,
                })
            
            // Lagrar utbildningarna i state-arrayen
            } else {
                localStorage.removeItem('errorCourses');

                this.setState({
                    error:        false,
                    courses:      data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => {
            localStorage.setItem('errorCourses', 'Ett serverfel har uppstått. Det gick inte att hämta utbildningar.' 
            + 'Försök igen lite senare.');
            
            this.setState({
                error:        true,
            })
        })
    }

    // Funktionen hämtar alla inlägg
    getAllPosts() {
        /* GET-anrop till webbtjänsten om användaren har tryckt på Inlägg och 
            har full behörighet */
        fetch('https://iws-rest-api.herokuapp.com/posts/admin')

        // Konverterar svaret från JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga inlägg hittades
        .then(data => {
            if (!data.length) {
                localStorage.setItem('errorPosts', 'Inga inlägg hittades.');

                this.setState({
                    error:      true,
                })
            
            // Lagrar inläggen i state-arrayen
            } else {
                localStorage.removeItem('errorPosts');

                this.setState({
                    error:      false,
                    posts:      data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => {
            localStorage.setItem('errorPosts', 'Ett serverfel har uppstått. Det gick inte att hämta inlägg.' 
                + 'Försök igen lite senare.');

            this.setState({             
                error:      true,
            })
        })
    }

    // Funktionen hämtar gästskribentens inlägg
    getContributorPosts() {
        if (this.state.userRole == 'Gästskribent') {

            /* GET-anrop till webbtjänsten om användaren har tryckt på Inlägg och 
                är gästskribent */
            fetch(`https://iws-rest-api.herokuapp.com/posts/admin/user/${this.state.username}`)

            // Konverterar svaret från JSON
            .then(response => response.json())

            // Skriver ut ett felmeddelande om inga inlägg hittades
            .then(data => {
                localStorage.setItem('errorPosts', 'Inga inlägg hittades.');

                if (!data.length) {
                    this.setState({
                        error:      true,
                    })
                
                // Lagrar inläggen i state-arrayen
                } else {
                    localStorage.removeItem('errorPosts');

                    this.setState({
                        error:      false,
                        userPosts:  data,
                    })
                }
            })

            // Skriver ut ett felmeddelande om ett serverfel har uppstått
            .catch(() => {
                localStorage.setItem('errorPosts', 'Ett serverfel har uppstått. Det gick inte att hämta inlägg.' 
                + 'Försök igen lite senare.');

                this.setState({
                    error:      true,
                })
            })
        }
    }

    // Funktionen hämtar alla användare
    getUsers() {

        // if (this.state.userRole == 'Medarbetare') {

            /* GET-anrop till webbtjänsten om användaren har tryckt på Användare och 
                har full behörighet */
            fetch('https://iws-rest-api.herokuapp.com/users/password/tbbA=!vYzT99*,;oGSi8')

            // Konverterar svaret från JSON
            .then(response => response.json())

            // Skriver ut ett felmeddelande om inga användare hittades
            .then(data => {
                if (!data.length) {
                    localStorage.setItem('errorUsers', 'Inga användare hittades.');

                    this.setState({
                        error:      true,
                    })
                
                // Lagrar användarna i state-arrayen
                } else {
                    localStorage.removeItem('errorUsers');

                    this.setState({
                        error:      false,
                        users:      data,
                    })
                }
            })

            // Skriver ut ett felmeddelande om ett serverfel har uppstått
            .catch(() => {
                localStorage.setItem('errorUsers', 'Ett serverfel har uppstått. Det gick inte att hämta användare.' 
                + 'Försök igen lite senare.');

                this.setState({
                    error:      true,
                })
            })
        // }
    }

    // Funktionen hämtar alla kommentarer
    getComments() {

        /* GET-anrop till webbtjänsten om användaren har tryckt på Kommentarer och 
            har full behörighet */
        fetch('https://iws-rest-api.herokuapp.com/comments/admin')

        // Konverterar svaret från JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga kommentarer hittades
        .then(data => {
            if (!data.length) {
                localStorage.setItem('errorComments', 'Inga kommentarer hittades.');

                this.setState({
                    error:         true,
                })
            
            // Lagrar kommentarerna i state-arrayen
            } else {
                localStorage.removeItem('errorComments');

                this.setState({
                    error:         false,
                    comments:      data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => { 
            localStorage.setItem('errorComments', 'Ett serverfel har uppstått. Det gick inte att hämta kommentarer.' 
            + 'Försök igen lite senare.');

            this.setState({
                error:         true,
            })
        })
    }

    addSearch(body) {
        if (this.state.search.length) {
            body.foreignKey = body.path.slice(1) + body.id;
            body.id = this.state.search[this.state.search.length - 1].id + 1;
        }

        fetch('https://iws-rest-api.herokuapp.com/search/password/tbbA=!vYzT99*,;oGSi8', {
            method:  'POST',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
    }

    /* Funktionen lägger till tester i databasen. De två efterföljande
        funktionerna har exakt samma struktur och flöde. */
    addTest(body) {
        if (!localStorage.getItem('error')) {
            if (this.state.tests.length) {
                let testArr = this.state.tests;
                testArr.sort((a, b) => {
                    return a.id - b.id;
                })

                body.id = testArr[testArr.length - 1].id + 1;

            } else {
                body.id = 1;
            }


            fetch('https://iws-rest-api.herokuapp.com/tests/password/tbbA=!vYzT99*,;oGSi8', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(body),
            })
            .then(response => response.json())
            .then(() => {
                localStorage.removeItem('errorTests');
                localStorage.setItem('confirmTests', 'Testet har lagts till.');
                window.location.reload();

                this.setState({
                    error:      false,
                })
            })
            .catch(() => {
                localStorage.setItem('errorTests', 'Ett serverfel har uppstått. Det gick inte att lägga till testet. ' 
                + 'Försök igen lite senare.');

                this.setState({
                    error:      true,
                })
            })

            this.addSearch(body);
        }
    }

    addSolution(body) {
        if (!localStorage.getItem('error')) {
            if (this.state.solutions.length) {
                let solutionArr = this.state.solutions;
                solutionArr.sort((a, b) => {
                    return a.id - b.id;
                })

                body.id = solutionArr[solutionArr.length - 1].id + 1;

            } else {
                body.id = 1;
            }

            fetch('https://iws-rest-api.herokuapp.com/solutions/password/tbbA=!vYzT99*,;oGSi8', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(body),
            })
            .then(response => response.json())
            .then(() => {
                localStorage.removeItem('errorSolutions');
                localStorage.setItem('confirmSolutions', 'Utvecklingspaketet har lagts till.');
                window.location.reload();

                this.setState({
                    error:          false,
                })
            })
            .catch(() => {
                localStorage.setItem('errorSolutions', 'Ett serverfel har uppstått. Det gick inte att lägga till utvecklingspaketet. ' 
                + 'Försök igen lite senare.');

                this.setState({
                    error:          true,
                })
            })

            this.addSearch(body);
        }
    }

    addCourse(body) {
        if (!localStorage.getItem('error')) {
            if (this.state.courses.length) {
                let courseArr = this.state.courses;
                courseArr.sort((a, b) => {
                    return a.id - b.id;
                })

                body.id = courseArr[courseArr.length - 1].id + 1;

            } else {
                body.id = 1;
            }

            fetch('https://iws-rest-api.herokuapp.com/courses/password/tbbA=!vYzT99*,;oGSi8', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(body),
            })
            .then(response => response.json())
            .then(() => {
                localStorage.removeItem('errorCourses');
                localStorage.setItem('confirmCourses', 'Utbildningen har lagts till.');
                window.location.reload();

                this.setState({
                    error:        false,
                })
            })
            .catch(() => {
                localStorage.setItem('errorCourses', 'Ett serverfel har uppstått. Det gick inte att lägga till utbildningen. ' 
                + 'Försök igen lite senare.');

                this.setState({
                    error:        true,
                })
            })

            this.addSearch(body);
        }
    }

    addPost(body) {
        if (!localStorage.getItem('error')) {
            if (this.state.posts.length) {
                let postArr = this.state.posts;
                postArr.sort((a, b) => {
                    return a.id - b.id;
                })

                body.id = postArr[postArr.length - 1].id + 1;

            } else {
                body.id = 1;
            }

            fetch('https://iws-rest-api.herokuapp.com/posts/password/tbbA=!vYzT99*,;oGSi8', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(body),
            })
            .then(response => response.json())
            .then(() => {
                localStorage.removeItem('errorPosts');
                localStorage.setItem('confirmPosts', 'Inlägget har lagts till.');

                window.location.reload();

                this.setState({
                    error:      false,
                })
            })
            .catch(() => {
                localStorage.setItem('errorPosts', 'Ett serverfel har uppstått. Det gick inte att lägga till inlägget. ' 
                + 'Försök igen lite senare.');

                this.setState({
                    error:      true,
                })
            })
        }
    }

    addUser(body) {
        if (this.state.users.length) {
            let userArr = this.state.users;
            userArr.sort((a, b) => {
                return a.id - b.id;
            })

            body.id = userArr[userArr.length - 1].id + 1;

        } else {
            body.id = 1;
        }

        fetch('https://iws-rest-api.herokuapp.com/users/password/tbbA=!vYzT99*,;oGSi8', {
            method:  'POST',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
        .then(response => response.json())
        .then(() => {
            localStorage.removeItem('errorUsers');
            localStorage.setItem('confirmUsers', 'Användaren har lagts till.');

            window.location.reload();

            this.setState({
                error:      false,
            })
        })
        .catch(() => {
            localStorage.setItem('errorUsers', 'Ett serverfel har uppstått. Det gick inte att lägga till användaren. ' 
            + 'Försök igen lite senare.');

            this.setState({
                error:      true, 
            })
        })
    }

    updateTest(id, body) {
        if (!localStorage.getItem('error')) {
            fetch(`https://iws-rest-api.herokuapp.com/tests/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(body),
            })
            .then(response => response.json())
            .then(() => {
                localStorage.removeItem('action');
                localStorage.removeItem('errorTests');
                localStorage.setItem('confirmTests', 'Testet har uppdaterats.');
                window.location.reload();

                this.setState({
                    confirm:      true,
                    error:        false,
                })
            })
            .catch(() => {
                localStorage.removeItem('action');
                localStorage.setItem('errorTests', 'Ett serverfel har uppstått. Det gick inte att uppdatera testet. ' 
                + 'Försök igen lite senare.');

                this.setState({
                    error:      true,
                })
            })

            this.updateSearch(body);
        }
    }

    updateSolution(id, body) {
        if (!localStorage.getItem('error')) {
            fetch(`https://iws-rest-api.herokuapp.com/solutions/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(body),
            })
            .then(response => response.json())
            .then(() => {
                localStorage.removeItem('action');
                localStorage.removeItem('errorSolutions');
                localStorage.setItem('confirmSolutions', 'Utvecklingspaketet har uppdaterats.');
                window.location.reload();

                /* Lägger till den nya tjänsten is arrayen (utanför komponenten)
                    och uppdaterar sedan state-arrayen */
                this.setState({
                    confirm:          true,
                    error:            false,
                })
            })
            .catch(() => {
                localStorage.removeItem('action');
                localStorage.setItem('errorSolutions', 'Ett serverfel har uppstått. Det gick inte att uppdatera utvecklingspaketet. ' 
                + 'Försök igen lite senare.');

                this.setState({
                    error:          true,
                })
            })
        }

        this.updateSearch(body);
    }

    updateCourse(id, body) {
        if (!localStorage.getItem('error')) {
            fetch(`https://iws-rest-api.herokuapp.com/courses/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(body),
            })
            .then(response => response.json())
            .then(() => {
                localStorage.removeItem('action');
                localStorage.removeItem('errorCourses');
                localStorage.setItem('confirmCourses', 'Utbildningen har uppdaterats.');

                window.location.reload();

                let courseArr = this.state.courses;

                /* Lägger till den nya tjänsten is arrayen (utanför komponenten)
                    och uppdaterar sedan state-arrayen */
                this.setState({
                    courses:        courseArr,
                    confirm:        true,
                    error:          false,
                })
            })
            .catch(() => {
                localStorage.removeItem('action');
                localStorage.setItem('errorCourses', 'Ett serverfel har uppstått. Det gick inte att uppdatera utbildningen. ' 
                + 'Försök igen lite senare.');

                this.setState({
                    error:        true,
                })
            })

            this.updateSearch(body);
        }
    }

    updatePost(id, body) {
        if (!localStorage.getItem('error')) {
            fetch(`https://iws-rest-api.herokuapp.com/posts/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(body),
            })
            .then(response => response.json())
            .then(() => {
                localStorage.removeItem('action');
                localStorage.removeItem('errorPosts');
                localStorage.setItem('confirmPosts', 'Inlägget har uppdaterats.');

                window.location.reload();

                /* Lägger till den nya tjänsten is arrayen (utanför komponenten)
                    och uppdaterar sedan state-arrayen */
                this.setState({
                    userPosts:    userPosts,
                    confirm:      true,
                    error:        false,
                })
            })
            .catch(() => {
                localStorage.removeItem('action');
                localStorage.setItem('errorPosts', 'Ett serverfel har uppstått. Det gick inte att uppdatera inlägget. ' 
                + 'Försök igen lite senare.');

                this.setState({
                    error:      true,
                })
            })

            if (body.published) {
                this.updateSearch(body);
            }
        }
    }

    updateUser(id, body) {
        fetch(`https://iws-rest-api.herokuapp.com/users/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
        .then(response => response.json())
        .then(() => {
            localStorage.removeItem('action');
            localStorage.removeItem('errorUsers');
            localStorage.setItem('confirmUsers', 'Användaren har uppdaterats.');

            window.location.reload();
            
            /* Lägger till den nya tjänsten is arrayen (utanför komponenten)
                och uppdaterar sedan state-arrayen */
            this.setState({
                confirm:      true,
                error:        false,
            })
        })
        .catch(() => {
            localStorage.removeItem('action');
            localStorage.setItem('errorUsers', 'Ett serverfel har uppstått. Det gick inte att uppdatera användaren. ' 
            + 'Försök igen lite senare.');

            this.setState({
                error:      true,
            })
        })
    }

    updateSearch(body) {
        fetch(`https://iws-rest-api.herokuapp.com/search/password/tbbA=!vYzT99*,;oGSi8/id/${localStorage.getItem('searchId')}`, {
            method:  'PUT',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    deleteTest(id) {
        fetch(`https://iws-rest-api.herokuapp.com/tests/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        })
        .then(() => {
            localStorage.removeItem('action');
            localStorage.removeItem('errorTests');
            localStorage.setItem('confirmTests', 'Testet har raderats.');
            window.location.reload();

            this.setState({
                confirm:      true,
                error:        false,
            })
        })
        .catch(() => {
            localStorage.removeItem('action');
            localStorage.setItem('errorTests', 'Ett serverfel har uppstått. Det gick inte att radera testet. ' 
            + 'Försök igen lite senare.');

            this.setState({
                error:      true,
            })
        })

        this.deleteSearch();
    }

    deleteSolution(id) {
        fetch(`https://iws-rest-api.herokuapp.com/solutions/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(() => {
            localStorage.removeItem('action');
            localStorage.removeItem('errorSolutions');
            localStorage.setItem('confirmSolutions', 'Utvecklingspaketet har raderats.');
            window.location.reload();

            this.setState({
                confirm:          true,
                error:            false,
            })
        })
        .catch(() => {
            localStorage.removeItem('action');
            localStorage.setItem('errorSolutions', 'Ett serverfel har uppstått. Det gick inte att radera utvecklingspaketet. ' 
            + 'Försök igen lite senare.');

            this.setState({
                error:          true,
            })
        })

        this.deleteSearch();
    }

    deleteCourse(id) {
        fetch(`https://iws-rest-api.herokuapp.com/courses/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(() => {
            localStorage.removeItem('action');
            localStorage.removeItem('errorCourses');
            localStorage.setItem('confirmCourses', 'Utbildningen har raderats.');

            window.location.reload();

            this.setState({
                confirm:        true,
                error:          false,
            })
        })
        .catch(() => {
            localStorage.removeItem('action');
            localStorage.setItem('errorCourses', 'Ett serverfel har uppstått. Det gick inte att radera utbildningen. ' 
            + 'Försök igen lite senare.');

            this.setState({
                error:        true,
            })
        })

        this.deleteSearch();
    }

    deletePost(id, published) {
        fetch(`https://iws-rest-api.herokuapp.com/posts/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        })
        .then(() => {
            localStorage.removeItem('action');
            localStorage.removeItem('errorPosts');
            localStorage.setItem('confirmPosts', 'Inlägget har raderats.');

            window.location.reload();

            this.setState({
                userPosts:    userPosts,
                confirm:      true,
                error:        false,
            })
        })
        .catch(() => {
            localStorage.removeItem('action');
            localStorage.setItem('errorPosts', 'Ett serverfel har uppstått. Det gick inte att radera inlägget. ' 
            + 'Försök igen lite senare.');

            this.setState({
                error:      true,
            })
        })

        if (published) {
            this.deleteSearch();
        }
    }

    deleteUser(id) {
        fetch(`https://iws-rest-api.herokuapp.com/users/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(() => {
            localStorage.removeItem('action');
            localStorage.removeItem('errorUsers');
            localStorage.setItem('confirmUsers', 'Användaren har raderats.');

            window.location.reload();

            this.setState({
                confirm:      true,
                error:        false,
            })
        })
        .catch(() => {
            localStorage.removeItem('action');
            localStorage.setItem('errorUsers', 'Ett serverfel har uppstått. Det gick inte att radera användaren. ' 
            + 'Försök igen lite senare.');

            this.setState({
                error:      true,
            })
        })
    }

    deleteComment(id) {
        fetch(`https://iws-rest-api.herokuapp.com/comments/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        })
        .then(() => {
            localStorage.removeItem('action');
            localStorage.removeItem('errorComments');
            localStorage.setItem('confirmComments', 'Kommentaren har raderats.');

            window.location.reload();

            this.setState({
                confirm:         true,
                error:           false,
            })
        })
        .catch(() => {
            localStorage.removeItem('action');
            localStorage.setItem('errorComments', 'Ett serverfel har uppstått. Det gick inte att radera kommentaren. ' 
            + 'Försök igen lite senare.');

            this.setState({
                error:         true,
            })
        })
    }

    deleteSearch() {
        fetch(`https://iws-rest-api.herokuapp.com/search/password/tbbA=!vYzT99*,;oGSi8/id/${localStorage.getItem('searchId')}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    publishPost(id, body) {
        fetch(`https://iws-rest-api.herokuapp.com/posts/password/tbbA=!vYzT99*,;oGSi8/id/${id}/publish`, {
            method:  'PUT',
            headers: {'Content-Type': 'application/json',},
        })
        .then(() => {
            localStorage.removeItem('action');
            localStorage.removeItem('errorPosts');
            localStorage.setItem('confirmPosts', 'Inlägget har publicerats.');

            window.location.reload();

            this.setState({
                userPosts:    userPosts,
                confirm:      true,
                error:        false,
            })
        })
        .catch(() => {
            localStorage.removeItem('action');
            localStorage.setItem('errorPosts', 'Ett serverfel har uppstått. Det gick inte att publicera inlägget. ' 
            + 'Försök igen lite senare.');

            this.setState({
                error:      true,
            })
        })

        this.addSearch(body);
    }

    publishComment(id) {
        fetch(`https://iws-rest-api.herokuapp.com/comments/password/tbbA=!vYzT99*,;oGSi8/id/${id}/publish`, {
            method:  'PUT',
            headers: {'Content-Type': 'application/json',},
        })
        .then(() => {
            localStorage.removeItem('action');
            localStorage.removeItem('errorComments');
            localStorage.setItem('confirmComments', 'Kommentaren har publicerats.');

            window.location.reload();

            this.setState({
                confirm:         true,
                error:           false,
            })
        })
        .catch(() => {
            localStorage.removeItem('action');
            localStorage.setItem('errorComments', 'Ett serverfel har uppstått. Det gick inte att publicera kommentaren. ' 
            + 'Försök igen lite senare.');

            this.setState({
                error:         true,
            })
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.checkPasswordLength(e);
        this.validateForm(e);

        if (!this.state.error) {
            this.addUser(e);
        }
    }

    handleLinkClick(e) {
        if (e.target.innerHTML == 'Logga ut') {
            this.handleLogout(e);

        } else {
            this.handlePageTitle(e);
        }
    }

    // Raderar användarnamn, -roll och status för inloggning vid utloggning
    handleLogout(e) {

        // Förhidrar att sidan laddas om
        e.preventDefault();

        this.setState({
            username: '',
            userRole: '',
        })

        /* Tar bort status för inloggning, användarnamn, behörighet samt
            samt vilka komponenter som visas ur localStorage */
        sessionStorage.removeItem('signedIn');
        sessionStorage.removeItem('user');
        localStorage.removeItem('permission');
        localStorage.removeItem('component');
        localStorage.removeItem('errorTests');
        localStorage.removeItem('confirmTests');
        localStorage.removeItem('errorSolutions');
        localStorage.removeItem('confirmSolutions');
        localStorage.removeItem('errorCourses');
        localStorage.removeItem('confirmCourses');
        localStorage.removeItem('errorPosts');
        localStorage.removeItem('confirmPosts');
        localStorage.removeItem('errorUsers');
        localStorage.removeItem('confirmUsers');

        // Skickar användaren till Logga in
        this.props.function();
    }

    handlePageTitle(e) {
        if (e.target.id == 'logo') {
            if (localStorage.getItem('language') == 'Deutsch') {
                localStorage.setItem('page', 'Home');
                document.title = 'Home';
            
            } else {
                localStorage.setItem('page', 'Start');
                document.title = 'Start';
            }

        } else {
            localStorage.setItem('page', e.target.innerHTML);
            document.title = e.target.innerHTML;
        }
    }

}

// Exporterar komponenten
export default Admin;