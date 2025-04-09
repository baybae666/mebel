const path = require('path');
const { Facade, User} = require('../models/model');
const uuid = require('uuid');
const ApiError = require("../Error/ApiError");

class FacadeController {
    async create(req, res) {
        try {
            const {FacadeName, Material, Backside, Batch, Cover, Patina, SpaceForGlass, Direction, Guarantee, Price, Description } = req.body;
            const { PhotoURL } = req.files;

            // Генерация уникального имени для файла с фото
            let fileName = uuid.v4() + ".png";

            // Сохранение файла в директорию 'static'
            PhotoURL.mv(path.resolve(__dirname, '..', 'static', fileName));

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
                PhotoURL: fileName
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
    async update(req, res) {
        try {
            const { userId } = req.params;
            const { profession, age, experience, description } = req.body;
            let fileName = null;

            // Если пришло новое фото, сохраняем его
            if (req.files && req.files.photo) {
                const { photo } = req.files;
                fileName = uuid.v4() + ".jpg";
                photo.mv(path.resolve(__dirname, '..', 'static', fileName));
            }

            const updatedApplicant = await Applicant.update(
                {
                    profession,
                    age,
                    experience,
                    description,
                    photo: fileName || undefined  // Обновляем фото только если оно было передано
                },
                { where: { userId } }
            );

            if (updatedApplicant[0] === 0) {
                return res.status(404).json({ message: 'Соискатель не найден' });
            }

            return res.json({ message: 'Информация о соискателе обновлена' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при обновлении данных соискателя' });
        }
    }

    // Удаление соискателя по userId
    async delete(req, res) {
        try {
            const { userId } = req.params;
            const deletedApplicant = await Applicant.destroy({ where: { userId } });

            if (!deletedApplicant) {
                return res.status(404).json({ message: 'Соискатель не найден' });
            }

            return res.json({ message: 'Соискатель удалён' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при удалении соискателя' });
        }
    }
}

module.exports = new FacadeController();
