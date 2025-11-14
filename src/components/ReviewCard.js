import "./reviewCard.css"
import { Rating } from 'primereact/rating';

const ReviewCard = ({review}) => {
    return(
        <div className="container">
            <img className="img"
                src={review.imageUrl} 
                alt={review.title} 
            />
            <div>
                <div className="title">{review.title}</div>
                <div className="star-container">
                    <div className="category">{review.category} </div>
                    <Rating value={review.stars} disabled cancel={false}/>
                </div>
                <div className="text">{review.text}</div>
            </div>
        </div>
    )
}

export default ReviewCard