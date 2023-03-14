import { Get,Gett,Post,Put,Delete,} from './config'

//所有接口服务  在这里实现
export const Ajax = {
       
  GETCoursesListRequest: (data)=>Gett('/courses',data),                    // 获取所有数据

  GETCoursesListRequest_id:(id,data)=>Gett('/courses/'+id,data),          // 获取指定数据带id

  // GETCoursesListRequest_Title_SubTitle_Selection:(Title,data)=>Gett_3('/courses/'+Title,data),    //获取指定Title,SubTitle,Selection查

  AddCoursesListRequest:(data)=>Post('/courses',data),                    // 添加数据

  UpdataCoursesListRequest_id:(id,data)=>Put('/courses/'+id,data),        // 修改数据
  
  DeleteCoursesListRequest_id:(id,data)=>Delete('/courses/'+id,data),     // 删除指定数据带id

}







