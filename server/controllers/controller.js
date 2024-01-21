import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers, users } from "../database/data.js";
import User from "../models/userSchema.js";

/** insert all questions */
export async function insertUser(req, res) {
  try {
    await User.create(users);
    res.json({ msg: "Users Saved Successfully...!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/** delete all users */
export async function dropUser(req, res) {
  try {
    await User.deleteMany();
    res.json({ msg: "Result Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}

/** get all questions */
export async function getUsers(req, res) {
  try {
    const U = await User.find();
    res.json(U);
  } catch (error) {
    res.json({ error });
  }
}


/** get all questions */
export async function getQuestions(req, res) {
  try {
    const q = await Questions.find();
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
}

/** insert all questions */
export async function insertQuestions(req, res) {
  try {
    const questionsData = [
      {
        questions,
        answers,
      },
    ];

    await Questions.insertMany(questionsData);
    res.json({ msg: "Data Saved Successfully...!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/** Delete all Questions */
export async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany();
    res.json({ msg: "Questions Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}

/** get all result */
export async function getResult(req, res) {
  try {
    const r = await Results.find();
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
}

/** post all result */
export async function storeResult(req, res) {
  try {
    const { username, result, attempts, points, achived } = req.body;
    if (!username && !result) throw new Error("Data Not Provided...!");

    Results.create({ username, result, attempts, points, achived });
    res.json({ msg: "Result Saved Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}

/** delete all result */
export async function dropResult(req, res) {
  try {
    await Results.deleteMany();
    res.json({ msg: "Result Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}
