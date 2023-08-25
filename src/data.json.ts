export default {
    "tsConfig": {
        "compilerOptions": {
            "forceConsistentCasingInFileNames": true, "newLine": "lf", "noFallthroughCasesInSwitch": true, "noImplicitReturns": true, "noUnusedParameters": false, "noUnusedLocals": false, "rootDir": "./src/", "strict": true, "declaration": true, "moduleResolution": "node", "module": "commonjs", "outDir": "./dist/", "skipLibCheck": true, "target": "es2019", "esModuleInterop": true
        }, "include": ["./src/**/*.ts"]
    }, "package": {
        "name": "express-mapper", "version": "1.0.0", "description": "Backed using express map", "scripts": {
            "dev": "tsc && node ./dist/App.js"
        }, "license": "ISC", "devDependencies": {
            "express": "^4.18.2",
            "@types/cors": "^2.8.13"
        }, "dependencies": {
            "@types/express": "^4.17.17",
            "cors": "^2.8.5"
        }
    }, "App.ts": `
    import express from "express"
import mapper from "./Helpers/Mapper"
import {msg, success} from "./Helpers/Logger"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors({allowedHeaders:"*",origin:"*"}))

const port = 50000

const configServer = async () => {
    const map = await mapper()
    map.forEach((router) => {
        if (router.mode === 'post') {
            success("Mapping : post " + '/' + router.path)
            app.post('/' + router.path, router.fun)
        } else if (router.mode === 'get') {
            success("Mapping : get " + '/' + router.path)
            app.get('/' + router.path, router.fun)
        }else if (router.mode === 'patch') {
            success("Mapping : get " + '/' + router.path)
            app.patch('/' + router.path, router.fun)
        }else if (router.mode === 'delete') {
            success("Mapping : get " + '/' + router.path)
            app.delete('/' + router.path, router.fun)
        }else if (router.mode === 'put') {
            success("Mapping : get " + '/' + router.path)
            app.put('/' + router.path, router.fun)
        }
    });

    app.listen(port, () => {
        msg("Server launched successfully");
    })
}

configServer()
    `, routes: {
        "index.ts": `export default {
    mode: 'get', fun: (req: any, res: any) => {
        console.log('got req')
        res.send('hi')
    }
};`
    }, Helpers: {
        "AsyncLoop.ts": `const AcyncLoop = (data: any[], callback: any) => {
            return new Promise((r) => {
                processData(data, callback, () => {
                    r(null)
                })
            })
        }
        let i = 0
        const processData = async (data: any[], callback: any, onDone: any) => {
            let obj = data[i]
            if (obj) {
                await callback(obj)
                i++
                processData(data, callback, onDone)
            } else {
                onDone()
            }
        }
        export default AcyncLoop`, "Logger.ts": `// logger.ts
        enum LogColor {
            Reset = '\x1b[0m',
            FgRed = '\x1b[31m',
            FgGreen = '\x1b[32m',
            FgBlue = '\x1b[34m',
        }
        
        function logWithColor(color: LogColor, message: any) {
            console.log(color, message, LogColor.Reset);
        }
        
        export function success(message: any) {
            logWithColor(LogColor.FgGreen, message);
        }
        
        export function error(message: any) {
            logWithColor(LogColor.FgRed, message);
        }
        
        export function msg(message: any) {
            logWithColor(LogColor.FgBlue, message);
        }`, "Mapper.ts": `
        import fs from 'fs';
import path from 'path';
import AsyncLoop from "./AsyncLoop"

function fetch(dirPath: string = './src/routes', currentPath: string = ''): string[] {
    const files = fs.readdirSync(dirPath);

    let paths: string[] = [];

    for (const file of files) {
        const filePath = path.join(dirPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            const subDirPath = path.join(currentPath, file);
            const subDirPaths = fetch(filePath, subDirPath);
            paths = paths.concat(subDirPaths);
        } else if (file.endsWith('.ts')) {
            const filePathWithoutExt = path.join(currentPath, file);
            paths.push(filePathWithoutExt);
        }
    }

    return paths;
}

const getAllPaths = async () => {
    let routes: { fun: any, mode: string, path: string }[] = []
    let paths = fetch()
    let base = process.cwd() + '/dist/routes/'

    await AsyncLoop(paths, async (p: any) => {
        let modulePath = base+p.replace('.ts','.js')
        let module = await import(modulePath)
        routes.push({fun: module.default.fun, mode: module.default.mode, path: p.replace('.ts', '')})
    })
    return routes
}

export default getAllPaths
        `,

    }
}