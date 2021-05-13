import express, {Request, Response} from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
	res.status(200).send("Hello world");
});

app.listen(8000, () => {
	console.log("server Started at Port, 8000")
});
