/**
 * @Author: WangZeYuan
 * @Description: 常用的正则表达式校验
 */


/**
 * 非零正整数校验
 */
export function checkPositiveInt(rule, value, callback) {
	if (/^\+?[1-9][0-9]*$/.test(value)) {
		callback();
	} else {
		callback(new Error('请输入正整数'));
	}
}

/*
用途：检查输入手机号码是否正确(不校验必填-保存时用)
输入：
s：字符串
返回：
如果通过验证返回true,否则返回false
*/
export function checkMobileSave(rule, value, callback) {
	let phoneRegWithArea = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
	if (value.length > 0) {
		if (phoneRegWithArea.test(value)) {
			callback();
		} else {
			callback(new Error('手机号码格式不正确'));
		}
	} else {
		callback();
	}
}

/*
用途：检查输入手机号码是否正确(校验必填-提交时用)
输入：
s：字符串
返回：
如果通过验证返回true,否则返回false
*/
export function checkMobileSubmit(rule, value, callback) {
	let phoneRegWithArea = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
	if (value.length > 0) {
		if (phoneRegWithArea.test(value)) {
			callback();
		} else {
			callback(new Error('手机号码格式不正确'));
		}
	} else {
		callback(new Error(' '));
	}
}

/**
 * 检查输入的身份证号是否正确
 * 输入:str  字符串
 *  返回:callback() 或 flase; true表示格式正确
 */

export function checkIdCardNum(rule, value, callback) {
	if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
		callback()
	} else {
		callback(new Error('身份证格式有误'))
	}

	// if (this.exhibitForm.idcardType == '0' || this.form.idcardType == '0') {
	// 	var idcard_array = new Array();
	// 	idcard_array = value.split("");
	// 	// 地区检验
	// 	if (this.area[parseInt(value.substr(0, 2))] == null) {
	// 		callback(new Error('身份证号码格式不正确'));
	// 	}
	// 	var ereg;
	// 	var Y, JYM;
	// 	var S, M;
	// 	// 身份号码位数及格式检验
	// 	switch (value.length) {
	// 		case 15:
	// 			if ((parseInt(value.substr(6, 2)) + 1900) % 4 == 0 ||
	// 				((parseInt(value.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(value
	// 						.substr(6, 2)) + 1900) %
	// 					4 == 0)) {
	// 				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; // 测试出生日期的合法性
	// 			} else {
	// 				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; // 测试出生日期的合法性
	// 			}
	// 			if (ereg.test(value))
	// 				callback();
	// 			else {
	// 				callback(new Error('身份证号码出生日期无效'));
	// 			}
	// 			break;
	// 		case 18:
	// 			if (parseInt(value.substr(6, 4)) % 4 == 0 ||
	// 				(parseInt(value.substr(6, 4)) % 100 == 0 && parseInt(value
	// 						.substr(6, 4)) %
	// 					4 == 0)) {
	// 				ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
	// 			} else {
	// 				ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; // 平年出生日期的合法性正则表达式
	// 			}
	// 			if (ereg.test(value)) { // 测试出生日期的合法性
	// 				// 计算校验位
	// 				S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) *
	// 					7 +
	// 					(parseInt(idcard_array[1]) + parseInt(idcard_array[11])) *
	// 					9 +
	// 					(parseInt(idcard_array[2]) + parseInt(idcard_array[12])) *
	// 					10 +
	// 					(parseInt(idcard_array[3]) + parseInt(idcard_array[13])) *
	// 					5 +
	// 					(parseInt(idcard_array[4]) + parseInt(idcard_array[14])) *
	// 					8 +
	// 					(parseInt(idcard_array[5]) + parseInt(idcard_array[15])) *
	// 					4 +
	// 					(parseInt(idcard_array[6]) + parseInt(idcard_array[16])) *
	// 					2 +
	// 					parseInt(idcard_array[7]) *
	// 					1 +
	// 					parseInt(idcard_array[8]) *
	// 					6 +
	// 					parseInt(idcard_array[9]) * 3;
	// 				Y = S % 11;
	// 				M = "F";
	// 				JYM = "10X98765432";
	// 				M = JYM.substr(Y, 1);
	// 				if (M == idcard_array[17]) {
	// 					callback();
	// 				} else {
	// 					callback(new Error('身份证号码末位出错,请注意x的大小写'));
	// 				}
	// 			} else {
	// 				callback(new Error('身份证号码出生日期无效'));
	// 			}
	// 			break;
	// 		default:
	// 			callback(new Error('身份证号码长度不正确'));
	// 			break;
	// 	}

	// } else {
	// 	callback();
	// }
}

/**
 * 检查输入的URL地址是否正确
 * 输入:str  字符串
 *  返回:callback() 或 flase; true表示格式正确
 */
export function isUrl(rule, domain, callback) {
	let name = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
	if (!(name.test(domain))) {
		callback('URL地址输入错误');
	} else {
		callback();
	}
}

/*
用途：检查输入的电话号码格式是否正确
输入：
strPhone：字符串
返回：
如果通过验证返回true,否则返回false
*/
export function checkPhone(rule, strPhone, callback) {
	let phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
	let phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;
	//var prompt = "您输入的电话号码不正确!"
	if (strPhone.length > 9) {
		if (phoneRegWithArea.test(strPhone)) {
			callback();
		} else {
			//alert( prompt );
			callback(new Error('电话号码格式不正确'));
		}
	} else {
		if (phoneRegNoArea.test(strPhone)) {
			callback();
		} else {
			//alert(prompt);
			callback(new Error('电话号码格式不正确'));
		}

	}
}

