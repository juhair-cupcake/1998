const exec = require("child_process").exec;
const fs = require("fs");

const defaultTime = "T18:00:00";
//Change here---
//Starting date has to be Sunday (YYYY-MM-DD)
const startingDate = new Date(`1998-01-04${defaultTime}`);
const drawCommit = [
  //There can only be seven strings.
  //All the strings have to be the same size.
  "       00 00     00  00     00 00     00",
  "       00 00     00  00     00 00     00",
  "       00 00     00  00     00 00     00",
  "       00 00     00  000000000 00     00",
  "00     00 00     00  000000000 00     00",
  "000   000 000   000  00     00 000   000",
  " 0000000   000000    00     00  0000000 ",
];
const branchName = "master";
//---Change here

const rowSize = 7,
  colSize = drawCommit[0].length,
  fileName = "README.md";
let newTextContent = `# Draw Your Github Commit History
By [juhair-cupcake](https://juhair.is-a.dev/)

## Requirements
- Don't fork, Create a new repo and copy everything.
- You need to be logged-in on your Github(by SSH/HTTPS) from you terminal.
- Change your starting date(**_It has to be Sunday in YYYY-MM-DD format_**), designs, branch name etc.

## Run Command
\`\`\`
npm start
\`\`\`

### Last Commited Dates

`,
  incrementalDate = 0,
  incrementalTimeoutGap = 0;

const commitToGit = (d) => {
  const calcDateTime = `${d.getFullYear()}-${
    d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
  }-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}${defaultTime}`;

  // const command = "st";
  const command = `git add . && GIT_AUTHOR_DATE="${calcDateTime}" GIT_COMMITTER_DATE="${calcDateTime}" git commit -m "updated: readme on ${calcDateTime}" && git push origin ${branchName}`;

  console.log("git is commiting on", calcDateTime);
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else if (stderr) {
      console.error(err);
    } else {
      console.log(stdout);
    }
  });
};

const actionFunc = (text, foundDate) => {
  setTimeout(() => {
    fs.writeFile(fileName, text, (err) => {
      if (err) {
        console.error(err);
      } else {
        fs.readFile(fileName, "utf8", (err, data) => {
          if (err) {
            console.error(err);
          } else {
            commitToGit(foundDate);
          }
        });
      }
    });
  }, incrementalTimeoutGap);
  incrementalTimeoutGap += 5432 + Math.floor(Math.random() * 100);
};

//calculate-time-and-call-to-action
for (let y = 0; y < colSize; y++) {
  for (let x = 0; x < rowSize; x++) {
    const value = drawCommit[x][y];
    const commitDate = new Date(
      startingDate.getTime() + 1000 * 60 * 60 * 24 * incrementalDate
    );

    if (value === "0") {
      newTextContent += `- ${commitDate.toDateString()}.  \n`;
      actionFunc(newTextContent, commitDate);
    }
    incrementalDate++;
  }
}

/*************************************************************
 * https://juhair.is-a.dev/ *
 *************************************************************/
