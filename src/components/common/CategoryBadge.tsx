
import React from "react";
import { Category } from "@/context/PromptContext";

interface CategoryBadgeProps {
  category: Category;
  onClick?: (categoryId: number) => void;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick(category.id);
    }
  };

  return (
    <span
      className="category-badge inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all"
      style={{
        backgroundColor: `${category.color}20`,
        color: category.color,
        borderColor: `${category.color}30`,
      }}
      onClick={handleClick}
    >
      {category.name}
    </span>
  );
};

export default CategoryBadge;
