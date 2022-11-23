import HeaderGerman from './components/header/german/header-german';
import HeaderSwedish from './components/header/swedish/header-swedish';
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
import { useSelector } from 'react-redux';
import Header from './components/header/german/header-german';

function App() {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const language = useSelector((state) => state.page.language);

  return (
    <div id="page-wrapper">
      <Router>
        {language == 'Swedish' ? <HeaderSwedish /> : <HeaderGerman />}
        <Routes>
          <Route path="/login" element={isSignedIn ? 
            <Navigate replace to="/admin" username={this.state.username} 
              userRole={this.state.permission} function={this.logoutCallback} /> 
              : <Login />} />
          <Route path="/admin" element={isSignedIn ? 
            <Admin username={this.state.username} userRole={this.state.permission} 
              function={this.logoutCallback} /> : <Navigate replace to="/login" />} />
          <Route path="/" element={<Home signedIn={isSignedIn}
            logout={this.logoutCallback} />} />
          <Route path="/home" element={<Home signedIn={isSignedIn}
            logout={this.logoutCallback} />} />
          <Route path="/about" element={<About signedIn={isSignedIn} 
            logout={this.logoutCallback} />} />
          <Route path="/contact" element={<Contact signedIn={isSignedIn}
            logout={this.logoutCallback} />} />
          <Route path="/services" element={<Services signedIn={isSignedIn}
            logout={this.logoutCallback} />} />
          <Route path="/blog" element={<Blog signedIn={isSignedIn}
            logout={this.logoutCallback} />} />
          <Route path="/accessibility" element={<Accessibility signedIn={isSignedIn}
            logout={this.logoutCallback} />} />
          <Route path="/search" element={<Search signedIn={isSignedIn}
            logout={this.logoutCallback} />} />
          <Route path="/post" element={<Post signedIn={isSignedIn} 
            logout={this.logoutCallback} />} />
          <Route path="/test" element={<Test signedIn={isSignedIn} 
            logout={this.logoutCallback} />} /> 
          <Route path="/solution" element={<Solution signedIn={isSignedIn} 
            logout={this.logoutCallback} />} />
          <Route path="/course" element={<Course signedIn={isSignedIn} 
            logout={this.logoutCallback} />} /> 
          <Route path="*" element={<Home signedIn={isSignedIn}
            logout={this.logoutCallback} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );

  logoutCallback() {
      this.setState({
        signedIn: false,
      })

      sessionStorage.removeItem('signedIn');
      sessionStorage.removeItem('user');
      localStorage.removeItem('permission');
      localStorage.removeItem('component');
  }
}

export default App;
