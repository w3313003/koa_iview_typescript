export function validateUname(rule: object, value: string, callback: (...args: any[]) => any) {
	if (/[^\w]/.test(value)) {
		callback(new Error('用户名不得含有特殊字符'));
		return;
	} else if (value.length <= 3) {
		callback(new Error('用户名不得少于4字符'));
		return;
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

// 简单封装本地存储
export function vueX2stoage(key: string, value: object | string | boolean): void {
	sessionStorage.setItem(key, JSON.stringify(value));
}
export function parseStoage(key: string) {
	let data = sessionStorage.getItem(key);
	return JSON.parse((data as string));
}

// 传入path返回路由对象信息

export function searchMenuByPath(menuData: Array<object>, path: string): void | object {
	if(!menuData || menuData.length < 1) return;
	let stack: any[] = [];
	let item = null,
		result = {};
	// 第一层数据入栈
	menuData.forEach((v: object) => {
		stack.push(v);
	});
	// 循环
	while (stack.length) {
		item = stack.shift();
		if(item.path === path) {
			result = item;
			stack.length = 0;
		}
		//若有字节点则把字节点放入栈顶，广度优先则放进栈底；
		if(item.child && item.child.length) {
			stack = [...item.child, ...stack];
		}
	}
	return result;
}

export function collectAncestor (menuData: Array<object>, id: number): void | object {
	if(!menuData || menuData.length < 1) return;
	let result: any = [];
	function search(menus: Array<any>, id: number) {
		let stack: any[] = [],
			item = null;
		menus.forEach(v => {
			stack.push(v);
		});
		while (stack.length) {
			item = stack.shift();
			if(item.id === id) {
				result.push(item);
				if(item.id.parent_id !== 0) {
					search(menus, item.parent_id);
				}
			}
			if(item.child && item.child.length) {
				stack = [...item.child, ...stack];
			}
		}
	}
	search(menuData, id);
	return result;
}


// if(!menuData || menuData.length < 1) return;
// let stack: any[] = [],
// 	item = null,
// 	_id = id,
// 	path = location.hash.replace(/#/, "");
// path.match(/\/(\w+)\//);
// let pattern = RegExp.$1;
// menuData.forEach(v => {
// 	stack.push(v);
// });
// let result = [];
// while (stack.length) {
// 	item = stack.pop();
// 	if(item.path.indexOf(pattern) !== -1 && item.path.match(/\//g).length < (<any>path).match(/\//g).length) {
// 		result.push(item);
// 	}
// 	if(item.id === _id && item.parent_id !== 0) {
// 		stack.length = 0;
// 	}
// 	if(item.child && item.child.length) {
// 		stack = [...item.child, ...stack];
// 	}
// }
// return result;