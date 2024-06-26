#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { exec } from "child_process";
import { createSpinner } from "nanospinner";

const spinner = createSpinner();

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

const centerText = (text) => {
	const width = process.stdout.columns;
	const padding = Math.floor((width - text.length) / 2);
	return " ".repeat(padding) + text;
};

const cloneRepo = (branch, fileName) => {
	return new Promise((resolve, reject) => {
		console.log(chalk.yellow("Installing fhf-linkedlist..."));
		spinner.start();

		exec(
			`git clone -b ${branch} https://github.com/80mahd08/fhf-linkedList.git ${fileName}`,
			{ shell: true },
			(err, stdout, stderr) => {
				spinner.stop();
				if (err) {
					reject(
						new Error(`Error occurred while cloning repository: ${err.message}`)
					);
				} else {
					console.log(chalk.green("fhf-linkedList installed successfully"));
					resolve();
				}
			}
		);
	});
};

const chooseFramework = async () => {
	const { framework } = await inquirer.prompt({
		type: "list",
		name: "framework",
		message: "Choose a framework for your app:",
		choices: ["Next.js", "Vite"],
	});
	return framework;
};

const chooseTemplate = async () => {
	const { template } = await inquirer.prompt({
		type: "list",
		name: "template",
		message: "Choose a template for your Vite app:",
		choices: ["React JS", "React TS", "Vanilla JS", "Vanilla TS"],
	});
	return template;
};

const runCLI = async () => {
	console.log(centerText(chalk.greenBright.bold("FHF-Linkedlist")));
	spinner.start();
	await sleep(2000);
	spinner.stop();

	try {
		const framework = await chooseFramework();

		if (framework === "Next.js") {
			console.log(chalk.blue("Next.js coming soon!"));
		} else if (framework === "Vite") {
			const template = await chooseTemplate();
			const branch = `vite-${template.toLowerCase().replace(" ", "-")}`;
			const fileName = process.argv[2] || "fhf-linkedList";

			await cloneRepo(branch, fileName);
			console.log(`
new you can run the following command:
	${chalk.bgGreen(`cd ${fileName}`)}
    ${chalk.bgGreen(`npm install`)}
    ${chalk.bgGreen(`npm run dev`)}
to start your app.
			`);
		}
	} catch (error) {
		console.error(chalk.red("An error occurred:", error.message));
	}
};

runCLI();
