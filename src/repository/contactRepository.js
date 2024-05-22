const { prisma } = require("../db/prisma");

const add = async (contact, userid) => {
    return await prisma.contacts.create({
        data: {
            ...contact,
            user: {
                connect: {
                    id: userid
                }
            }
        }
    });
};

const all = async (usersId) => {
    return await prisma.contacts.findMany({
        where: {
            usersId
        }
    }); 
};

const find = async (id, usersId) => {
    return await prisma.contacts.findUnique({
        where: { id, usersId },
    });
};

const put = async (id, contact) => {
    return await prisma.contacts.update({
       data: contact,
       where: { id }
    });
};

const del = async (id) => {
    return await prisma.contacts.delete({
        where: { id }
    });
};

module.exports = {
    add,
    all,
    find,
    put,
    del
};