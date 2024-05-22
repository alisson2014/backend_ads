const { prisma } = require("../db/prisma");

const add = async user => {
    return await prisma.users.create({
        data: user
    });
};

const find = async email => {
    return await prisma.users.findUnique({
        where: {
            email: email
        }
    });
};

module.exports = { add, find };