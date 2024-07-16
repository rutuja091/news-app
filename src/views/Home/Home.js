import React, { useEffect, useState } from 'react'
import "./Home.css"
import axios from "axios"

import NewsArticle from '../../components/NewsArticles/NewsArticles.js'
function Home() {
  const [news, setNews] = useState([])
  const [searchQuery, setSearchQuery] = useState("maharashtra")
  const loadNews = async () => {
    try{
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}&from=2024-07-15&to=2024-07-15&sortBy=popularity&apiKey=${process.env.REACT_APP_API_KEY}`);
    setNews(response.data.articles)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    loadNews()
  }, [])

  useEffect(() => {
    loadNews()
  }, [searchQuery])
  return (
    <div>
      <h1>News App</h1>

      <input
        type="text"
        className='search-input'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} />

      <div className='news-container'>
        {
          news.map((newsArticle, index) => {
            const { author, title, description, url, urlToImage, publishedAt } = newsArticle
            return (<NewsArticle author={author} title={title} description={description} url={url} urlToImage={urlToImage} publishedAt={publishedAt} key={index} />)

          })
        }
      </div>
    </div>
  )
}

export default Home
