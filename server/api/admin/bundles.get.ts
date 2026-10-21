import { adminResource } from "../../services/admin-resource";
export default defineEventHandler((event) => adminResource(event, "bundles"));
