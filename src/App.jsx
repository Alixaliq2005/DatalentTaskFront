import './App.css'
import ArticleCompoent from './components/ArticleCompoent'
import HeaderComponent from './components/HeaderComponent'
import ListArticle from './components/ListArticle'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        <Route path='/add-article' element={<ArticleCompoent/>} />
        <Route path='/' element={<ListArticle/>} />
        <Route path='/update/:id' element={<ArticleCompoent/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
