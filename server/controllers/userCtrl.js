const { User } = require("../models/index")
const { signToken } = require("../middlewares/jwt")


class userCtrl {

    static async register(req, res) {
        try {
            console.log(req.body);
            let { userName, password } = req.body

            let user = await User.create({ userName, password })
            res.status(201).json({
                message: {
                    id: user.id,
                    userName: user.userName
                }
            })
        } catch (error) {
            console.log(error);
        }
    }


    static async login(req, res) {
        try {
            let { userName, password } = req.body

            let user = await User.findOne({ where: { userName } })

            // console.log(user, "awkkawwka");

            res.status(200).json({ token: signToken({ id: user.id }), userName: user.dataValues.userName })

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = { userCtrl }