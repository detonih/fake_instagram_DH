const { User } = require('../models')
const bcrypt = require("bcrypt");

const userController = {
  create: (_req, res) => {
    return res.render("auth/register");
  },
  store: async (req, res) => {
    const { name, username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
        name,
        username,
        email,
        password: hashPassword,
        create_at: new Date(),
        update_at: new Date(),
      });
      
    if (!user) {
      return res.render("auth/register", {
        msg: "Erro ao cadastrar um usuario",
      });
    }
    return res.redirect("/home");
  },
};

module.exports = userController;
