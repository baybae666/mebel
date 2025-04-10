import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../index";

const FacadeModal = ({onClose, isAction, facade}) => {
    const {facadeStore} = useContext(Context)
    const [name, setName] = useState('')
    const [material, setMaterial] = useState('')
    const [backside, setBackside] = useState('')
    const [batch, setBatch] = useState('')
    const [cover, setCover] = useState('')
    const [patina, setPatina] = useState('')
    const [space, setSpace] = useState(false)
    const [direction, setDirection] = useState('')
    const [guarant, setGuarant] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState('')
    const inputFile = useRef()
    const formData = new FormData()


    const selectFile = e => {
        setPhoto(e.target.files[0])
    }

    const onValues = () => {
        setName(facade.FacadeName)
        setMaterial(facade.Material)
        setBackside(facade.Backside)
        setBatch(facade.Batch)
        setCover(facade.Cover)
        setPatina(facade.Patina)
        setSpace(facade.SpaceForGlass)
        setDirection(facade.Direction)
        setGuarant(facade.Guarantee)
        setPrice(facade.Price)
        setDescription(facade.Description)
    }

    useEffect(() => {
        if (isAction === 'update') {
            onValues()
        }
    }, [isAction]);

    const reset = () => {
        setName('')
        setMaterial('')
        setBackside('')
        setBatch('')
        setCover('')
        setPatina('')
        setSpace(false)
        setDirection('')
        setGuarant('')
        setPrice('')
        setDescription('')
        inputFile.current.type = "text";
        inputFile.current.value = "";
        inputFile.current.type = "file";
    }

    const formDataCreate = async () => {

        try {
            formData.append('FacadeName', name)
            formData.append('Material', material)
            formData.append('Backside', backside)
            formData.append('Batch', batch)
            formData.append('Cover', cover)
            formData.append('Patina', patina)
            formData.append('SpaceForGlass', space)
            formData.append('Direction', direction)
            formData.append('Guarantee', guarant)
            formData.append('Price', price)
            formData.append('Description', description)
            formData.append('PhotoURL', photo)

            await facadeStore.create(formData).then(res => {
                reset()
                onClose()
            })

        } catch (e) {
            console.log(e.response?.data?.message)
        }

    }

    const update = async () => {
        await facadeStore.updateFacade(facade.FacadeID, name, material, backside, batch, cover, patina, space, direction, guarant, price, description).then(res => onClose())
    }


    const onCraeteOrUpdate = () => {
        if (isAction === 'create') {
            return formDataCreate()
        } else {
            return update()
        }
    }

    const del = async () => {
        await facadeStore.delFacade(facade.FacadeID).then(res => onClose())
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
            <div
                className="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {isAction === 'delete' ? (
                    <div className="p-6 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Подтвердите удаление
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Вы уверены, что хотите удалить "{facade?.FacadeName}"?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={del}
                                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                                Удалить
                            </button>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                ) : (
                    <form className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <h2 className="text-2xl font-bold text-gray-900 md:col-span-2">
                            {isAction === 'create' ? 'Новый товар' : 'Редактирование'}
                        </h2>

                        {/* Группа полей */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Название</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Материал</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={material}
                                onChange={(e) => setMaterial(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Обратная сторона</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={backside}
                                onChange={(e) => setBackside(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Партия</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={batch}
                                onChange={(e) => setBatch(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Покрытие</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={cover}
                                onChange={(e) => setCover(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Патина</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={patina}
                                onChange={(e) => setPatina(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                Пространство для стекла
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-blue-600"
                                        checked={space}
                                        onChange={() => setSpace(true)}
                                    />
                                    <span className="text-gray-700">Да</span>
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-blue-600"
                                        checked={!space}
                                        onChange={() => setSpace(false)}
                                    />
                                    <span className="text-gray-700">Нет</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Направление</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={direction}
                                onChange={(e) => setDirection(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Гарантия</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={guarant}
                                onChange={(e) => setGuarant(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Цена</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-gray-700">Описание</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        {isAction === 'create' && (
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Загрузите фото
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={selectFile}
                                        ref={inputFile}
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-200"
                                    >
                                        Выбрать файл
                                    </label>
                                    <span className="text-sm text-gray-500">
                    {photo?.name || 'Файл не выбран'}
                  </span>
                                </div>
                            </div>
                        )}

                        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                type="button"
                                onClick={onCraeteOrUpdate}
                                className="px-6 py-2 bg-[#054C73] hover:bg-[#033952] text-white rounded-lg transition-colors"
                            >
                                {isAction === 'create' ? 'Создать' : 'Сохранить'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FacadeModal;