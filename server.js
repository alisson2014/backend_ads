const express = require("express");
const app = express();

app.use(express.json());

const categories = [
    { id: 1, name: "food", active: true },
    { id: 2, name: "drinks", active: true },
    { id: 3, name: "alcoholic beverages", active: false }
];

const setStatusCategory = (newStatus, id) => {
    const indexCategory = categories.findIndex(category => category.id === id);
    categories[indexCategory].active = newStatus;
};

const enableCateogry = id => setStatusCategory(true, id);
const disableCateogry = id => setStatusCategory(false, id);

app.get("/categories", (req, res) => {
    res.json({categories});
});

app.get("/categories/:id", (req, res) => {
    const id = Number(req.params?.id);
    const category = categories.find(category => category.id === id);
    res.json(category);
});

app.post("/categories", (req, res) => {
    const category = req.body;
    category.id = categories.length + 1;
    categories.push(category);
    res.status(201).json({ status: "ok" });
});

app.patch("/categories/:id/activate", (req, res) => {
    enableCateogry(Number(req.params?.id));
    res.sendStatus(204);
});

app.patch("/categories/:id/disabled", (req, res) => {
    disableCateogry(Number(req.params?.id));
    res.sendStatus(204);
});

app.delete("/categories/:id", (req, res) => {
    const id = Number(req.params?.id);
    const indexCategory = categories.findIndex(category => category.id === id);
    delete categories[indexCategory];
    res.sendStatus(204);
});

module.exports = app;