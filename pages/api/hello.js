// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
const { spawn } = require('child_process');

//
// import axios from 'axios';
//
// export const predict = async (data) => {
//     try {
//         const response = await axios.post('/api/hello', data);
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// };
//
// export default predict;
// const data = {
//   // provide the data to be sent in the request body
// };
//
// fetch('/api/hello', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(data)
// })
//     .then(response => response.json())
//     .then(data => {
//       // handle the response data
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });



