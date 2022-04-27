import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:"Beutiful nature",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    image:"https://scx2.b-cdn.net/gfx/news/hires/2022/ancient-trees-deemed-v.jpg",
    video:"",
    userName: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:"I love this place",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    image:"https://images.theconversation.com/files/137600/original/image-20160913-4948-6fyxz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop",
    video:"",
    userName: "shubhamsoni",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:"Wonderful place to visit this summer",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    image:"https://www.datocms-assets.com/46272/1633199491-1633199490440.jpg?fit=max&fm=jpg&w=1000",
    video:"",
    userName: "ramalingareddy",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
