export default {
    'POST /api/role/getRoles': {
        roles: [
            {
                id: 1,
                rolename: '超级管理',
            },
            {
                id: 2,
                rolename: '投资人',
            },
            {
                id: 3,
                rolename: '成员',
            },
        ],
    },
    'POST /api/role/getRoleUsers': {
        users: [
            {
                id: 1,
                name: '用户1',
                avatar: 'user/default.png',
                email: '521287718@qq.com',
            },
            {
                id: 2,
                name: '用户2',
                avatar: 'user/default.png',
                email: '521287718@qq.com',
            },
        ],
    },
    'POST /api/role/authListForId': {
        menus: [
            {
                id: 1,
                name: '项目模块',
                childrens: [
                    {
                        id: 2,
                        name: ' 项目详情',
                        checked: true,
                    },
                    {
                        id: 3,
                        name: ' 添加项目',
                    },
                    {
                        id: 4,
                        name: '编辑项目',
                    },
                    {
                        id: 5,
                        name: '删除项目',
                    },
                    {
                        id: 6,
                        name: '数据导出',
                    },
                    {
                        id: 7,
                        name: '行业领域',
                    },
                ],
            },
            {
                id: 8,
                name: '投资人模块',
                childrens: [
                    {
                        id: 9,
                        name: '投资人信息',
                    },
                    {
                        id: 10,
                        name: '添加投资人',
                    },
                    {
                        id: 11,
                        name: '编辑投资人',
                    },
                    {
                        id: 12,
                        name: '删除投资人',
                    },
                    {
                        id: 13,
                        name: '数据导出',
                    },
                ],
            },
            {
                id: 14,
                name: '基金模块',
                childrens: [
                    {
                        id: 15,
                        name: '基金详情',
                    },
                    {
                        id: 16,
                        name: ' 添加基金',
                    },
                    {
                        id: 17,
                        name: ' 编辑基金',
                    },
                    {
                        id: 18,
                        name: '删除基金',
                    },
                    {
                        id: 19,
                        name: '数据导出',
                    },
                    {
                        id: 20,
                        name: ' 投资领域',
                    },
                ],
            },
            {
                id: 21,
                name: '文件模块',
                childrens: [
                    {
                        id: 22,
                        name: '新建文件夹',
                    },
                    {
                        id: 23,
                        name: '删除文件夹',
                    },
                    {
                        id: 24,
                        name: '上传文件',
                    },
                    {
                        id: 25,
                        name: '预览/下载文件',
                    },
                    {
                        id: 26,
                        name: '更改文件',
                    },
                    {
                        id: 27,
                        name: '文件开关',
                    },
                    {
                        id: 28,
                        name: '删除文件',
                    },
                ],
            },
            {
                id: 29,
                name: '角色列表',
                childrens: [
                    {
                        id: 30,
                        name: '角色添加',
                    },
                    {
                        id: 31,
                        name: '角色编辑',
                    },
                    {
                        id: 32,
                        name: '角色删除',
                    },
                    {
                        id: 33,
                        name: '添加成员',
                    },
                    {
                        id: 34,
                        name: '移动成员',
                    },
                    {
                        id: 35,
                        name: '删除成员',
                    },
                ],
            },
        ],
    },
    'POST /api/role/deleteRole': {
        status: 200,
        msg: '删除成功',
    },
    'POST /api/role/deleteUser': {
        status: 200,
        msg: '删除成功',
    },
    'POST /api/role/updateRoles': {
        status: 200,
        msg: '更新成功',
    },
    'POST /api/role/updatePermissions': {
        status: 200,
        msg: '更新成功',
    },
    'POST /api/role/invitation': {
        status: 200,
        msg: '邀请成功',
    },
};
