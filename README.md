# DataTea文档
## 介绍
datatea是一个非常简单的数据操作类库,它提供了一些方法来简化对数组和对象的操作，比如升序降序排列，随机取值。调用方法后返回的数据结构往往与传入时的一致，比如调用shuffer方法后返回一个被打乱的数组或对象，这里是数组或者对象取决于传入的是数组还是对象。datatea的所有操作均不会改变原来的数据结构。
## 使用
你可以使用npm安装
``` 
npm install datatea  --save
```
使用时
```
const datatea =  require('datatea')
var a = datatea([1,2,3])//获取一个datatea实例
```
只在浏览器中使用时，也可以直接引入
``` html
<script src="datatea.js"></script>
//datatea([1,2,3])
```
datatea在浏览器中暴露的datatea变量，它就是使用datatea的入口函数
## 属性列表
### origin
指向原来的数据结构
``` javascript
var a = [1,2,3]
datatea([1,2,3]).origin === a//true
```
### type
传入的数据结构的类型
``` javascript
datatea([1,2,3]).type//Array
datatea({foo:1,bar:2})//Object
```
### length
数据结构的长度
``` javascript
datatea([1,2,3]).length//3
datatea({foo:1,bar:2}).length //2
```

## 方法列表
### keys 
返回一个包含所有键的数组
``` javascript
datatea([1,2,3]).keys()//[0,1,2]
datatea({foo:0,bar:1}) .keys()//['foo','bar']
```
### values 
``` javascript
datatea([1,2,3]).values()//[1,2,3]
datatea({foo:0,bar:1}).values()//[0,1]
```
### shuffer
返回一个随机操作后的数组或对象
``` javascript
datatea([1,2,3]).shuffer()//[1,3,2]
datatea({foo:1,bar:2}).shuffer()//{bar:2,foo:1}
```
### ascend
返回一个升序操作后的数组或对象
``` javascript
datatea([1,3,2]).ascend()//[1,2,3]
datatea({foo:2,bar:1}).ascend()//{bar:1,foo:2}
```
### descend
与ascend相反
### reverse
颠倒循序
``` javascript
datatea([3,2,8]).reverse()//[8,2,3]
datatea({foo:1,bar:2}).reverse()//{bar:2,foo:1}
```
### min 
返回值中最小值，可选一个布尔值，但为true时返回一个对象，值为最小值，键是最小值对应的键
``` javascript
datatea([1,2,3]).min()//1
datatea([1,2,3]).min(true)//{0:1}
datatea({foo:0,bar:1}).min()//0
datatea({foo:0,bar:1}).max(true)//{foo:0}
```
### max
与min相反
### random
随机取一个值，可选一个布尔值，但为true时返回一个对象，值是该随机值，键是该值对应的键
``` javascript
datatea([1,2,3]).random()//3
datatea([1,2,3]).random(true)//{index:3,value:3}
datatea({foo:1,bar:2}).random(true)//{key:bar,value:2}
```
### unique
对值进行去重操作，返回一个对象或数组
``` javascript
datatea([1,1,3,4]).unique()//[3,4]
datatea({foo:1,bar:1}).unique()//{foo:1}
```
### removeValue
去除值为参数的键值对，参数为一个值或包含一些值的数组
``` javascript
datatea([1,2,3]).remove(1)//[2,3]
datatea([1,2,3]).remove([1,2])//[3]
datatea({foo:0,bar:1}).remove(0)//{bar:1}
datatea({foo:0,bar:1}).remove([0,1])//{}
```
### removeKey
去除键为参数的键值对，参数为一个键或包含一些键的数组
``` javascript
datatea([1,2,3]).remove(0)//[2,3]
datatea([1,2,3]).remove([0,1])//[3]
datatea({foo:0,bar:1}).remove('foo')//{bar:1}
datatea({foo:0,bar:1}).remove(['foo','bar'])//{}
```
### total
将所有值相加后返回
``` javascript
datatea([1,2,3]).total()//6
datatea({foo:1,bar:2})//3
```

### indexOf
 查询值对应的第一个键，参数为一个值或包含一些值的数组
``` javascript
datatea([1,2,3]).indexOf(2)//1
datatea({foo:0,bar:1}).indexOf(1)//'bar'
```
### eq 
根据索引获取元素
``` javascript
datatea([1,2,3]).eq(0)//1
datatea({foo:1,bar:2}).eq(0)//{foo:1}
```
### slice
切片操作，使用方法与数组原型的slice一致
``` javascript
datatea([1,2,3]).slice(0,1)//[1]
datatea({foo:1,bar:2}).slice(0,1)//{foo:1}
```
## License 
MIT