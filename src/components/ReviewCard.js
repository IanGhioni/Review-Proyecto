import "./reviewCard.css"
import { useRouter } from 'next/navigation';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ReviewCard = ({review}) => {
    const router = useRouter()

    return(
        <div className="container" onClick={() => router.push(`/reviews/${review._id}`)}>
            <img className="img"
                src={review.imageUrl} 
                alt={review.title}
                loading="lazy"
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