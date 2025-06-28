import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import blogModel from "@/lib/models/blogModel";
import { writeFile } from 'fs/promises';

// connect to DB
await ConnectDB();

// GET all blogs
export async function GET(request) {
    const blogs = await blogModel.find({});
    return NextResponse.json({ blogs });
}

// POST - Add a blog
export async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),  
        author: formData.get('author'),
        image: imgUrl,
        authorImg: formData.get('authorImg'),
    };

    await blogModel.create(blogData);
    return NextResponse.json({ success: true, msg: "Blog Added" });
}

// DELETE - Delete blog by ID
export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {
        await blogModel.findByIdAndDelete(id);
        return NextResponse.json({ success: true, msg: "Blog deleted successfully." });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, msg: "Failed to delete blog." }, { status: 500 });
    }
}
