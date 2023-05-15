const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '7d'});
}

// Login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        // Create a token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Create a user
const createUser = [

    // Validate and sanitize fields.
    body("email", "Email must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .withMessage("Must be an email"),
    body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 }),

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
    
        // Create a Book object with escaped and trimmed data.
        const user = new User({
          email: req.body.email,
          password: req.body.password,
        });
    
        if (!errors.isEmpty()) {
          res.status(400).json(errors.mapped());
        } else {
          await user.save();
          res.status(200).json({ message: `Successfully saved user: ${req.body.email}` });
        }
    }),
]


module.exports = { loginUser, createUser };
