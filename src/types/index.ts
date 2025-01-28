export interface BaseNode {
    id: string;
    type: string;
    execute: () => Promise<any>;
} 

export interface WorkflowContext {
    input: any;
    output: any;
    metadata: Record<string, any>;
}