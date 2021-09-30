export const adaptIngredients = (stuffing) => {
  return stuffing.map((item) => {
    return {
      ...item,
      count: 0,
    };
  });
};

export const getIngredientsWithNewCount = (ingredients, idx, count) => {
  const oldItem = ingredients[idx];
  const newItem = {
    ...oldItem,
    count,
  };
  return [...ingredients.slice(0, idx), newItem, ...ingredients.slice(idx + 1)];
};

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
