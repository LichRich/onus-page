import logo from './logo.svg';
import { firestore } from './FirebaseConfig';
import { Route, Routes } from 'react-router-dom';
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

function App() {

  const [menuToggle, setMenuToggle] = useState(false);

  const menuToggleHandler = () => {
    menuToggle ? setMenuToggle(false) : setMenuToggle(true);
  }

  return (
    <>
      <Header menuToggle={menuToggle} menuToggler={menuToggleHandler} />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/about' element={<About db={firestore} />} />
        <Route path='/business' element={<Business db={firestore} />} />
        <Route path='/project' element={<Project db={firestore} />} />
        <Route path='/article' element={<Article db={firestore} />} />
        <Route path='/articleDetail' element={<ArticleDetail />} />
        <Route path='/projectDetail' element={<ProjectDetail />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
