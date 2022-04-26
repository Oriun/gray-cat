const fs = require("fs/promises");
const { exec } = require("child_process");

const argList = ["minor", "major", "correctif"];

async function main(versionIncrement) {
  console.log('Reading package.json')
  const packageJson = JSON.parse(await fs.readFile("./package.json", "utf-8"));

  const version = packageJson.version;
  let [major, minor, correctif] = version.split(".").map(a => parseInt(a))
  if (versionIncrement === "major") major++
  if (versionIncrement === "minor") minor++
  if (versionIncrement === "correctif") correctif++
  const newVersion = [major, minor, correctif].join('.')
  packageJson.version = newVersion

  const name = packageJson.name
  const tarName = name.replace(/^[^a-zA-Z0-9]/gmi, '').replace(/[^a-zA-Z0-9]/gmi, '-') + '-' + newVersion + '.tgz'

  console.log('Updating package.json version to ' + newVersion)
  await fs.writeFile('./package.json', JSON.stringify(packageJson), 'utf-8')

  console.log('Tracking files with git' + name)
  await new Promise((ok, ko) => {
    exec(`git add *`, (error, stdout) => {
      if (error) return ko(error)
      ok()
    })
  })

  console.log('Buidling Typescript')
  await new Promise((ok, ko) => {
    exec('tsc', (error) => {
      if (error) return ko(error)
      ok()
    })
  })

  console.log('Packing package into ' + tarName)
  await new Promise((ok, ko) => {
    exec('npm pack --json', (error) => {
      if (error) return ko(error)
      ok()
    })
  })

  console.log('Publishing package ' + name)
  await new Promise((ok, ko) => {
    exec(`npm publish ${tarName}`, (error, stdout) => {
      if (error) return ko(error)
      console.log(stdout)
      ok()
    })
  })
  console.log('Cleaning up' + name)
  await new Promise((ok, ko) => {
    exec(`git clean -fX`, (error, stdout) => {
      if (error) return ko(error)
      console.log(stdout)
      ok()
    })
  })

  console.log("Congratulation")
}

const arg = process.argv[2];
if (argList.includes(arg)) {
  main(arg);
} else {
  console.error("Invalid value : " + arg);
}
