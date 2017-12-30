import { Handler } from './api/handler';
import * as _ from 'lodash';

export async function main(event, context) {
    let error = null;

    const handler = new Handler(event);
    await handler.init();
    const res = handler.resolve();

    if (_.takeWhile(res, _.isNumber).length !== res.length) error = Error('数据异常');

    return error || res;
}