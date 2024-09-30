import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostDetailPage from './pages/post/PostDetailPage';
import ListagemPage from './pages/listagemPosts/ListagemPage';
import { AuthProvider } from './components/AuthContext';
import { useState } from 'react';
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <AuthProvider>
      <Router>
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
          <Route path="/login" element={<LoginPage />} />
          {/*<Route path="/cadastro" element={<CadastroPage />} />*/}
          <Route path="/postagens" element={<ListagemPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
