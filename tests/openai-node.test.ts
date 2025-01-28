import { OpenAINode } from '../src/nodes/openai-node';
import { expect } from 'chai';

describe('OpenAINode', () => {
    let openaiNode: OpenAINode;

    beforeEach(() => {
        openaiNode = new OpenAINode('test-node', process.env.OPENAI_API_KEY!);
    });

    it('should execute and return a response', async () => {
        const result = await openaiNode.execute('Hello, how are you?');
        expect(result).to.have.property('content');
    });

    it('should throw error with invalid API key', async () => {
        const invalidNode = new OpenAINode('test-node', 'invalid-key');
        try {
            await invalidNode.execute('Hello');
            expect.fail('Should have thrown an error');
        } catch (error) {
            expect(error).to.be.an('error');
        }
    });
});