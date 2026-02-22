import express from "express";
import {
  getAllCustomers,
  getCustomerByPhone,
} from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/", getAllCustomers);
router.get("/:phone", getCustomerByPhone);

export default router;
