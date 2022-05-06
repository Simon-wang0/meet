'use strict';
//这个云函数去数据库里检索一定范围内符合条件的人
const db = uniCloud.database();
exports.main = async (event, context) => {
    const locationInfo=event.res;
    const uid=event.userInfo.uid; 
    return {sum:event}




}
