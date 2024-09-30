import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostItem from './PostItem';
import '../css/estilos.css';

const PostList = ({search}) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = search.length === 0
          ? `http://localhost:3000/api/postagens`
          : `http://localhost:3000/api/postagens/search?pesquisa=${search}`;

        const response = await axios.get(url);
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [search]);

  return (
    <div className="posts">
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
