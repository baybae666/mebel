const path = require('path');
const { Facade, User} = require('../models/model');
const uuid = require('uuid');
const ApiError = require("../Error/ApiError");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: 'dyi58tadf',
    api_key: '299149222584184',
    api_secret: 'c48qesEST7iahU7Boo5zjlJWnl0'
});


class FacadeController {
    async create(req, res) {
        try {
            const {FacadeName, Material, Backside, Batch, Cover, Patina, SpaceForGlass, Direction, Guarantee, Price, Description } = req.body;
            const { PhotoURL } = req.files;

            // Генерация уникального имени для файла с фото
            let fileName = uuid.v4() + ".png";

            const tmpPath = path.resolve(__dirname, '..', 'static', fileName)
            // Сохранение файла в директорию 'static'
            await PhotoURL.mv(tmpPath);
            const result = await cloudinary.uploader.upload(tmpPath);
            fs.unlinkSync(tmpPath);

            const facade = await Facade.create({
                FacadeName,
                Material,
                Backside,
                Batch,
                Cover,
                Patina,
                SpaceForGlass,
                Direction,
                Guarantee,
                Price,
                Description,
                PhotoURL: result.secure_url
            });

            return res.json(facade);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при создании фасада' });
        }
    }

    async getAllFacades(req, res, next) {
        try {
            return res.json(await Facade.findAll())
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getFacadeByIdsFromBack(ids) {
        return await Facade.findAll({ where: { FacadeID: ids } })
    }

    // Получение информации о соискателе по userId
    async getFacade(req, res) {
        try {
            const { FacadeID } = req.params;
            const facade = await Facade.findOne({ where: { FacadeID } });

            if (!facade) {
                return res.status(404).json({ message: 'Соискатель не найден' });
            }

            return res.json(facade);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при получении данных соискателя' });
        }
    }

    // Обновление информации о соискателе
    async update(req, res, next) {
        try {
            const { facadeId, FacadeName, Material, Backside, Batch, Cover, Patina, SpaceForGlass, Direction, Guarantee, Price, Description } = req.body;

            const updatedFacade = await Facade.update(
                {
                    FacadeName,
                    Material,
                    Backside,
                    Batch,
                    Cover,
                    Patina,
                    SpaceForGlass,
                    Direction,
                    Guarantee,
                    Price,
                    Description
                },
                { where: { FacadeID: facadeId } }
            );

            return res.json(updatedFacade);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при обновлении данных товара' });
        }
    }

    // Удаление соискателя по userId
    async delete(req, res) {
        try {
            const {facadeId} = req.body

            const deletedApplicant = await Facade.destroy({ where: { FacadeID: facadeId } });

            if (!deletedApplicant) {
                return res.status(404).json({ message: 'Товар не найден' });
            }

            return res.json({ message: 'Товар удалён' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при удалении товара' });
        }
    }
}

module.exports = new FacadeController();
