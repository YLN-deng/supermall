import { request } from './request';

// 请求home数据
export function getHomeData() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type,page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}


// 函数调用 -> 压入函数栈(保持函数调用过程中的所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数中的所有变量)
// function test() {
//     const name = ['why', 'aaa']
// }

// test()

let totalNums = []
const nums1 = [20,11,222]
const nums2 = [18,11,333]

// for(let n of nums1){
//     totalNums.push(n)
// }

totalNums.push(...nums1)  //...解析数据并用push函数添加


