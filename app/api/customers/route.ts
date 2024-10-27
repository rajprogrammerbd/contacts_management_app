import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const customers = await prisma.contacts.findMany();
    return Response.json(customers);
}

// export async function POST(request: Request) {
//     const res = await request.json();

//     console.log(res);
//     return Response.json({ "name": "Raj" })
// }
