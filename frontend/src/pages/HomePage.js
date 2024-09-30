import React from 'react';
import PostList from '../components/PostList';

const HomePage = ({searchTerm}) => {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Bem-vindo ao Blog Escolar</h1>
          <a href="/admin" className="btn">Área Administrativa</a>
        </div>
      </section>
      <section className="posts">
        <div className="container">
          <h2>Últimas Postagens</h2>
          <PostList search={searchTerm} />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
