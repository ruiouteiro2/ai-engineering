import { requireUser } from "../../services/auth";
export default defineEventHandler(async (event) => requireUser(event));
