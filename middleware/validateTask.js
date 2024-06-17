const validateTask = (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }
    next();
  };
  module.exports = validateTask;
  