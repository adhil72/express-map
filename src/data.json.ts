export default {
    "tsConfig": {
        "compilerOptions": {
            "forceConsistentCasingInFileNames": true,
            "newLine": "lf",
            "noFallthroughCasesInSwitch": true,
            "noImplicitReturns": true,
            "noUnusedParameters": true,
            "rootDir": "./src/",
            "strict": true,
            "declaration": true,
            "moduleResolution": "node",
            "module": "commonjs",
            "outDir": "./dist/",
            "skipLibCheck": true,
            "target": "es2019",
            "esModuleInterop": true
        },
        "include": [
            "src/"
        ]
    },
    "package": {
        "name": "$$name$$",
        "version": "1.0.0",
        "description": "Backed using express map",
        "scripts": {
            "dev": "tsc && node ./dist/App.js"
        },
        "license": "ISC",
        "devDependencies": {
            "express": "^4.18.2"
        }
    }
}