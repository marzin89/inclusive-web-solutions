// Imports
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
import Home from './pages/home/home';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Services from './pages/services/services';
import Blog from './pages/blog/blog';
import Accessibility from './pages/accessibility/accessibility';
import Search from './pages/search/search';
import Post from './pages/post/post';
import Test from './pages/test/test';
import Solution from './pages/solution/solution';
import Course from './pages/course/course';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate
} from 'react-router-dom';

class App extends React.Component {

  // Konstruktor
  constructor(props) {
    super(props);

    // Binder this till funktionerna
    this.setState            = this.setState.bind(this);
    this.getPosts            = this.getPosts.bind(this);
    this.getComments         = this.getComments.bind(this);
    this.getSolutions        = this.getSolutions.bind(this);
    this.getCourses          = this.getCourses.bind(this);
    this.getTests            = this.getTests.bind(this);
    this.loginCallback       = this.loginCallback.bind(this);
    this.logoutCallback      = this.logoutCallback.bind(this);
    this.logoutCallbackAdmin = this.logoutCallbackAdmin.bind(this);
    this.languageCallback    = this.languageCallback.bind(this);

    this.state = {
      signedIn:        sessionStorage.getItem('signedIn'),
      username:        sessionStorage.getItem('user'),
      permission:      localStorage.getItem('permission'),
      posts:           [],
      comments:        [],
      tests:           [],
      solutions:       [],
      courses:         [],
      error:           false,
      validationError: '',
      serverError:     '',
      errorSwedish:    '',
      errorGerman:     '',
    }

    this.getPosts();
    this.getComments();
    this.getTests();
    this.getSolutions();
    this.getCourses();
  }
  // Rendrering
  render() {
    return (
      <div id="page-wrapper">
        <Router>
          <Header signedIn={this.state.signedIn} function={this.languageCallback} />
          <Routes>
            <Route path="/login" element={this.state.signedIn && this.state.username ? 
              <Navigate replace to="/admin" username={this.state.username} 
                userRole={this.state.permission} function={this.logoutCallbackAdmin} /> 
                : <Login function={this.loginCallback}
                validationError={this.state.validationError}
                serverError={this.state.serverError} />} />
            <Route path="/admin" element={this.state.signedIn && this.state.username ? 
              <Admin username={this.state.username} userRole={this.state.permission} 
                function={this.logoutCallbackAdmin} /> : <Navigate replace to="/login" 
                function={this.loginCallback} validationError={this.state.validationError} 
                serverError={this.state.serverError} />} />
            <Route path="/" element={<Home signedIn={this.state.signedIn}
              logout={this.logoutCallback} />} />
            <Route path="/home" element={<Home signedIn={this.state.signedIn}
              logout={this.logoutCallback} />} />
            <Route path="/about" element={<About signedIn={this.state.signedIn} 
              logout={this.logoutCallback} />} />
            <Route path="/contact" element={<Contact signedIn={this.state.signedIn}
              logout={this.logoutCallback} />} />
            <Route path="/services" element={<Services signedIn={this.state.signedIn}
              logout={this.logoutCallback} />} />
            <Route path="/blog" element={<Blog signedIn={this.state.signedIn}
              logout={this.logoutCallback} />} />
            <Route path="/accessibility" element={<Accessibility signedIn={this.state.signedIn}
              logout={this.logoutCallback} />} />
            <Route path="/search" element={<Search signedIn={this.state.signedIn}
              logout={this.logoutCallback} />} />
            <Route path="/post" element={<Post signedIn={this.state.signedIn} 
              errorSwedish={this.state.errorSwedish} errorGerman={this.state.errorGerman}
              posts={this.state.posts} comments={this.state.comments} logout={this.logoutCallback} />} />
            <Route path="/test" element={<Test signedIn={this.state.signedIn} 
              errorSwedish={this.state.errorSwedish} errorGerman={this.state.errorGerman}
              tests={this.state.tests} logout={this.logoutCallback} />} /> 
            <Route path="/solution" element={<Solution signedIn={this.state.signedIn} 
              errorSwedish={this.state.errorSwedish} errorGerman={this.state.errorGerman}
              solutions={this.state.solutions} logout={this.logoutCallback} />} />
            <Route path="/course" element={<Course signedIn={this.state.signedIn} 
              errorSwedish={this.state.errorSwedish} errorGerman={this.state.errorGerman}
              courses={this.state.courses} logout={this.logoutCallback} />} /> 
            <Route path="*" element={<Home signedIn={this.state.signedIn}
              logout={this.logoutCallback} />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    );
  }

  languageCallback(language) {
      this.setState({
          language: language,
      })
  }

  loginCallback(body) {
    // POST-anrop till webbtjänsten
    fetch('https://iws-rest-api.herokuapp.com/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body:    JSON.stringify(body),
    })

    // Konverterar svaret från JSON
    .then(response => response.json())

    .then(data => {
        // Skriver ut ett felmeddelande om användaren har angett fel användarnamn eller lösnord
        if (!data.userExists) {
            this.setState({
                error:           true,
                validationError: 'Fel användarnamn eller lösenord.',
            })

        // Lagrar status för inloggning, användarnamn och användarroll
        } else {
            this.setState({
              signedIn:   true,
              username:   body.username,
              permission: data.permission,
            })

            /* Lagrar status för inloggning, användarnamn, behörighet och sidans namn 
              i localStorage och öppnar Admin */
            sessionStorage.setItem('signedIn', true);
            sessionStorage.setItem('user', body.username);
            localStorage.setItem('permission', data.permission)
            localStorage.setItem('page', 'Admin');
        }
    })

    // Skriver ut ett felmeddelande om ett serverfel har uppstått
    .catch(() => {
        this.setState({
            error:        true,
            serverError:  'Ett serverfel har uppstått. Det gick inte att logga in.' 
                + 'Försök igen lite senare.',
        })
    })
  }

