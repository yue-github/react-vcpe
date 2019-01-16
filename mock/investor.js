export default {
    'POST /api/investor/getInfo': {
        investors: {
            id: 17,
            icon: null,
            insid: 37,
            name: '图先生',
            type: 2,
            state: 2,
            area: '162',
            assets: 3,
            identitylabel: '企业老板',
            hobbylabel: '股权、股票',
            remark: null,
            tel: '188850512825',
            email: 'ccmcsrh2016@163.com',
            address: '湖里万达',
            bankuser: '招商银行',
            bankuarea: '万达支行',
            bankid: '1222222222222',
            created_at: null,
            updated_at: null,
            manageteams: [],
            manageuser: {
                id: 66,
                name: 'ceshi',
                avatar: 'users/default.png',
                rolename: '超级管理员',
            },
            creater: 67,
            province: '14',
        },
    },
    'POST /api/investor/update': {
        status: 200,
        msg: '更新成功',
    },
    'POST /api/investor/add': {
        investorid: 1,
        status: 200,
    },
    'POST /api/investor/getFilterParam': {
        funds: [
            {
                id: 13,
                fundname: '魔方基金',
            },
            {
                id: 14,
                fundname: '魔方01号',
            },
            {
                id: 15,
                fundname: '魔方02号',
            },
            {
                id: 16,
                fundname: '魔方03号',
            },
        ],
        users: [
            {
                id: 2,
                name: 'Admin',
                rolename: '市场总监',
            },
            {
                id: 84,
                name: 'yyyyy',
                rolename: '投资总监',
            },
            {
                id: 86,
                name: '17633190977',
                rolename: '行政总监',
            },
        ],
    },
    'POST /api/investor/getData': {
        pageSize: 8,
        page: 1,
        total: 2,
        investors: [
            {
                id: 17,
                name: '图先生',
                state: 2,
                type: 2,
                identitylabel: '企业老板',
                tel: '188850512825',
                assets: 3,
            },
            {
                id: 18,
                name: '曹先生',
                state: 3,
                type: 1,
                identitylabel: '企业',
                tel: '02100000',
                assets: 5,
            },
        ],
    },
    'POST /api/investor/delinvest': {
        status: 200,
        msg: '删除成功',
    },
    'POST /api/investor/getFile': {
        id: 0,
        files: [
            {
                id: 282,
                filename: '\u661f\u5df4\u514b',
                created_at: '2018-09-14 10:57:02',
            },
            {
                id: 283,
                filename: '\u5546\u4e1a\u8ba1\u5212\u4e66',
                created_at: '2018-09-14 10:57:02',
            },
            {
                id: 284,
                filename: '\u6295\u8d44\u5efa\u8bae\u4e66',
                created_at: '2018-09-14 10:57:02',
            },
            {
                id: 285,
                filename: '\u5c3d\u8c03\u62a5\u544a',
                created_at: '2018-09-14 10:57:02',
            },
            {
                id: 286,
                filename: '\u884c\u4e1a\u62a5\u544a',
                created_at: '2018-09-14 10:57:02',
            },
        ],
    },
    'POST /api/investor/tasks': {
        tasks: [
            {
                id: 19,
                title: '顶顶顶·1',
                enddate: '2018-07-31 00:00:00',
                createuser: 66,
                users: [],
            },
            {
                id: 24,
                title: '提交融资资料',
                enddate: '2018-09-15 00:00:00',
                createuser: 67,
                users: [],
            },
            {
                id: 25,
                title: '提醒打款',
                enddate: '2018-09-14 00:00:00',
                createuser: 67,
                users: [
                    {
                        id: 67,
                        avatar: 'users/default.png',
                        name: '1530495764@qq.com',
                    },
                    {
                        id: 66,
                        avatar: 'users/default.png',
                        name: 'ceshi',
                    },
                ],
            },
        ],
    },
};
