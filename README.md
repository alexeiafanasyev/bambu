# bambu
Bambu test assignments

Requests for server part:

POST requests:

1) "api/users"

req.body:

{ "name": "", "questions": ['List of questions IDs'] }


2) "api/questions"

req.body:

{ "title": "", "answers": ['List of answers IDs'] }


3) "api/answers"

req.body:

{ "text": "", "score": "" }

4) "api/user/setstatus/:id"

:id - User ID

req.body:

[

{ "question": "Question ID", "answer": "Answer from UI" },

{ "question": "Question ID", "answer": "Answer from UI" }

]

5) "api/user/getstatus/:id"

:id - User ID
