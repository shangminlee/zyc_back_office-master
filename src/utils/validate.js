const validate = {
  // 手机号正则校验
  isValidPhone(phoneNum) {
    const pattern = new RegExp(/^1[3|4|5|6|7|8|9][0-9]{9}$/);
    return pattern.test(phoneNum);
  },
  // 电话号码正则校验
  isValidTel(telNum) {
    const pattern = new RegExp(/^([0-9]{3,4}-)?[0-9]{7,8}$/);
    return pattern.test(telNum);
  },
  // 密码正则校验
  isValidPswd(pswd) {
    const pattern = new RegExp(/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,20}$/);
    return pattern.test(pswd);
  },
  // 短信验证码正则校验
  isValidCode(code) {
    const pattern = new RegExp(/^\d{6}$/);
    return pattern.test(code);
  },
  // 车牌号正则校验
  isValidlicensePlateNo(licensePlateNo) {
    const pattern = new RegExp(/^[a-z0-9A-Z]{5}$/);
    return pattern.test(licensePlateNo);
  },
  // 姓名正则校验
  isValidname(name) {
    const pattern = new RegExp(/([\u4e00-\u9fa5]{2,}$)|([A-Za-z ]{4,}$)/);
    return pattern.test(name);
  },
  // 身份证号正则校验
  isValidIDCard(code, isCard) {
    if (isCard) {
      return true;
    }
    const reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
    const city = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽 ",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };
    var birthday = code.substr(6, 4) + "-" + Number(code.substr(10, 2)) + "-" + Number(code.substr(12, 2));
    var d = new Date(birthday.replace(/-/g, "/"));
    var flag = true;
    if (!reg.test(code)) {
      // 身份证号格式错误
      flag = false;
    } else if (!city[code.substr(0, 2)]) {
      // 身份证号地址编码错误
      flag = false;
    } else if (birthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
      // 身份证号生日编码错误
      flag = false;
    } else {
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;

        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        if (parity[sum % 11] != code[17].toUpperCase()) {
          // 身份证号校验位错误
          flag = false;
        }
      }
    }
    return flag;
  },
  // 银行卡号正则校验
  isValidatebankAccount(bankno) {
    var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）
    var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
      newArr.push(first15Num.substr(i, 1));
    }

    var arrJiShu = new Array(); //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9

    var arrOuShu = new Array(); //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
      if ((j + 1) % 2 == 1) { //奇数位
        if (parseInt(newArr[j]) * 2 < 9)
          arrJiShu.push(parseInt(newArr[j]) * 2);
        else
          arrJiShu2.push(parseInt(newArr[j]) * 2);
      }
      else //偶数位
        arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
      jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
      jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
      sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (var n = 0; n < arrOuShu.length; n++) {
      sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (var p = 0; p < jishu_child1.length; p++) {
      sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
      sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }

    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;

    if (lastNum == luhm && lastNum.length != 0) {
      return true;
    } else {
      return false;
    }
  },
  // 邮箱号正则校验
  isValidCarOwnerEmail(carOwnerEmail) {
    const pattern = new RegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);
    return pattern.test(carOwnerEmail);
  },
  // 详细地址正则校验
  isValidCarOwneraddressee(carOwnerAddressee) {
    const pattern = new RegExp(/^[0-9A-Za-z\u4e00-\u9fa5]{0,20}$/);
    return pattern.test(carOwnerAddressee);
  },
  // 银行卡号正则校验
  isValidateBankNum(bankNum) {
    const pattern = new RegExp(/^\d{16}|\d{19}$/);
    return pattern.test(bankNum);
  },

  // 抄件下载正则校验
  isNumber(phoneNum) {
    const pattern = new RegExp(/^\d$/);
    return pattern.test(phoneNum);
  },
}

export default validate;
