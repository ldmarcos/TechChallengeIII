import React from 'react';
import { Link } from 'react-router-dom';
import '../css/estilos.css';

const PostItem = ({ post }) => {

  return (
    <article className="post">
      <div>
      <img className='img-post-home' src={post.img} alt="Foto relacionada ao post" />
      </div>
      <div>
        <h3>{post.titulo}</h3>
        <p>{post.descricao}</p>
        <div className="post-breve-conteudo" dangerouslySetInnerHTML={{ __html: post.conteudo.slice(0,100)}}/>
        <p className="author">Por: {post.autor}</p>
        <Link to={`/post/${post.id}`} className="btn-secondary">Leia mais</Link>
      </div>
    </article>
  );
};

export default PostItem;
