## 什么是 uniCloud 
uniCloud 是 DCloud 联合阿里云、腾讯云，为开发者提供的基于 serverless 模式和 js 编程的云开发平台，更多请参考[uniCloud文档](https://uniapp.dcloud.io/uniCloud)。

## 云端一体页面的优势是什么
过去，开发一个列表，需要在后端设计数据库，提供接口，前端写列表，处理分页、下拉刷新，并保证长列表的性能，全套工作下来需要1、2天。

现在有了云端一体列表，上述工作都不用做了，页面拿来就用。

在HBuilderX 2.9+，新建页面时，可以直接选择大量云端一体页面模板，数据库、后台接口、前端页面都有了。

当然，您也可以调整，自定义数据库表和前端的ui。

## 后台数据表
后台数据表使用 [openDB](https://gitee.com/dcloud/opendb/tree/master) 设计规范，它约定了一个标准用户表的表名和字段定义，并且基于nosql的特性，可以由开发者自行扩展字段。`openDB`是[uniCloud](https://uniapp.dcloud.io/uniCloud/README)的重要软基建，支撑`uniCloud`数字生态的发展。

## 页面模板简介

这是基于 [uni-list](https://ext.dcloud.net.cn/plugin?id=24) 扩展的云端一体的商品列表（宫格模式）页面模版。

本模版有如下特征：

- 基于 `uni-ui` 框架的 `uni-list` 组件扩展
- 遵循 `openDB` 的 [opendb-mall-goods](https://gitee.com/dcloud/opendb/tree/master/collection/opendb-mall-goods)结构
- 基于 [uni-clientDB](https://ext.dcloud.net.cn/plugin?id=2314) 操作数据库
- 支持下拉刷新、上拉加载
- 支持列表、宫格视图互相切换

**Tips**
- 暂不支持 nvue 页面

## 使用说明

1. 在 `cloudfunctions` 目录，右键上传所有云函数及公共模块
2. 在 `cloudfunctions` > `db_init.json` 文件，右键初始化数据库，数据结构参考 `openDB` 的[opendb-mall-goods](https://gitee.com/dcloud/opendb/tree/master/collection/opendb-mall-goods)表结构
3. 运行到 Chrome 查看效果

## 代码说明

> 代码逻辑以及样式见代码示例

### 基本排版


```html
<uni-list class="uni-list--waterfall">
	<uni-list-item :border="false" class="uni-list-item--waterfall" title="自定义商品列表" v-for="item in lists" :key="item._id">
		<template v-slot:header>
			<view class="uni-thumb shop-picture shop-picture-column">
				<image :src="item.goods_thumb" mode="aspectFill"></image>
			</view>
		</template>

		<view slot="body" class="shop">
			<view>
				<view class="uni-title">
					<text class="uni-ellipsis-2">{{ item.name }}</text>
				</view>
				<view>
					<text class="uni-tag hot-tag">{{ item.goods_tip }}</text>
					<text v-for="tag in item.tag" :key="tag" class="uni-tag">{{ tag }}</text>
				</view>
			</view>
			<view>
				<view class="shop-price">
					<text>¥</text>
					<text class="shop-price-text">{{ item.goods_price }}</text>
					<text>.00</text>
				</view>
				<view class="uni-note">{{ item.comment_count }}条评论 月销量 {{ item.month_sell_count }}</view>
				<view class="uni-note ellipsis">
					<text class="uni-ellipsis-1">{{ item.shop_name }}</text>
					<text class="uni-link">进店 ></text>
				</view>
			</view>
		</view>
	</uni-list-item>
</uni-list>

```


## 样式覆盖

模板中通过 `common/uni-ui.scss` 定义了一些标题、图片等的基础样式

如果以上排版不能满足需求或者需要调整现有排版的样式，直接修改或覆盖对应样式即可。

## 其他模板样式

1. 云端一体商品列表模板，混合布局：[https://ext.dcloud.net.cn/plugin?id=2546](https://ext.dcloud.net.cn/plugin?id=2651)
2. 云端一体商品列表模板，宫格模式：[https://ext.dcloud.net.cn/plugin?id=2583](https://ext.dcloud.net.cn/plugin?id=2671)
3. 云端一体商品列表模板，列表模式：[https://ext.dcloud.net.cn/plugin?id=2584](https://ext.dcloud.net.cn/plugin?id=2672)