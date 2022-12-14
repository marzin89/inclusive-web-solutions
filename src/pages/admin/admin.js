// Imports
import React from 'react';
import {Link} from 'react-router-dom';
import Services from '../../components/admin/services/services';
import Posts from '../../components/admin/posts/posts';
import Users from '../../components/admin/users/users';
import Comments from '../../components/admin/comments/comments';
import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/to-have-accessible-description';

const buttons = document.getElementsByClassName('btn');
// let userPosts = [];

// Admin
class Admin extends React.Component {

    // Konstruktor med props
    constructor(props) {
        super(props);

        // Binder this till funktionerna
        this.setState             = this.setState.bind(this);
        this.handleBtnClick       = this.handleBtnClick.bind(this);
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
        this.deletePostComments   = this.deletePostComments.bind(this);
        this.publishComment       = this.publishComment.bind(this);
        this.publishPost          = this.publishPost.bind(this);
        this.handleLogout         = this.handleLogout.bind(this);

        this.state = {
            reRender:           false,
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
            errorTests:         '',
            errorSolutions:     '',
            errorCourses:       '',
            errorPosts:         '',
            errorUsers:         '',
            errorComments:      '',
            confirmTests:       '',
            confirmSolutions:   '',
            confirmCourses:     '',
            confirmPosts:       '',
            confirmUsers:       '',
            confirmComments:    '',
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
            <main>
                <div className="row">
                    {/* L??nkstig */}
                    <nav className="breadcrumbs" aria-label="L??nkstig">
                        <ul>
                            <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus" to={"/"}>
                                Start</Link>/</li>
                            <li><Link className="active-breadcrumb focus" to={"/admin"}> Admin</Link></li>
                        </ul>
                    </nav>
                    <p id="logout"><Link className="focus" to={"/login"} onClick={this.handleLogout}>Logga ut</Link></p>
                </div>
                <h1>Admin</h1>
                {/* Huvudmenyns utseende varierar beroende p?? anv??ndarens beh??righet */}
                {this.state.userRole == 'Medarbetare' ?
                <nav className="admin-menu" aria-label="Adminmeny">
                    <p>H??r kan du administrera 
                    webbplatsens inneh??ll. V??lj kategori
                    med hj??lp av knapparna nedan. 
                    Gr??nssnittet anpassas efter den valda 
                    kategorin.</p>
                    {/* Medarbetare */}
                    <div className="row">
                        {localStorage.getItem('component') == 'tests' ? 
                        <button id="tests" className="focus btn active-admin-btn admin-btn-left"  
                            aria-pressed="true" onClick={this.handleBtnClick}>Tester</button> :
                        <button id="tests" className="focus btn admin-btn admin-btn-left" 
                            aria-pressed="false" onClick={this.handleBtnClick}>Tester</button>}
                        {localStorage.getItem('component') == 'solutions' ?
                        <button id="solutions" className="focus btn active-admin-btn admin-btn-right" 
                            aria-pressed="true" onClick={this.handleBtnClick}>Utveckling</button> :
                        <button id="solutions" className="focus btn admin-btn admin-btn-right" 
                            aria-pressed="false" onClick={this.handleBtnClick}>Utveckling</button>}
                    </div>
                    <div className="row">
                        {localStorage.getItem('component') == 'courses' ?
                        <button id="courses" className="focus btn active-admin-btn admin-btn-left" 
                            aria-pressed="true" onClick={this.handleBtnClick}>Utbildningar</button> :
                        <button id="courses" className="focus btn admin-btn admin-btn-left" 
                            aria-pressed="false" onClick={this.handleBtnClick}>Utbildningar</button>}
                        {localStorage.getItem('component') == 'posts' ?
                        <button id="posts" className="focus btn active-admin-btn admin-btn-right" 
                            aria-pressed="true" onClick={this.handleBtnClick}>Inl??gg</button> :
                        <button id="posts" className="focus btn admin-btn admin-btn-right" 
                            aria-pressed="false" onClick={this.handleBtnClick}>Inl??gg</button>}
                    </div>
                    <div className="row">
                        {localStorage.getItem('component') == 'comments' ?
                        <button id="comments" className="focus btn active-admin-btn admin-btn-left"  
                            aria-pressed="true" onClick={this.handleBtnClick}>Kommentarer</button> :
                        <button id="comments" className="focus btn admin-btn admin-btn-left" 
                            aria-pressed="false" onClick={this.handleBtnClick}>Kommentarer</button>}
                        {localStorage.getItem('component') == 'users' ?
                        <button id="users" className="focus btn active-admin-btn admin-btn-right" 
                            aria-pressed="true" onClick={this.handleBtnClick}>Anv??ndare</button> :
                        <button id="users" className="focus btn admin-btn admin-btn-right" 
                            aria-pressed="false" onClick={this.handleBtnClick}>Anv??ndare</button>}
                    </div>
                </nav> 
                :
                // G??stskribenter
                <nav className="admin-menu" aria-label="Adminmeny">
                    <p>H??r kan du administrera 
                    webbplatsens inneh??ll. V??lj kategori
                    med hj??lp av knapparna nedan. 
                    Gr??nssnittet anpassas efter den valda 
                    kategorin.</p>

                    {localStorage.getItem('component') == 'posts' ?
                        <button id="posts" className="focus btn active-admin-btn admin-btn-contributors 
                            admin-btn-right" aria-pressed="true" onClick={this.handleBtnClick}>
                                Inl??gg</button> :
                        <button id="posts" className="focus btn admin-btn admin-btn-contributors admin-btn-right" 
                            aria-pressed="false" onClick={this.handleBtnClick}>
                                Inl??gg</button>}
                </nav>
                }
                {/* Formul??r f??r att l??gga till och redigera tj??nster, anv??ndare, inl??gg och kommentarer.
                    Vilket formul??r som visas beror p?? vilket val som gjorts i menyn ovan. 
                    Data i form av poster och eventuella felmeddelanden skickas med i props. */}
                
                {this.state.component == 'tests' && this.state.userRole  == 'Medarbetare' ? 
                    <Services service="tests" data={this.state.tests} search={this.state.search} 
                    errorTests={this.state.errorTests} confirmTests={this.state.confirmTests}
                    post={this.addTest} delete={this.deleteTest} put={this.updateTest} /> : null}
                {this.state.component == 'solutions' && this.state.userRole == 'Medarbetare' ? 
                    <Services service="solutions" data={this.state.solutions} search={this.state.search}
                    errorSolutions={this.state.errorSolutions} confirmSolutions={this.state.confirmSolutions}
                    post={this.addSolution} delete={this.deleteSolution} put={this.updateSolution} /> : null}
                {this.state.component == 'courses' && this.state.userRole == 'Medarbetare' ? 
                    <Services service="courses" data={this.state.courses} search={this.state.search} 
                    errorCourses={this.state.errorCourses} confirmCourses={this.state.confirmCourses}
                    post={this.addCourse} delete={this.deleteCourse} put={this.updateCourse} /> : null}
                {this.state.component == 'posts' ? <Posts posts={this.state.userRole == 'Medarbetare' ? 
                    this.state.posts : this.state.userPosts} search={this.state.search} 
                    username={this.state.username} userRole={this.state.userRole} 
                    errorPosts={this.state.errorPosts} confirmPosts={this.state.confirmPosts} post={this.addPost} 
                    delete={this.deletePost} publish={this.publishPost} put={this.updatePost} /> : null}
                {this.state.component == 'users' && this.state.userRole == 'Medarbetare' ? <Users 
                    users={this.state.users} post={this.addUser} delete={this.deleteUser} 
                    errorUsers={this.state.errorUsers} put={this.updateUser} 
                    confirmUsers={this.state.confirmUsers}/> : null}
                {this.state.component == 'comments' && this.state.userRole == 'Medarbetare' ? 
                    <Comments comments={this.state.comments} publish={this.publishComment} 
                    delete={this.deleteComment} errorComments={this.state.errorComments} 
                    confirmComments={this.state.confirmComments}/> : null}
            </main>
        )
    }

