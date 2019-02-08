const Position = require('../models/Position');
const errorhandler = require('../utils/errorHandler');


module.exports.getByCategoryid = async function (req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        });
        res.status(200).json(positions)
    } catch (e) {
        errorhandler(res, e)
    }
};
module.exports.create = async function (req, res) {
    try {
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save();
        res.status(201).json(position)
    } catch (e) {
        errorhandler(res, e)
    }

};
module.exports.remove = async function (req, res) {
    try {
        await Position.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Pazician jnjvela'
        })
    } catch (e) {
        errorhandler(res, e)
    }
};
module.exports.update = async function (req, res) {
    try {
        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body}, //mongusi mej save a anum
            {new: true}//mongoosei mej update a anum heto a talis userin
        );
        res.status(200).json(position)
    } catch (e) {
        errorhandler(res, e)
    }
};
