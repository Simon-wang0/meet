'use strict';
const db = uniCloud.database();
//在用户登录的时候调用这个云函数 把该用户的favoriteId 放在缓存里
exports.main = async (event, context) => {
    const favoriteInfo = {}
    db.collection('uni-id-users')
        .field({
            'favorite_person': true
        })
        .where('_id==$env.uid')
        .get().then((res) => {
            const id = res.result.data[0].favorite_person
            if (id != '' && id != null) {
                db.collection('uni-id-users')
                    .field({

                        'nickname': true,
                        'gender': true,
                        'address': true,
                        'company': true,
                        'school': true,
                    })
                    .where('_id==id')
                    .get().then((res) => {
                        favoriteInfo = res.result.data[0]
                       
                        uni.setStorage({
                            key: 'favoriteInfo',
                            data: favoriteInfo,
                            success: function() {
                                console.log('放入缓存成功');
                            }
                        });
                    }).catch((err) => {
                        console.log(err.code); // 打印错误码
                        console.log(err.message); // 打印错误内容
                    })

            }

        }).catch((err) => {
            console.log(err.code); // 打印错误码
            console.log(err.message); // 打印错误内容
        })

    //返回数据给客户端
    return favoriteInfo
};
