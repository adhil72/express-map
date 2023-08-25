#!/usr/bin/env node

import props from "./Options"
import {existsSync, mkdirSync, writeFileSync} from "fs"
import buildJson from "./data.json"

const configProject = (path: string) => {
    buildJson.package.name = name
    writeFileSync(path + '/tsconfig.json', JSON.stringify(buildJson.tsConfig, null, 2))
    writeFileSync(path + '/package.json', JSON.stringify(buildJson.package, null, 2))
    mkdirSync(path + '/dist')
    mkdirSync(path + '/src')
    mkdirSync(path + '/src/routes')
    mkdirSync(path + '/src/Helpers')
    writeFileSync(path + '/src/App.ts', buildJson["App.ts"])
    writeFileSync(path + '/src/Helpers/AsyncLoop.ts', buildJson["Helpers"]["AsyncLoop.ts"])
    writeFileSync(path + '/src/Helpers/Logger.ts', buildJson["Helpers"]["Logger.ts"])
    writeFileSync(path + '/src/Helpers/Mapper.ts', buildJson["Helpers"]["Mapper.ts"])
    writeFileSync(path + '/src/routes/index.ts', buildJson.routes["index.ts"])

}

let name = props().name
if (name === '.') name = ''
let exc_path = process.cwd() + '/'

if (name) {
    if (!existsSync(exc_path + name)) {
        mkdirSync(exc_path + name)
    }
    configProject(exc_path + name)
} else {
    throw new Error("You must provide name of project")
}