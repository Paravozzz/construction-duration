import { ObjectRecord } from "../type/object-record";
import { DurationCalculator } from "./duration-calculator";

export abstract class AbstractDurationCalculator implements DurationCalculator {
    
    protected objectRecord: ObjectRecord;

    constructor(objectRecord: ObjectRecord){
        this.objectRecord = objectRecord;
    }
    
    abstract calculate(): void;
}