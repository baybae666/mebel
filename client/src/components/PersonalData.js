import EditIcon from "./EditIcon";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Notification from "./Notification";
import PasswordModal from "./PasswordModal";

const PersonalData = () => {
    const { userStore } = useContext(Context);
    const [show, setShow] = useState(false)
    const [showNotification, setShowNotification] = useState(false);
    const [noticeMessage, setNoticeMessage] = useState('')
    const [editing, setEditing] = useState({
        name: false,
        email: false,
        phone: false
    });


    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const offNotification = () => setShowNotification(false)
    const onClose = () => setShow(false)
    const onShowNotification = () => {
        setNoticeMessage('Пароль успешно обновлен')
        setShowNotification(true)
    }

    const handleEdit = (field) => {
        setEditing(prev => ({ ...prev, [field]: !prev[field] }));
    };

    useEffect(() => {
        if (userStore.user) {
            setValues({
                name: userStore.user.fullname || '',
                email: userStore.user.email || '',
                phone: userStore.user.phone || ''
            });
        }
    }, [userStore.user]);

    const handleSave = async () => {
        try {
            const updates = [];

            if (values.name !== userStore.user.fullname) {
                updates.push(userStore.updateName(userStore.user.id, values.name));
            }

            if (values.email !== userStore.user.email) {
                updates.push(userStore.updateEmail(userStore.user.id, values.email));
            }

            if (values.phone !== userStore.user.phone) {
                updates.push(userStore.updatePhone(userStore.user.id, values.phone));
            }

            await Promise.all(updates);
            setNoticeMessage('Изменения сохранены успешно')
            setShowNotification(true)

            setEditing({ name: false, email: false, phone: false });

        } catch (err) {
            alert('Ошибка сохранения')
        }
    };

    if (userStore.isLoading) {
        return (
            <div className="max-w-2xl mx-auto p-4 md:p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-10 bg-gray-200 rounded-xl"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#054C73]">
                    Личные данные
                </h2>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 text-[#054C73] hover:text-[#033952]"
                >
                    Сохранить все
                </button>
            </div>

            <div className="space-y-5">
                {['name', 'email', 'phone'].map((field) => (
                    <div key={field} className="group relative">
                        <label className="block text-sm text-gray-600 mb-2">
                            {{
                                name: 'ФИО',
                                email: 'E-mail',
                                phone: 'Телефон'
                            }[field]}
                        </label>

                        <div className="flex gap-2 items-center">
                            <input
                                type={field === 'phone' ? 'tel' : 'text'}
                                disabled={!editing[field]}
                                value={values[field]}
                                onChange={(e) => setValues(prev => ({
                                    ...prev,
                                    [field]: e.target.value
                                }))}
                                className={`w-full px-4 py-3 rounded-xl border transition-all
                                    ${editing[field]
                                    ? 'border-[#054C73] ring-2 ring-[#054C73]/20'
                                    : 'border-gray-200'}`}
                            />

                            <button
                                onClick={() => handleEdit(field)}
                                className={`p-2 rounded-lg transition-colors
                                    ${editing[field]
                                    ? 'bg-[#054C73] text-white'
                                    : 'text-[#054C73] hover:bg-gray-100'}`}
                            >
                                <EditIcon className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {show && <PasswordModal onClose={onClose} onShowNotification={onShowNotification}/>}
            <button
                onClick={() => setShow(true)}
                className="w-full bg-[#054C73] hover:bg-[#033952] text-white
                                 py-3 rounded-xl font-medium transition-colors mt-4"
            >
                Сменить пароль
            </button>

            {showNotification && (
                <Notification
                    message={noticeMessage}
                    duration={3000}
                    offShow={offNotification}
                />
            )}
        </div>
    );
};

export default observer(PersonalData);