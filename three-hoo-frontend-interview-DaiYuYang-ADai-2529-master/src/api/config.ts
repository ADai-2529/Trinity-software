// 封装 axios 
import axios from 'axios'
// import { CourseType } from '../pages/Form/Form'
import PositionedSnackbar from '../components/warning'
// import { string } from 'yup'
export const baseUrl = "http://localhost:3004/"
export const request = axios.create({
	timeout: 60000,      //设置超时时间
	baseURL: baseUrl,   //项目的基本路径
	headers: {           //请求头 token
		//  Authorization:'AUTH_TOKEN',
		// 'Content-Type':'application/x-www-form-urlencoded'  // 设置请求的数据格式 
	}
})


// interface Data {
//     title: string,					 
//     subTitle: string,				
//     description: string, 		 
//     type: CourseType.Single | CourseType.Package,			 
//     price: number,					 
// }



// 请求前拦截器
request.interceptors.request.use(function(config: any){
    // 请求成前
    // PositionedSnackbar("请求之前，执行的文本提示")           //致命错误，在逻辑条件语句中，调用该组件，该组件又调用了hooks _违背了hooks的规则
    console.log("请求之前");
    return config;
},function(error: any){
    // 请求失后
    // PositionedSnackbar("请求后失败了，不是服务器响应，执行的文本提示")
    console.log("请求失后");
    return Promise.reject(error);
})
// 响应后拦截器
request.interceptors.response.use(function(response: any){
    // 响应成功
    // PositionedSnackbar("响应成功的提示")
    console.log("响应成功");
    return response;
},function(error: any){
    // 响应失败         
    // PositionedSnackbar("响应失败，服务器的身上出现了问题，数据已经到服务器了")
    console.log("响应失败");
    return Promise.reject(error);
});


//查 GET 所有
export const Get = (url: any, params: any,headers: any)=>{ 		//接口路径,数据,请求头
    return new Promise(function(resolve,reject){    //要求返回的是一个Promise实例 这样就可以使用.then 和 .catch 的方法
        request({
            url,            	//接口路径
            method:'GET',   	//请求方式
            params:params,  	//get 请求的传输方式  表示函数的参数是可变个数的
            headers,        	//执行请求头
        }).then((res: { data: unknown; })=>{      	//res形参————接受请求到数据————就执行下面代码块
            resolve(res.data) 	// axios 的数据 是包装在 data属性 里面  ————直接拿数据
        }).catch((err: any)=>{
            reject(err)
        })

    })
}
//查 Gett 指定
export const Gett = (url: any,data: any,params: any,headers: any)=>{ 		//接口路径,数据,请求头
    return new Promise(function(resolve,reject){    	//要求返回的是一个Promise实例 这样就可以使用.then 和 .catch 的方法
        request({
            url,            		//接口路径
            method:'GET',   		//请求方式
            data,					//带数据
            params,         		//get 请求的传输方式  表示函数的参数是可变个数的
            headers,        		//执行请求头
        }).then((res: { data: unknown; })=>{      		//res形参————接受请求到数据————就执行下面代码块
            resolve(res.data) 			// axios 的数据 是包装在 data属性 里面  ————直接拿数据
        }).catch((err: any)=>{
            reject(err)
        })
    })
}

//增 POST
export const Post = (url: any,data: any,params: any,headers: any)=>{ 	//接口路径 增加的数据 传输方式 请求头
    return new Promise(function(resolve,reject){
        request({
            url,
            method:"POST",
            data,       // post 提交的data
            params,     // 表示函数的参数是可变个数的
            headers,
        }).then((res: { data: unknown; })=>{
            resolve(res.data)  
        }).catch((err: any)=>{
            reject(err)
        })
    })
}

//改 Patch/Put 
export const Put = (url: any,data: any,headers: any)=>{
    return new Promise(function(resolve,reject){
        request({
            url,
            method:"Put",
            data,  
            headers,
        }).then((res: { data: unknown; })=>{
            resolve(res.data)  
        }).catch((err: any)=>{
            reject(err)
        })
    })
}

//删 Delete 
export const Delete = (url: any,data: any,headers: any)=>{ //接口路径 需要删除的数据 请求头
    return new Promise(function(resolve,reject){
        request({
            url,
            method:"Delete",
            data,  
            headers,
        }).then((res: { data: unknown; })=>{
            resolve(res.data)  
        }).catch((err: any)=>{
            reject(err)
        })
    })
}