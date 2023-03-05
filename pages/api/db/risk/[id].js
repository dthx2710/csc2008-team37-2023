import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

export default async function handler(req, res) {
    const { id } = req.query;
    const body = req.body;
    switch (req.method) {
        case 'GET':
            return await readRisk(res, id);
        case 'POST':
            return await createRisk(res, id, body);
        case 'PUT':
            return await updateRisk(res, id, body);
        default:
            return res.status(405).json({ message: "Method not allowed", success: false });
    }
}

async function readRisk(res, id) {
    try {
        const risk = await prisma.risk.findUnique({
            where: {
                patient_id: id,
            },
        })
        return res.status(200).json(risk, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error reading from database", success: false });
    }
}

async function createRisk(res, id, body) {
    try {
        const risk = await prisma.risk.create({
            data: {
                patient_id: id,
                risk: body.risk,
            }
        })
        return res.status(200).json(risk, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating risk", success: false });
    }
}

async function updateRisk(res, id, body) {
    try {
        const risk = await prisma.risk.update({
            where: {
                patient_id: id,
            },
            data: {
                // TODO: risk data body
            }
        })
        return res.status(200).json(risk, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error updating risk", success: false });
    }
}