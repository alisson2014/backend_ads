const yup = require("yup");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const ContactRepository = require("../repository/contactRepository");

const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    phone: yup
        .string()
        .matches(/^\d{11}$/, 'Número de telefone inválido')
        .required('O telefone é obrigatório'),
});

const createContact = async (req, res, next) => {
    const contact = req.body;

    try {
        await schema.validate(contact);
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: error.message
        });
    }

    try {
        const newContact = await ContactRepository.add(contact, req.user.id);
        return res.status(StatusCodes.CREATED).json(newContact);
    } catch (error) {
        return next(error);
    }
};

const updateContact = async (req, res, next) => {
    if(isNaN(req.params?.id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Id deve ser númerico" });
    }

    const id = Number(req.params.id);

    try {
        const contactDb = await ContactRepository.find(id, req.user.id);

        if(!contactDb){
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Contato não encontrado" });
        } 
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }

    const contact = req.body;

    try {
        await schema.validate(contact);
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: error.message
        });
    }

    try {
        const newContact = await ContactRepository.put(id, contact);
        return res.status(StatusCodes.OK).json(newContact);
    } catch (error) {
        return next(error);
    }
};

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await ContactRepository.all(req.user.id);
        return res.status(StatusCodes.OK).json(contacts);
    } catch (error) {
        return next(error);
    }
};

const findContact = async (req, res, next) => {
    if(isNaN(req.params?.id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Id deve ser númerico" });
    }

    const contactId = Number(req.params.id);

    try {
        const contact = await ContactRepository.find(contactId, req.user.id);
        if(!contact) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
        }
        
        return res.status(StatusCodes.OK).json(contact);
    } catch (error) {
        return next(error);
    }
}

const deleteContact = async (req, res, next) => {
    if(isNaN(req.params?.id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Id deve ser númerico" });
    }

    const id = Number(req.params.id);

    try {
        const contact = await ContactRepository.find(id, req.user.id);

        if(!contact){
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Contato não encontrado" });
        }

        await ContactRepository.del(id);
        return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    createContact,
    getAllContacts,
    findContact,
    updateContact,
    deleteContact
};