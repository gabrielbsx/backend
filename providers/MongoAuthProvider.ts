import type { Model } from 'mongoose'
import type { HashContract } from '@ioc:Adonis/Core/Hash'
import type { UserProviderContract, ProviderUserContract } from '@ioc:Adonis/Addons/Auth'
import { UserDocument } from 'App/Models/User'

export type MongoAuthProviderConfig = {
  driver: 'mongo'
  uids: string[]
  model: () => Promise<{ default: Model<UserDocument> }>
}

class ProviderUser implements ProviderUserContract<UserDocument> {
  constructor(public user: UserDocument | null, private hash: HashContract) {}

  public getId() {
    return this.user ? (this.user._id as string) : null
  }

  public getRememberMeToken() {
    // return this.user ? this.user.rememberMeToken : null
    return null
  }

  public setRememberMeToken(token: string) {
    if (!this.user) {
      return
    }
    // this.user.rememberMeToken = token
  }

  public async verifyPassword(plainPassword: string) {
    if (!this.user) {
      throw new Error('Cannot verify password for non-existing user')
    }

    return await this.hash.verify(this.user.password, plainPassword)
  }
}

export class MongoAuthProvider implements UserProviderContract<UserDocument> {
  constructor(public config: MongoAuthProviderConfig, private hash: HashContract) {}

  private async resolveModel() {
    return (await this.config.model()).default
  }

  public async getUserFor(user: UserDocument | null) {
    return new ProviderUser(user, this.hash)
  }

  public async updateRememberMeToken(user: ProviderUser) {
    const User = await this.resolveModel()
    await User.updateOne({ _id: user.getId() }, { rememberMeToken: user.getRememberMeToken() })
  }

  public async findById(id: string | number) {
    const User = await this.resolveModel()
    const user = await User.findById(id)
    return this.getUserFor(user || null)
  }

  public async findByUid(uidValue: string) {
    const User = await this.resolveModel()
    const query = User.findOne()

    this.config.uids.forEach((uid) => {
      query.where(uid).equals(uidValue)
    })

    const user = await query
    return this.getUserFor(user || null)
  }

  public async findByRememberMeToken(userId: string | number, token: string) {
    const User = await this.resolveModel()
    const user = await User.findOne()
      .where('_id')
      .equals(userId)
      .where('rememberMeToken')
      .equals(token)

    return this.getUserFor(user || null)
  }
}
