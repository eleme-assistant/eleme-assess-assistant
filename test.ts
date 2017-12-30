import * as server from './index';

const restaurant_ids = [161316505, 257367];

(async () => {
    const response = await server.main(restaurant_ids, undefined);
    console.log('成功', response);
    return response;
})();