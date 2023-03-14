
import Form from "./pages/Form/Form";
// 自定义主题
// import "./App.less";
import { createTheme, ThemeProvider } from "@mui/material";


function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#0a59bfad",
      },
      secondary: { main: "#8eb8e7" },
      background: {
        paper: "#ffffff",
      },

    },
    shape: { borderRadius: 6 },
  });
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ThemeProvider theme={theme}>
        {/* 英文文档看着头痛，裂开的我的哥， Mui组件用的的确很强  https://v3.mui.com/api/text-field/*/}
        <Form />
      </ThemeProvider>
    </div>
  );
}

export default App;


