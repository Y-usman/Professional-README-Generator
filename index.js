const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
    {
        type: "input",
        name: "title",
        message: "Enter the title of your project:",
      },
      {
        type: "input",
        name: "description",
        message: "Provide a brief description of your project:",
      },
      {
        type: "input",
        name: "installation",
        message: "Provide installation instructions:",
      },
      {
        type: "input",
        name: "usage",
        message: "Provide usage information:",
      },
      {
        type: "list",
        name: "license",
        message: "Choose a license for your application:",
        choices: ["MIT", "Apache 2.0", "GPL 3.0", "BSD 3-Clause", "None"],
      },
      {
        type: "input",
        name: "contributing",
        message: "Provide contribution guidelines:",
      },
      {
        type: "input",
        name: "tests",
        message: "Provide test instructions:",
      },
      {
        type: "input",
        name: "github",
        message: "Enter your GitHub username:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter your email address:",
      },
];

// function to write README file
function writeToFile(fileName, data) {
    const outputPath = path.join(__dirname, fileName);
  
    // Ensure the directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  
    // Write content to file
    fs.writeFileSync(outputPath, data);
  
    console.log(`File created: ${outputPath}`);
}

// function to initialize program
function init() {
    inquirer
    .prompt(questions)
    .then((answers) => {
      const markdownContent = generateMarkdown(answers);
      const outputFilePath = path.join("output", "README.md");
      writeToFile(outputFilePath, markdownContent);
      console.log(`README.md has been generated successfully at ${outputFilePath}`);
    })
    .catch((error) => console.error("Error during inquirer prompt:", error));
}

// function call to initialize program
init();
