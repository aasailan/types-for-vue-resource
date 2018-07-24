# types-for-vue-resource

## 此项目是针对vue2.x的vue-resource的type声明库

## 使用方式：
* git clone https://github.com/aasailan/types-for-vue-resource.git。
* 在自己的项目根目录中创建typings文件夹，然后将clone下来的文件夹改名为vue-resource，放到typings文件夹下。目录结构如下：
```
project
|
|-src // 项目源码
|
|-typings // 项目typing文件
    |
    |- vue-resource // clone下来的文件夹，改名为vue-resource
```

* 享受typescript带来的代码提示吧^^

## 一点小吐槽
去年在杭州做项目的时候无意中发现使用 npm install @types/vue-resource 下载下来的声明库居然是针对vue1的typing，然后vscode的就各种报错。那时候刚接触typescript不久，对声明文件了解不深，更不懂什么是声明合并，总之就是被坑惨了。于是在春节的时候趁着有空，自己参照着vue-resource的源码撸了一份针对vue2的声明文件，自己也趁此更加深入地了解了typescript。