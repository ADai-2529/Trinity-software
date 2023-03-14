//拦截器的提示组件
import * as React from 'react';
// import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function PositionedSnackbar( Prompt_text:string ) {
  
  // 设置state值及设置打开关闭api
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  // // 打开组件
  // const handleClick = (newState: SnackbarOrigin) => () => {
  //   setState({ open: true, ...newState });
  // };

  // 关闭组件
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // 点击按钮测试组件
  // const buttons = (
  //   <React.Fragment>
  //     <Button
  //       onClick={handleClick({
  //         vertical: 'top',
  //         horizontal: 'center',
  //       })}
  //     >
  //       位置顶部中心
  //     </Button>
  //   </React.Fragment>
  // );

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }}  //出现位置
        open={open}                                             //打开状态
        onClose={handleClose}                                   //执行回调
        message={Prompt_text}                                   //提示内容
        key={vertical + horizontal}                             //关键位置信息处理
      />
    </div>
  );
}








