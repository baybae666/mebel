import React, {useContext, useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import UserItem from './UserItem';
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {PROFILEROUTER} from "../../utils/consts";

const UserList = observer(() => {
    const { userStore } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        userStore.getAll();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Список пользователей
            </h2>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {userStore.users.length > 0 ? (
                    userStore.users.map(user => (
                        <UserItem
                            key={user.UserID}
                            user={user}
                            onSelect={() => navigate(PROFILEROUTER + '/orders' + '/' + user.UserID)}
                            isSelected={userStore.pickUserId === user.UserID}
                        />
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                        </svg>
                        <p className="mt-2">Пользователи не найдены</p>
                    </div>
                )}
            </div>
        </div>
    );
});

export default UserList;