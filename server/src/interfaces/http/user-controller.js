class UserController {
  constructor(createUserService) {
    this.createUserService = createUserService;
  }

  async create(httpRequest) {
    const user = httpRequest.body;

    try {
      const createdUser = await this.createUserService.execute(user);
      return { statusCode: 201, body: createdUser };
    } catch (exception) {
      console.error(exception);
      return {
        statusCode: 500,
        body: { error: exception.message },
      };
    }
  }
}

module.exports = UserController;
