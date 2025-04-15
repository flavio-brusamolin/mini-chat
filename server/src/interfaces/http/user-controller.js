class UserController {
  constructor(createUserService) {
    this.createUserService = createUserService;
  }

  async create(req, res) {
    const user = req.body;

    try {
      const createdUser = await this.createUserService.execute(user);
      res.status(201).json(createdUser);
    } catch (exception) {
      const error = { error: exception.message };
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
