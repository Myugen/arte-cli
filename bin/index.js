#!/usr/bin/env node
const Configstore = require("configstore");

const clear = require("clear");
const yargs = require("yargs");

const pkg = require("../package.json");
const banner = require("../assets/banner");
const { create, config } = require("../command");

const header = () => {
  clear();
  console.log(banner);
};

const init = () => {
  const storedConfig = new Configstore(pkg.name);
  const dependencies = { storedConfig, header };
  const argv = yargs
    .usage("Usage: $0 <cmd> [options]") // usage string of application.
    .locale("en")
    .command(create(dependencies))
    .command(config(dependencies))
    .option("h", {
      alias: "help",
      description: "Display help message"
    })
    .help("help")
    .version("version", "Show version", `Current version: ${pkg.version}`)
    .alias("version", "v")
    .showHelpOnFail(false, "Whoops, something went wrong! run with --help")
    .argv;
};

init();