    // Funktionen anpassar gr??nssnittet (via state) samt knapparnas utseende och aria-pressed 
    handleBtnClick(e) {
        const id = e.target.id;

        this.setState({
            reRender:  true,
            component: id,
        })

        localStorage.setItem('component', id);

        for (let i = 0; i < buttons.length; i++) {
            if (e.target.id == buttons[i].id) {
                buttons[i].setAttribute('aria-pressed', true);

            } else {
                buttons[i].setAttribute('aria-pressed', false);
            }
        }

        if (e.target.id !== 'tests') {
            if (this.state.userRole == 'Medarbetare') {
                buttons[2].setAttribute('aria-pressed', false);
                buttons[2].className = 'focus btn admin-btn admin-btn-left';
            }
        }

        if (e.target.id == 'posts') {
            if (this.state.userRole == 'G??stskribent') {
                buttons[2].setAttribute('aria-pressed', false);
                buttons[2].className = 'focus btn admin-btn admin-btn-contributors admin-btn-right';
            }
        }
    }

    componentDidMount() {
        localStorage.setItem('pageSwedish', 'Admin');
        localStorage.setItem('pageGerman', 'Admin');
        document.title = 'Admin';

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].id == localStorage.getItem('component')) {
                buttons[i].setAttribute('aria-pressed', true);

            } else {
                buttons[i].setAttribute('aria-pressed', false);
            }
        }

        if (!localStorage.getItem('component')) {
            if (this.state.userRole == 'Medarbetare') {
                this.setState({
                    component: 'tests',
                })

                buttons[2].setAttribute('aria-pressed', true);
                buttons[2].className = 'focus btn active-admin-btn admin-btn admin-btn-left';
            
            } else {
                this.setState({
                    component: 'posts',
                })

                buttons[2].setAttribute('aria-pressed', true);
                buttons[2].className = 'focus btn active-admin-btn admin-btn-contributors admin-btn-right';
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

    // Funktionen h??mtar alla tester
    getTests() {

        // GET-anrop till webbtj??nsten om anv??ndaren har tryckt p?? Tester
        fetch('https://iws-rest-api.herokuapp.com/tests/admin')

        // Konverterar svaret fr??n JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga tester hittades
        .then(data => {
            if (!data.length) {
                this.setState({
                    errorTests: 'Inga tester hittades.',
                })
            
            // Lagrar testerna i state-arrayen
            } else {
                this.setState({
                    errorTests: '',
                    tests:      data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppst??tt
        .catch(() => { 
            this.setState({
                errorTests: 'Ett serverfel har uppst??tt. Det gick inte att h??mta tester.' 
                                + ' F??rs??k igen lite senare.',
            })
        })
    }

    // Funktionen h??mtar alla anpassningar
    getSolutions() {

        // GET-anrop till webbtj??nsten om anv??ndaren har tryckt p?? Anpassningar
        fetch('https://iws-rest-api.herokuapp.com/solutions/admin')

        // Konverterar svaret fr??n JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga anpassningar hittades
        .then(data => {
            if (!data.length) {
                this.setState({
                    errorSolutions: 'Inga utvecklingspaket hittades.',
                })
            
            // Lagrar anpassningarna i state-arrayen
            } else {
                this.setState({
                    errorSolutions: '',
                    solutions:      data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppst??tt
        .catch(() => { 
            this.setState({
                errorSolutions: 'Ett serverfel har uppst??tt. Det gick inte att h??mta utvecklingspaket.' 
                                    + ' F??rs??k igen lite senare.',
            })
        })
    }

    // Funktionen h??mtar alla utbildningar
    getCourses() {

        // GET-anrop till webbtj??nsten om anv??ndaren har tryckt p?? Utbildningar
        fetch('https://iws-rest-api.herokuapp.com/courses/admin')

        // Konverterar svaret fr??n JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga utbildningar hittades
        .then(data => {
            if (!data.length) {
                this.setState({
                    errorCourses: 'Inga utbildningar hittades.',
                })
            
            // Lagrar utbildningarna i state-arrayen
            } else {
                this.setState({
                    errorCourses: '',
                    courses:      data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppst??tt
        .catch(() => {            
            this.setState({
                errorCourses: 'Ett serverfel har uppst??tt. Det gick inte att h??mta utbildningar.' 
                                + ' F??rs??k igen lite senare.'
            })
        })
    }

    // Funktionen h??mtar alla inl??gg
    getAllPosts() {
        /* GET-anrop till webbtj??nsten om anv??ndaren har tryckt p?? Inl??gg och 
            har full beh??righet */
        fetch('https://iws-rest-api.herokuapp.com/posts/admin')

        // Konverterar svaret fr??n JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga inl??gg hittades
        .then(data => {
            if (!data.length) {
                this.setState({
                    errorPosts: 'Inga inl??gg hittades.',
                })
            
            // Lagrar inl??ggen i state-arrayen
            } else {
                this.setState({
                    posts: data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppst??tt
        .catch(() => {
            this.setState({             
                errorPosts: 'Ett serverfel har uppst??tt. Det gick inte att h??mta inl??gg.' 
                                + ' F??rs??k igen lite senare.',
            })
        })
    }

    // Funktionen h??mtar g??stskribentens inl??gg
    getContributorPosts() {
        if (this.state.userRole == 'G??stskribent') {

            /* GET-anrop till webbtj??nsten om anv??ndaren har tryckt p?? Inl??gg och 
                ??r g??stskribent */
            fetch(`https://iws-rest-api.herokuapp.com/posts/admin/user/${this.state.username}`)

            // Konverterar svaret fr??n JSON
            .then(response => response.json())

            // Skriver ut ett felmeddelande om inga inl??gg hittades
            .then(data => {
                if (!data.length) {
                    this.setState({
                        errorPosts: 'Inga inl??gg hittades.',
                    })
                
                // Lagrar inl??ggen i state-arrayen
                } else {
                    this.setState({
                        userPosts:  data,
                    })
                }
            })

            // Skriver ut ett felmeddelande om ett serverfel har uppst??tt
            .catch(() => {
                this.setState({
                    errorPosts: 'Ett serverfel har uppst??tt. Det gick inte att h??mta inl??gg.' 
                                    + ' F??rs??k igen lite senare.'
                })
            })
        }
    }

    // Funktionen h??mtar alla anv??ndare
    getUsers() {

        /* GET-anrop till webbtj??nsten om anv??ndaren har tryckt p?? Anv??ndare och 
            har full beh??righet */
        fetch('https://iws-rest-api.herokuapp.com/users/password/tbbA=!vYzT99*,;oGSi8')

        // Konverterar svaret fr??n JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga anv??ndare hittades
        .then(data => {
            if (!data.length) {
                this.setState({
                    errorUsers: 'Inga anv??ndare hittades.',
                })
            
            // Lagrar anv??ndarna i state-arrayen
            } else {
                this.setState({
                    errorUsers: '',
                    users:      data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppst??tt
        .catch(() => {
            this.setState({
                errorUsers: 'Ett serverfel har uppst??tt. Det gick inte att h??mta anv??ndare.' 
                                + ' F??rs??k igen lite senare.'
            })
        })
    }

    // Funktionen h??mtar alla kommentarer
    getComments() {

        /* GET-anrop till webbtj??nsten om anv??ndaren har tryckt p?? Kommentarer och 
            har full beh??righet */
        fetch('https://iws-rest-api.herokuapp.com/comments/admin')

        // Konverterar svaret fr??n JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga kommentarer hittades
        .then(data => {
            if (!data.length) {
                this.setState({
                    errorComments: 'Inga kommentarer hittades.',
                })
            
            // Lagrar kommentarerna i state-arrayen
            } else {
                this.setState({
                    errorComments: '',
                    comments:      data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppst??tt
        .catch(() => { 
            this.setState({
                errorComments: 'Ett serverfel har uppst??tt. Det gick inte att h??mta kommentarer.' 
                                + 'F??rs??k igen lite senare.',
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

    /* Funktionen l??gger till tester i databasen. De tv?? efterf??ljande
        funktionerna har exakt samma struktur och fl??de. */
    addTest(body) {
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
        .then((data) => {
            this.addSearch(body);

            let testArr = this.state.tests;
            testArr.push(data);
            testArr.reverse();

            this.setState({
                tests:        testArr,
                errorTests:   '',
                confirmTests: 'Testet har lagts till.',
            })
        })
        .catch(() => {
            this.setState({
                errorTests:   'Ett serverfel har uppst??tt. Det gick inte att l??gga till testet.' 
                                + ' F??rs??k igen lite senare.',
                confirmTests: '',
            })
        })
    }

    addSolution(body) {
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
        .then((data) => {
            this.addSearch(body);

            let solutionArr = this.state.solutions;
            solutionArr.push(data);
            solutionArr.reverse();

            this.setState({
                errorSolutions:   '',
                confirmSolutions: 'Utvecklingspaketet har lagts till.',
                solutions:        solutionArr,
            })
        })
        .catch(() => {
            this.setState({
                errorSolutions:   'Ett serverfel har uppst??tt. Det gick inte att l??gga till utvecklingspaketet.' 
                                    + ' F??rs??k igen lite senare.',
                confirmSolutions: '',
            })
        })
    }

    addCourse(body) {
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
        .then((data) => {
            this.addSearch(body);

            let courseArr = this.state.courses;
            courseArr.push(data);
            courseArr.reverse();

            this.setState({
                errorCourses:   '',
                confirmCourses: 'Utbildningen har lagts till.',
                courses:        courseArr,
            })
        })
        .catch(() => {
            this.setState({
                errorCourses:   'Ett serverfel har uppst??tt. Det gick inte att l??gga till utbildningen.' 
                                    + ' F??rs??k igen lite senare.',
                confirmCourses: '',
            })
        })
    }

    addPost(body) {
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
        .then((data) => {
            let postArr = [];

            if (this.state.userRole == 'Medarbetare') {
                postArr = this.state.posts;
                postArr.push(data);
                postArr.reverse();

                this.setState({
                    posts: postArr,
                })
            
            } else {
                postArr = this.state.userPosts;
                postArr.push(data);
                postArr.reverse();

                this.setState({
                    userPosts: postArr,
                })
            }

            this.setState({
                errorPosts:   '',
                confirmPosts: 'Inl??gget har lagts till.',
            })
        })
        .catch(() => {
            this.setState({
                errorPosts:   'Ett serverfel har uppst??tt. Det gick inte att l??gga till inl??gget.' 
                                + ' F??rs??k igen lite senare.',
                confirmPosts: '',
            })
        })
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
        .then((data) => {
            let userArr = this.state.users;
            userArr.push(data);
            userArr.reverse();

            this.setState({
                errorUsers:   '',
                confirmUsers: 'Anv??ndaren har lagts till.',
                users:        userArr,
            })
        })
        .catch(() => {
            this.setState({
                errorUsers:   'Ett serverfel har uppst??tt. Det gick inte att l??gga till anv??ndaren.' 
                                + ' F??rs??k igen lite senare.',
                confirmUsers: '',
            })
        })
    }

    updateTest(id, body) {
        fetch(`https://iws-rest-api.herokuapp.com/tests/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
        .then(response => response.json())
        .then((data) => {
            this.updateSearch(body);

            localStorage.removeItem('actionServices');

            let testArr = this.state.tests;

            for (let i = 0; i < testArr.length; i++) {
                if (testArr[i].id == data.id) {
                    testArr.splice(i, 1, data);
                }
            }

            this.setState({
                errorTests:   '',
                confirmTests: 'Testet har uppdaterats.',
                tests:        testArr,
            })
        })
        .catch(() => {
            localStorage.removeItem('actionServices');

            this.setState({
                errorTests:   'Ett serverfel har uppst??tt. Det gick inte att uppdatera testet.' 
                                + ' F??rs??k igen lite senare.',
                confirmTests: '',
            })
        })
    }

    updateSolution(id, body) {
        fetch(`https://iws-rest-api.herokuapp.com/solutions/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
        .then(response => response.json())
        .then((data) => {
            this.updateSearch(body);

            localStorage.removeItem('actionServices');

            let solutionArr = this.state.solutions;
            
            for (let i = 0; i < solutionArr.length; i++) {
                if (solutionArr[i].id == data.id) {
                    solutionArr.splice(i, 1, data);
                }
            }

            /* L??gger till den nya tj??nsten is arrayen (utanf??r komponenten)
                och uppdaterar sedan state-arrayen */
            this.setState({
                errorSolutions:   '',
                confirmSolutions: 'Utvecklingspaketet har uppdaterats.',
                solutions:        solutionArr,
            })
        })
        .catch(() => {
            localStorage.removeItem('actionServices');

            this.setState({
                errorSolutions:   'Ett serverfel har uppst??tt. Det gick inte att uppdatera utvecklingspaketet.' 
                                    + ' F??rs??k igen lite senare.',
                confirmSolutions: '',
            })
        })
    }

    updateCourse(id, body) {
        fetch(`https://iws-rest-api.herokuapp.com/courses/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
        .then(response => response.json())
        .then((data) => {
            this.updateSearch(body);

            localStorage.removeItem('actionServices');

            let courseArr = this.state.courses;

            for (let i = 0; i < courseArr.length; i++) {
                if (courseArr[i].id == data.id) {
                    courseArr.splice(i, 1, data);
                }
            }

            /* L??gger till den nya tj??nsten is arrayen (utanf??r komponenten)
                och uppdaterar sedan state-arrayen */
            this.setState({
                courses:        courseArr,
                errorCourses:   '',
                confirmCourses: 'Utbildningen har uppdaterats.',
            })
        })
        .catch(() => {
            localStorage.removeItem('actionServices');

            this.setState({
                errorCourses:   'Ett serverfel har uppst??tt. Det gick inte att uppdatera utbildningen.' 
                                    + ' F??rs??k igen lite senare.',
                confirmCourses: '',
            })
        })
    }

    updatePost(id, body) {
        fetch(`https://iws-rest-api.herokuapp.com/posts/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
        .then(response => response.json())
        .then((data) => {
            if (body.published) {
                this.updateSearch(body);
            }

            localStorage.removeItem('actionPosts');

            let postArr = [];

            if (this.state.userRole == 'Medarbetare') {
                postArr = this.state.posts;
            
            } else {
                postArr = this.state.userPosts;
            }

            for (let i = 0; i < postArr.length; i++) {
                if (postArr[i].id == data.id) {
                    postArr.splice(i, 1, data);
                }
            }

            if (this.state.userRole == 'Medarbetare') {
                this.setState({
                    posts: postArr,
                })
            
            } else {
                this.setState({
                    userPosts: postArr,
                })
            }

            /* L??gger till den nya tj??nsten is arrayen (utanf??r komponenten)
                och uppdaterar sedan state-arrayen */
            this.setState({
                errorPosts:   '',
                confirmPosts: 'Inl??gget har uppdaterats.',
            })
        })
        .catch(() => {
            localStorage.removeItem('actionPosts');

            this.setState({
                errorPosts:   'Ett serverfel har uppst??tt. Det gick inte att uppdatera inl??gget.' 
                                + ' F??rs??k igen lite senare.',
                confirmPosts: '',
            })
        })
    }

    updateUser(id, body) {
        fetch(`https://iws-rest-api.herokuapp.com/users/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body:    JSON.stringify(body),
        })
        .then(response => response.json())
        .then((data) => {
            localStorage.removeItem('actionUsers');

            let userArr = this.state.users;

            for (let i = 0; i < userArr.length; i++) {
                if (userArr[i].id == data.id) {
                    userArr.splice(i, 1, data);
                }
            }
            
            /* L??gger till den nya tj??nsten is arrayen (utanf??r komponenten)
                och uppdaterar sedan state-arrayen */
            this.setState({
                errorUsers:   '',
                confirmUsers: 'Anv??ndaren har uppdaterats.',
                users:        userArr,
            })
        })
        .catch(() => {
            localStorage.removeItem('actionUsers');

            this.setState({
                errorUsers:   'Ett serverfel har uppst??tt. Det gick inte att uppdatera anv??ndaren.' 
                                + ' F??rs??k igen lite senare.',
                confirmUsers: '',
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
            this.deleteSearch();

            localStorage.removeItem('actionServices');

            let testArr = this.state.tests;

            for (let i = 0; i < testArr.length; i++) {
                if (testArr[i].id == id) {
                    testArr.splice(i, 1);
                }
            }

            this.setState({
                errorTests:   '',
                confirmTests: 'Testet har raderats.',
                tests:        testArr,
            })
        })
        .catch(() => {
            localStorage.removeItem('actionServices');

            this.setState({
                errorTests:   'Ett serverfel har uppst??tt. Det gick inte att radera testet.' 
                                + ' F??rs??k igen lite senare.',
                confirmTests: '',
            })
        })
    }

    deleteSolution(id) {
        fetch(`https://iws-rest-api.herokuapp.com/solutions/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(() => {
            this.deleteSearch();

            localStorage.removeItem('actionServices');

            let solutionArr = this.state.solutions;

            for (let i = 0; i < solutionArr.length; i++) {
                if (solutionArr[i].id == id) {
                    solutionArr.splice(i, 1);
                }
            }

            this.setState({
                errorSolutions:   '',
                confirmSolutions: 'Utvecklingspaketet har raderats.',
                solutions:        solutionArr,
            })
        })
        .catch(() => {
            localStorage.removeItem('actionServices');

            this.setState({
                errorSolutions:   'Ett serverfel har uppst??tt. Det gick inte att radera utvecklingspaketet. ' 
                                    + 'F??rs??k igen lite senare.',
                confirmSolutions: '',
            })
        })
    }

    deleteCourse(id) {
        fetch(`https://iws-rest-api.herokuapp.com/courses/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(() => {
            this.deleteSearch();

            localStorage.removeItem('actionServices');

            let courseArr = this.state.courses;

            for (let i = 0; i < courseArr.length; i++) {
                if (courseArr[i].id == id) {
                    courseArr.splice(i, 1);
                }
            }

            this.setState({
                errorCourses:   '',
                confirmCourses: 'Utbildningen har raderats.',
                courses:        courseArr,
            })
        })
        .catch(() => {
            localStorage.removeItem('actionServices');

            this.setState({
                errorCourses:   'Ett serverfel har uppst??tt. Det gick inte att radera utbildningen.' 
                                    + ' F??rs??k igen lite senare.',
                confirmCourses: '',
            })
        })
    }

    deletePost(id, published, comments) {
        fetch(`https://iws-rest-api.herokuapp.com/posts/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        })
        .then(() => {
            if (published) {
                this.deleteSearch();
            }

            if (comments) {
                this.deletePostComments(id);
            }

            localStorage.removeItem('actionPosts');

            let postArr = [];

            if (this.state.userRole == 'Medarbetare') {
                postArr = this.state.posts;
            
            } else {
                postArr = this.state.userPosts;
            }

            for (let i = 0; i < postArr.length; i++) {
                if (postArr[i].id == id) {
                    postArr.splice(i, 1);
                }
            }

            if (this.state.userRole == 'Medarbetare') {
                this.setState({
                    posts: postArr,
                })
            
            } else {
                this.setState({
                    userPosts: postArr,
                })
            }

            this.setState({
                errorPosts:   '',
                confirmPosts: 'Inl??gget har raderats.',
            })
        })
        .catch(() => {
            localStorage.removeItem('actionPosts');

            this.setState({
                errorPosts:   'Ett serverfel har uppst??tt. Det gick inte att radera inl??gget.' 
                                + ' F??rs??k igen lite senare.',
                confirmPosts: '',
            })
        })
    }

    deleteUser(id) {
        fetch(`https://iws-rest-api.herokuapp.com/users/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(() => {
            localStorage.removeItem('actionUsers');

            let userArr = this.state.users;

            for (let i = 0; i < userArr.length; i++) {
                if (userArr[i].id == id) {
                    userArr.splice(i, 1);
                }
            }

            this.setState({
                errorUsers:   '',
                confirmUsers: 'Anv??ndaren har raderats.',
                users:        userArr,
            })
        })
        .catch(() => {
            localStorage.removeItem('actionUsers');

            this.setState({
                errorUsers:   'Ett serverfel har uppst??tt. Det gick inte att radera anv??ndaren.' 
                                + ' F??rs??k igen lite senare.',
                confirmUsers: '',
            })
        })
    }

    deletePostComments(id) {
        fetch(`https://iws-rest-api.herokuapp.com/comments/password/tbbA=!vYzT99*,;oGSi8/postId/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',},
        })
        .then((response) => response.json())
        .then(() => {
            let commentArr = this.state.comments;

            for (let i = 0; i < commentArr; i ++) {
                if (commentArr[i].postId == id) {
                    commentArr.splice(i, 1);
                }
            }

            this.setState({
                comments: commentArr,
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    deleteComment(id) {
        fetch(`https://iws-rest-api.herokuapp.com/comments/password/tbbA=!vYzT99*,;oGSi8/id/${id}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        })
        .then(() => {
            let commentArr = this.state.comments;

            for (let i = 0; i < commentArr; i ++) {
                if (commentArr[i].id == id) {
                    commentArr.splice(i, 1);
                }
            }

            this.setState({
                errorComments:   '',
                confirmComments: 'Kommentaren har raderats.',
                comments:        commentArr,
            })
        })
        .catch(() => {
            this.setState({
                errorComments:   'Ett serverfel har uppst??tt. Det gick inte att radera kommentaren.' 
                                    + ' F??rs??k igen lite senare.',
                confirmComments: '',
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
            this.addSearch(body);

            localStorage.removeItem('actionPosts');

            let postArr = [];

            if (this.state.userRole == 'Medarbetare') {
                postArr = this.state.posts;
            
            } else {
                postArr = this.state.userPosts;
            }

            for (let i = 0; i < postArr.length; i++) {
                if (postArr[i].id == id) {
                    postArr[i].published = true;
                }
            }

            if (this.state.userRole == 'Medarbetare') {
                this.setState({
                    posts: postArr,
                })
            
            } else {
                this.setState({
                    userPosts: postArr,
                })
            }

            this.setState({
                errorPosts:     '',
                confirmPosts:   'Inl??gget har publicerats.',
            })
        })
        .catch(() => {
            localStorage.removeItem('actionPosts');

            this.setState({
                errorPosts:   'Ett serverfel har uppst??tt. Det gick inte att publicera inl??gget.' 
                                + ' F??rs??k igen lite senare.',
                confirmPosts: '',
            })
        })
    }

    publishComment(id) {
        fetch(`https://iws-rest-api.herokuapp.com/comments/password/tbbA=!vYzT99*,;oGSi8/id/${id}/publish`, {
            method:  'PUT',
            headers: {'Content-Type': 'application/json',},
        })
        .then(() => {
            let commentArr = this.state.comments;
            
            for (let i = 0; i < commentArr.length; i++) {
                if (commentArr[i].id == id) {
                    commentArr[i].published = true;
                }
            }

            this.setState({
                errorComments:   '',
                confirmComments: 'Kommentaren har publicerats.',
                comments:        commentArr,
            })
        })
        .catch(() => {
            this.setState({
                errorComments:   'Ett serverfel har uppst??tt. Det gick inte att publicera kommentaren.' 
                                    + ' F??rs??k igen lite senare.',
                confirmComments: '',
            })
        })
    }

    // Raderar anv??ndarnamn, -roll och status f??r inloggning vid utloggning
    handleLogout() {
        /* Tar bort status f??r inloggning, anv??ndarnamn, beh??righet samt
            samt vilka komponenter som visas ur localStorage */
        sessionStorage.removeItem('signedIn');

        // Skickar anv??ndaren till Logga in
        this.props.function();
    }
}

// Exporterar komponenten
export default Admin;