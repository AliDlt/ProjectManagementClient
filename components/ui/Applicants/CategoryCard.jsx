import React from "react";

const CategoryCard = ({ name, description, onEdit, onShow }) => {
    return (
        <div className="relative bg-white border rounded-lg shadow p-4 flex flex-col justify-between w-auto">
            {/* Card Content */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{name}</h3>
                <p className="text-sm text-gray-600 break-words">{description}</p>
            </div>
        </div>
    );
};

export default CategoryCard;
