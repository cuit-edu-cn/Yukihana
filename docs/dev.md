# 开发

本节介绍如何搭建基础的开发环境。

## 1.获取项目源码及初始化

  1. 命令行执行：`https://github.com/cuit-edu-cn/ntqq-bot.git`
  2. 进入项目：`cd ntqq-bot`
  3. 安装包：`pnpm install`

## 2. 获取QQ

  1. 打开一个Release页面
  2. 根据页面中完整包的链接，下载完整包
  3. 下载Release中的`skip_file_check`文件
  4. 解压完整包中的Files目录到项目的`ntqq`目录下

      大致结构如下：
      ```
      ntqq-bot
      ├─ntqq
      │  ├─lib
      │  ├─locales
      │  ├─obj
      │  └─resources
      ```
  5. 删除`ntqq/QQ.exe`，将`skip_file_check`复制到ntqq文件夹中并重命名为`QQ.exe`。（就是替换QQ.exe）

## 3. 验证QQ启动文件替换的结果

  1. 打开文件`ntqq/resources/app/app_launcher/index.js`
  2. 在文件结尾加上注释符号`//`
  3. 启动QQ.exe
  4. 正常启动说明准备工作完成；否则会提示“资源损坏”。
