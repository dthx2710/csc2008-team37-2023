//import { Users } from "@/src/temp_users";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' })
            return
        }
        const body = JSON.parse(JSON.stringify(req.body))

        // const user = Users.find((user) => user.email === body.email && user.password === parseInt(body.password));
        const user = await prisma.Users.findUnique({ where: { username: body.username } });
        if (!user) {
            res.status(404).send({ message: 'User does not exit!' })
            return
        }

        if (body.password != user.password) {
            res.status(404).send({ message: 'Invalid email or password' })
            return
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(405).send({ message: `{error.message}` })
        return
    }
};
