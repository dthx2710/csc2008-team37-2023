import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

export default async function handler(req, res) {
    const { id } = req.query;
    const body = req.body;
    switch (req.method) {
        case 'GET':
            return await readInternal(res, id);
        case 'POST':
            return await createInternal(res, id, body);
        case 'PUT':
            return await updateInternal(res, id, body);
        default:
            return res.status(405).json({ message: "Method not allowed", success: false });
    }
}

async function readInternal(res, id) {
    try {
        const internal = await prisma.internal.findUnique({
            where: {
                patient_id: id,
            },
        })
        return res.status(200).json(internal, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error reading from database", success: false });
    }
}

async function createInternal(res, id, body) {
    try {
        const internal = await prisma.internal.create({
            data: {
                patient_id: id,
                alcohol_use: body.alcohol_use,
                dust_allergy: body.dust_allergy,
                genetic_risk: body.genetic_risk,
                chronic_lung_disease: body.chronic_lung_disease,
                balanced_diet: body.balanced_diet,
                obesity: body.obesity,
                active_smoking: body.active_smoking,
                passive_smoking: body.passive_smoking,
            }
        })
        return res.status(200).json(internal, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating internal", success: false });
    }
}

async function updateInternal(res, id, body) {
    try {
        const internal = await prisma.internal.update({
            where: {
                patient_id: id,
            },
            data: {
                // TODO: internal data body
            }
        })
        return res.status(200).json(internal, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error updating internal factors", success: false });
    }
}