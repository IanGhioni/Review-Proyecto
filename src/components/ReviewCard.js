import "./reviewCard.css"
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

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
                    <Rating 
                        value={review.stars} 
                        precision={0.5} 
                        icon={<StarIcon fontSize="inherit" style={{ color: "#ff1e00ff" }} />}
                        emptyIcon={<StarBorderIcon fontSize="inherit" style={{ color: "#bbb" }}/>}
                        readOnly/>
                </div>
                <div className="text">{review.text}</div>
            </div>
        </div>
    )
}

export default ReviewCard