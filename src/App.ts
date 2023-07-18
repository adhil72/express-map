#!/usr/bin/env node

import props from "./Options"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { TypeBuildJson } from "./Types"
import buildJson from "./data.json"

const configProject = (path: string) => {
    writeFileSync(path + '/tsconfig.json', JSON.stringify(buildJson.tsConfig))
    writeFileSync(path + '/package.json', JSON.stringify(buildJson.package))
    mkdirSync(path + '/dist')
    mkdirSync(path + '/src')
    mkdirSync(path + '/routes')
    writeFileSync(path + '/src/App.ts', 'console.log("Hello from backend")')
}

let name = props().name
let exc_path = process.cwd() + '/'

if (name) {
    if (existsSync(exc_path + name)) {
        throw new Error(`Project with name "${exc_path + name}" is already exist. pick another name`)
    } else {
        mkdirSync(exc_path + name)
        configProject(exc_path + name)
    }
} else {
    throw new Error("You must provide name of project")
}