import React, { useEffect, useState } from 'react';
import { deleteArticle, listArticles } from '../service/ListArticle';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const ListArticle = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
     getAllArticle();
  }, []);

  function getAllArticle(){
    listArticles()
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }
  function addNewArticle() {
    navigate('/add-article');
  }

  function updateArticle(id) {
    navigate(`/update/${id}`); 
  }

  function removeArticle(id){
    console.log(id)
    deleteArticle(id).then((response)=>{
      getAllArticle(); 
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className='article-container'>
      <div className='header'>
        <h1 className='text-center'>List of Articles</h1>
        <button className='btn btn-update' onClick={() => addNewArticle()}>Add Article</button>
      </div>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Article Author</th>
            <th>Article Title</th>
            <th>Article Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.author}</td>
              <td>{article.title}</td>
              <td>{article.content}</td>
              <td>
              <button className='btn btn-update' onClick={() => updateArticle(article.id)}>Update</button>
                <button className='btn btn-delete' onClick={() => removeArticle(article.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListArticle;
