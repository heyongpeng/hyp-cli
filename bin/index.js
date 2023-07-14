#! /usr/bin/env node

const { Command } = require("commander");
const { execSync } = require("child_process");
const create = require("../lib/core/create");
const help = require("../lib/core/help");
const program = new Command();

// 确定版本
const version = require("../package.json");
program.version(version.version, "-v", "--version");

create.createCommands(program);

program.parse(process.argv);
