import { Handler } from './api/handler';
import * as _ from 'lodash';

export function main(event, context, callback) {
    let error = null;

    const handler = new Handler(event);
    const res = handler.resolve();

    if (_.takeWhile(res, _.isNumber).length !== res.length) error = Error('数据异常');

    return callback(error, res);
}