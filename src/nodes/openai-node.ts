import { BaseNode } from '../types';
import { Configuration, OpenAIApi } from 'openai';

export class OpenAINode implements BaseNode {
    id: string;
    type: string = 'openai';
    private openai: OpenAIApi;

    constructor(id: string, apiKey: string) {
        this.id = id;
        const configuration = new Configuration({ apiKey });
        this.openai = new OpenAIApi(configuration);
    }

    async execute(input: string): Promise<any> {
        try {
            const completion = await this.openai.createChatCompletion({
                model: "gpt-4",
                messages: [{ role: "user", content: input }]
            });
            return completion.data.choices[0].message;
        } catch (error) {
            throw new Error(`OpenAI node execution failed: ${error}`);
        }
    }
}