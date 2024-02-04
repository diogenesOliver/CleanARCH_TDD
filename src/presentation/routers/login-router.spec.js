const LoginRouter = require('./LoginRouter')
const MissingParamError = require('../helpers/MissingParamError')

describe('Login router', () => {
  test('Should return 400 if no email is provide', () => {
    const sut = new LoginRouter()
    const httRequest = {
      body: {
        password: 'anyPassword'
      }
    }

    const httpResponse = sut.route(httRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provide', () => {
    const sut = new LoginRouter()
    const httRequest = {
      body: {
        email: 'anyEmail@.com'
      }
    }

    const httpResponse = sut.route(httRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no httpRequest has no body', () => {
    const sut = new LoginRouter()
    const httRequest = {}

    const httpResponse = sut.route(httRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})
