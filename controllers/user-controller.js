import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(404).json({ Message: "Enter value for all fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ Message: "User already exists" });
    }

    const salt = 10;

    const hashedPassword = bcrypt.hashSync(password, salt);
    const new_user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await new_user.save();

    return res.status(200).json(new_user);
  } catch (err) {
    return console.log(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !req.body.password) {
      return res
        .status(404)
        .json({ Message: "Please Enter values of all fields" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ Message: "User does not exists. Plese register first!!" });
    }

    const existingUserPassword = bcrypt.compareSync(
      req.body.password,
      existingUser.password
    );

    if (!existingUserPassword) {
      return res.status(400).json({ Message: "Inalid Credentials" });
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.SECRET_KEY);

    const { password, ...others } = existingUser._doc;

    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(others);
  } catch (err) {
    return console.log(err);
  }
};
