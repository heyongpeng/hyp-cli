const fileList = require("../template/fileList");
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs-extra");
// 通过项目名称，拉取固定项目模板
const actionProject = async (name, cmds) => {
  const { type } = cmds;
  // 解析指令
  if (!name) {
    console.log("请输入项目名称");
    return;
  }
  if (type && !fileList[type.toLowerCase()]) {
    console.log("目前仅支持wxapp和h5两种类型模板创建，请重试");
    return;
  }

  // 判断当前路径下有无特定名称文件夹
  const currentDir = process.cwd() + "/" + name;
  const isExist = fs.existsSync(currentDir);
  // 修改项目名称
  if (isExist) {
    console.log("该路径下项目已存在  默认先删除再安装");
    fs.removeSync(currentDir, (err) => {
      if (!err) {
        console.log("已删除本地旧项目");
      } else {
        console.log(err);
        return;
      }
    });
  }

  // 拉取模板并安装依赖
  await cloneProject(type);

  // 修改下载项目文件夹名称
  const oldPath = process.cwd() + "/h5-vue3-template";
  const newPath = process.cwd() + "/" + name;
  fs.readdir(process.cwd(), (err, files) => {
    console.log(files);
    fs.rename(oldPath, newPath, (err) => {
      if (!err) {
        console.log("改名成功");
        // 展示成功
        console.log("模板下载完成并已完成安装");
      }
    });
  });
};

const cloneProject = async (type) => {
  // 拉取项目代码
  const template = type.toLowerCase();
  try {
    execSync(`git clone ${fileList[template]}`, {
      stdio: "inherit",
    });
    console.log("has download");
  } catch (err) {
    console.log(err);
  }
  // 删除 .git
  try {
    execSync("cd h5-vue3-template && rm -rf .git", { stdio: "inherit" });
    console.log("has delete .git");
  } catch (err) {
    console.log(err);
  }
  // 安装依赖
  try {
    execSync("cd h5-vue3-template && npm install", { stdio: "inherit" });
    console.log("has install");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  actionProject,
};
