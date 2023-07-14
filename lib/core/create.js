const action = require("./action");
const createCommands = (program) => {
  // 拉取项目
  program
    .command("create <project>")
    .description("clone responsitory into a floder")
    .option("-t, --type <typeName>", "项目类型")
    .action(async (name, cmds) => {
      await action.actionProject(name, cmds);
    });
};

module.exports = {
  createCommands,
};
