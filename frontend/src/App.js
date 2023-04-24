import { useEffect, useState } from 'react'

import ArticleList from './components/ArticleList'
import Form from './components/Form'

import './App.css'

function App() {

  const [articles, setArticles] = useState([])
  const [editedArticle, setEditedArticle] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => setArticles(res))
    .catch(err => console.log(err))
  },[])

  function editArticle(article) {
    setEditedArticle(article)
  }

  function updatedData(article) {
    const new_article = articles.map(my_article => {
      if(my_article.id === article.id) {
        return article
      } else {
        return my_article
      }
    })
    setArticles(new_article)
  }

  function openForm() {
    setEditedArticle({title: '', body: ''})
  }

  function insertedArticle(article) {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  function deleteArticle(article) {
    const new_articles = articles.filter(myarticle => {
      if(myarticle.id === article.id) {
        return false
      } else {
        return true
      }
    })

    setArticles(new_articles)
  }

  return (
    <div className="App">
      <div className='row'>
        <div className='col '>
        <h1>Flask end ReactJS Course</h1>

        </div>

        <div className='col '>
        <button
          className='btn btn-success'
          onClick={openForm}
        >InsertArticle</button>

        </div>
      </div>

      <ArticleList articles={articles} editArticle={editArticle} deleteArticle={deleteArticle}/>
      
      {editedArticle && <Form article={editedArticle} updatedData={updatedData} insertedArticle={insertedArticle}/> }
      

    </div>
  )
}

export default App
