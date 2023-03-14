// 表单页面
import React from 'react';
import { Button, MenuItem, TextField } from "@mui/material";
import './Form.css';
import { Ajax } from '../../api/request'
import { reg } from '../../utils/validate'
import { PostAdd } from '@mui/icons-material';
// import Loading_icon from '../../components/Loading_icon' 


// 声明数据类型  唯一和枚举
export enum CourseType {
	Single = "single",
	Package = "package",
}
// 声明类型选项 的 所有选项数据
const All_Selections = [
	{
		value: CourseType.Single,
		label: '单选'
	},
	{
		value: CourseType.Package,
		label: '包装'
	},
];
// 初始化数据 声明界面的State数据类型 
interface State {
	Title: string;
	type: string;
	SubTitle: string;
	description: string;
	price: string;
	Switch_On: boolean;
}


var data_id: any = {}
class Form extends React.Component {



	// textRef = useRef();
	// 默认输入框内初始值
	state = {
		Title: '',              //主标题
		type: CourseType.Single, //类型
		SubTitle: '',           //副标题
		description: '',        //文本描述
		price: '1',             //价格
		Switch_On: false,       //编辑启动按钮选择  f-启动 t-禁用
	};

	// 视图改变
	handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			[name]: event.target.value,
		});
		console.log(event.target.value);
	};


	// 提交
	handleSubmit = async (event: any) => {
		// 阻止页面自动刷新
		event.preventDefault();
		// 拿到页面数据正则判断后下一步
		// let isExist_data:any = {};
		if (reg.Title.test(this.state.Title) && reg.SubTitle.test(this.state.SubTitle) && reg.description.test(this.state.description)) {
			let data = this.state
			console.log(data)
			if (data.Title.length > 1 && data.Title !== ' ') {
				if (data.SubTitle.length > 3 && data.SubTitle.length < 200) {
					console.log(data)
					if (data.type) {
						console.log(data)
						let res1: any = await Ajax.GETCoursesListRequest(data) //拿到所有的数据
						console.log("返回查询到的总数据");
						console.log(res1);
						console.log(typeof (res1));
						let isExist_data: any = res1.find((item: { SubTitle: any; Title: any; type: any; }) => item.Title == data.Title && item.SubTitle == data.SubTitle && item.type == data.type)
						if (isExist_data) {
							// 数据提交重复走此
							alert("成功查询到重复的数据，该数据不可提交，启动编辑按钮")
							console.log(isExist_data);                      //打印了该数据
							console.log(typeof (isExist_data));
							data_id = isExist_data;

							// 让按钮启动

							// this.setState({
							//   // event.disabled != this.state.Switch_On,

							// });


						} else { 
							// 数据不重复，正常提交
							console.log("该数据可以提交，禁用编辑按钮");
							return(await Ajax.AddCoursesListRequest(data))
						}
					} else { return alert("请选择好你的类型"); }
				} else { return alert("(简介)副标题内容检查是否符合？"); }
			} else { return alert("标题内容检查是否符合？"); }
		} else { return console.log("检查输入内容是否符合要求") }
	}

	// 编辑
	handleedit = async (event: any) => {
		// 阻止页面自动刷新
		event.preventDefault();
		// 二次查询-data
		let Two_Queries_data = await Ajax.GETCoursesListRequest_id(data_id.id)
		if (Two_Queries_data) {
			//修改替换数据
			let Replace_data = await Ajax.UpdataCoursesListRequest_id(data_id.id, Two_Queries_data)
			//三次查询 ——检查数据中是否有改数据的id
			let Three_queries_data = await Ajax.GETCoursesListRequest_id(data_id.id)
			if (Three_queries_data) {
				alert("数据插入服务端成功")
			} else { alert("数据库中找不到刚插入的数据，检查服务器") }
		}
	}




	render() {
		return (
			<form className="shadow border border-solid border-gray-100 rounded-md p-6" style={{ width: "800px", height: "auto", boxShadow: "0px 0px 10px black", borderRadius: "26px" }} >
				<div className="p-6-1" style={{ width: '100%', margin: '0 .2rem', display: 'flex', justifyContent: "space-between" }}  >
					<TextField
						label="标题"
						id='outlined-Title'
						fullWidth
						helperText="Title is required"
						placeholder="请输入主要标题(3-100字以内)"
						value={this.state.Title}
						onChange={this.handleChange('Title')}
						variant="filled"
						style={{ margin: '0px 10px' }} />
					<TextField
						label="请选择类型"
						select
						fullWidth
						id="outlined-select"
						className="Total_selection"
						value={this.state.type}
						onChange={this.handleChange('type')}
						SelectProps={{
							MenuProps: {
								className: "menuList",
							},
						}}
						helperText="Please select 请选择好 "
						variant="filled"
						style={{ margin: '0px 10px' }}
					>
						{All_Selections.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</div>
				<div className="p-6-2" style={{ margin: '10px' }}>
					<TextField
						label="(简介)副标题"
						fullWidth
						id='outlined-SubTitle'
						className="col-span-2"
						helperText="SubTitle is required"
						placeholder="请输入简介标题(3-200字以内)"
						value={this.state.SubTitle}
						onChange={this.handleChange('SubTitle')}
						variant="filled"
					/>
				</div>
				<div className="p-6-3" style={{ margin: '10px' }}>
					<TextField
						label="描述"
						fullWidth
						className="col-span-2"
						multiline minRows={4}
						maxRows={5}
						placeholder="请输入描述的内容(3-1000字以内)"
						value={this.state.description}
						onChange={this.handleChange('description')}
						variant="filled"
					/>
				</div>
				<div className="p-6-4" style={{ margin: '10px' }}>
					<TextField
						label="价格"
						fullWidth
						className="col-span-2"
						helperText="Price must be at least 1"
						id="outlined-number"
						type="number"
						placeholder="价格默认文本,仅作为文本注释展示"
						value={this.state.price}
						onChange={this.handleChange('price')}
						InputLabelProps={{
							shrink: true,
						}}
						variant="filled"
					/>
				</div>

				<div className="p-6-5" style={{ margin: '10px' }}>
					<Button
						fullWidth
						variant="contained"
						type="submit"
						className="col-span-2"
						onClick={this.handleSubmit}

					>
						提交
					</Button>
				</div>
				<div className="p-6-6" style={{ margin: '10px' }}>
					<Button
						fullWidth
						color="info"
						variant="contained"
						type="submit"
						id='outlined-edit'
						className="col-span-2"
						disabled={this.state.Switch_On}                   // f-启动  t-禁用  默认f
						// onChange={this.handleChange('Switch_On')}      // 打开就报错     
						onClick={this.handleedit}
					>
						编辑
						{/* <Loading_icon></Loading_icon> */}
					</Button>
				</div>

			</form>
		)
	}


}



export default Form;
