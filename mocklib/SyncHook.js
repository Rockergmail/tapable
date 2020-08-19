/*
 * @description:
 * @author: xiangrong.liu
 * @Date: 2020-08-19 16:55:43
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-19 17:24:47
 */
class SyncHook {
	constructor(args) {
		this.args = args
		this.taps = []
	}
	tap(name, fn) {
		this.taps.push(fn);
	}
	call(){
		let realArgs = Array.prototype.slice.call(arguments, 0, this.args.length)
		this.taps.forEach(fn => fn(...realArgs))
	}
}

let hook = new SyncHook(['name', 'age'])
hook.tap('1', (name, age) => {
	console.log(1, name, age)
})
hook.tap('2', (name, age) => {
	console.log(2, name, age)
})
hook.tap('3', (name, age) => {
	console.log(3, name, age)
})
hook.call('Rocker', 27)
