import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await addCountry(req, res);
  } else if (req.method === "GET") {
    return await readCountryTable(req, res);
  } else if (req.method === "DELETE") {
    return await deleteCountry(req, res);
  } else if (req.method === "PUT") {
    return await updateCountry(req, res);
  }
  else {
    return res.status(405).json({ message: "Method not allowed", success: false });
  }
}

async function addCountry(req, res) {
  const body = req.body;
  try {
    const newCountry = await prisma.country.create({
      data: {
        country_name: body.country_name,
      }
    });
    return res.status(200).json(newCountry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error adding Country", success: false });
  }
}


async function readCountryTable(req, res) {
  try {
    const countries = await prisma.country.findMany();
    return res.status(200).json(countries, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error reading from database", success: false });
  }
}

async function updateCountry(req, res) {
  const body = req.body;
  try {
    const country = await prisma.country.update({
      where: {
        country_id: body.country_id,
      },
      data: {
        country_name: body.country_name,
      },
    })
    return res.status(200).json(country, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error updating Country", success: false });
  }
}

async function deleteCountry(req, res) {
  const body = req.body;
  try {
    const country = await prisma.country.delete({
      where: {
        country_id: body.country_id,
      },
    })
    return res.status(200).json(country, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error deleting Country", success: false });
  }
}