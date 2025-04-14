class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(req, res) {
    const user = req.body;

    try {
      const createdUser = await this.userRepository.create(user);
      res.status(201).json(createdUser);
    } catch (exception) {
      const error = { error: exception.message };
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
