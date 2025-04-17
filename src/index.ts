import "../preload.ts";
import type {Request, Response} from "express"
import express from "express";
import { assert } from "typia";

const app = express();
app.use(express.json());

// A simple GET route for testing
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express with TypeScript, Bun, and typia!");
});

// Define a TypeScript interface for a user
interface IUser {
  name: string;
  age: number;
}

// POST route that uses typia to validate request body against IUser
app.post("/user", (req: Request, res: Response) => {
  try {
    // The assert function throws if req.body does not match IUser
    const user: IUser = assert<IUser>(req.body);
    res.status(200).json({ message: "User validated successfully", data: user });
  } catch (error: any) {
    res.status(400).json({ message: "Validation failed", error: error.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
