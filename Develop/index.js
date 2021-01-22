const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "Title",
      message: "What is the Title of the project?"
    },
    {
      type: "input",
      name: "discription",
      message: "What is the discription of the project?"
    },
    {
      type: "input",
      name: "instructions",
      message: "What are the usage instructions?"
    },
    {
      type: "input",
      name: "usage",
      message: "What is the usage information?"
    },
    {
        type: "input",
        name: "contribution",
        message: "What are the contribution guidlines?"
      },
      {
        type: "input",
        name: "test",
        message: "What are the test Instructions?"
      },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email address here"
      },
  ]);
}

function generateHTML(answers) {
  return `

  
  

  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>${answers.Title}</title>
</head>
<body>
  <div class="container">
    <h1 class="display-4">${answers.Title}</h1>

        <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
         <summary>Table of Contents</summary>
            <ol>
             <li>
                <a href="#decsription">Description</a>
             </li>
             <li>
                <a href="#instructions">Instalation Instructions</a>
             </li>
             <li>
                <a href="#usage">Usage Information</a>
             </li>
             <li>
                <a href="#contributions">Contribution Guidelines</a>
             </li>
             <li>
                <a href="#test">Test Instructions</a>
             </li>
             <li>
                <a href="#questions">Questions</a>
             </li>
            </ol>

    <h2>Discription</h2>
    <p class="lead" id="decsription"> ${answers.discription}.</p>

    <h2>Instalation Instructions</h2>
    <p class="lead" id="instructions"> ${answers.instructions}.</p>

    <h2>Usage Information</h2>
    <p class="lead" id="usage"> ${answers.usage}.</p>

    <h2>Contribution Guidelines</h2>
    <p class="lead" id="contributions"> ${answers.contribution}.</p>

    <h2>Test Instructions</h2>
    <p class="lead" id="test"> ${answers.test}.</p>

    <h3>Example heading <span class="badge badge-secondary" id="questions">Questions</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">My GitHub username is ${answers.email}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("README.md", html);
  })
  .then(function() {
    console.log("Successfully wrote to README.md");
  })
  .catch(function(err) {
    console.log(err);
  });
