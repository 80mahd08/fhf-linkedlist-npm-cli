#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
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
		console.log(chalk.yellow("Cloning repository..."));
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

const installDependencies = (destinationPath) => {
	return new Promise((resolve, reject) => {
		const installCommand = "npm install"; // Use yarn install if you prefer yarn

		console.log(chalk.green("Installing dependencies..."));
		spinner.start();

		const childProcess = exec(installCommand, {
			shell: true,
			cwd: destinationPath,
		});
		// Event handler for stdout data
		childProcess.stdout.on("data", (data) => {
			let out = data.toString().replace(/npm WARN/g, chalk.yellow("npm WARN"));
			// Add more color patterns for potential messages here
			// For example, replacing 'error' with red color
			out = out.replace(/error/gi, chalk.red.bold("error"));
			console.log(out);
		});

		// Event handler for stderr data
		childProcess.stderr.on("data", (data) => {
			let out = data.toString().replace(/npm WARN/g, chalk.yellow("npm WARN"));
			// Add more color patterns for potential messages here
			// For example, replacing 'error' with red color
			out = out.replace(/error/gi, chalk.red.bold("error"));
			console.error(out);
		});

		childProcess.on("error", (err) => {
			reject(
				new Error(
					`Error occurred while installing dependencies: ${err.message}`
				)
			);
		});

		childProcess.on("close", (code) => {
			spinner.stop();
			if (code === 0) {
				console.log(chalk.green("Dependencies installed successfully"));
				resolve();
			} else {
				reject(
					new Error(
						`Error occurred while installing dependencies. Exit code: ${code}`
					)
				);
			}
		});
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

			// Use __dirname to get the current directory
			const __filename = fileURLToPath(import.meta.url);
			const __dirname = path.dirname(__filename);
			const destinationPath = path.resolve(__dirname, fileName);

			await cloneRepo(branch, fileName);
			await installDependencies(destinationPath);
		}
	} catch (error) {
		console.error(chalk.red("An error occurred:", error.message));
	}
};

runCLI();
