import Navbar from "@/components/Navbar";
import dbConnect from "@/lib/mongodb";
import ReviewSchema from "@/model/ReviewSchema";
import ClientReview from "./ClientReview";

export default async function PaginaReview(props) {
    const params = await props.params;

    const { id } = params;


    await dbConnect();
    const review = await ReviewSchema.findById(id).lean();
    const safeReview = JSON.parse(JSON.stringify(review));

    if (!review) {
        return <h1>Review no encontrada</h1>;
    }

    return (
        <div>
            <ClientReview review={safeReview}/>
        </div>
    );
}
