export default [
    // user
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', component: './User/Login' },
            { path: '/user/register', component: './User/Register' },
            { path: '/user/register-result', component: './User/RegisterResult' },
            { path: '/user/forgetPassword', component: './User/ForgetPassword' },
        ],
    },
    // app
    {
        Routes: ['src/pages/Authorized'],
        authority: 'admin',
        routes: [
            {
                path: '/organizations',
                component: '../layouts/OrganizationLayout',
                authority: 'viewOrganizations',
                routes: [
                    {
                        path: '/organizations',
                        component: './Organizations',
                    },
                    {
                        path: '/organizations/create',
                        authority: 'createOrganizations',
                        component: './Organizations/Create',
                    },
                ],
            },
            {
                path: '/',
                component: '../layouts/BasicLayout',
                routes: [
                    // dashboard
                    {
                        path: '/',
                        redirect: '/dashboard/analysis',
                    },

                    {
                        path: '/dashboard',
                        name: 'dashboard',
                        icon: 'dashboard',
                        routes: [
                            {
                                path: '/dashboard/analysis',
                                name: 'analysis',
                                component: './Dashboard/Analysis',
                            },
                            {
                                path: '/dashboard/aboutme',
                                name: 'aboutme',
                                component: './Dashboard/AboutMe',
                            },
                            {
                                path: '/dashboard/workplace',
                                name: 'workplace',
                                component: './Dashboard/Workplace',
                            },
                            {
                                path: '/dashboard/log',
                                name: 'log',
                                component: './Dashboard/Log',
                            },
                        ],
                    },
                    {
                        path: '/project',
                        icon: 'project',
                        name: 'project',
                        authority: 'projectInfo',
                        component: './Projects',
                    },
                    {
                        path: '/investor',
                        icon: 'team',
                        name: 'investors',
                        authority: 'investorInfo',
                        component: './Investors',
                    },
                    {
                        path: '/fund',
                        icon: 'property-safety',
                        name: 'fund',
                        authority: 'fundInfo',
                        component: './Fund',
                    },
                    {
                        path: '/files',
                        icon: 'folder',
                        name: 'files',
                        component: './Files',
                    },

                    {
                        path: '/task',
                        icon: 'flag',
                        name: 'task',
                        authority: 'taskInfo',
                        component: './Task',
                    },
                    {
                        path: '/tools',
                        icon: 'tool',
                        name: 'tools',
                        routes: [
                            {
                                path: '/tools/quick-dd',
                                name: 'due-diligence',
                                component: './Tools/DueDiligence',
                            },
                            {
                                path: '/tools/background-check',
                                name: 'background-check',
                                component: './Tools/BackgroundCheck',
                            },
                        ],
                    },
                    {
                        path: '/setting',
                        icon: 'setting',
                        name: 'setting',
                        routes: [
                            {
                                path: '/setting/roles',
                                name: 'roles',
                                component: './Setting/Roles',
                            },
                            {
                                path: '/setting/services',
                                name: 'services',
                                component: './Setting/Services',
                            },
                            {
                                path: '/setting/webhook',
                                name: 'webhook',
                                component: './Setting/WebHook',
                            },
                        ],
                    },
                    {
                        name: 'account',
                        icon: 'user',
                        path: '/account',
                        hideInMenu: true,
                        hideChildrenInMenu: true,
                        routes: [
                            {
                                path: '/account/settings',
                                name: 'settings',
                                component: './Account/Settings/Info',
                                routes: [
                                    {
                                        path: '/account/settings',
                                        redirect: '/account/settings/base',
                                    },
                                    {
                                        path: '/account/settings/base',
                                        component: './Account/Settings/BaseView',
                                    },
                                    {
                                        path: '/account/settings/security',
                                        component: './Account/Settings/SecurityView',
                                    },
                                    {
                                        path: '/account/settings/binding',
                                        component: './Account/Settings/BindingView',
                                    },
                                    {
                                        path: '/account/settings/notification',
                                        component: './Account/Settings/NotificationView',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: '/project/view/:id',
                        name: 'project.view',
                        hideInMenu: true,
                        authority: 'projectInfo',
                        component: './Projects/View',
                    },
                    {
                        path: '/project/create',
                        name: 'project.create',
                        hideInMenu: true,
                        authority: 'projectAdd',
                        component: './Projects/Create',
                    },
                    {
                        path: '/investor/create',
                        name: 'investor.create',
                        hideInMenu: true,
                        authority: 'investorAdd',
                        component: './Investors/Create',
                    },
                    {
                        path: '/investor/view/:id',
                        name: 'investor.view',
                        hideInMenu: true,
                        authority: 'investorInfo',
                        component: './Investors/View',
                    },
                    {
                        path: '/fund/create',
                        name: 'fund.create',
                        hideInMenu: true,
                        authority: 'fundAdd',
                        component: './Fund/Create',
                    },
                    {
                        path: '/fund/view/:id',
                        name: 'fund.view',
                        hideInMenu: true,
                        authority: 'fundInfo',
                        component: './Fund/View',
                    },
                    {
                        path: '/files/:id',
                        hideInMenu: true,
                        icon: 'folder',
                        name: 'files',
                        component: './Files',
                    },
                    {
                        path: '/task/view/:id',
                        name: 'task.view',
                        hideInMenu: true,
                        authority: 'taskInfo',
                        component: './Task/View',
                    },
                    {
                        path: '/task/create',
                        name: 'task.create',
                        authority: 'taskAdd',
                        hideInMenu: true,
                        component: './Task/Create',
                    },
                    {
                        path: '/messages',
                        name: 'messages',
                        hideInMenu: true,
                        component: './Messages',
                    },
                    {
                        component: '404',
                    },
                ],
            },
        ],
    },
];
