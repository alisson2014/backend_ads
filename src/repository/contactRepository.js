const { prisma } = require("../db/prisma");

const add = async (contact) => {
    return await prisma.contacts.create({
        data: contact
    });
};

const all = async () => {
    return await prisma.contacts.findMany();
};

const find = async (id) => {
    return await prisma.contacts.findUnique({
        where: { id },
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