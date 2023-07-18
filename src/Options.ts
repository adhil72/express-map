export default () => {
    console.log(process.argv);
    
    return {
        name: process.argv[2]
    }
}