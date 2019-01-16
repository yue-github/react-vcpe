// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
    'POST /api/institution/getDataStatis': {
        msg: '请求成功！',
        invetorCount: 10,
        proRuKu: 63,
        proLiXiang: 52,
        proJinTiao: 45,
        proTouwieHui: 32,
        proChuZi: 18,
        proTuiChu: 5,
        memberConut: 2,
        fundConut: 1,
        funds: {
            items: [
                {
                    fundname: '魔方基金',
                    fundcash: 244,
                    targetcash: 680,
                },
                {
                    fundname: '魔方01号',
                    fundcash: 321,
                    targetcash: 500,
                },
                {
                    fundname: '魔方02号',
                    fundcash: 311,
                    targetcash: 610,
                },
                {
                    fundname: '魔方03号',
                    fundcash: 41,
                    targetcash: 720,
                },
                {
                    fundname: '魔方04号',
                    fundcash: 121,
                    targetcash: 560,
                },
                {
                    fundname: '魔方05号',
                    fundcash: 111,
                    targetcash: 480,
                },
            ],
            allcash: 0,
        },
        projectcates: {
            items: [
                {
                    name: '物联网',
                    sum: 43,
                },
                {
                    name: '移动互联网',
                    sum: 65,
                },
                {
                    name: '新消费',
                    sum: 52,
                },
                {
                    name: '环保新材料',
                    sum: 19,
                },
                {
                    name: 'TMT',
                    sum: 8,
                },
                {
                    name: '智能制造',
                    sum: 39,
                },
            ],
            allsum: 0,
        },
    },
    'POST /api/institution/getMyRelation': {
        projexts: [
            {
                id: 1,
                proname: '项目一',
                icon: 'icon',
            },
            {
                id: 2,
                proname: '项目二',
                icon: 'icon',
            },
        ],
        investors: [
            {
                id: 1,
                name: '投资人一',
                icon: 'icon',
            },
            {
                id: 2,
                name: '投资人二',
                icon: 'icon',
            },
        ],
        funds: [
            {
                id: 1,
                fundname: '基金一',
                icon: 'icon',
            },
            {
                id: 2,
                fundname: '基金二',
                icon: 'icon',
            },
        ],
    },
    'POST /api/institution/getSysLog': {
        operationrecords: [
            {
                created_at: '2018-09-28',
                action: '上传了',
                target: '基金',
                operspecific: '位置：项目文件夹 - 撒打撒打撒 - 投决 (天使轮) - 立项会',
                name: '呵呵',
                avatar: 'icon',
            },
        ],
        total: 1,
    },
    'POST /api/institution/getWorkStatis': {
        fundDaiMuJi: 10,
        fundMuJiWanBi: 8,
        fundMuJiZhong: 6,
        fundQingSuan: 4,
        fundTuiChu: 3,
        fundYunZuoZhong: 2,
        investorQianYue: 1,
        investorQianZai: 1,
        investorYiXiang: 2,
        proChuZi: 10,
        proJinTiao: 4,
        proLiXiang: 3,
        proRuKu: 1,
        proTouwieHui: 0,
        proTuiChu: 5,
        roles: [],
        taskNoOk: 1,
        taskOk: 0,
    },
};
