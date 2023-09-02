// Imports
import React from 'react';
import {Link} from 'react-router-dom';
import Services from '../../components/admin/services/services';
import Posts from '../../components/admin/posts/posts';
import Users from '../../components/admin/users/users';
import Comments from '../../components/admin/comments/comments';
import { useSelector, useDispatch } from 'react-redux';
import userActions from '../../store/slices/user-slice';
import pageActions from '../../store/slices/page-slice';

const buttons = document.getElementsByClassName('btn');
// let userPosts = [];

// Admin
function Admin() {
    const username  = useSelector((state) => state.user.username);
    const userRole  = useSelector((state) => state.user.userRole);
    const component = useSelector((state) => state.page.adminComponent);
    const dispatch  = useDispatch();
    // Konstruktor med props
    /*
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
            username:           useSelector((state) => state.user.username),
            userRole:           useSelector((state) => state.user.userRole),
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
    */

    return (
        <main>
            <div className="row">
                {/* Länkstig */}
                <nav className="breadcrumbs" aria-label="Länkstig">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus" to={"/"}>
                            Start</Link>/</li>
                        <li><Link className="active-breadcrumb focus" to={"/admin"}> Admin</Link></li>
                    </ul>
                </nav>
                <p id="logout"><Link className="focus" to={"/login"} onClick={(e) => logout(e)}>Logga ut</Link></p>
            </div>
            <h1>Admin</h1>
            {/* Huvudmenyns utseende varierar beroende på användarens behörighet */}
            {/*userRole == 'Medarbetare' ?*/
            <nav className="admin-menu" aria-label="Adminmeny">
                <p>Här kan du administrera 
                webbplatsens innehåll. Välj kategori
                med hjälp av knapparna nedan. 
                Gränssnittet anpassas efter den valda 
                kategorin.</p>
                {/* Medarbetare */}
                <div className="row">
                    {component == 'tests' ? 
                    <button id="tests" className="focus btn active-admin-btn admin-btn-left"  
                        aria-pressed="true" onClick={(e) => handleBtnClick(e)}>Tester</button> :
                    <button id="tests" className="focus btn admin-btn admin-btn-left" 
                        aria-pressed="false" onClick={(e) => handleBtnClick(e)}>Tester</button>}
                    {component == 'solutions' ?
                    <button id="solutions" className="focus btn active-admin-btn admin-btn-right" 
                        aria-pressed="true" onClick={(e) => handleBtnClick(e)}>Utveckling</button> :
                    <button id="solutions" className="focus btn admin-btn admin-btn-right" 
                        aria-pressed="false" onClick={(e) => handleBtnClick(e)}>Utveckling</button>}
                </div>
                <div className="row">
                    {component == 'courses' ?
                    <button id="courses" className="focus btn active-admin-btn admin-btn-left" 
                        aria-pressed="true" onClick={(e) => handleBtnClick(e)}>Utbildningar</button> :
                    <button id="courses" className="focus btn admin-btn admin-btn-left" 
                        aria-pressed="false" onClick={(e) => handleBtnClick(e)}>Utbildningar</button>}
                    {localStorage.getItem('component') == 'posts' ?
                    <button id="posts" className="focus btn active-admin-btn admin-btn-right" 
                        aria-pressed="true" onClick={(e) => handleBtnClick(e)}>Inlägg</button> :
                    <button id="posts" className="focus btn admin-btn admin-btn-right" 
                        aria-pressed="false" onClick={(e) => handleBtnClick(e)}>Inlägg</button>}
                </div>
                <div className="row">
                    {component == 'comments' ?
                    <button id="comments" className="focus btn active-admin-btn admin-btn-left"  
                        aria-pressed="true" onClick={(e) => handleBtnClick(e)}>Kommentarer</button> :
                    <button id="comments" className="focus btn admin-btn admin-btn-left" 
                        aria-pressed="false" onClick={(e) => handleBtnClick(e)}>Kommentarer</button>}
                    {component == 'users' ?
                    <button id="users" className="focus btn active-admin-btn admin-btn-right" 
                        aria-pressed="true" onClick={(e) => handleBtnClick(e)}>Användare</button> :
                    <button id="users" className="focus btn admin-btn admin-btn-right" 
                        aria-pressed="false" onClick={(e) => handleBtnClick(e)}>Användare</button>}
                    {/* Gästskribenter */}
                    <p>Här kan du administrera 
                webbplatsens innehåll. Välj kategori
                med hjälp av knapparna nedan. 
                Gränssnittet anpassas efter den valda 
                kategorin.</p>

                {component == 'posts' ?
                    <button id="posts" className="focus btn active-admin-btn admin-btn-contributors 
                        admin-btn-right" aria-pressed="true" onClick={this.handleBtnClick}>
                            Inlägg</button> :
                    <button id="posts" className="focus btn admin-btn admin-btn-contributors admin-btn-right" 
                        aria-pressed="false" onClick={this.handleBtnClick}>
                            Inlägg</button>}
                </div>
            </nav> 
            }
            {/* Formulär för att lägga till och redigera tjänster, användare, inlägg och kommentarer.
                Vilket formulär som visas beror på vilket val som gjorts i menyn ovan. 
                Data i form av poster och eventuella felmeddelanden skickas med i props. */}
            
            {component == 'tests' && this.state.userRole  == 'Medarbetare' ? 
                <Services service="tests" data={this.state.tests} search={this.state.search} 
                errorMessage={errorServices} confirmMessage={confirmServices}
                post={this.addTest} delete={this.deleteTest} put={this.updateTest} /> : null}
            {component == 'solutions' && this.state.userRole == 'Medarbetare' ? 
                <Services service="solutions" data={this.state.solutions} search={this.state.search}
                errorMessage={errorServices} confirmMessage={confirmServices}
                post={this.addSolution} delete={this.deleteSolution} put={this.updateSolution} /> : null}
            {component == 'courses' && this.state.userRole == 'Medarbetare' ? 
                <Services service="courses" data={this.state.courses} search={this.state.search} 
                errorMessage={errorServices} confirmMessage={confirmServices}
                post={this.addCourse} delete={this.deleteCourse} put={this.updateCourse} /> : null}
            {component == 'posts' ? <Posts posts={this.state.userRole == 'Medarbetare' ? 
                this.state.posts : this.state.userPosts} search={this.state.search} 
                username={this.state.username} userRole={this.state.userRole} 
                errorPosts={this.state.errorPosts} confirmPosts={this.state.confirmPosts} post={this.addPost} 
                delete={this.deletePost} publish={this.publishPost} put={this.updatePost} /> : null}
            {component == 'users' && this.state.userRole == 'Medarbetare' ? <Users 
                users={this.state.users} post={this.addUser} delete={this.deleteUser} 
                errorUsers={this.state.errorUsers} put={this.updateUser} 
                confirmUsers={this.state.confirmUsers}/> : null}
            {component == 'comments' && this.state.userRole == 'Medarbetare' ? 
                <Comments comments={this.state.comments} publish={this.publishComment} 
                delete={this.deleteComment} errorComments={this.state.errorComments} 
                confirmComments={this.state.confirmComments}/> : null}
        </main>
    )

    // Funktionen anpassar gränssnittet (via state) samt knapparnas utseende och aria-pressed 
    function handleBtnClick(e) {
        dispatch(pageActions.setAdminComponent(e.target.id));
        /*
        for (let i = 0; i < buttons.length; i++) {
            if (e.target.id == buttons[i].id) {
                buttons[i].setAttribute('aria-pressed', true);

            } else {
                buttons[i].setAttribute('aria-pressed', false);
            }
        }
        */

        if (e.target.id !== 'tests') {
            if (this.state.userRole == 'Medarbetare') {
                buttons[2].setAttribute('aria-pressed', false);
                buttons[2].className = 'focus btn admin-btn admin-btn-left';
            }
        }

        if (e.target.id == 'posts') {
            if (this.state.userRole == 'Gästskribent') {
                buttons[2].setAttribute('aria-pressed', false);
                buttons[2].className = 'focus btn admin-btn admin-btn-contributors admin-btn-right';
            }
        }
    }

    /*
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
    */

    function getSearch() {
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
    function getTests() {

        // GET-anrop till webbtjänsten om användaren har tryckt på Tester
        fetch('https://iws-rest-api.herokuapp.com/tests/admin')

        // Konverterar svaret från JSON
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

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => { 
            this.setState({
                errorTests: 'Ett serverfel har uppstått. Det gick inte att hämta tester.' 
                                + ' Försök igen lite senare.',
            })
        })
    }

    // Funktionen hämtar alla anpassningar
    function getSolutions() {

        // GET-anrop till webbtjänsten om användaren har tryckt på Anpassningar
        fetch('https://iws-rest-api.herokuapp.com/solutions/admin')

        // Konverterar svaret från JSON
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

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => { 
            this.setState({
                errorSolutions: 'Ett serverfel har uppstått. Det gick inte att hämta utvecklingspaket.' 
                                    + ' Försök igen lite senare.',
            })
        })
    }

    // Funktionen hämtar alla utbildningar
    function getCourses() {

        // GET-anrop till webbtjänsten om användaren har tryckt på Utbildningar
        fetch('https://iws-rest-api.herokuapp.com/courses/admin')

        // Konverterar svaret från JSON
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

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => {            
            this.setState({
                errorCourses: 'Ett serverfel har uppstått. Det gick inte att hämta utbildningar.' 
                                + ' Försök igen lite senare.'
            })
        })
    }

    // Funktionen hämtar alla inlägg
    function getAllPosts() {
        /* GET-anrop till webbtjänsten om användaren har tryckt på Inlägg och 
            har full behörighet */
        fetch('https://iws-rest-api.herokuapp.com/posts/admin')

        // Konverterar svaret från JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga inlägg hittades
        .then(data => {
            if (!data.length) {
                this.setState({
                    errorPosts: 'Inga inlägg hittades.',
                })
            
            // Lagrar inläggen i state-arrayen
            } else {
                this.setState({
                    posts: data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => {
            this.setState({             
                errorPosts: 'Ett serverfel har uppstått. Det gick inte att hämta inlägg.' 
                                + ' Försök igen lite senare.',
            })
        })
    }

    // Funktionen hämtar gästskribentens inlägg
    function getContributorPosts() {
        if (this.state.userRole == 'Gästskribent') {

            /* GET-anrop till webbtjänsten om användaren har tryckt på Inlägg och 
                är gästskribent */
            fetch(`https://iws-rest-api.herokuapp.com/posts/admin/user/${this.state.username}`)

            // Konverterar svaret från JSON
            .then(response => response.json())

            // Skriver ut ett felmeddelande om inga inlägg hittades
            .then(data => {
                if (!data.length) {
                    this.setState({
                        errorPosts: 'Inga inlägg hittades.',
                    })
                
                // Lagrar inläggen i state-arrayen
                } else {
                    this.setState({
                        userPosts:  data,
                    })
                }
            })

            // Skriver ut ett felmeddelande om ett serverfel har uppstått
            .catch(() => {
                this.setState({
                    errorPosts: 'Ett serverfel har uppstått. Det gick inte att hämta inlägg.' 
                                    + ' Försök igen lite senare.'
                })
            })
        }
    }

    // Funktionen hämtar alla användare
    function getUsers() {

        /* GET-anrop till webbtjänsten om användaren har tryckt på Användare och 
            har full behörighet */
        fetch('https://iws-rest-api.herokuapp.com/users/password/tbbA=!vYzT99*,;oGSi8')

        // Konverterar svaret från JSON
        .then(response => response.json())

        // Skriver ut ett felmeddelande om inga användare hittades
        .then(data => {
            if (!data.length) {
                this.setState({
                    errorUsers: 'Inga användare hittades.',
                })
            
            // Lagrar användarna i state-arrayen
            } else {
                this.setState({
                    errorUsers: '',
                    users:      data,
                })
            }
        })

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => {
            this.setState({
                errorUsers: 'Ett serverfel har uppstått. Det gick inte att hämta användare.' 
                                + ' Försök igen lite senare.'
            })
        })
    }

    // Funktionen hämtar alla kommentarer
    function getComments() {

        /* GET-anrop till webbtjänsten om användaren har tryckt på Kommentarer och 
            har full behörighet */
        fetch('https://iws-rest-api.herokuapp.com/comments/admin')

        // Konverterar svaret från JSON
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

        // Skriver ut ett felmeddelande om ett serverfel har uppstått
        .catch(() => { 
            this.setState({
                errorComments: 'Ett serverfel har uppstått. Det gick inte att hämta kommentarer.' 
                                + 'Försök igen lite senare.',
            })
        })
    }

    function addSearch(body) {
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
    function addTest(body) {
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
                errorTests:   'Ett serverfel har uppstått. Det gick inte att lägga till testet.' 
                                + ' Försök igen lite senare.',
                confirmTests: '',
            })
        })
    }

    function addSolution(body) {
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
                errorSolutions:   'Ett serverfel har uppstått. Det gick inte att lägga till utvecklingspaketet.' 
                                    + ' Försök igen lite senare.',
                confirmSolutions: '',
            })
        })
    }

    function addCourse(body) {
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
                errorCourses:   'Ett serverfel har uppstått. Det gick inte att lägga till utbildningen.' 
                                    + ' Försök igen lite senare.',
                confirmCourses: '',
            })
        })
    }

    function addPost(body) {
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
                confirmPosts: 'Inlägget har lagts till.',
            })
        })
        .catch(() => {
            this.setState({
                errorPosts:   'Ett serverfel har uppstått. Det gick inte att lägga till inlägget.' 
                                + ' Försök igen lite senare.',
                confirmPosts: '',
            })
        })
    }

    function addUser(body) {
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
                confirmUsers: 'Användaren har lagts till.',
                users:        userArr,
            })
        })
        .catch(() => {
            this.setState({
                errorUsers:   'Ett serverfel har uppstått. Det gick inte att lägga till användaren.' 
                                + ' Försök igen lite senare.',
                confirmUsers: '',
            })
        })
    }

    function updateTest(id, body) {
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
                errorTests:   'Ett serverfel har uppstått. Det gick inte att uppdatera testet.' 
                                + ' Försök igen lite senare.',
                confirmTests: '',
            })
        })
    }

    function updateSolution(id, body) {
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

            /* Lägger till den nya tjänsten is arrayen (utanför komponenten)
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
                errorSolutions:   'Ett serverfel har uppstått. Det gick inte att uppdatera utvecklingspaketet.' 
                                    + ' Försök igen lite senare.',
                confirmSolutions: '',
            })
        })
    }

    function updateCourse(id, body) {
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

            /* Lägger till den nya tjänsten is arrayen (utanför komponenten)
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
                errorCourses:   'Ett serverfel har uppstått. Det gick inte att uppdatera utbildningen.' 
                                    + ' Försök igen lite senare.',
                confirmCourses: '',
            })
        })
    }

    function updatePost(id, body) {
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

            /* Lägger till den nya tjänsten is arrayen (utanför komponenten)
                och uppdaterar sedan state-arrayen */
            this.setState({
                errorPosts:   '',
                confirmPosts: 'Inlägget har uppdaterats.',
            })
        })
        .catch(() => {
            localStorage.removeItem('actionPosts');

            this.setState({
                errorPosts:   'Ett serverfel har uppstått. Det gick inte att uppdatera inlägget.' 
                                + ' Försök igen lite senare.',
                confirmPosts: '',
            })
        })
    }

    function updateUser(id, body) {
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
            
            /* Lägger till den nya tjänsten is arrayen (utanför komponenten)
                och uppdaterar sedan state-arrayen */
            this.setState({
                errorUsers:   '',
                confirmUsers: 'Användaren har uppdaterats.',
                users:        userArr,
            })
        })
        .catch(() => {
            localStorage.removeItem('actionUsers');

            this.setState({
                errorUsers:   'Ett serverfel har uppstått. Det gick inte att uppdatera användaren.' 
                                + ' Försök igen lite senare.',
                confirmUsers: '',
            })
        })
    }

    function updateSearch(body) {
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

    function deleteTest(id) {
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
                errorTests:   'Ett serverfel har uppstått. Det gick inte att radera testet.' 
                                + ' Försök igen lite senare.',
                confirmTests: '',
            })
        })
    }

    function deleteSolution(id) {
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
                errorSolutions:   'Ett serverfel har uppstått. Det gick inte att radera utvecklingspaketet. ' 
                                    + 'Försök igen lite senare.',
                confirmSolutions: '',
            })
        })
    }

    function deleteCourse(id) {
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
                errorCourses:   'Ett serverfel har uppstått. Det gick inte att radera utbildningen.' 
                                    + ' Försök igen lite senare.',
                confirmCourses: '',
            })
        })
    }

    function deletePost(id, published, comments) {
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
                confirmPosts: 'Inlägget har raderats.',
            })
        })
        .catch(() => {
            localStorage.removeItem('actionPosts');

            this.setState({
                errorPosts:   'Ett serverfel har uppstått. Det gick inte att radera inlägget.' 
                                + ' Försök igen lite senare.',
                confirmPosts: '',
            })
        })
    }

    function deleteUser(id) {
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
                confirmUsers: 'Användaren har raderats.',
                users:        userArr,
            })
        })
        .catch(() => {
            localStorage.removeItem('actionUsers');

            this.setState({
                errorUsers:   'Ett serverfel har uppstått. Det gick inte att radera användaren.' 
                                + ' Försök igen lite senare.',
                confirmUsers: '',
            })
        })
    }

    function deletePostComments(id) {
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

    function deleteComment(id) {
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
                errorComments:   'Ett serverfel har uppstått. Det gick inte att radera kommentaren.' 
                                    + ' Försök igen lite senare.',
                confirmComments: '',
            })
        })
    }

    function deleteSearch() {
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

    function publishPost(id, body) {
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
                confirmPosts:   'Inlägget har publicerats.',
            })
        })
        .catch(() => {
            localStorage.removeItem('actionPosts');

            this.setState({
                errorPosts:   'Ett serverfel har uppstått. Det gick inte att publicera inlägget.' 
                                + ' Försök igen lite senare.',
                confirmPosts: '',
            })
        })
    }

    function publishComment(id) {
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
                errorComments:   'Ett serverfel har uppstått. Det gick inte att publicera kommentaren.' 
                                    + ' Försök igen lite senare.',
                confirmComments: '',
            })
        })
    }

    function logout(e) {
        e.preventDefault();
        dispatch(userActions.logout());
    }
}

// Exporterar komponenten
export default Admin;