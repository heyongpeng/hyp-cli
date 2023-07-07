#! /usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const { execSync } = require("child_process");
const program = new Command();

const fileUrl = "git@ggzcgitlab.dobest.com:fe/h5-vue3-template.git";

// 获取脚手架最新版本

// 创建命令
program
  .command("create <projectName>")
  .description("创建H5项目模板")
  .option("-t, --type <typeName>", "项目类型")
  .action(async (name, cmds) => {
    console.log(name, cmds);
    const { type } = cmds;
    // 解析指令
    if (!name) {
      console.log("请输入项目名称");
      return;
    }
    if (type && type.toLowerCase() !== "h5") {
      console.log("目前仅支持h5项目模板,请重新输入");
      return;
    }

    // 拉取模板并安装依赖
    cloneProject();
  });

const cloneProject = async () => {
  // 拉取项目代码
  try {
    execSync(`git clone ${fileUrl}`, {
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

  // 展示成功
  console.log("模板下载完成并已完成安装");
};

program.parse(process.argv);
