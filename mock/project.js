export default {
    'POST /api/project/getInfo': {
        projects: {
            id: 21,
            icon: null,
            proname: '测试',
            province: '广东省',
            area: '',
            industryid: '2',
            state: '1',
            newrounds: '1',
            source: '1',
            valuation: '2',
            conistype: '1',
            intro: null,
            level: 3,
            link: null,
            remark: null,
            foundername: '迁迁',
            founderemail: '521287718@qq.com',
            founderetel: '17633190977',
            companyname: '测试公司',
            registenum: '1291162412',
            companytype: '1',
            begindate: '2018-09-20',
            enddate: '2020-09-20',
            registauthority: '北京工商总局',
            registdate: '2018-09-21',
            registcash: 1.23,
            adoptdate: '2018-09-22',
            companyadress: '测试地址',
            created_at: null,
            updated_at: null,
            manageteams: [],
            manageuser: null,
        },
        levels: [1, 2, 3, 4, 5, 6],
        conistypes: {
            '1': '人民币',
            '2': '美金',
        },
        companytypes: {
            '1': '(内资)有限公司',
            '2': '(内资)股份公司',
            '3': '(内资)个人独资企业',
            '4': '(内资)有限合伙企业(内资)有限合伙企业',
            '5': '(内资)普通合伙企业',
            '6': '(外资)中外合资企业',
            '7': '外商投资有限合伙',
            '8': '外商投资普通合伙',
        },
    },
    'POST /api/project/update': {
        status: 200,
        msg: '更新成功',
    },
    'POST /api/project/add': {
        projectid: 1,
        status: 200,
    },
    'POST /api/project/getFilterParam': {
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
        projectcates: [
            {
                id: '1',
                name: 'TMT',
            },
            {
                id: '2',
                name: '健康医疗',
            },
        ],
    },
    'POST /api/project/getData': {
        pageSize: 10,
        page: 1,
        total: 102,
        projects: [
            {
                id: 1,
                proname: '微趣测试1',
                state: 1,
                industryid: 2,
                newrounds: 2,
                level: 3,
                valuation: 2.32,
            },
            {
                id: 2,
                proname: '微趣测试2',
                state: 2,
                industryid: 1,
                newrounds: 5,
                level: 4,
                valuation: 5.16,
            },
        ],
    },
    'POST /api/project/delete': {
        status: 200,
        msg: '删除成功',
    },
    'POST /api/project/addProCates': {
        status: 200,
        msg: '创建成功',
    },
    'POST /api/project/updateProCates': {
        status: 200,
        msg: '更新成功',
    },
    'POST /api/project/delProCates': {
        status: 200,
        msg: '删除成功',
    },
    'POST /api/project/getFile': {
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
    'POST /api/project/tasks': {
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
