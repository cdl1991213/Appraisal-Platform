'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户调用云函数端上传的参数
	//context包含调用的调用信息和运行状态
	const collection = db.collection('mycenter') // 获取表'home-swiper'的集合对象	
	
	
	//新增
	let{zhanghao, password, nicheng, txurl, qianming} = event //解构
	let res = await collection.add({
		zhanghao, password, nicheng, txurl, qianming
	})
	
	//删除
	/* let _id = event.id
		//单个删除
	let res = await collection.doc(_id).remove()
		//批量删除
	let res = await collection.where({
		_id
	}).remove() */
	
	//更新
	/* let _id = event.id
	let res = await collection.doc(_id).update({
		title:event.title
	}) */
	
	return res // 返回json给客户端
}
