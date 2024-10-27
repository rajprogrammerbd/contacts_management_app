import connectDb from "../config/db";

export async function GET() {
    await connectDb();

    return Response.json({ message: 'demo message' });
}

export async function POST(request: Request) {
    try {
        await connectDb();

        const res = await request.json();
    
        console.log(res);
        return Response.json({ "name": "Raj" });
    } catch (er) {
        console.error(er);
        
        return Response.json({ error: 'An unexpected error occured' }, { status: 500 })
    }
}
