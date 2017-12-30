import { Eleme } from '../../interface/eleme_assess_assistant';
import * as _ from 'lodash';

export class Handler {

    /**
     * 所有需要处理的店铺原始评分数据
     */
    private readonly items: Eleme.RatingScore[];

    constructor(items: Eleme.RatingScore[]) {
        this.items = items;
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