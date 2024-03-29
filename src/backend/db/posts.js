import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "post1",
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
    creationTime: "2022-03-01",
    updatedAt: "2022-03-10",
  },
  {
    _id: "post2",
    content:"I love this place",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    image:"https://images.theconversation.com/files/137600/original/image-20160913-4948-6fyxz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop",
    video:"",
    userName: "shubhamsoni",
    creationTime: "2022-03-02",
    updatedAt: "2022-04-01",
  },
  
  {
    _id: "post3",
    content:"Wonderful place to visit this summer",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    image:"https://www.datocms-assets.com/46272/1633199491-1633199490440.jpg?fit=max&fm=jpg&w=1000",
    video:"",
    userName: "ramalingareddy",
    creationTime: "2022-03-04",
    updatedAt: "2022-05-01",
  },
  {
    _id: "post4",
    content:"But why",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    image:"https://media2.giphy.com/media/gd09Y2Ptu7gsiPVUrv/giphy.gif",
    video:"",
    userName: "shubhamsoni",
    creationTime: "2022-03-05",
    updatedAt: "2022-03-11",
  },
  {
    _id: "post5",
    content:"Wonders of Earth",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments:[],
    image:"https://res.cloudinary.com/ramlinga/video/upload/v1648702213/Video-library/Planet%20Earth/One_Earth_-_Environmental_Short_Film_dgfezb.mp4",
    video:"",
    userName: "adarshbalika",
    creationTime: "2022-03-06",
    updatedAt: "2022-03-09",
  },

];
