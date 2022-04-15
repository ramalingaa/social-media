import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

 export const users = [
  
  {
    _id: uuid(),
    firstName: "ramalinga",
    lastName: "reddy",
    email: "ramalinga.kalagotla@gmail.com",
    password: "123456",
    badge:"https://res.cloudinary.com/ramlinga/image/upload/v1629605956/Image1_amz-removebg-preview_vrbt0s.png",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "adarsh",
    lastName: "balika",
    email: "adarshbalika@gmail.com",
    password: "444555",
    badge:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwyMzQ5ODgwfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "shubham",
    lastName: "soni",
    email: "shubhamsoni@gmail.com",
    password: "101010",
    badge:"https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
