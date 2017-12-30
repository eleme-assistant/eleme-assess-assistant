import { Eleme } from '../../interface/eleme_assess_assistant';
import * as _ from 'lodash';
import axios, { AxiosResponse } from 'axios';

export class Handler {

    /**
     * 所有需要处理的店铺原始评分数据
     */
    private readonly items: Eleme.RatingScore[] = [];
    private readonly restaurant_ids: number[];

    constructor(restaurant_ids: number[]) {
        this.restaurant_ids = restaurant_ids;
    }

    public async init() {
        for (const restaurant_id of this.restaurant_ids) {
            const data = await this.requestRestaurant(restaurant_id);
            if (data && !_.isEmpty(data)) this.items.push(data);
        }
    }

    public async requestRestaurant(restaurant_id: number) {
        try {
            const response = await axios.get(`https://www.ele.me/restapi/ugc/v1/restaurants/${restaurant_id}/rating_scores?latitude=0&longitude=0`);
            return <Eleme.RatingScore>response.data;
        } catch (e) {
            if (e.status === 404) return false;
            throw Error('服务请求失败');
        }
    }

    public resolve(): number[] {
        // XXX: 更加推崇新店
        const items = _.orderBy(this.items,
            ['star_levels', 'service_score', 'food_score', 'compare_rating', 'positive_rating', 'restaurant_id'],
            ['desc', 'desc', 'desc', 'desc', 'desc', 'desc']
        );

        return _.map(items, 'restaurant_id');
    }

}