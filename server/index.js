import express from "express";
import fs from "fs";

const app = express();

const PORT = process.eventNames.PORT || 5000;

const jsonFile = "./data/number.json";

// Returns data from json file in json format
const readJsonFile = async (filePath) => {
    let data;
    try {
        if(fs.existsSync(filePath)) {
            data = JSON.parse(await fs.readFileSync(filePath));
        } else {
            data = await writeToJsonFile(filePath, JSON.stringify({"number": 0}));
        }
        return data;
    } catch(err) {
        return false;
    }  
};

// Writes to a json file and returns the data in json format
const writeToJsonFile = async (filePath, dataToWrite) => {
    try {
        await fs.writeFileSync(filePath, dataToWrite);
        return JSON.parse(dataToWrite);
    }catch(err) {
        return false;
    }
};

// Setup json ingest
app.use(express.json());

// Allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api/number", async (req, res) => {
    const data = await readJsonFile(jsonFile);
    res.json(data ? data : {"number": 0});
});

app.post("/api/number", async (req, res) => {
    const number = req.body.number;
    let data = await readJsonFile(jsonFile);
    data = {
        ...data,
        "number": +number
    };
    await writeToJsonFile(jsonFile, JSON.stringify(data));
    data ? res.json(data) : res.sendStatus(404);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));