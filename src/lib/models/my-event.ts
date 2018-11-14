import { MyEmitter } from "./my-emitter";

export interface MyEvent {
    name: string;
    emitter: MyEmitter;
}
