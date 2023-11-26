import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useState} from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [question, setQuestion] = useState('')
    async function createPrompts() {
    await fetch('https://jamsapi.hackclub.dev/openai/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        //NOT needed with GET request
        body: JSON.stringify(
            {
                'model': 'gpt-3.5-turbo',
                'messages': [
                    {
                        'role': 'user',
                        'content': `You are a part of a language learning application. Generate a short, easy French sentence for a beginner to answer. Return this in the format of: question: The French sentence, answer: The meaning of the sentence in English`
                    }
                ],
            }
        )
    })
        .then(result => result.json())
        .then(response => response.map((response: string) => response.replace('response: ', '')))
        .then(question => setQuestion(question))
    }

  return (
   <div>
     <h1>hello!</h1>
       <p>{question}</p>
       <button onClick={() => createPrompts()}>Generate a question!</button>
   </div>
  )
}
