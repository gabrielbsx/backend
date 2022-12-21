import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) { }

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const Auth = this.app.container.resolveBinding('Adonis/Addons/Auth')
    const Hash = this.app.container.resolveBinding('Adonis/Core/Hash')
    const { MongoAuthProvider } = await import('./MongoAuthProvider')
    Auth.extend('provider', 'mongo', (_, __, config) => {
      return new MongoAuthProvider(config, Hash)
    })
  }

  public async ready() {
    if (this.app.environment === 'web') {
      await import('../start/socket')
    }
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
