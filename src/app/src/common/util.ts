export function validateUname(rule: object, value: string, callback: (...args: any[]) => any) {
	if (/[^\w]/.test(value)) {
		callback(new Error('用户名不得含有特殊字符'));
		return;
	} else if (value.length <= 3) {
		callback(new Error('用户名不得少于4字符'));
	}
	callback();
}
export function validatePassword(rule: object, value: string, callback: (...args: any[]) => any) {
	if (value.length < 1) {
		callback(new Error('密码不得留空'));
		return ;
	}
	callback();
}