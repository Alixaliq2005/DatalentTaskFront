import React, { useEffect, useState } from 'react';
import { createArticle, getArticle, updateArticle } from '../service/ListArticle';
import { useNavigate, useParams } from 'react-router-dom';
import './ArticleComponent.css';

const ArticleComponent = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({
    author: '',
    title: '',
    content: ''
  });

  const { id } = useParams(); // ID-ni əldə edin
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getArticle(id)
        .then((response) => {
          setAuthor(response.data.author);
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]); // ID-ni asılılıqlara əlavə edin

  function handleAuthor(e) {
    setAuthor(e.target.value);
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleContent(e) {
    setContent(e.target.value);
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (author.trim()) {
      errorsCopy.author = '';
    } else {
      errorsCopy.author = 'Author is required';
      valid = false;
    }

    if (title.trim()) {
      errorsCopy.title = '';
    } else {
      errorsCopy.title = 'Title is required';
      valid = false;
    }

    if (content.trim()) {
      errorsCopy.content = '';
    } else {
      errorsCopy.content = 'Content is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    return id ? <h2 className='text-center'>Update Article</h2> : <h2 className='text-center'>Add Article</h2>;
  }

  function saveOrUpdateArticle(e) {
    e.preventDefault();

    if (validateForm()) {
      const article = { author, title, content };
      console.log(article);

      if (id) {
        // Update existing article
        updateArticle(id, article).then((response) => {
          console.log(response.data);
          navigate('/');
        }).catch(error => {
          console.error(error);
        });
      } else {
        // Create new article
        createArticle(article).then((response) => {
          console.log(response.data);
          navigate('/');
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          {pageTitle()}
          <div className='card-body'>
            <form onSubmit={saveOrUpdateArticle}>
              <div className='form-group mb-2'>
                <label className='form-label'>Author:</label>
                <input
                  type='text'
                  placeholder='Enter Article Author'
                  name='author'
                  value={author}
                  className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                  onChange={handleAuthor}
                />
                {errors.author && <div className='invalid-feedback'>{errors.author}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Title:</label>
                <input
                  type='text'
                  placeholder='Enter Article Title'
                  name='title'
                  value={title}
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  onChange={handleTitle}
                />
                {errors.title && <div className='invalid-feedback'>{errors.title}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Content:</label>
                <input
                  type='text'
                  placeholder='Enter Article Content'
                  name='content'
                  value={content}
                  className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                  onChange={handleContent}
                />
                {errors.content && <div className='invalid-feedback'>{errors.content}</div>}
              </div>
              <button type='submit' className='btn btn-success'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleComponent;
