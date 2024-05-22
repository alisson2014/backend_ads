const yup = require("yup");
const bcrypy = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const UsersRepository = require("../repository/usersRepository");

const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup.string().required("Senha é obrigatória")
});

const createUser = async (req, res) => {
    const user = req.body;

    try {
        await schema.validate(user);
    } catch (error) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: error.message });
    }

    try {
        const systemUser = await UsersRepository.find(user.email);

        if(systemUser) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "Não é possivel realizar o cadastro" });
        }

        const hashedPassword = bcrypy.hashSync(user.password, 12);
        user.password = hashedPassword;

        const newUser = await UsersRepository.add(user);
        if(!newUser.id) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }

        delete newUser.password;
        return res.status(StatusCodes.CREATED).json({ status: ReasonPhrases.CREATED });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ "error": ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
};

const login = async (req, res) => {
    const user = req.body;
    
   try {
        const systemUser = await UsersRepository.find(user.email);

        if(!systemUser){
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ error: ReasonPhrases.UNAUTHORIZED });
        }

        if(!bcrypy.compareSync(user.password, systemUser.password)){
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ error: ReasonPhrases.UNAUTHORIZED });
        }

        const token = jwt.sign({
            id: systemUser.id,
            email: systemUser.email
        }, process.env.SECRET_KEY, { expiresIn: "1h" });

        return res.status(StatusCodes.OK).json({ "token": token });
   } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ "error": ReasonPhrases.INTERNAL_SERVER_ERROR });
   }
}

module.exports = { createUser, login }