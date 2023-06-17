import React from 'react'
import './Navbar.css'
const NewsItems = (props) => {

        let { title, description, imgUrl, newsUrl, author, date, source } = props;
        return (
            <div>
                <div className='my-3'>

                    <div className="card" >
                            
                        <div className="source">
                            {  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id='source' >
                                {source}
                                {/* // { <span className="visually-hidden"></span> } */}
                             </span> } 
                        </div>
                        <img src={!imgUrl ? "https://c.ndtvimg.com/2023-03/25ji9fmg_virat-kohli-afp_625x300_11_March_23.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675" : imgUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}</p>
                            <p className="time" id='date'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</p>
                            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}
export default NewsItems
