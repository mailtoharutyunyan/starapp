const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.login = function (req, res) {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password

        }
    });
};

module.exports.register = async function (req, res) {
    //email , password
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        // ete ka uzer , petq sxal shprtem
        res.status(409).json({
            message: 'Senc mail arden granvaca , pordzeq urish'
        })
    } else {
        // petqa user sarqem
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            await user.save();
            res.status(201).json(user)
        } catch (e) {
            // console.log(e)
        }
    }
};
