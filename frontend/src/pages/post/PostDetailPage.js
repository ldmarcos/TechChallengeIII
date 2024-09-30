import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './PostDetail.css';
import { useParams } from 'react-router-dom';

const PostDetail = () => {

    const [postsDetail, setPostsDetail] = useState([]);

    useEffect(() => {
      axios.get(`http://localhost:3000/api/postagens`)
        .then(response => {
          console.log(response.data)
          setPostsDetail(response.data)
        })
        .catch(error => console.error(error));
    }, []);

    const parametros = useParams();

    const post = postsDetail.find((post) => {
       return post.id === Number(parametros.id)
    }
    );
    if (!post) {
      return <p>Post não encontrado.</p>;
    }

    if (!post) {
        return <p>Erro: posts não estão disponíveis.</p>;
    }

    const date = new Date(post.createdAt)

    function formataData(date) {
      const options = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Sao_Paulo'
      };
      return date.toLocaleString('pt-BR', options);
  }

  const formattedDate = formataData(date);

    return (
      <article className="post-detail-container">
        <h1>{post.titulo}</h1>
        <div className='post-detail-data-autor'>
          <span className="author">Autor: {post.autor}</span>
          <span className='data'>Data: {formattedDate}</span>
        </div>
        <hr className='linha-separacao'/>
        <img className='post-content-img' src={post.img} alt={post.titulo} />
        <hr className='linha-separacao'/>
        <div className='conteudo' dangerouslySetInnerHTML={{ __html: post.conteudo }}/>
      </article>
    );
}

export default PostDetail