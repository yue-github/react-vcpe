export default {
    'POST /api/task/getTaskList': {
        status: 200,
        total: 20,
        page: 1,
        pageSize: 15,
        task: [
            {
                id: 1,
                title: '测试任务',
                description: '这个是测试任务的描述文本。',
                start: '2018-10-10 12:00:00',
                end: '2018-10-20 12:00:00',
                create: '周星星',
                owner: '曲丽丽',
                percent: 89,
                status: 'processing',
            },
            {
                id: 2,
                title: '测试任务2',
                description: '这个是测试任务2的描述文本。',
                start: '2018-10-11 12:00:00',
                end: '2018-10-21 12:00:00',
                create: '林冬冬',
                owner: '付晓晓',
                percent: 100,
                status: 'success',
            },
            {
                id: 3,
                title: '测试任务3',
                description: '这个是测试任务3的描述文本。',
                start: '2018-10-12 12:00:00',
                end: '2018-10-22 12:00:00',
                create: '吴乐乐',
                owner: '王萌萌',
                percent: 87,
                status: 'expired',
            },
        ],
    },
    'POST /api/task/deleteTask': {
        status: 200,
        msg: '删除成功',
    },
    'POST /api/task/createTask': {
        status: 200,
        msg: '创建成功',
    },
    'POST /api/task/updateFollow': {
        status: 200,
        msg: '添加成功',
    },
    'POST /api/task/addCommets': {
        status: 200,
        msg: '添加成功',
    },
    'POST /api/task/delFollow': {
        status: 200,
        msg: '删除成功',
    },
    'POST /api/task/users': {
        users: [
            {
                id: 1,
                name: '用户1',
                rolename: '管理员',
                avatar: 'user/default/png',
            },
            {
                id: 2,
                name: '用户2',
                rolename: '超级管理员',
                avatar: 'user/default/png',
            },
        ],
    },
    'POST /api/task/taskinfo': {
        task: {
            id: 25,
            title: '提醒打款',
            description: '记得打款',
            enddate: '2018-09-14 00:00:00',
            module: '',
            createuser: 67,
            follows: '66',
            created_at: '2018-09-14 11:20:39',
            updated_at: '2018-10-08 22:06:34',
            deleted_at: '2018-10-08 22:06:34',
            process: 39,
            isok: 2,
            insid: 37,
            distributions: [
                {
                    checkitem: '撒大苏打实打实',
                    targetuid: 67,
                    isok: 1,
                    user: {
                        id: 67,
                        avatar: 'users/default.png',
                        name: '1530495764@qq.com',
                        phone: '13609602030',
                    },
                },
                {
                    checkitem: 'yyy',
                    targetuid: 66,
                    isok: 2,
                    user: {
                        id: 66,
                        avatar: 'users/default.png',
                        name: 'ceshi',
                        phone: '',
                    },
                },
            ],
        },
        followusers: [
            {
                id: 66,
                name: '王振华',
                avatar: 'users/default.png',
                rolename: '超级管理员',
            },
            {
                id: 67,
                name: '高艳丽',
                avatar: 'users/default.png',
                rolename: '超级管理员',
            },
        ],
        comments: [
            {
                userid: 66,
                created_at: '2018-08-02 21:05:51',
                content: 'ttttssqwe',
                user: {
                    id: 66,
                    avatar: 'users/default.png',
                    name: 'ceshi',
                },
            },
            {
                userid: 66,
                created_at: '2018-08-02 21:06:03',
                content: 'ttttssqwe',
                user: {
                    id: 66,
                    avatar: 'users/default.png',
                    name: 'ceshi',
                },
            },
        ],
        modules: [
            {
                name: '图先生',
                state: 2,
                assets: 3,
                avatar: 'users/default.png',
                id: 17,
                class: 'investor',
            },
            {
                proname: '测试',
                avatar: 'users/default.png',
                state: 1,
                newrounds: null,
                id: 21,
                class: 'project',
            },
        ],
    },
};
