import '../Formulario/Formulario.css';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import ModalConfirmacao from '../ModalConfirmacao';

const PostEditForm = ({ onEditPost, post, closeModal }) => {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [img, setImg] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button

]

    useEffect(() => {
        if (post) {
            setTitulo(post.titulo);
            setAutor(post.autor);
            setConteudo(post.conteudo);
            setImg(post.img || '');
        }
    }, [post]);

    const token = localStorage.getItem('token');

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirm = async () => {
        const edittedPost = {
            id: post.id,
            titulo,
            img,
            autor,
            conteudo
        };

        try {
            const response = await axios.put(`http://localhost:3000/api/postagens/${post.id}`, edittedPost, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log(response.data);
            onEditPost(edittedPost);
            resetForm();
            closeModal();
        } catch (error) {
            console.error('Erro ao editar a postagem:', error);
            setError('Ocorreu um erro ao editar a postagem. Tente novamente.');
        }
    };

    const resetForm = () => {
        setTitulo('');
        setAutor('');
        setConteudo('');
        setImg('');
        setShowModal(false); // Close modal on reset
    };

    const handleCancel = () => {
        setShowModal(false); // Hide modal without submitting
    };

    return (
        <>
            <form className='formulario' onSubmit={handleSubmit}>
                <div>
                    <label className='label'>Título:</label>
                    <input
                        className='input'
                        type='text'
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className='label'>Autor:</label>
                    <input
                        className='input'
                        type='text'
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className='label'>Imagem:</label>
                    <input
                        className='input'
                        type='text'
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                    />
                </div>
                <div>
                    <label className='label'>Conteúdo:</label>
                    <ReactQuill
                        value={conteudo}
                        onChange={(value) => setConteudo(value)}
                        modules={{ toolbar: toolbarOptions }}
                        className='quill-editor'
                    />
                </div>
                <div className='button-container'>
                    <button className='btnEditar' type='submit'>Editar Postagem</button>
                    <button className='btnCancelar' type='button' onClick={closeModal}>Cancelar</button>
                </div>
            </form>

            {showModal && (
                <ModalConfirmacao
                    message="Você tem certeza que deseja editar esta postagem?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
            {error && <div className="error">{error}</div>}
        </>
    );
};

export default PostEditForm;
