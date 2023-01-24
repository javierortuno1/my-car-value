var dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.js'],
    cli: {
        migrationsDir: 'migrations'
    }
};

// The process is called by using 'npm run start:<script>' that will run an script
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
            entities: ['**/*.entity.ts'],
            migrationsRun: true
        });
        break;
    case 'production':
        Object.assign(dbConfig, {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            migrationsRun: true,
            entities: ['**/*.entity.js'],
            ssl: {
                rejectUnauthorized: false
            }
        })
        break;
    default:
        throw new Error('Unknown environment');
}

module.exports = dbConfig;