import { create } from 'axios';
import Constants from 'expo-constants';


function getDevHost() {
  const hostUri = Constants.expoConfig?.hostUri;
  if (!hostUri) {
    throw new Error(
      "Could not determine dev server host from Constants.expoConfig.hostUri. " +
        "Make sure the app was started with Expo (e.g. `expo start`)."
    );
  }
  return hostUri.split(":")[0];
}

function getProductionApiUrl() {
  const url = process.env.EXPO_PUBLIC_API_URL;
  if (!url) {
    throw new Error(
      "EXPO_PUBLIC_API_URL is not set. Define it in your environment (e.g. .env) " +
        "to point release builds at the production API."
    );
  }
  return url;
}

const BASE_URI = __DEV__
  ? `http://${getDevHost()}:5000/api`
  : getProductionApiUrl();

export const api = create({
    baseURL: BASE_URI,
    headers: { "Content-Type": "application/json" },
    timeout: 10000
})