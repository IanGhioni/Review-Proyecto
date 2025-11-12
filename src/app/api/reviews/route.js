import dbConnect from '@/lib/mongodb';
import ReviewSchema from '@/model/ReviewSchema';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();
        const review = await ReviewSchema.create(data);
        return NextResponse.json(review, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Error creando review' }, { status: 500 });
    }
}