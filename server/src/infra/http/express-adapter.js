const adaptRoute = (controller) => {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };

    const { statusCode, body } = await controller(httpRequest);
    res.status(statusCode).json(body);
  };
};

module.exports = adaptRoute;
