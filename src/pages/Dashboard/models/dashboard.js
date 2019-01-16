import forEachRight from 'lodash/forEachRight';
import map from 'lodash/map';
import {
    fetchAnalysis,
    fetchAboutMe,
    fetchEvents,
    fetchWorkplace,
} from '../../../services/dashbord';

// 字段映射
const fieldsMap = {
    investorsCount: 'invetorCount',
    investProjectCount: 'proChuZi',
    orgMemberCount: 'memberConut',
    runningFundCount: 'fundConut',
    projectRuku: 'proRuKu',
    projectLiXiang: 'proLiXiang',
    projectChuZi: 'proChuZi',
    projectTuiChu: 'proTuiChu',
    projectTouWeiHui: 'proTouwieHui',
    projectJinDiao: 'proJinTiao',
};

export default {
    namespace: 'dashboard',

    state: {
        // 已签约投资人数量
        investorsCount: 0,
        // 已出资项目数量
        investProjectCount: 0,
        // 机构成员数量
        orgMemberCount: 0,
        // 运作中基金数量
        runningFundCount: 0,
        // 投资赛道
        investCategories: [],
        // 资产分布情况
        funds: [],
        // 基金募集进度
        fundsProgress: [],
        // 项目漏斗：入库
        projectRuku: 0,
        // 项目漏斗：立项
        projectLiXiang: 0,
        // 项目漏斗：出资
        projectChuzi: 0,
        // 项目漏斗：退出
        projectTuiChu: 0,
        // 项目漏斗：投委会
        projectTouWeiHui: 0,
        // 项目漏斗：尽调
        projectJinDiao: 0,
        // 我负责的项目
        myProjects: [],
        // 我负责的基金
        myFunds: [],
        // 我负责的投资人
        myInvestors: [],
        // 系统日志
        events: [],
        // 总日志条数
        eventsTotal: 0,
        // 工作空间
        workplace: {
            fundDaiMuJi: 0,
            fundMuJiWanBi: 0,
            fundMuJiZhong: 0,
            fundQingSuan: 0,
            fundTuiChu: 0,
            fundYunZuoZhong: 0,
            investorQianYue: 0,
            investorQianZai: 1,
            investorYiXiang: 0,
            proChuZi: 0,
            proJinTiao: 0,
            proLiXiang: 0,
            proRuKu: 0,
            proTouwieHui: 0,
            proTuiChu: 0,
            roles: [],
            taskNoOk: 0,
            taskOk: 0,
        },
    },

    effects: {
        *fetchAnalysis(_, { call, put }) {
            const response = yield call(fetchAnalysis);

            if (response) {
                const data = {};

                forEachRight(fieldsMap, (key, maped) => {
                    if (response[key]) {
                        data[maped] = response[key];
                    }
                });

                if (response.projectcates && response.projectcates.items) {
                    data.investCategories = map(response.projectcates.items, item => ({
                        label: item.name,
                        name: '投资赛道',
                        value: item.sum,
                    }));
                }

                if (response.funds && response.funds.items) {
                    data.funds = [];
                    data.fundsProgress = [];
                    forEachRight(response.funds.items, item => {
                        data.funds.push({
                            x: item.fundname,
                            y: item.fundcash,
                        });
                        data.fundsProgress.push({
                            name: '已募资',
                            x: item.fundname,
                            y: item.fundcash,
                        });
                        data.fundsProgress.push({
                            name: '募资目标',
                            x: item.fundname,
                            y: item.targetcash,
                        });
                    });
                }

                yield put({
                    type: 'saveData',
                    payload: data,
                });
            }
        },
        *fetchAboutMe(_, { call, put }) {
            const response = yield call(fetchAboutMe);
            const data = {};

            if (response) {
                data.myProjects = map(response.projexts, item => ({
                    id: item.id,
                    name: item.proname,
                    icon: item.icon,
                }));
                data.myFunds = map(response.funds, item => ({
                    id: item.id,
                    name: item.fundname,
                    icon: item.icon,
                }));
                data.myInvestors = response.investors || [];
                yield put({
                    type: 'saveData',
                    payload: data,
                });
            }
        },
        *fetchEvents({ payload }, { call, put }) {
            const response = yield call(fetchEvents, payload);
            const data = {};

            if (response && response.operationrecords) {
                data.events = map(response.operationrecords, item => ({
                    time: item.created_at,
                    avatar: item.avatar,
                    href: null,
                    title: item.name,
                    description: `${item.action} ${item.target} ${item.operspecific}`,
                }));
                data.eventsTotal = response.total;
                yield put({
                    type: 'saveData',
                    payload: data,
                });
            }
        },
        *fetchWorkplace(_, { call, put }) {
            const response = yield call(fetchWorkplace);
            if (response) {
                yield put({
                    type: 'saveWorkplace',
                    payload: response,
                });
            }
        },
    },

    reducers: {
        saveData(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        saveWorkplace(state, { payload }) {
            return {
                ...state,
                workplace: {
                    ...state.workplace,
                    ...payload,
                },
            };
        },
    },
};
