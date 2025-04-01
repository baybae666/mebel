function CheckboxUI({labelValue, isChecked, ...props}) {
    return (
        <div className="flex items-center space-x-4">
            <input
                type="checkbox"
                checked={isChecked}
                className="
                appearance-none
                w-6 h-6
                border-2 border-[#054C73]
                rounded-lg
                checked:bg-[#054C73]
                checked:border-transparent
                focus:ring-2 focus:ring-offset-2 focus:ring-[#054C73]
                cursor-pointer
                transition-all
                "
                {...props}
            />
            <label className="text-sm font-medium text-gray-900">{labelValue}</label>
        </div>
    );
}

export default CheckboxUI;
