import { OpenAI } from 'openai';
import Configuration from 'openai';
import { SUPPORTED_LANGUAGES } from '../constants';
import { type FromLanguage, type Language } from '../types.d';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const configuration = new Configuration({ apiKey });
const openai = new OpenAI(configuration)

export async function translate({ 
    fromLanguage,
    toLanguage,
    text 
}: {
    fromLanguage: FromLanguage
    toLanguage: Language
    text: string
}) {
    const messages = [
        {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: 'you are an AI that translates text. You recieve a text from the user. Do not answare, just translate the text. The original language is surrounded by `{{` and `}}`. You can also recieve {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`.'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'Hola mundo {{Spanish}} [[English]]'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Hello world'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'How are you {{auto}} [[Deutsch]]'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Wie gehts?'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'Bonjour, comment ça va? {{auto}} [[Spanish]]'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Buen día, ¿Cómo estás?'
        }
    ]
    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    const compleition = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            ... messages,
            role: ChantCompletionRequestMessageRoleEnum.User,
            content: `${text} {{${fromCode}}} [[$toCode]]`
        ]
    })

    return compleition.data.choices[0]?.message?.content
}