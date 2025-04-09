import React from 'react';
import { observer } from 'mobx-react-lite';

const UserItem = observer(({ user, onSelect, isSelected }) => {
    return (
        <div
            className={`p-4 border-b border-gray-100 cursor-pointer transition-all
        ${isSelected
                ? 'bg-blue-50 border-l-4 border-blue-500'
                : 'hover:bg-gray-50 hover:pl-5'}`}
            onClick={onSelect}
        >
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{user.Fullname}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <span>{user.Email}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"/>
                        </svg>
                        <span>{user.Phone}</span>
                    </div>
                </div>

                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
          ${user.IsAdmin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.IsAdmin ? 'Администратор' : 'Пользователь'}
                </div>
            </div>
        </div>
    );
});

export default UserItem;