import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient({
  log: ['query']
})

export default class GamesController {
  public async index(request: Request, response: Response) {
    const games = await prisma.games.findMany();
    return response.json(games);
  }

  public async store(request: Request, response: Response) {
    const {
      name,
      duration,
      rounds,
      pointWeight,
    } = request.body

    const game = await prisma.games.create({
      data: {
        name,
        duration,
        rounds,
        pointWeight,
        createdAt: new Date(),
      }
    })
    return response.status(201).json(game);
  }

  public async update(request: Request, response: Response) {
    console.log(request);
    const id: number = Number(request.params.id);
    const {
      name,
      duration,
      rounds,
      pointWeight,
    } = request.body

    const game = await prisma.games.update({
      where: { id },
      data: {
        name,
        duration: Number(duration),
        rounds: Number(rounds),
        pointWeight: Number(pointWeight),
        updatedAt: new Date()
      }
    })
    return response.status(200).json(game)
  }

  public async show(request: Request, response: Response) {
    const id: number = Number(request.params.id);
    const game = await prisma.games.findFirst({
      where: {
        id
      }
    })
    return response.json(game);
  }
}