import { Router } from 'express';
import GamesController from '../controllers/GamesController';
import UsergamesController from '../controllers/UserGamesController';
import UsersController from '../controllers/UsersController';

export const routes = Router();

const usersController = new UsersController();
const gamesController = new GamesController();
const userGamesController = new UsergamesController();

routes.post('/users', usersController.store);

routes.get('/users/by-nickname/:nickname', usersController.findByNickname);

routes.get('/users/by-id/:id', usersController.show);

routes.get('/users', usersController.index);

routes.get('/games', gamesController.index);

routes.get('/games/:id', gamesController.show);

routes.post('/games', gamesController.store);

routes.put('/games/:id', gamesController.update);

routes.post('/usergames', userGamesController.store);

routes.get('/ranking', userGamesController.ranking);