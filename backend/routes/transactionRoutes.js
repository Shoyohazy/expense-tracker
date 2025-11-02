import express from "express";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.route("/").get(getTransactions).post(addTransaction);

router.route("/:id").put(updateTransaction).delete(deleteTransaction);

export default router;
