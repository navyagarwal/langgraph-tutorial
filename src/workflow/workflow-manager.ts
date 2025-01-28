import { BaseNode, WorkflowContext } from '../types';
import { BaseHandler } from '../handlers/base-handler';

export class WorkflowManager {
private nodes: Map<string, BaseNode> = new Map();
private handlers: BaseHandler[] = [];

addNode(node: BaseNode): void {
    this.nodes.set(node.id, node);
}

addHandler(handler: BaseHandler): void {
    this.handlers.push(handler);
}

async executeNode(nodeId: string, context: WorkflowContext): Promise<any> {
    const node = this.nodes.get(nodeId);
    if (!node) throw new Error(`Node ${nodeId} not found`);

    try {
        const result = await node.execute();
        await this.notifyHandlers({
            action: `${node.type}_execution`,
            payload: {
                nodeId,
                input: context.input,
                output: result,
                metadata: context.metadata
            }
        });
        return result;
    } catch (error) {
        await this.notifyHandlers({
            action: `${node.type}_error`,
            payload: {
                nodeId,
                error: error.message,
                metadata: context.metadata
            }
        });
        throw error;
    }
}

private async notifyHandlers(data: any): Promise<void> {
        await Promise.all(this.handlers.map(handler => handler.handle(data)));
    }
}