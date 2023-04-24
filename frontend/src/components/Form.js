import React, { useState, useEffect } from 'react'
import APIService from './APIService'

function Form(props) {
  const[title,setTitle] = useState('')
  const[body,setBody] = useState('')

  useEffect(() => {
    setTitle(props.article.title)
    setBody(props.article.body)
  },[props.article])

  function updateArticle() {
    APIService.UpdateArticle(props.article.id, {title, body})
    .then(res => props.updatedData(res))
    .catch(err => console.log(err))
  }

  function insertArticle() {
    APIService.InsertArticle({title, body})
    .then(res => props.insertedArticle(res))
    .catch(err => console.log(err))
  }


  return (
    <div>
      {props.article &&
        (
          <div className="mb-3">
            <label htmlFor='title' className='form-label'>Title</label>
            <input
              id='title'
              type="text"
              className='form-control'
              placeholder='Please Enter Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              />
            
            <label htmlFor='body' className='form-label'>Description</label>
            <textarea 
              id='body'
              rows='5'
              className='form-control'
              placeholder='Please Enter Description'
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            {
              props.article.id ?
              <button
                onClick={updateArticle}
                className='btn btn-success mt-3'
              >
                Update
              </button>
              : 
              <button
                onClick={insertArticle}
                className='btn btn-success mt-3'
              >
                Insert
              </button>
            }

            
          </div>
        )
      }
    </div>
  )
}

export default Form