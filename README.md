# 项目介绍

注: !!! 项目 库(package.json -> dependencies) 每3个月要主动升级一次 !!!

## 项目目录

├── android                       Android开发工程
│   ├── app
│   ├── bnq.keystore
│   └── settings.gradle
├── ios                           iOS开发工程
│   ├── Podfile
│   └── xxx
├── assets                        资源文件
│   ├── icon                       图标
│   ├── img                        图片
│   ├── icons.js
│   ├── imgs.js              
│   └── index.js            
├── components                    组件
│   ├── common
│   ├── custom
│   └── index.js
├── config                        App配置
│   ├── constants.js
│   └── index.js
├── libs                          三方库封装
│   ├── xxx
│   ├── xxx2
│   └── index.js
├── modules                       模块
│   ├── apis
│   ├── bluetooth
│   ├── event
│   ├── location
│   ├── native
│   ├── network
│   ├── sensor
│   ├── store
│   └── index.js
├── pages                         页面
│   ├── ActionType.js
│   ├── Config.js
│   └── html
│       ├── register.js
│       └── test.js
├── app.js                        根页面
...                               根目录
├── android.sh
├── babel.config.js
├── index.js
├── jest.config.js
├── metro.config.js
├── package.json
├── README.md

## 运行
```bash
# using npm
npm start

# Android
npm run android
# ios
npm run ios

# OR using Yarn
yarn start

# Android
yarn android
# ios
yarn ios
```

## 打包

```
Android 
    快捷打包： 
    sh android.sh

    常规打包：
        # 切换目录
        cd android
        ./gradlew clean
        # 打包
        ./gradlew assembleRelease

```