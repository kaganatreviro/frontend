// constants.ts

// Вы можете использовать переменные окружения напрямую и задать тип для них.
// Также добавим проверку, чтобы убедиться, что переменные окружения действительно заданы.
const { REACT_APP_BACKEND_URL } = process.env;
const BASE_API_URL: string = REACT_APP_BACKEND_URL || "https://happyhours.zapto.org";

// Для временной зоны и Google Client ID, если они вам снова понадобятся, раскомментируйте и обновите:
// const BASE_TIME_ZONE: string = "Asia/Bishkek";
// const GOOGLE_CLIENT_ID: string = "927098525254-rug0rl2do3ci3bnlksscap11u64iga3n.apps.googleusercontent.com";

// Экспортируем константы, чтобы они были доступны в других частях вашего приложения.
export { BASE_API_URL };
