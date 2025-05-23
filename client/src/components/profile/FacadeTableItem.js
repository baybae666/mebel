import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import FacadeModal from "./FacadeModal";
import {observer} from "mobx-react-lite";
import TrashIcon from "../icons/TrashIcon";
import PencilIcon from "../icons/PencilIcon";

const FacadeTableItem = ({facade}) => {
    const {facadeStore} = useContext(Context)
    const [values, setValues] = useState(Object.values(facade))
    const [show, setShow] = useState(false)
    const [isAction, setIsAction] = useState(null)
    const onClose = () => setShow(false)

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {facade.FacadeID}
            </td>

            <td className="px-4 py-4">
                <img
                    src={facade.PhotoURL}
                    className="w-12 h-12 object-cover rounded-md"
                    alt={facade.FacadeName}
                />
            </td>

            <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                {facade.FacadeName}
            </td>

            <td className="px-4 py-4 text-sm text-gray-500">
                {facade.Material}
            </td>

            <td className="px-4 py-4 text-sm text-gray-500">
                {facade.Backside}
            </td>

            <td className="px-4 py-4 text-sm text-gray-500">
                {facade.Batch}
            </td>

            <td className="px-4 py-4 text-sm text-gray-500">
                {facade.Cover}
            </td>

            <td className="px-4 py-4 text-sm text-gray-500">
                {facade.Patina}
            </td>

            <td className="px-4 py-4 text-sm text-gray-500">
                {facade.SpaceForGlass ? 'Есть' : 'Нет'}
            </td>

            <td className="px-4 py-4 text-sm text-gray-500">
                {facade.Direction}
            </td>

            <td className="px-4 py-4 text-sm text-gray-500">
                {facade.Guarantee}
            </td>

            <td className="px-4 py-4 text-sm text-gray-500">
                {facade.Price}
            </td>

            <td className="px-4 py-4 text-sm text-gray-500">
                {facade.Description}
            </td>

            <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setIsAction('update');
                            setShow(true);
                        }}
                        className="text-[#054C73] hover:text-[#033952] p-2 rounded-md hover:bg-blue-50"
                    >
                        <PencilIcon className="w-5 h-5"/>
                    </button>

                    <button
                        onClick={() => {
                            setIsAction('delete');
                            setShow(true);
                        }}
                        className="text-red-600 hover:text-red-700 p-2 rounded-md hover:bg-red-50"
                    >
                        <TrashIcon className="w-5 h-5"/>
                    </button>
                </div>
            </td>

            {show && <FacadeModal facade={facade} onClose={onClose} isAction={isAction}/>}
        </tr>
    );
};

export default observer(FacadeTableItem);