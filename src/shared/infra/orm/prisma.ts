import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function getMessagesByUser(userId: string) {
    const messages = await prisma.message.findMany({
      where: {
        userId: userId,
      },
      include: {
        chat: true,
      },
    })
    return messages
  }
export { prisma, getMessagesByUser }