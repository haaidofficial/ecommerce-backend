import { appConfig } from './config';
import app from './app';
import connectDB from './config/db';


const startServer = async () => {
    try {
        await connectDB();
        app.listen(appConfig.port, () => {
            console.log(`Server running in ${appConfig.mode} mode on port ${appConfig.port}`);
        });
    } catch (err) {
        console.error(`Failed to start the server`, err);
        process.exit(1);
    }
}


startServer();