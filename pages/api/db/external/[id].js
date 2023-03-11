import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

export default async function handler(req, res) {
    const id = parseInt(req.query.id);
    const body = req.body;
    switch (req.method) {
        case 'GET':
            return await readExternal(res, id);
        case 'POST':
            return await createExternal(res, id, body);
        case 'PUT':
            return await updateExternal(res, id, body);
        default:
            return res.status(405).json({ message: "Method not allowed", success: false });
    }
}

async function readExternal(res, id) {
    try {
        const external = await prisma.external.findUnique({
            where: {
                patient_id: id,
            },
        })
        return res.status(200).json(external, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error reading from database", success: false });
    }
}

async function createExternal(res, id, body) {
    try {
        const external = await prisma.external.create({
            data: {
                patient_id: id,
                air_pollution: body.air_pollution,
                occupational_hazards: body.occupational_hazards,
            }
        })
        return res.status(200).json(external, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating external", success: false });
    }
}

async function updateExternal(res, id, body) {
    try {
        const external = await prisma.external.update({
            where: {
                patient_id: id,
            },
            data: {
                // TODO: external data body
            }
        })
        return res.status(200).json(external, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error updating external factors", success: false });
    }
}