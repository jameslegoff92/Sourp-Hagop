import { getInstagramMedia } from "./axios.js";

(async () => { 
    const posts = await getInstagramMedia("dkfjdfjk");
    console.log(posts);
})();
