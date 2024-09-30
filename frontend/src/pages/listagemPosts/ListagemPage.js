import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './listagemPosts.css';
import Modal from '../../components/Modal';
import PostForm from '../../components/Formulario';
import PostEditForm from '../../components/EditForm';
import ModalConfirmacao from '../../components/ModalConfirmacao';

const PostTable = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null); 

  useEffect(() => {
    axios.get(`http://localhost:3000/api/postagens`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const onDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/postagens/${postToDelete}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPosts(posts.filter(post => post.id !== postToDelete));
      setIsModalOpenDelete(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModalAdd = () => {
    setCurrentPost(null);
    setIsModalOpenAdd(true);
  };

  const handleOpenModalEdit = (post) => {
    setCurrentPost(post);
    setIsModalOpenEdit(true);
  };

  const handleOpenModalDelete = (postId) => {
    setPostToDelete(postId);
    setIsModalOpenDelete(true);
  };

  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]);
    setIsModalOpenAdd(false);
  };

  const handleEditPost = (updatedPost) => {
    setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
    setIsModalOpenEdit(false);
  };

  return (
    <div className='container-listagem'>
      <div className='cabecalho'>
        <h2>Postagens</h2>
        <button className='btnNovoPost' onClick={handleOpenModalAdd}>Nova Postagem</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Título</th>
            <th>Autor</th>
            <th style={{ width: '18%' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const date = new Date(post.createdAt);
            const formatDateToBrazilian = (date) => {
              const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/Sao_Paulo',
              };
              return date.toLocaleString('pt-BR', options);
            };

            return (
              <tr key={post.id}>
                <td>{formatDateToBrazilian(date)}</td>
                <td>{post.titulo}</td>
                <td>{post.autor}</td>
                <td>
                  <button onClick={() => handleOpenModalEdit(post)}>Editar</button>
                  <button onClick={() => handleOpenModalDelete(post.id)}>Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isModalOpenAdd && (
        <Modal>
          <PostForm 
            onAddPost={handleAddPost} 
            closeModal={() => setIsModalOpenAdd(false)}
          />
        </Modal>
      )}
      {isModalOpenEdit && currentPost && (
        <Modal>
          <PostEditForm 
            post={currentPost} 
            onEditPost={handleEditPost} 
            closeModal={() => setIsModalOpenEdit(false)}
          />
        </Modal>
      )}
      {isModalOpenDelete && (
        <ModalConfirmacao
          message="Você tem certeza que deseja excluir esta postagem?"
          onConfirm={onDelete}
          onCancel={() => setIsModalOpenDelete(false)} 
        />
      )}
    </div>
  );
};

export default PostTable;
