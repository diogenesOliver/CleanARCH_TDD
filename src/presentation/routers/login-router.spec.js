const LoginRouter = require('./LoginRouter')
const MissingParamError = require('../helpers/MissingParamError')

const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)

  return {
    sut,
    authUseCaseSpy
  }
}

describe('Login router', () => {
  test('Should return 400 if no email is provide', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    const httRequest = {}

    const httpResponse = sut.route(httRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no httpRequest is provide', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route()

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httRequest = {
      body: {
        email: 'anyEmail@.com',
        password: 'anyPassword'
      }
    }

    sut.route(httRequest)
    expect(authUseCaseSpy.email).toBe(httRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httRequest.body.password)
  })

  test('Should return 401 when invalid credentions are provide', () => {
    const { sut } = makeSut()
    const httRequest = {
      body: {
        email: 'Invalid_Email@.com',
        password: 'Invalid_Password'
      }
    }

    const httpResponse = sut.route(httRequest)
    expect(httpResponse.statusCode).toBe(401)
  })
})
