import express from "express";
import request from "request";
const router = express.Router();

router.get('/', (req, res) => {
    request(`https://jsonplaceholder.typicode.com/posts`, (error, response, body) => {
        let data = JSON.parse(body);
        if(response.statusCode === 200) {
            res.render('blog', {data: data});
        }
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', data); // Print the HTML for the Google homepage.
    });
})

export default router;