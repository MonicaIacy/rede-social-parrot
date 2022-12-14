import express from "express"
import debug from "debug"

import createUserUsecase from "../../../domain/usecases/users/create.user.usecase"
import readUserUsecase from "../../../domain/usecases/users/read.user.usecase"
import updateUserUsecase from "../../../domain/usecases/users/update.user.usecase"
import deleteUserUsecase from "../../../domain/usecases/users/delete.user.usecase"
import listUserUsecase from "../../../domain/usecases/users/list.user.usecase"
import { getErrorMessage } from "../../helpers/errors.helper"

const log: debug.IDebugger = debug("app:users-controller")

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await listUserUsecase.execute()
    res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await readUserUsecase.execute({
      iduser: Number(req.params.iduser),
    });
    res.status(200).send(user)
  }

  async createUser(req: express.Request, res: express.Response) {
    const user = await createUserUsecase.execute(req.body)
    log(user)
    res.status(201).send(user)
  }

  async updateUser(req: express.Request, res: express.Response) {
    const user = await updateUserUsecase.execute(req.body)
    res.status(200).send(user)
  }

  async removeUser(req: express.Request, res: express.Response) {
    try {
      await deleteUserUsecase.execute({
        iduser: Number(req.params.iduser)
      })

      return res.status(204).send()
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  }
}

export default new UsersController()
