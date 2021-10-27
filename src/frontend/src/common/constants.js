export const DOUGH_TYPE = {
  ["Тонкое"]: `light`,
  ["Толстое"]: `large`,
};

export const DOUGH_NAME_FOR_CART = {
  ["Тонкое"]: `тонком`,
  ["Толстое"]: `толстом`,
};

export const DOUGH_SIZE = {
  ["light"]: `small`,
  ["large"]: `big`,
};

export const SAUCE = {
  ["Томатный"]: `tomato`,
  ["Сливочный"]: `creamy`,
};

export const INGREDIENT = {
  ["Грибы"]: `mushrooms`,
  ["Чеддер"]: `cheddar`,
  ["Салями"]: `salami`,
  ["Ветчина"]: `ham`,
  ["Ананас"]: `ananas`,
  ["Бекон"]: `bacon`,
  ["Лук"]: `onion`,
  ["Чили"]: `chile`,
  ["Халапеньо"]: `jalapeno`,
  ["Маслины"]: `olives`,
  ["Томаты"]: `tomatoes`,
  ["Лосось"]: `salmon`,
  ["Моцарелла"]: `mozzarella`,
  ["Пармезан"]: `parmesan`,
  ["Блю чиз"]: `blue_cheese`,
};

export const IngredientCount = {
  MIN: 0,
  MAX: 3,
};

export const MOVE = "move";
export const DATA_TRANSFER_PAYLOAD = "payload";

export const Path = {
  ROOT: `/`,
  CART: `/cart`,
  LOGIN: `/login`,
  ORDERS: `/orders`,
  PROFILE: `/profile`,
};

export const TypeOfDelivery = {
  GET_IT_MYSELF: "Получу сам",
  NEW_ADDRESS: "Новый адрес",
  EXISTING_ADDRESS: "Существующий адрес",
};

export const DeliveryLogOutAddressOption = [
  TypeOfDelivery.GET_IT_MYSELF,
  TypeOfDelivery.NEW_ADDRESS,
];

export const DeliveryLogInAddressOption = [
  ...DeliveryLogOutAddressOption,
  TypeOfDelivery.EXISTING_ADDRESS,
];

/* eslint-disable */
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
/* eslint-enable */