  logoutCallback() {
      this.setState({
        signedIn:   false,
      })

      sessionStorage.removeItem('signedIn');
      sessionStorage.removeItem('user');
      localStorage.removeItem('permission');
      localStorage.removeItem('component');
      localStorage.removeItem('errorServices');
      localStorage.removeItem('confirmServices');
      localStorage.removeItem('errorPosts');
      localStorage.removeItem('confirmPosts');
      localStorage.removeItem('errorUsers');
      localStorage.removeItem('confirmUsers');

      window.open(`/${document.title.toLowerCase()}`, '_self');
  }

  logoutCallbackAdmin() {
    this.setState({
      signedIn:   false,
    })

    window.open('/login', '_self');
  }

  // Funktionen hämtar alla publicerade inlägg
  getPosts() {
    /* GET-anrop till webbtjänsten */
    fetch('https://iws-rest-api.herokuapp.com/posts')

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

getComments() {
  fetch('https://iws-rest-api.herokuapp.com/comments/admin')
  .then(response => response.json())
  .then(data => {
      if (!data.length) {
          this.setState({
              error: true,
          })
      
      } else {
          this.setState({
              error:    false,
              comments: data,
          })

          localStorage.setItem('comments', JSON.stringify(data)); 
      }
  })
  .catch(() => {
      this.setState({
          error: true
      })
  })
}

  // Funktionen hämtar alla tester
  getTests() {

    // GET-anrop till webbtjänsten
    fetch('https://iws-rest-api.herokuapp.com/tests')

    // Konverterar svaret från JSON
    .then(response => response.json())

    // Skriver ut ett felmeddelande om inga tester hittades
    .then(data => {
        if (!data.length) {
            localStorage.setItem('errorServices', 'Inga tester hittades.');

            this.setState({
                error:      true,
            })
        
        // Lagrar testerna i state-arrayen
        } else {
            localStorage.removeItem('errorServices');

            this.setState({
                error:      false,
                tests:      data,
            })
        }
    })

    // Skriver ut ett felmeddelande om ett serverfel har uppstått
    .catch(() => { 
        localStorage.setItem('errorServices', 'Ett serverfel har uppstått. Det gick inte att hämta tester.' 
        + 'Försök igen lite senare.');

        this.setState({
            error:      true,
        })
    })
  }

  // Funktionen hämtar alla anpassningar
  getSolutions() {

    // GET-anrop till webbtjänsten
    fetch('https://iws-rest-api.herokuapp.com/solutions')

    // Konverterar svaret från JSON
    .then(response => response.json())

    // Skriver ut ett felmeddelande om inga anpassningar hittades
    .then(data => {
        if (!data.length) {
            localStorage.setItem('errorServices', 'Inga anpassningar hittades.');

            this.setState({
                error:          true,
            })
        
        // Lagrar anpassningarna i state-arrayen
        } else {
            localStorage.removeItem('errorServices');

            this.setState({
                error:          false,
                solutions:      data,
            })
        }
    })

    // Skriver ut ett felmeddelande om ett serverfel har uppstått
    .catch(() => { 
        localStorage.setItem('errorServices', 'Ett serverfel har uppstått. Det gick inte att hämta anpassningar.' 
        + 'Försök igen lite senare.');

        this.setState({
            error:          true,
        })
    })
}

// Funktionen hämtar alla utbildningar
getCourses() {

  // GET-anrop till webbtjänsten om användaren har tryckt på Utbildningar
  fetch('https://iws-rest-api.herokuapp.com/courses')

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
}
}

// Exporterar komponenten
export default App;
