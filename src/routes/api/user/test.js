module.exports = async (req, res, next) => {
    res.json(req.body.user);
}