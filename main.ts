import { add, multiply } from "./utils";
import { User, Status } from "@/types";

const result = add(5, 3);
const product = multiply(4, 6);

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
};

const status: Status = "active";

console.log({ result, product, user, status });
