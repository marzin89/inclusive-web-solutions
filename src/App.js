import HeaderGerman from './components/header/german/header-german';
import HeaderSwedish from './components/header/swedish/header-swedish';
import Footer from './components/footer/footer';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
import Home from './pages/home/home';
import AboutSwedish from './pages/about/swedish/about-swedish';
import AboutGerman from './pages/about/german/about-german';
import ContactSwedish from './pages/contact/swedish/contact-swedish';
import ContactGerman from './pages/contact/german/contact-german';
import Services from './pages/services/services';
import Blog from './pages/blog/blog';
import AccessibilitySwedish from './pages/accessibility/swedish/accessibility-swedish';
import AccessibilityGerman from './pages/accessibility/german/accessibility-german';
import Search from './pages/search/search';
import Post from './pages/post/post';
import Test from './pages/test/test';
import Solution from './pages/solution/solution';
import Course from './pages/course/course';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { testActions } from './store/slices/test-slice';
import { solutionActions } from './store/slices/solution-slice';
import { courseActions } from './store/slices/course-slice';
import { postActions } from './store/slices/post-slice';

function App() {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const language = useSelector((state) => state.page.language);
  const dispatch = useDispatch();

  function getPosts() {
    fetch('http://localhost:8080/posts')
    .then((response) => {
      if (response.status == 200) {
        const data = response.json();
        dispatch(postActions.setErrorMessage(''));
        dispatch(postActions.setPosts(data));
      
      } else {
        dispatch(postActions.setErrorMessage(language == 'Swedish' ? 'Inga inlägg hittades.' : 
          'Es wurden keine Posts gefunden.'));
      }
    })
    .catch(() => {
      if (language == 'Swedish') {
        dispatch(postActions.setErrorMessage('Ett serverfel har uppstått.' 
          + 'Det gick inte att hämta inlägg. Försök igen lite senare.'));
        
      } else {
        dispatch(postActions.setErrorMessage('Ein Serverfehler ist aufgetreten.'
          + 'Es konnten keine Posts abgerufen werden. Versuchen Sie es später erneut.'));
      }
    });
  }

  function getTests() {
    fetch('http://localhost:8080/tests')
    .then(response => {
      if (response.status == 200) {
        const data = response.json();
        dispatch(testActions.setTests(data));
        dispatch(testActions.setErrorMessage(''));
      
      } else {
        dispatch(testActions.setErrorMessage(language == 'Swedish' ? 'Inga tester hittades.' : 
          'Es wurden keine Tests gefunden.'));
      }
    })
    .catch(() => {
      if (language == 'Swedish') {
        dispatch(testActions.setErrorMessage('Ett serverfel har uppstått.' 
          + 'Det gick inte att hämta tester. Försök igen lite senare.'));
      
      } else {
        dispatch(testActions.setErrorMessage('Ein Serverfehler ist aufgetreten.' 
          + 'Es konnten keine Tests abgerufen werden. Versuchen Sie es später erneut.'));
      }
    });
  }

  function getSolutions() {
    fetch('http://localhost:8080/solutions')
    .then(response => {
      if (response.status == 200) {
        const data = response.json();
        dispatch(solutionActions.setErrorMessage(''));
        dispatch(solutionActions.setSolutions(data));
      
      } else {
        dispatch(solutionActions.setErrorMessage(language == 'Swedish' ? 'Inga utvecklingspaket hittades.' :
        'Es wurden keine Development-pakete gefunden.'));
      }
    })
    .catch(() => {
      if (language == 'Swedish') {
        dispatch(solutionActions.setErrorMessage('Ett serverfel har uppstått.' 
          + 'Det gick inte att hämta utvecklingspaket. Försök igen lite senare.'));
      
      } else {
        dispatch(solutionActions.setErrorMessage('Ein Serverfehler ist aufgetreten.' 
          + 'Es konnten keine Development-Pakete abgerufen werden. Versuchen Sie es später erneut.'));
      }
    });
  }

  useEffect(() => {
    getPosts();
    getTests();
  })

  return (
    <div id="page-wrapper">
      <Router>
        {language == 'Swedish' ? <HeaderSwedish /> : <HeaderGerman />}
        <Routes>
          <Route path="/login" element={isSignedIn ? 
            <Navigate replace to="/admin" /> : <Login />} />
          <Route path="/admin" element={isSignedIn ? 
            <Admin /> 
              : <Navigate replace to="/login" />} />
          <Route path="/" element={<Home language={language} isSignedIn={isSignedIn} />} />
          <Route path="/home" element={<Home language={language} isSignedIn={isSignedIn} />} />
          <Route path="/about" element={language == 'Swedish' ? <AboutSwedish isSignedIn={isSignedIn} /> : <AboutGerman />} />
          <Route path="/contact" element={language == 'Swedish' ? <ContactSwedish isSignedIn={isSignedIn} /> : <ContactGerman />} />
          <Route path="/services" element={<Services language={language} />} />
          <Route path="/blog" element={<Blog language={language} />} />
          <Route path="/accessibility" element={language == 'Swedish' ? <AccessibilitySwedish isSignedIn={isSignedIn} /> 
            : <AccessibilityGerman />} />
          <Route path="/search" element={<Search language={language} />} />
          <Route path="/post" element={<Post signedIn={isSignedIn} />} />
          <Route path="/test" element={<Test signedIn={isSignedIn} />} /> 
          <Route path="/solution" element={<Solution signedIn={isSignedIn} />} />
          <Route path="/course" element={<Course signedIn={isSignedIn} />} /> 
          <Route path="*" element={<Home language={language} isSignedIn={isSignedIn} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
