import { create } from 'axios';
import Constants from 'expo-constants';


const devHost = Constants.expoConfig?.hostUri?.split(":")[0];

const BASE_URI = __DEV__
  ? `http://${devHost}:5000/api`
  : `https:your-production-api.com/api`

export const api = create({
    baseURL: BASE_URI,
    headers: { "Content-Type": "application/json" },
    timeout: 10000
})