import find from 'lodash/find';

const regions = [
    {
        label: '北京市',
        value: 1,
        children: [
            {
                label: '北京市',
                value: 35,
            },
        ],
    },
    {
        label: '天津市',
        value: 2,
        children: [
            {
                label: '天津市',
                value: 36,
            },
        ],
    },
    {
        label: '上海市',
        value: 3,
        children: [
            {
                label: '上海市',
                value: 37,
            },
        ],
    },
    {
        label: '重庆市',
        value: 4,
        children: [
            {
                label: '重庆市',
                value: 38,
            },
        ],
    },
    {
        label: '河北省',
        value: 5,
        children: [
            {
                label: '石家庄市',
                value: 39,
            },
            {
                label: '唐山市',
                value: 40,
            },
            {
                label: '秦皇岛市',
                value: 41,
            },
            {
                label: '邯郸市',
                value: 42,
            },
            {
                label: '邢台市',
                value: 43,
            },
            {
                label: '保定市',
                value: 44,
            },
            {
                label: '张家口市',
                value: 45,
            },
            {
                label: '承德市',
                value: 46,
            },
            {
                label: '沧州市',
                value: 47,
            },
            {
                label: '廊坊市',
                value: 48,
            },
            {
                label: '衡水市',
                value: 49,
            },
            {
                label: '石家庄市',
                value: 50,
            },
            {
                label: '唐山市',
                value: 51,
            },
            {
                label: '秦皇岛市',
                value: 52,
            },
            {
                label: '邯郸市',
                value: 53,
            },
            {
                label: '邢台市',
                value: 54,
            },
            {
                label: '保定市',
                value: 55,
            },
            {
                label: '张家口市',
                value: 56,
            },
            {
                label: '承德市',
                value: 57,
            },
            {
                label: '沧州市',
                value: 58,
            },
            {
                label: '廊坊市',
                value: 59,
            },
            {
                label: '衡水市',
                value: 60,
            },
        ],
    },
    {
        label: '山西省',
        value: 6,
    },
    {
        label: '台湾省',
        value: 7,
        children: [
            {
                label: '台北市',
                value: 61,
            },
            {
                label: '高雄市',
                value: 62,
            },
            {
                label: '基隆市',
                value: 63,
            },
            {
                label: '台中市',
                value: 64,
            },
            {
                label: '台南市',
                value: 65,
            },
            {
                label: '新竹市',
                value: 66,
            },
            {
                label: '嘉义市',
                value: 67,
            },
            {
                label: '台北县',
                value: 68,
            },
            {
                label: '宜兰县',
                value: 69,
            },
            {
                label: '桃园县',
                value: 70,
            },
            {
                label: '新竹县',
                value: 71,
            },
            {
                label: '苗栗县',
                value: 72,
            },
            {
                label: '台中县',
                value: 73,
            },
            {
                label: '彰化县',
                value: 74,
            },
            {
                label: '南投县',
                value: 75,
            },
            {
                label: '云林县',
                value: 76,
            },
            {
                label: '嘉义县',
                value: 77,
            },
            {
                label: '台南县',
                value: 78,
            },
            {
                label: '高雄县',
                value: 79,
            },
            {
                label: '屏东县',
                value: 80,
            },
            {
                label: '澎湖县',
                value: 81,
            },
            {
                label: '台东县',
                value: 82,
            },
            {
                label: '花莲县',
                value: 83,
            },
        ],
    },
    {
        label: '辽宁省',
        value: 8,
        children: [
            {
                label: '沈阳市',
                value: 84,
            },
            {
                label: '大连市',
                value: 85,
            },
            {
                label: '鞍山市',
                value: 86,
            },
            {
                label: '抚顺市',
                value: 87,
            },
            {
                label: '本溪市',
                value: 88,
            },
            {
                label: '丹东市',
                value: 89,
            },
            {
                label: '锦州市',
                value: 90,
            },
            {
                label: '营口市',
                value: 91,
            },
            {
                label: '阜新市',
                value: 92,
            },
            {
                label: '辽阳市',
                value: 93,
            },
            {
                label: '盘锦市',
                value: 94,
            },
            {
                label: '铁岭市',
                value: 95,
            },
            {
                label: '朝阳市',
                value: 96,
            },
            {
                label: '葫芦岛市',
                value: 97,
            },
        ],
    },
    {
        label: '吉林省',
        value: 9,
        children: [
            {
                label: '长春市',
                value: 98,
            },
            {
                label: '吉林市',
                value: 99,
            },
            {
                label: '四平市',
                value: 100,
            },
            {
                label: '辽源市',
                value: 101,
            },
            {
                label: '通化市',
                value: 102,
            },
            {
                label: '白山市',
                value: 103,
            },
            {
                label: '松原市',
                value: 104,
            },
            {
                label: '白城市',
                value: 105,
            },
            {
                label: '延边朝鲜族自治州',
                value: 106,
            },
        ],
    },
    {
        label: '黑龙江省',
        value: 10,
        children: [
            {
                label: '哈尔滨市',
                value: 107,
            },
            {
                label: '齐齐哈尔市',
                value: 108,
            },
            {
                label: '鹤 岗 市',
                value: 109,
            },
            {
                label: '双鸭山市',
                value: 110,
            },
            {
                label: '鸡 西 市',
                value: 111,
            },
            {
                label: '大 庆 市',
                value: 112,
            },
            {
                label: '伊 春 市',
                value: 113,
            },
            {
                label: '牡丹江市',
                value: 114,
            },
            {
                label: '佳木斯市',
                value: 115,
            },
            {
                label: '七台河市',
                value: 116,
            },
            {
                label: '黑 河 市',
                value: 117,
            },
            {
                label: '绥 化 市',
                value: 118,
            },
            {
                label: '大兴安岭地区',
                value: 119,
            },
        ],
    },
    {
        label: '江苏省',
        value: 11,
        children: [
            {
                label: '南京市',
                value: 120,
            },
            {
                label: '无锡市',
                value: 121,
            },
            {
                label: '徐州市',
                value: 122,
            },
            {
                label: '常州市',
                value: 123,
            },
            {
                label: '苏州市',
                value: 124,
            },
            {
                label: '南通市',
                value: 125,
            },
            {
                label: '连云港市',
                value: 126,
            },
            {
                label: '淮安市',
                value: 127,
            },
            {
                label: '盐城市',
                value: 128,
            },
            {
                label: '扬州市',
                value: 129,
            },
            {
                label: '镇江市',
                value: 130,
            },
            {
                label: '泰州市',
                value: 131,
            },
            {
                label: '宿迁市',
                value: 132,
            },
        ],
    },
    {
        label: '浙江省',
        value: 12,
        children: [
            {
                label: '杭州市',
                value: 133,
            },
            {
                label: '宁波市',
                value: 134,
            },
            {
                label: '温州市',
                value: 135,
            },
            {
                label: '嘉兴市',
                value: 136,
            },
            {
                label: '湖州市',
                value: 137,
            },
            {
                label: '绍兴市',
                value: 138,
            },
            {
                label: '金华市',
                value: 139,
            },
            {
                label: '衢州市',
                value: 140,
            },
            {
                label: '舟山市',
                value: 141,
            },
            {
                label: '台州市',
                value: 142,
            },
            {
                label: '丽水市',
                value: 143,
            },
        ],
    },
    {
        label: '安徽省',
        value: 13,
        children: [
            {
                label: '合肥市',
                value: 144,
            },
            {
                label: '芜湖市',
                value: 145,
            },
            {
                label: '蚌埠市',
                value: 146,
            },
            {
                label: '淮南市',
                value: 147,
            },
            {
                label: '马鞍山市',
                value: 148,
            },
            {
                label: '淮北市',
                value: 149,
            },
            {
                label: '铜陵市',
                value: 150,
            },
            {
                label: '安庆市',
                value: 151,
            },
            {
                label: '黄山市',
                value: 152,
            },
            {
                label: '滁州市',
                value: 153,
            },
            {
                label: '阜阳市',
                value: 154,
            },
            {
                label: '宿州市',
                value: 155,
            },
            {
                label: '巢湖市',
                value: 156,
            },
            {
                label: '六安市',
                value: 157,
            },
            {
                label: '亳州市',
                value: 158,
            },
            {
                label: '池州市',
                value: 159,
            },
            {
                label: '宣城市',
                value: 160,
            },
        ],
    },
    {
        label: '福建省',
        value: 14,
        children: [
            {
                label: '福州市',
                value: 161,
            },
            {
                label: '厦门市',
                value: 162,
            },
            {
                label: '莆田市',
                value: 163,
            },
            {
                label: '三明市',
                value: 164,
            },
            {
                label: '泉州市',
                value: 165,
            },
            {
                label: '漳州市',
                value: 166,
            },
            {
                label: '南平市',
                value: 167,
            },
            {
                label: '龙岩市',
                value: 168,
            },
            {
                label: '宁德市',
                value: 169,
            },
        ],
    },
    {
        label: '江西省',
        value: 15,
        children: [
            {
                label: '南昌市',
                value: 170,
            },
            {
                label: '景德镇市',
                value: 171,
            },
            {
                label: '萍乡市',
                value: 172,
            },
            {
                label: '九江市',
                value: 173,
            },
            {
                label: '新余市',
                value: 174,
            },
            {
                label: '鹰潭市',
                value: 175,
            },
            {
                label: '赣州市',
                value: 176,
            },
            {
                label: '吉安市',
                value: 177,
            },
            {
                label: '宜春市',
                value: 178,
            },
            {
                label: '抚州市',
                value: 179,
            },
            {
                label: '上饶市',
                value: 180,
            },
        ],
    },
    {
        label: '山东省',
        value: 16,
        children: [
            {
                label: '济南市',
                value: 181,
            },
            {
                label: '青岛市',
                value: 182,
            },
            {
                label: '淄博市',
                value: 183,
            },
            {
                label: '枣庄市',
                value: 184,
            },
            {
                label: '东营市',
                value: 185,
            },
            {
                label: '烟台市',
                value: 186,
            },
            {
                label: '潍坊市',
                value: 187,
            },
            {
                label: '济宁市',
                value: 188,
            },
            {
                label: '泰安市',
                value: 189,
            },
            {
                label: '威海市',
                value: 190,
            },
            {
                label: '日照市',
                value: 191,
            },
            {
                label: '莱芜市',
                value: 192,
            },
            {
                label: '临沂市',
                value: 193,
            },
            {
                label: '德州市',
                value: 194,
            },
            {
                label: '聊城市',
                value: 195,
            },
            {
                label: '滨州市',
                value: 196,
            },
            {
                label: '菏泽市',
                value: 197,
            },
        ],
    },
    {
        label: '河南省',
        value: 17,
        children: [
            {
                label: '郑州市',
                value: 198,
            },
            {
                label: '开封市',
                value: 199,
            },
            {
                label: '洛阳市',
                value: 200,
            },
            {
                label: '平顶山市',
                value: 201,
            },
            {
                label: '安阳市',
                value: 202,
            },
            {
                label: '鹤壁市',
                value: 203,
            },
            {
                label: '新乡市',
                value: 204,
            },
            {
                label: '焦作市',
                value: 205,
            },
            {
                label: '濮阳市',
                value: 206,
            },
            {
                label: '许昌市',
                value: 207,
            },
            {
                label: '漯河市',
                value: 208,
            },
            {
                label: '三门峡市',
                value: 209,
            },
            {
                label: '南阳市',
                value: 210,
            },
            {
                label: '商丘市',
                value: 211,
            },
            {
                label: '信阳市',
                value: 212,
            },
            {
                label: '周口市',
                value: 213,
            },
            {
                label: '驻马店市',
                value: 214,
            },
            {
                label: '济源市',
                value: 215,
            },
        ],
    },
    {
        label: '湖北省',
        value: 18,
        children: [
            {
                label: '武汉市',
                value: 216,
            },
            {
                label: '黄石市',
                value: 217,
            },
            {
                label: '十堰市',
                value: 218,
            },
            {
                label: '荆州市',
                value: 219,
            },
            {
                label: '宜昌市',
                value: 220,
            },
            {
                label: '襄樊市',
                value: 221,
            },
            {
                label: '鄂州市',
                value: 222,
            },
            {
                label: '荆门市',
                value: 223,
            },
            {
                label: '孝感市',
                value: 224,
            },
            {
                label: '黄冈市',
                value: 225,
            },
            {
                label: '咸宁市',
                value: 226,
            },
            {
                label: '随州市',
                value: 227,
            },
            {
                label: '仙桃市',
                value: 228,
            },
            {
                label: '天门市',
                value: 229,
            },
            {
                label: '潜江市',
                value: 230,
            },
            {
                label: '神农架林区',
                value: 231,
            },
            {
                label: '恩施土家族苗族自治州',
                value: 232,
            },
        ],
    },
    {
        label: '湖南省',
        value: 19,
        children: [
            {
                label: '长沙市',
                value: 233,
            },
            {
                label: '株洲市',
                value: 234,
            },
            {
                label: '湘潭市',
                value: 235,
            },
            {
                label: '衡阳市',
                value: 236,
            },
            {
                label: '邵阳市',
                value: 237,
            },
            {
                label: '岳阳市',
                value: 238,
            },
            {
                label: '常德市',
                value: 239,
            },
            {
                label: '张家界市',
                value: 240,
            },
            {
                label: '益阳市',
                value: 241,
            },
            {
                label: '郴州市',
                value: 242,
            },
            {
                label: '永州市',
                value: 243,
            },
            {
                label: '怀化市',
                value: 244,
            },
            {
                label: '娄底市',
                value: 245,
            },
            {
                label: '湘西土家族苗族自治州',
                value: 246,
            },
        ],
    },
    {
        label: '广东省',
        value: 20,
        children: [
            {
                label: '广州市',
                value: 247,
            },
            {
                label: '深圳市',
                value: 248,
            },
            {
                label: '珠海市',
                value: 249,
            },
            {
                label: '汕头市',
                value: 250,
            },
            {
                label: '韶关市',
                value: 251,
            },
            {
                label: '佛山市',
                value: 252,
            },
            {
                label: '江门市',
                value: 253,
            },
            {
                label: '湛江市',
                value: 254,
            },
            {
                label: '茂名市',
                value: 255,
            },
            {
                label: '肇庆市',
                value: 256,
            },
            {
                label: '惠州市',
                value: 257,
            },
            {
                label: '梅州市',
                value: 258,
            },
            {
                label: '汕尾市',
                value: 259,
            },
            {
                label: '河源市',
                value: 260,
            },
            {
                label: '阳江市',
                value: 261,
            },
            {
                label: '清远市',
                value: 262,
            },
            {
                label: '东莞市',
                value: 263,
            },
            {
                label: '中山市',
                value: 264,
            },
            {
                label: '潮州市',
                value: 265,
            },
            {
                label: '揭阳市',
                value: 266,
            },
            {
                label: '云浮市',
                value: 267,
            },
        ],
    },
    {
        label: '甘肃省',
        value: 21,
        children: [
            {
                label: '兰州市',
                value: 268,
            },
            {
                label: '金昌市',
                value: 269,
            },
            {
                label: '白银市',
                value: 270,
            },
            {
                label: '天水市',
                value: 271,
            },
            {
                label: '嘉峪关市',
                value: 272,
            },
            {
                label: '武威市',
                value: 273,
            },
            {
                label: '张掖市',
                value: 274,
            },
            {
                label: '平凉市',
                value: 275,
            },
            {
                label: '酒泉市',
                value: 276,
            },
            {
                label: '庆阳市',
                value: 277,
            },
            {
                label: '定西市',
                value: 278,
            },
            {
                label: '陇南市',
                value: 279,
            },
            {
                label: '临夏回族自治州',
                value: 280,
            },
            {
                label: '甘南藏族自治州',
                value: 281,
            },
        ],
    },
    {
        label: '四川省',
        value: 22,
        children: [
            {
                label: '成都市',
                value: 282,
            },
            {
                label: '自贡市',
                value: 283,
            },
            {
                label: '攀枝花市',
                value: 284,
            },
            {
                label: '泸州市',
                value: 285,
            },
            {
                label: '德阳市',
                value: 286,
            },
            {
                label: '绵阳市',
                value: 287,
            },
            {
                label: '广元市',
                value: 288,
            },
            {
                label: '遂宁市',
                value: 289,
            },
            {
                label: '内江市',
                value: 290,
            },
            {
                label: '乐山市',
                value: 291,
            },
            {
                label: '南充市',
                value: 292,
            },
            {
                label: '眉山市',
                value: 293,
            },
            {
                label: '宜宾市',
                value: 294,
            },
            {
                label: '广安市',
                value: 295,
            },
            {
                label: '达州市',
                value: 296,
            },
            {
                label: '雅安市',
                value: 297,
            },
            {
                label: '巴中市',
                value: 298,
            },
            {
                label: '资阳市',
                value: 299,
            },
            {
                label: '阿坝藏族羌族自治州',
                value: 300,
            },
            {
                label: '甘孜藏族自治州',
                value: 301,
            },
            {
                label: '凉山彝族自治州',
                value: 302,
            },
        ],
    },
    {
        label: '贵州省',
        value: 23,
        children: [
            {
                label: '贵阳市',
                value: 303,
            },
            {
                label: '六盘水市',
                value: 304,
            },
            {
                label: '遵义市',
                value: 305,
            },
            {
                label: '安顺市',
                value: 306,
            },
            {
                label: '铜仁地区',
                value: 307,
            },
            {
                label: '毕节地区',
                value: 308,
            },
            {
                label: '黔西南布依族苗族自治州',
                value: 309,
            },
            {
                label: '黔东南苗族侗族自治州',
                value: 310,
            },
            {
                label: '黔南布依族苗族自治州',
                value: 311,
            },
        ],
    },
    {
        label: '海南省',
        value: 24,
        children: [
            {
                label: '海口市',
                value: 312,
            },
            {
                label: '三亚市',
                value: 313,
            },
            {
                label: '五指山市',
                value: 314,
            },
            {
                label: '琼海市',
                value: 315,
            },
            {
                label: '儋州市',
                value: 316,
            },
            {
                label: '文昌市',
                value: 317,
            },
            {
                label: '万宁市',
                value: 318,
            },
            {
                label: '东方市',
                value: 319,
            },
            {
                label: '澄迈县',
                value: 320,
            },
            {
                label: '定安县',
                value: 321,
            },
            {
                label: '屯昌县',
                value: 322,
            },
            {
                label: '临高县',
                value: 323,
            },
            {
                label: '白沙黎族自治县',
                value: 324,
            },
            {
                label: '昌江黎族自治县',
                value: 325,
            },
            {
                label: '乐东黎族自治县',
                value: 326,
            },
            {
                label: '陵水黎族自治县',
                value: 327,
            },
            {
                label: '保亭黎族苗族自治县',
                value: 328,
            },
            {
                label: '琼中黎族苗族自治县',
                value: 329,
            },
        ],
    },
    {
        label: '云南省',
        value: 25,
        children: [
            {
                label: '昆明市',
                value: 330,
            },
            {
                label: '曲靖市',
                value: 331,
            },
            {
                label: '玉溪市',
                value: 332,
            },
            {
                label: '保山市',
                value: 333,
            },
            {
                label: '昭通市',
                value: 334,
            },
            {
                label: '丽江市',
                value: 335,
            },
            {
                label: '思茅市',
                value: 336,
            },
            {
                label: '临沧市',
                value: 337,
            },
            {
                label: '文山壮族苗族自治州',
                value: 338,
            },
            {
                label: '红河哈尼族彝族自治州',
                value: 339,
            },
            {
                label: '西双版纳傣族自治州',
                value: 340,
            },
            {
                label: '楚雄彝族自治州',
                value: 341,
            },
            {
                label: '大理白族自治州',
                value: 342,
            },
            {
                label: '德宏傣族景颇族自治州',
                value: 343,
            },
            {
                label: '怒江傈傈族自治州',
                value: 344,
            },
            {
                label: '迪庆藏族自治州',
                value: 345,
            },
        ],
    },
    {
        label: '青海省',
        value: 26,
        children: [
            {
                label: '西宁市',
                value: 346,
            },
            {
                label: '海东地区',
                value: 347,
            },
            {
                label: '海北藏族自治州',
                value: 348,
            },
            {
                label: '黄南藏族自治州',
                value: 349,
            },
            {
                label: '海南藏族自治州',
                value: 350,
            },
            {
                label: '果洛藏族自治州',
                value: 351,
            },
            {
                label: '玉树藏族自治州',
                value: 352,
            },
            {
                label: '海西蒙古族藏族自治州',
                value: 353,
            },
        ],
    },
    {
        label: '陕西省',
        value: 27,
        children: [
            {
                label: '西安市',
                value: 354,
            },
            {
                label: '铜川市',
                value: 355,
            },
            {
                label: '宝鸡市',
                value: 356,
            },
            {
                label: '咸阳市',
                value: 357,
            },
            {
                label: '渭南市',
                value: 358,
            },
            {
                label: '延安市',
                value: 359,
            },
            {
                label: '汉中市',
                value: 360,
            },
            {
                label: '榆林市',
                value: 361,
            },
            {
                label: '安康市',
                value: 362,
            },
            {
                label: '商洛市',
                value: 363,
            },
        ],
    },
    {
        label: '广西壮族自治区',
        value: 28,
        children: [
            {
                label: '南宁市',
                value: 364,
            },
            {
                label: '柳州市',
                value: 365,
            },
            {
                label: '桂林市',
                value: 366,
            },
            {
                label: '梧州市',
                value: 367,
            },
            {
                label: '北海市',
                value: 368,
            },
            {
                label: '防城港市',
                value: 369,
            },
            {
                label: '钦州市',
                value: 370,
            },
            {
                label: '贵港市',
                value: 371,
            },
            {
                label: '玉林市',
                value: 372,
            },
            {
                label: '百色市',
                value: 373,
            },
            {
                label: '贺州市',
                value: 374,
            },
            {
                label: '河池市',
                value: 375,
            },
            {
                label: '来宾市',
                value: 376,
            },
            {
                label: '崇左市',
                value: 377,
            },
        ],
    },
    {
        label: '西藏自治区',
        value: 29,
        children: [
            {
                label: '拉萨市',
                value: 378,
            },
            {
                label: '那曲地区',
                value: 379,
            },
            {
                label: '昌都地区',
                value: 380,
            },
            {
                label: '山南地区',
                value: 381,
            },
            {
                label: '日喀则地区',
                value: 382,
            },
            {
                label: '阿里地区',
                value: 383,
            },
            {
                label: '林芝地区',
                value: 384,
            },
        ],
    },
    {
        label: '宁夏回族自治区',
        value: 30,
        children: [
            {
                label: '银川市',
                value: 385,
            },
            {
                label: '石嘴山市',
                value: 386,
            },
            {
                label: '吴忠市',
                value: 387,
            },
            {
                label: '固原市',
                value: 388,
            },
            {
                label: '中卫市',
                value: 389,
            },
        ],
    },
    {
        label: '新疆维吾尔自治区',
        value: 31,
        children: [
            {
                label: '乌鲁木齐市',
                value: 390,
            },
            {
                label: '克拉玛依市',
                value: 391,
            },
            {
                label: '石河子市　',
                value: 392,
            },
            {
                label: '阿拉尔市',
                value: 393,
            },
            {
                label: '图木舒克市',
                value: 394,
            },
            {
                label: '五家渠市',
                value: 395,
            },
            {
                label: '吐鲁番市',
                value: 396,
            },
            {
                label: '阿克苏市',
                value: 397,
            },
            {
                label: '喀什市',
                value: 398,
            },
            {
                label: '哈密市',
                value: 399,
            },
            {
                label: '和田市',
                value: 400,
            },
            {
                label: '阿图什市',
                value: 401,
            },
            {
                label: '库尔勒市',
                value: 402,
            },
            {
                label: '昌吉市　',
                value: 403,
            },
            {
                label: '阜康市',
                value: 404,
            },
            {
                label: '米泉市',
                value: 405,
            },
            {
                label: '博乐市',
                value: 406,
            },
            {
                label: '伊宁市',
                value: 407,
            },
            {
                label: '奎屯市',
                value: 408,
            },
            {
                label: '塔城市',
                value: 409,
            },
            {
                label: '乌苏市',
                value: 410,
            },
            {
                label: '阿勒泰市',
                value: 411,
            },
        ],
    },
    {
        label: '内蒙古自治区',
        value: 32,
        children: [
            {
                label: '呼和浩特市',
                value: 412,
            },
            {
                label: '包头市',
                value: 413,
            },
            {
                label: '乌海市',
                value: 414,
            },
            {
                label: '赤峰市',
                value: 415,
            },
            {
                label: '通辽市',
                value: 416,
            },
            {
                label: '鄂尔多斯市',
                value: 417,
            },
            {
                label: '呼伦贝尔市',
                value: 418,
            },
            {
                label: '巴彦淖尔市',
                value: 419,
            },
            {
                label: '乌兰察布市',
                value: 420,
            },
            {
                label: '锡林郭勒盟',
                value: 421,
            },
            {
                label: '兴安盟',
                value: 422,
            },
            {
                label: '阿拉善盟',
                value: 423,
            },
        ],
    },
    {
        label: '澳门特别行政区',
        value: 33,
        children: [
            {
                label: '澳门特别行政区',
                value: 424,
            },
        ],
    },
    {
        label: '香港特别行政区',
        value: 34,
        children: [
            {
                label: '香港特别行政区',
                value: 425,
            },
        ],
    },
];

/**
 * 获取名字
 *
 * @param province
 * @param area
 * @param split
 * @returns {string}
 */
export const getName = ([province, area], split = ' ') => {
    const p = find(regions, { value: province - 0 });
    const arr = [];
    if (p) {
        arr.push(p.label);
        const a = find(p.children, { value: area - 0 });
        if (a) {
            arr.push(a.label);
        }
    }
    return arr.join(split);
};

export default regions;
