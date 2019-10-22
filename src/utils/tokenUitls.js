import store from '@/store'
import { getStore, clearStore } from './storeUtils'

export const getToken = () => {
    let token = null;
    let userJwt = getStore({ name: 'userJwt' });

    if (userJwt) {
        token = userJwt.access_token;
    }

    return token;
}

export const clearToken = () => {
    clearStore({ type: 'bothClear' });
}