import axios from "axios";

const REST_API_BASE_URL='http://localhost:8181/api';

export const listArticles=()=>axios.get(REST_API_BASE_URL);

const REST_API_CREATE_URL='http://localhost:8181/api/create';

export const createArticle=(article) => axios.post(REST_API_CREATE_URL,article)

export const getArticle=(articleId) =>axios.get(REST_API_BASE_URL+'/'+articleId);

const REST_API_UPDATE_URL = 'http://localhost:8181/api/update'

export const updateArticle = (id, article) => axios.put(`${REST_API_UPDATE_URL}/${id}`, article)

export const deleteArticle=(articleId) =>axios.delete(REST_API_BASE_URL+'/'+articleId);
