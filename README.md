# express-map
Develop your backend faster 
## How to use
    npx create-express-map server
    cd server
    yarn/npm install
Now open http://localhost:3001/index

## Know express mapper
#### Create a new path for your server
1. Create a folder in "Routes" like "auth"
2. in auth, create a Ts file named login
3. Add the following lines to it
        
    
        export default {
                mode: 'get', fun: (req: any, res: any) => {
                    console.log('got req')
                    res.send('hi')
                }
        };
Now the path /auth/login is live http://localhost:3001/auth/login
