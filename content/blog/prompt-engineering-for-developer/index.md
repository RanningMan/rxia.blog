---
title: "Prompt Engineering for Developers: Course Notes"
date: "2023-05-18"
description: "An opinioned course notes on Deeplearning's course: prompt engineering for developers"
tag: ["course notes", "web development", "AI", "LLM", "ChatGPT"]
isDraft: false
---

This blog contains notes taken from Andrew Ng's "Prompt Engineering for Developers" course. It covers various techniques for writing prompts for AI models, guidelines for formatting and structuring output, and reducing hallucinations. Additionally, it provides examples of prompts for different types of tasks, such as summarizing, transforming, and inferring information from text. All the content and examples are taken from the course's material.

# Guidelines

1. **Use delimiters to clearly indicate distinct parts of the input.** Some delimiters are:

   triple qoutes: “””  
   triple backticks: ```  
   triple dashes: ---  
   angle brackets: <>  
   XML tags: <tag></tag>

   An example prompt:

   ````jsx
   text = "You should express what you want a model to do by \
   providing instructions that are as clear and \
   specific as you can possibly make them. \
   This will guide the model towards the desired output, \
   and reduce the chances of receiving irrelevant \
   or incorrect responses. Don't confuse writing a \
   clear prompt with writing a short prompt. \
   In many cases, longer prompts provide more clarity \
   and context for the model, which can lead to \
   more detailed and relevant outputs."

   prompt = `
   Summarize the text delimited by triple backticks \
   into a single sentence.
   ```${text}```
   `
   ````

2. **Ask for a structured output.** Explicitly ask for the output in certain structure like JSON, HTML

   An example prompt:

   ```jsx
   prompt = `
   Generate a list of three made-up book titles along \ 
   with their authors and genres. 
   Provide them in JSON format with the following keys: 
   book_id, title, author, genre.`
   ```

3. **Ask the model to check whether conditions are satisfied.** This can be useful when the same prompt is used in different conditional text input.

   An example prompt:

   ```jsx
   text =
     "Making a cup of tea is easy! First, you need to get some \
   water boiling. While that's happening, \
   grab a cup and put a tea bag in it. Once the water is \
   hot enough, just pour it over the tea bag. \
   Let it sit for a bit so the tea can steep. After a \
   few minutes, take out the tea bag. If you \
   like, you can add some sugar or milk to taste. \
   And that's it! You've got yourself a delicious \
   cup of tea to enjoy."

   prompt = `
   You will be provided with text delimited by triple quotes.
   If it contains a sequence of instructions, \
   re-write those instructions in the following format:
   
   Step 1 - ...
   Step 2 - …
   …
   Step N - …
   
   If the text does not contain a sequence of instructions, \
   then simply write \"No steps provided.\"
   
   """${text_1}"""
   `
   ```

4. **"Few-shot" prompting.** Give successful examples of completing tasks. Then ask model to perform the task.

   Example:

   ```jsx
   prompt = `
   Your task is to answer in a consistent style.
   
   <child>: Teach me about patience.
   
   <grandparent>: The river that carves the deepest \ 
   valley flows from a modest spring; the \ 
   grandest symphony originates from a single note; \ 
   the most intricate tapestry begins with a solitary thread.
   
   <child>: Teach me about resilience.
   `
   ```

5. **Specify the steps required to complete a task.**

   Example:

   ````jsx
   text = "
   In a charming village, siblings Jack and Jill set out on \
   a quest to fetch water from a hilltop \
   well. As they climbed, singing joyfully, misfortune \
   struck—Jack tripped on a stone and tumbled \
   down the hill, with Jill following suit. \
   Though slightly battered, the pair returned home to \
   comforting embraces. Despite the mishap, \
   their adventurous spirits remained undimmed, and they \
   continued exploring with delight."

   prompt_1 = `
   Perform the following actions:
   1 - Summarize the following text delimited by triple \
   backticks with 1 sentence.
   2 - Translate the summary into French.
   3 - List each name in the French summary.
   4 - Output a json object that contains the following \
   keys: french_summary, num_names.

   Separate your answers with line breaks.

   Text:
   ```${text}```
   `
   ````

6. **Instruct the model to work out its own solution before rushing to a conclusion.** This is useful when the task is to validate the correctness of the input text.

   Example:

   ```jsx
   prompt = "
   Your task is to determine if the student's solution \
   is correct or not.
   To solve the problem do the following:
   - First, work out your own solution to the problem.
   - Then compare your solution to the student's solution \
   and evaluate if the student's solution is correct or not.
   Don't decide if the student's solution is correct until
   you have done the problem yourself.

   Use the following format:
   Question:
   """
   question here
   """
   Student's solution:
   """
   student's solution here
   """
   Actual solution:
   """
   steps to work out the solution and your solution here
   """
   Is the student's solution the same as actual solution \
   just calculated:
   """
   yes or no
   """
   Student grade:
   """
   correct or incorrect
   """
   Question:
   """
   I'm building a solar power installation and I need help \
   working out the financials.
   - Land costs $100 / square foot
   - I can buy solar panels for $250 / square foot
   - I negotiated a contract for maintenance that will cost \
     me a flat $100k per year, and an additional $10 / square \
     foot
     What is the total cost for the first year of operations \
     as a function of the number of square feet.
   """
   Student's solution:
   """
   Let x be the size of the installation in square feet.
   Costs:

   1. Land cost: 100x
   2. Solar panel cost: 250x
   3. Maintenance cost: 100,000 + 100x
      Total cost: 100x + 250x + 100,000 + 100x = 450x + 100,000
   """
   Actual solution:
   """

   ```

7. **Reduce hallucinations.**

   Besides using above tactics to help reduce hallucinations, developers should also ask the model to first find any relevant quotes from the text and then ask it to use those quotes to answer questions.

# Iterative

No prompt is perfect at the first time. Just like software development, prompt should be iteratively improved over time.

# Summarizing

1. It’s helpful to give the model a focus in prompt to summarize.

   Example:

   ````jsx
   prompt = `
   Your task is to generate a short summary of a product \
   review from an ecommerce site to give feedback to the \
   pricing deparmtment, responsible for determining the \
   price of the product.

   Summarize the review below, delimited by triple
   backticks, in at most 30 words, and focusing on any aspects \
   that are relevant to the price and perceived value.

   Review: ```${prod_review}```
   `
   ````

2. Use extract instead of summarize.

   ````jsx
   prompt = `
   Your task is to extract relevant information from \
   a product review from an ecommerce site to give \
   feedback to the Shipping department.

   From the review below, delimited by triple quotes \
   extract the information relevant to shipping and \
   delivery. Limit to 30 words.

   Review: ```${prod_review}```
   `
   ````

# Inferring

these tasks are where the model takes a text as input and performs some kind of analysis, for example, **extracting labels**, **extracting names**, **understanding the sentiment of a text**, etc.

Example

```jsx
prompt = `
Identify the following items from the review text: 
- Sentiment (positive or negative)
- Is the reviewer expressing anger? (true or false)
- Item purchased by reviewer
- Company that made the item

The review is delimited with triple backticks. \
Format your response as a JSON object with \
"Sentiment", "Anger", "Item" and "Brand" as the keys.
If the information isn't present, use "unknown" \
as the value.
Make your response as short as possible.
Format the Anger value as a boolean.

Review text: '''${lamp_review}'''
`
```

# Transforming

1. Translation.
2. Spellcheck/Grammar check: To signal to the LLM that you want it to proofread your text, you instruct the model to 'proofread' or 'proofread and correct'.
3. Tone transformation: Writing can vary based on the intended audience. ChatGPT can produce different tones.

# Expanding

One should use this functionality in a responsible way.

Example:

```
prompt = `
You are a customer service AI assistant.
Your task is to send an email reply to a valued customer.
Given the customer email delimited by ''', \
Generate a reply to thank the customer for their review.
If the sentiment is positive or neutral, thank them for \
their review.
If the sentiment is negative, apologize and suggest that \
they can reach out to customer service.
Make sure to use specific details from the review.
Write in a concise and professional tone.
Sign the email as 'AI customer agent'.
Customer review: '''${review}'''
Review sentiment: ${sentiment}
`
```

Prompt engineering is a crucial skill for developers working with AI models. By following the guidelines instructed in the course, we developers can create effective and efficient prompts that lead to accurate and reliable outputs. It's important to remember that prompt engineering is an iterative process, and that prompts should be continuously updated and refined over time. With these principles in mind, developers can create AI models that provide meaningful and valuable solutions to a wide range of problems.

Hope this blog saves some of your time and help you better prompting!
