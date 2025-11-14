import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ReviewSchema from '@/model/ReviewSchema';


export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;

    try {
        const skip = (page - 1) * limit;

        const reviews = await ReviewSchema.find({})
        .sort({ createdAt: -1 }) 
        .skip(skip)
        .limit(limit);

        const total = await ReviewSchema.countDocuments();

        return NextResponse.json({
        success: true,
        data: reviews,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / limit),
        },
        });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}


export async function POST(req) {
    try {
        await dbConnect();

        const data = await req.json();
        const review = await ReviewSchema.create(data);

        return NextResponse.json({ success: true, data: review });

    } catch (error) {
        return NextResponse.json(
        { success: false, message: "Error creating review" }, 
        { status: 500 }
        );
    }
}

