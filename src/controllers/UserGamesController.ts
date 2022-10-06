import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient({
  log: ['query']
})

export default class UsergamesController {
  public async store(request: Request, response: Response) {
    const {
      userId,
      gameId,
      hits,
      playedTime,
      score,
    } = request.body

    const usergame = await prisma.usergames.create({
      data: {
        userId,
        gameId,
        hits,
        playedTime,
        score,
        createdAt: new Date(),
      }
    })
    return response.status(201).json(usergame)
  }

  public async ranking(request: Request, response: Response) {
    const result = await prisma.$queryRaw`
      select usergames.id, users.nickname, usergames.score 
        from usergames 
       inner join users on usergames.userId = users.id 
       order by usergames.score desc`
    return response.json(result)
  }
}