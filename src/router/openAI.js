const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const router = express.Router();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);
console.log(process.env.API_KEY);

router.post("/api/generate", async (req, res) => {
  const {
    candidateName,
    employerName,
    employerAddress,
    jobTitle,
    programmingLangugages,
  } = req.body;

  const param = `
    My name is ${candidateName}. 
    Write a cover letter to apply the ${jobTitle} position at company name ${employerName}. 
    Ensure to include following address or the employer ${employerAddress} . 
    Ensure to only mention ${programmingLangugages} as proficient programming languages of applicant and do not mention any other programming langugages in this cover letter.
  `;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: param }],
    max_tokens: 1000,
  });

  const result = response.data.choices[0].message.content;

  res.send(result);
});

module.exports = router;
