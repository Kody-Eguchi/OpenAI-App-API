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
    programmingLanguages,
  } = req.body;
  console.log(
    candidateName,
    employerName,
    employerAddress,
    jobTitle,
    programmingLanguages
  );
  const param = `
    My name is ${candidateName}. 
    Write a cover letter to apply the ${jobTitle} position at company name ${employerName}. 
    Ensure to include following address of the employer ${employerAddress} in header in this form /n "Company Name" /n "Company Address". 
    Ensure to only mention ${programmingLanguages} as proficient programming languages of applicant and do not mention any other programming langugages in this cover letter.
    Ensure this cover letter has 5 paragraphs.
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
