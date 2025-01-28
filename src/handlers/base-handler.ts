export abstract class BaseHandler {
    abstract handle(data: any): Promise<void>;
}