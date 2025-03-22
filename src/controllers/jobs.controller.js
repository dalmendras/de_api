const JobsService = require('../services/jobs.service');
const service = new JobsService();

const create = async ( req, res ) => {
    try { 
        const response = await service.create(req.body);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
        console.log(error);
    }
}

const getAll = async ( req, res ) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
        console.log(error);
    }
}

const getById = async ( req, res ) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).send({ success: false, message: 'Invalid ID type' });
        }
        const response = await service.findOne(id);
        if (!response) {
            res.status(404).send({ success: false, message: 'Not Found' });
        } else {
            res.json(response);
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
        console.log(error);
    }
}

const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id,body);
        if (response) {
            return res.json({   success: true, 
                                message: 'Updated',
                            });
        } else {
            return res.status(400).send({ success: false, message: 'Update failed' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
        console.log(error);
    }
}

const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.delete(id);
        if (response) {
            return res.json({   success: true, 
                                message: 'Deleted',
                            });
        } else {
            return res.status(400).send({ success: false, message: 'Delete failed' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
        console.log(error);
    }
}

module.exports = {
    create, getAll, getById, updateById, deleteById
};
