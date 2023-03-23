'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户调用云函数端上传的参数
	//context包含调用的调用信息和运行状态
	const collection = db.collection('mycenter') // 获取表'home-swiper'的集合对象	
	

	//更新
	let{_id, password} = event //解构
	console.log(_id)
	console.log(password)
	console.log(event)
	let res = await collection.doc(_id).update({
		password
	})
	
	return res // 返回json给客户端
}
