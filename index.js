import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { exec } from "child_process";
import path from "path";

const spinner = createSpinner();

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));
const centerText = (text) => {
	const width = process.stdout.columns;
	const padding = Math.floor((width - text.length) / 2);
	return " ".repeat(padding) + text;
};

// Function to clone the GitHub repository
const cloneRepo = async (branch) => {
	let destinationPath;
	let fileName = process.argv[2] || ""; // Use current directory as default if destination path is not provided
	console.log(chalk.yellow("Cloning repository..."));
	const spinner = createSpinner(); // Create spinner object
	spinner.start(); // Start spinner

	exec(
		`git clone -b ${branch} https://github.com/80mahd08/fhf-linkedList.git ${fileName}`,
		(err, stdout, stderr) => {
			spinner.stop(); // Stop spinner regardless of outcome
			if (err) {
				console.error(
					chalk.red("Error occurred while cloning repository:", err)
				);
				return;
			}
			console.log(chalk.green("fhf-linkedList installed successfully"));
			console.log(chalk.green("Installing dependencies..."));

			spinner.start(); // Restart spinner for dependency installation
			const currentFileUrl = import.meta.url;
			const currentDir = path.dirname(new URL(currentFileUrl).pathname);

			if (fileName === "") {
				destinationPath = path.join(currentDir, "fhf-linkedList");
			} else {
				destinationPath = path.join(currentDir, fileName);
			}
			exec(`cd ${destinationPath} && npm install`, (err, stdout, stderr) => {
				spinner.stop();
				if (err) {
					console.error(
						chalk.red("Error occurred while installing dependencies:", err)
					);
					return;
				}
			});
		}
	);
};

// Function to prompt user to choose a framework
const chooseFramework = async () => {
	const { framework } = await inquirer.prompt({
		type: "list",
		name: "framework",
		message: "Choose a framework for your app:",
		choices: ["Next.js", "Vite"],
	});
	return framework;
};

// Function to prompt user to choose a template for Vite
const chooseTemplate = async () => {
	const { template } = await inquirer.prompt({
		type: "list",
		name: "template",
		message: "Choose a template for your Vite app:",
		choices: ["React JS", "React TS", "Vanilla JS", "Vanilla TS"],
	});
	return template;
};

// Main function to run the CLI
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
			await cloneRepo(branch);
		}
	} catch (error) {
		console.error(chalk.red("An error occurred:", error));
	}
};

runCLI();
