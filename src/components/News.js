import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        
        setLoading(true);
        let data = await fetch(url);
        // props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(50);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);

        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        updateNews();
    }, [])


    const handlePrevClick = async () => {
        console.log("pre");
        setPage(page-1);
        updateNews();
    }

    const handleNextClick = async () => {
        console.log("next");
        setPage(page+1)
        updateNews();
    }

    return (
        <div className='container my-3'>
            <div className="text-center">
                <h1 style={{marginTop:"80px"}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
                </h1>
                {loading && <Spinner />}
            </div>


            <div className="row">
                {!loading && articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                        <NewsItems title={element.title ? element.title.slice(0, 40) : ""} description={element.description} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} newsUrl={element.url} />
                    </div>
                })}

            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={page <= 1} type="button mx-2" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                <button disabled={(page + 1 > Math.ceil(totalResults / props.pageSize))} type="button mx-2" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>

        </div>
    )
}


News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"

}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
