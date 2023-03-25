import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

export default async function handler(req, res) {
    const id = parseInt(req.query.id);
    const body = req.body;
    switch (req.method) {
        case 'GET':
            return await readPatient(res, id);
        case 'PUT':
            return await updatePatient(res, id, body);
        case 'DELETE':
            return await deletePatient(res, id);
        default:
            return res.status(405).json({ message: "Method not allowed", success: false });
    }
}

async function readPatient(res, id) {
    try {
        const patient = await prisma.patient.findUnique({
            where: {
                patient_id: id,
            },
            include: {
                Internal: true,
                External: true,
                risk: true,
                symptoms: true,
                country: true,
            }
        })
        return res.status(200).json(patient, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error reading from database", success: false });
    }
}

async function updatePatient(res, id, body) {
    try {
        const patient = await prisma.patient.update({
            where: {
                patient_id: id,
            },
            data: {
                age: body.age,
                gender: body.gender
            }
        })
        return res.status(200).json(patient, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error updating patient", success: false });
    }
}

async function deletePatient(res, id) {
    try {
        console.log('deleting patient', id)
        const patient = await prisma.patient.delete({
            where: {    
                patient_id: id,
            },
        })
        return res.status(200).json(patient, { success: true });
    }
    catch (error) {
        console.error("Request error", error);2
        res.status(500).json({ error: "Error deleting patient", success: false });
    }
}