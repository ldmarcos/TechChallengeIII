import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import './Formulario.css'

const PostForm = ({ onAddPost, post, closeModal }) => {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [img, setImg] = useState('');
    const [conteudo, setConteudo] = useState('');
    const token = localStorage.getItem('token');

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];

    const module = {
        toolbar: toolbarOptions
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            id: post ? post.id : null,
            titulo,
            autor,
            img,
            conteudo,
        };

        try {
            const response = await axios.post('http://localhost:3000/api/postagens', newPost, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log(response.data);
            onAddPost(newPost);
            resetForm();
        } catch (error) {
            console.error('Erro ao adicionar a postagem:', error);
        }
    };

    const resetForm = () => {
        setTitulo('');
        setAutor('');
        setConteudo('');
        setImg('');
    };

    const handleChange = (value) => {
        setConteudo(value);
    };

    return (
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
                    required 
                />
            </div>
            <div>
                <label className='label'>Conteúdo:</label>
                <ReactQuill 
                    value={conteudo}
                    onChange={handleChange}
                    modules={module}
                    className='quill-editor'
                />
            </div>
            <div className='button-container'>
                <button className='btnEditar' type='submit'>Adicionar Postagem</button>
                <button type='button' className='btnCancelar' onClick={closeModal}>Cancelar</button>
            </div>
        </form>
    );
    
};

export default PostForm;