/*
用途：检查输入字符串是否为空或者全部都是空格
输入：str
返回：
如果全是空返回true,否则返回false
*/
export function isNull(rule, value, callback) {
	if (/^\s*$/.test(value)) {
		callback(new Error('输入内容不能为空'))
	} else {
		callback()
	}
}

/*
用途：检查输入对象的值是否符合整数格式
输入：str 输入的字符串
返回：如果通过验证返回true,否则返回false
*/
export function isInteger(rule, str, callback) {
	let regu = /^[-]{0,1}[0-9]{1,}$/;
	if (regu.test(str)) {
		callback()
	} else {
		callback(new Error('请输入整数'));
	}
}


/*
用途：检查输入字符串是否符合正整数格式
输入：
s：字符串
返回：
如果通过验证返回true,否则返回false
*/
export function isNumber(s, callback) {
	let regu = "^[0-9]+$";
	let re = new RegExp(regu);
	if (s.search(re) != -1) {
		callback();
	} else {
		callback(new Error('请输正入整数'));
	}
}

/*
用途：检查输入字符串是否是带小数的数字格式,可以是负数
输入：
s：字符串
返回：
如果通过验证返回true,否则返回false
*/
export function isDecimal(rule, str, callback) {
	if (isInteger(str)) return callback();
	const re = /^[-]{0,1}(\d+)\.+(\d+)$/;
	if (re.test(str)) {
		if (RegExp.$1 == 0 && RegExp.$2 == 0) return callback(new Error('输入不正确'));
		callback();
	} else {
		callback(new Error('数字格式输入错误'));
	}
}

/*
用途：检查输入的车牌是否正确
如果通过验证返回true,否则返回false
*/
export function checklicensePlate(rule, licensePlate, callback) {
	let re = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
	if (licensePlate.search(re) == -1) {
		callback('车牌号码格式输入错误');
	} else {
		callback();
	}
}

/*
用途：校验是否由中文组成
如果通过验证返回true,否则返回false
*/
export function ischina(rule, str, callback) {
	var reg = /^[\u4E00-\u9FA5]{2,4}$/; /*定义验证表达式*/
	if (reg.test(str) == true) {
		callback()
	} else {
		callback('请输入中文')
	} /*进行验证*/

}
/*
用途：校验邮政编码,校验只能填数字(不校验必填-保存时用)
如果通过验证返回true,否则返回false
*/
export function checkPostcodeSave(rule, str, callback) {
	var reg = /^[0-8][0-7]\d{4}$/; /*定义验证表达式*/
	if (str.length > 0) {
		if (reg.test(str) == true) {
			callback()
		} else {
			callback(new Error('请填入数字,最大到万'))
		} /*进行验证*/
	}
}

/*
用途：校验邮政编码,校验只能填数字(校验必填-提交时用)
如果通过验证返回true,否则返回false
*/
export function checkPostcodeSubmit(rule, str, callback) {
	var reg = /^[0-8][0-7]\d{4}$/; /*定义验证表达式*/
	if (str.length > 0) {
		if (reg.test(str) == true) {
			callback()
		} else {
			callback(new Error('请填入数字,最大到万'))
		} /*进行验证*/
	} else {
		callback(new Error(' '))
	}
}
/*
用途：校验最多为5位的数字(不校验必填-保存时用)
如果通过验证返回true,否则返回false
*/
export function checkFiveNumSave(rule, str, callback) {
	var reg = /^\d{1,5}$/; /*定义验证表达式*/
	if (str.length > 0) {
		if (reg.test(str) == true) {
			callback()
		} else {
			callback(new Error('请填入数字,最大到万'))
		} /*进行验证*/
	}
}

/*
用途：校验最多为5位的数字(校验必填-提交时用)
如果通过验证返回true,否则返回false
*/
export function checkFiveNumSubmit(rule, str, callback) {
	var reg = /^\d{1,5}$/; /*定义验证表达式*/
	if (str.length > 0) {
		if (reg.test(str) == true) {
			callback()
		} else {
			callback(new Error('请填入数字,最大到万'))
		} /*进行验证*/
	} else {
		callback(new Error(' '))
	}
}

/*
用途：数字精确到小数点前10位、后4位，首字母不能为0(不校验必填-保存时用)
如果通过验证返回true,否则返回false
*/
export function checkMoneyWanSave(rule, str, callback) {
	var reg = /^[1-9]{1}\d{0,9}\.[0-9]{1,4}$|0\.[0-9]{1,4}$|^[1-9]{1}\d{0,9}$|^0$/; /*定义验证表达式*/
	if (str.length > 0) {
		if (reg.test(str) == true) {
			callback()
		} else {
			callback(new Error('请填入正确金额(精确到小数点4位,最大不超过10位)'))
		} /*进行验证*/
	}
}

/*
用途：数字精确到小数点前10位、后4位，首字母不能为0(校验必填-提交时用)
如果通过验证返回true,否则返回false
*/
export function checkMoneyWanSubmit(rule, str, callback) {
	var reg = /^[1-9]{1}\d{0,9}\.[0-9]{1,4}$|0\.[0-9]{1,4}$|^[1-9]{1}\d{0,9}$|^0$/; /*定义验证表达式*/
	if (str.length > 0) {
		if (reg.test(str) == true) {
			callback()
		} else {
			callback(new Error('请填入正确金额(精确到小数点4位,最大不超过10位)'))
		} /*进行验证*/
	} else {
		callback(new Error(' '))
	}
}

// export function isNull(rule, value, callback) {
// 	if (value == null || typeof (value) == 'undefined' || value === undefined) {
// 		return callback();
// 	}
// 	return callback(new Error('输入不正确'));
// }