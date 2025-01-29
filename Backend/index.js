import dotenv from "dotenv";
dotenv.config(); // Load environment variables first

import { app } from "./app.js";


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

