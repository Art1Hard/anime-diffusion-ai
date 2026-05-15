import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

const sdApi = axios.create({
	baseURL: `${process.env.EXPO_PUBLIC_SD_HOST}/sdapi/v1`,
});

// 1. Конвертируем ОТПРАВЛЯЕМЫЕ данные: camelCase -> snake_case
sdApi.interceptors.request.use((config) => {
	if (config.data) {
		config.data = snakecaseKeys(config.data, { deep: true });
	}
	return config;
});

// 2. Конвертируем ПОЛУЧАЕМЫЕ данные: snake_case -> camelCase
sdApi.interceptors.response.use((response) => {
	if (response.data) {
		response.data = camelcaseKeys(response.data, { deep: true });
	}
	return response;
});

export default sdApi;
