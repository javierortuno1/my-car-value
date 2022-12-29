var dbConfig = {
    synchronize: false
};

// The process is called by using 'npm run start:<script>' that will run an sprict 
// with potentially env variables. One of them is NODE_ENV, it will indicate to the
// program or project in which environment it should be executed
switch(process.env.NODE_ENV) {
    case 'development':
        console.log('DEVELOPMENT')
        // Dev will run form the dist folder
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.js']
        });
        break;
    case 'test':
        // Test will run form the src folder due to the jest library for the testing
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts']
        });
        break;
    case 'production':
        break;
    default:
        throw new Error('Unknown environment');
}

module.exports = dbConfig;