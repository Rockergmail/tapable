/*
 * @description:
 * @author: xiangrong.liu
 * @Date: 2020-08-19 16:55:43
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-19 17:53:56
 */
class SyncWaterfallHook {
	constructor(args) {
		this.args = args
		this.taps = []
	}
	tap(name, fn) {
		this.taps.push(fn);
	}
	call(){
		let realArgs = Array.prototype.slice.call(arguments, 0, this.args.length)
		let [firstArg, ...otherArgs] = realArgs
		let result
		for (let i = 0; i < this.taps.length; i++) {
			firstArg = result || firstArg
			result = this.taps[i](firstArg, ...otherArgs)
		}
	}
}

let hook = new SyncWaterfallHook(['name', 'age'])
hook.tap('1', (name, age) => {
	console.log(1, name, age)
	return 'Winty'
})
hook.tap('2', (name, age) => {
	console.log(2, name, age)
	return 'RR'
})
hook.tap('3', (name, age) => {
	console.log(3, name, age)
})
hook.call('Rocker', 27)
