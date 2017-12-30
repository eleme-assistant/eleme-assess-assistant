import * as server from './index';

const mock = [
    { 'compare_rating': 0.6202469135802469, 'food_score': 4.52683, 'positive_rating': 0.92, 'restaurant_id': 159255543, 'service_score': 4.62616, 'star_level': 4.6 },
    { 'compare_rating': 0.8642311886586695, 'food_score': 4.79648, 'positive_rating': 0.95, 'restaurant_id': 257367, 'service_score': 4.73859, 'star_level': 4.8 }
];

(async () => {
    const res = server.main(mock, undefined, function (error, res) {
        if (error) {
            console.log('测试失败', error);
            return error;
        }
        console.log('测试成功', res);
    });
})();