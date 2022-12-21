import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { ConnectOptions, Mongoose } from 'mongoose'
import Env from '@ioc:Adonis/Core/Env'

export default class MongoProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    const mongoose = new Mongoose()
    mongoose.set('strictQuery', true)
    mongoose
      .connect(Env.get('DATABASE_URL'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        console.log('MongoDB connected')
      })
      .catch((err) => {
        console.log(err)
      })
    this.app.container.singleton('Adonis/Addons/Mongoose', () => mongoose)
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    await this.app.container.use('Adonis/Addons/Mongoose').disconnect()
  }
}
