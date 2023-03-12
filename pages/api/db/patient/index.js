import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

export default async function handler(req, res) {
    const body = req.body;
    console.log("body", body)
    switch (req.method) {
        case 'GET':
            return await getPatients(res);
        case 'POST':
            return await addPatient(res, body);
        default:
            return res.status(405).json({ message: "Method not allowed", success: false });
    }
}

async function getPatients(res) {
    try {
        const patients = await prisma.patient.findMany({
            include: {
                Internal: true,
                External: true,
                risk: true,
                symptoms: true,
                country: true,
            }
        });
        return res.status(200).json(patients, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error reading from database", success: false });
    }
}

async function addPatient(res, body) {
    try {
        const patient = await prisma.patient.create({
            data: {
                age: body.age,
                gender: body.gender,
                country_id: body.country_id,
            }
        })
        return res.status(200).json(patient, { success: true });
    }
    catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error adding patient", success: false });
    }
}
