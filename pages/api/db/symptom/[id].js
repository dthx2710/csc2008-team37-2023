import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

export default async function handler(req, res) {
    const { id } = req.query;
    const body = req.body;
    switch (req.method) {
        case 'GET':
            return await readSymptom(res, id);
        case 'POST':
            return await createSymptom(res, id, body);
        case 'PUT':
            return await updateSymptom(res, id, body);
        default:
            return res.status(405).json({ message: "Method not allowed", success: false });
    }
}

async function readSymptom(res, id) {
    try {
        const symptom = await prisma.symptom.findUnique({
            where: {
                patient_id: id,
                chest_pain: body.chest_pain,
                coughing_of_blood: body.coughing_of_blood,
                fatigue: body.fatigue,
                weight_loss: body.weight_loss,
                shortness_of_breath: body.shortness_of_breath,
                wheezing: body.wheezing,
                swallowing_difficulty: body.swallowing_difficulty,
                clubbing_of_fingernails: body.clubbing_of_fingernails,
                frequent_cold: body.frequent_cold,
                dry_cough: body.dry_cough,
                snoring: body.snoring,
            },
        })
        return res.status(200).json(symptom, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error reading from database", success: false });
    }
}

async function createSymptom(res, id, body) {
    try {
        const symptom = await prisma.symptom.create({
            data: {
                patient_id: id,
                // TODO: symptom data body
            }
        })
        return res.status(200).json(symptom, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating symptom", success: false });
    }
}

async function updateSymptom(res, id, body) {
    try {
        const symptom = await prisma.symptom.update({
            where: {
                patient_id: id,
            },
            data: {
                // TODO: symptom data body
            }
        })
        return res.status(200).json(symptom, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error updating symptom", success: false });
    }
}