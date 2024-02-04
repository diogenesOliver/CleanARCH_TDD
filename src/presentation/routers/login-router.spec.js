class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }

    const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('email')
    }

    if (!password) {
      return HttpResponse.badRequest('password')
    }
  }
}

class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return { statusCode: 500 }
  }
}

class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

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
