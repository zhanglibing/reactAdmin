This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

###  自定义配置
`npm run eject `  （根目录多一个config文件夹）

如果命令报错
先
```git add .```
然后
```
git commit -m "init"

```


### npm 安装React Devtools调试工具
- `git clone https://github.com/facebook/react-devtools.git`
- 进入react-devtools文件夹 `npm install`
- `npm run build:extension:chrome `
- 项目目录中生成一个新的文件夹，react-devtools -> shells -> chrome -> build -> unpacked文件夹
- 打开chrome扩展程序chrome://extensions/，加载已解压的扩展程序，选择第3步中的生成的unpacked文件夹。这时就会添加一个新的扩展程序react-devtools，并在你的浏览器右上角会有个react标志, 就表示成功啦。

### redux-devtools 安装调试工具
- `https://github.com/zalmoxisus/redux-devtools-extension#usage`
- 下载或者 `git clone https://github.com/zalmoxisus/redux-devtools-extension.git`
- npm install
- npm run build:extension
- chrome://extensions   (谷歌浏览器输入) 添加build文件夹下的extension

- 报错时
-  Failed to load external module @babel/register  （运行 `npm i -g gulp@3.9.0`） 降级gulp@3.9.0`） 降级


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
