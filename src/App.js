import logo from './logo.svg';
import { firestore, auth, apiKey } from './FirebaseConfig';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Business from './pages/Business';
import Project from './pages/Project';
import Article from './pages/Article';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import Login from './pages/Login';
import Edit from './pages/Edit';
import ContactDetail from './pages/ContactDetail';

function App() {

  const [menuToggle, setMenuToggle] = useState(false);
  const [userObj, setUserObj] = useState({});

  // "project/" or "article/"
  const [docDir, setDocDir] = useState("");  
  const [post, setPost] = useState();

  const menuToggleHandler = () => {
    menuToggle ? setMenuToggle(false) : setMenuToggle(true);
  }
  const navigate = useNavigate();

  const loginHander = (user) => {
    setUserObj(user);
    // navigate('/admin');
    navigate('/');
  }

  const logoutHandler = () => {
    if(window.confirm("로그아웃하시겠습니까?")) {
      signOutFunction();
    } else {

    }
  }

  const signOutFunction = async () => {
    await signOut(auth);
    setUserObj({});
    navigate('/');
  }

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isLoggedIn = sessionStorage.getItem(_session_key) ? true : false;


  const setDirHandler = (dir) => {
    setDocDir(dir);
  }

  const setPostHandler = (item) => {
      setPost(item);
      if(item !== undefined) {
        navigate("/board");
      }
  }


  return (
    <>
      <Header menuToggle={menuToggle} menuToggler={menuToggleHandler} />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/about' element={<About db={firestore} />} />
        <Route path='/business' element={<Business db={firestore} />} />
        <Route path='/project' element={<Project db={firestore} isLoggedIn={isLoggedIn} />} />
        <Route path='/article' element={<Article db={firestore} isLoggedIn={isLoggedIn} />} />
        <Route path='/articleDetail' element={<ArticleDetail db={firestore} isLoggedIn={isLoggedIn} />} />
        <Route path='/projectDetail' element={<ProjectDetail db={firestore} isLoggedIn={isLoggedIn} />} />
        <Route path='/edit' element={<Edit db={firestore} isLoggedIn={isLoggedIn} />} />
        <Route path='/contact' element={<Contact db={firestore} isLoggedIn={isLoggedIn} />} />
        <Route path='/contactDetail' element={<ContactDetail db={firestore} isLoggedIn={isLoggedIn} />} />
        <Route path='/login' element={<Login loginHandler={loginHander} />} />
      </Routes>

      <Footer isLoggedIn={isLoggedIn} handler={logoutHandler} />
    </>
  );
}

export default App;
