import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import AppError from '../errors/AppError';

const prisma = new PrismaClient({
  log: ['query']
})

export default class UsersController {
  public async index(request: Request, response: Response) {
    const users = await prisma.users.findMany({
      take: 5,
      orderBy: { nickname: 'asc' }
    });
    return response.json(users)
  }

  public async store(request: Request, response: Response) {
    const {
      name,
      nickname,
      phone,
    } = request.body

    const userInUse = await prisma.users.findFirst({
      where: { nickname }
    })
    if (userInUse) {
      throw new AppError("Apelido em uso");
    }

    const user = await prisma.users.create({
      data: {
        name,
        nickname,
        phone,
        createdAt: new Date(),
      }
    })
    return response.status(201).json(user)
  }

  public async findByNickname(request: Request, response: Response) {
    const nickname: string = request.params.nickname;;
    const users = await prisma.users.findMany({
      where: { nickname: { startsWith: nickname } },
      take: 5,
      orderBy: { nickname: 'asc' }
    });
    return response.json(users)
  }

  public async show(request: Request, response: Response) {
    const id: number = Number(request.params.id);
    const user = await prisma.users.findFirst({
      where: {
        id
      }
    })
    return response.json(user);
  }
}