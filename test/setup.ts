import { rm } from "fs/promises";
import { join } from "path";

// Going to be executed before every single before each test
global.beforeEach( async () => {
    try {
        // delete the test.sqlite
        // join(find the current directory, go parent folder, find target file)
        await rm(join(__dirname, '..', 'test.sqlite'));
    } catch (err) {}
});