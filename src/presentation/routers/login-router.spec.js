class LoginRouter {
  route (httpRequest) {
    const { email, password } = httpRequest.body

    if (!email || !password) {
      return {
        statusCode: 400
      }
    }
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
  })
})
