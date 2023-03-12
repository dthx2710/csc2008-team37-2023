import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

export default async function handler(req, res) {
    const { id } = req.query;
    const body = req.body;
    switch (req.method) {
        case 'GET':
            return await readCountry(res, id);
        default:
            return res.status(405).json({ message: "Method not allowed", success: false });
    }
}

async function readCountry(res, id) {
    try {
        const country = await prisma.country.findUnique({
            where: {
                country_id: id,
            },
        })
        return res.status(200).json(country, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error reading from database", success: false });
    }
}
