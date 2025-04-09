import React, {useContext, useState, useEffect} from 'react';
import {Context} from "../../index";
import Notification from "../Notification";
import CloseIcon from "../icons/CloseIcon";
import {observer} from "mobx-react-lite";
import WordModal from "./WordModal";

const PasswordModal = ({onClose, onShowNotification}) => {
    const {userStore} = useContext(Context);
    const [word, setWord] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [newPwdCheck, setNewPwdCheck] = useState('');
    const [error, setError] = useState('');
    const [isWord, setIsWord] = useState(false)

    const onCloseWord = () => setIsWord(false)

    useEffect(() => {
        const handleEsc = (e) => {
            setIsWord(false)
            e.key === 'Escape' && onClose()
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);


    const updatePassword = async () => {
        if (newPwd !== newPwdCheck) {
            return setError('Пароли не совпадают');
        }

        await userStore.updatePassword(
            userStore.user.id, newPwd, word)
            .then(res => {
                onShowNotification()
                onClose();
            }).catch(err => {
                setError('Не верный пароль')
            })

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
                className="bg-white rounded-2xl w-full max-w-md relative p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {isWord ? <WordModal onClose={onCloseWord}/>
                : <>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <CloseIcon className="w-6 h-6"/>
                        </button>

                        <h2 className="text-2xl font-bold text-[#054C73] mb-6">
                            Смена пароля
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Проверочное слово
                                </label>
                                <input
                                    type="text"
                                    value={word}
                                    onChange={(e) => {
                                        setWord(e.target.value);
                                        setError('');
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200
                                     focus:ring-2 focus:ring-[#054C73] focus:border-transparent"
                                />
                                <button onClick={() => setIsWord(true)} className='w-full bg-[#054C73] hover:bg-[#033952] text-white
                                 py-3 rounded-xl font-medium transition-colors mt-4'>Забыл проверочное слово
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Новый пароль</label>
                                <input
                                    type="password"
                                    value={newPwd}
                                    onChange={e => {
                                        setNewPwd(e.target.value)
                                        setError('')
                                    }}
                                    className={`w-full px-4 py-3 rounded-xl border border-gray-200
                                     focus:ring-2 focus:ring-[#054C73] focus:border-transparent`}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Подтверждение пароля</label>
                                <input
                                    type="password"
                                    value={newPwdCheck}
                                    onChange={e => {
                                        setNewPwdCheck(e.target.value)
                                        setError('')
                                    }}
                                    className={`w-full px-4 py-3 rounded-xl border border-gray-200
                                     focus:ring-2 focus:ring-[#054C73] focus:border-transparent`}
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm mt-2">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={updatePassword}
                                className={`w-full bg-[#054C73] text-white
                            py-3 rounded-xl font-medium transition-colors mt-4 hover:bg-[#033952]`}
                            >
                                Сменить пароль
                            </button>
                        </div>
                    </>}
            </div>
        </div>

    );
};

export default observer(PasswordModal);