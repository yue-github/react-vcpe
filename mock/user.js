const loginToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8zOS4xMDguMTY3LjY0XC9hcGlcL2F1dGhcL2FjY2Vzc1Rva2VuIiwiaWF0IjoxNTQxODMyMDM0LCJleHAiOjE1NDE4MzI5MzQsIm5iZiI6MTU0MTgzMjAzNCwianRpIjoieFRIcDM4Mlhwak1vTTVGVyIsInN1YiI6NjcsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.ThWJBQw-nNuwwPr9O5l5vAW0DRmgnYZI6u0BpQDfLd0';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
    // 'POST /api/auth/login': (req, res) => {
    //     const { password, phone, type } = req.body;
    //     if (phone === '17633190977' && password === '123456') {
    //         res.send({
    //             msg: '登录成功',
    //             status: 200,
    //             type,
    //             user: {
    //                 id: 1,
    //                 name: '17633190977',
    //                 email: null,
    //                 avatar: 'users/default.png',
    //                 created_at: '2018-09-27 10:05:20',
    //                 updated_at: '2018-09-27 10:18:42',
    //                 phone: '17633190977',
    //             },
    //             token: loginToken,
    //         });
    //         return;
    //     }
    //     res.send({
    //         msg: '账号或密码错误',
    //         type,
    //         status: 203,
    //     });
    // },
    // 'POST /api/auth/register': (req, res) => {
    //     res.send({
    //         status: 200,
    //         user: {
    //             id: 1,
    //             name: '17633190977',
    //             email: null,
    //             avatar: 'users/default.png',
    //             created_at: '2018-09-27 10:05:20',
    //             updated_at: '2018-09-27 10:18:42',
    //             phone: '17633190977',
    //         },
    //         token: loginToken,
    //     });
    // },
    'POST /api/auth/register/send-sms-code': (req, res) => {
        res.send({
            code: 123456,
        });
    },
    'POST /api/institution/getUnReads': {
        msgCounts: 21,
    },
    'POST /api/institution/getMessage': {
        pageSize: 8,
        page: 1,
        total: 2,
        messages: [
            {
                id: 23,
                title: '给你分配了任务',
                message: '呃呃呃',
                created_at: '2018-10-13 23:23:23',
                action: 66,
                user: {
                    id: 66,
                    name: 'ceshi',
                    avatar: 'users/default.png',
                },
            },
            {
                id: 24,
                title: '给你分配了任务',
                message: 'eeeee',
                created_at: '2018-10-13 23:23:26',
                action: 66,
                user: {
                    id: 66,
                    name: 'ceshi',
                    avatar: 'users/default.png',
                },
            },
        ],
    },
};
