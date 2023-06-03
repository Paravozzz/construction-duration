import { AbstractDurationCalculator } from "./abstract-duration-calculator";

export class SingleDurationCalculator extends AbstractDurationCalculator {
    
    /**
     * Ррасчётная продолжительность строительства, мес.
     */
    duration: number = 0;
    method: 'Интерполяции' | 'Экстраполяции' | '' = '';
    power_behavior: 'Увеличение' | 'Уменьшение' | ''  = '';
    /**
     * Увеличение или уменьшение мощности при экстраполяции, %
     */
    power: number = 0;
    /**
     * Увеличение или уменьшение нормы продолжительности строительства при экстраполяции, %
     */
    duration_norm: number = 0;
    extrapolation_value: number = 0;

    get text(): string {
        let text:string[] = [];
        text.push(`Продолжительность строительства определена методом ${this.method.toLowerCase()}.`);
        if (this.method === 'Экстраполяции'){
            text.push(`${this.power_behavior} мощности составит:`);
            text.push(`((${this.objectRecord.value}-${this.extrapolation_value})/${this.extrapolation_value})×100 = ${this.power}%.`);
            text.push(`${this.power_behavior} нормы продолжительности строительства составит:`);
            text.push(`${this.power}×0,3 = 0,02%,`);
            text.push('где: 0,3 -  коэффициент, показывающий, что на каждый процент изменения характеристики строящегося объекта продолжительность строительства изменяется на 0,3%.');
            text.push(`Продолжительность строительства с учетом ${this,this.method.toLowerCase()} будет равна:`);
            text.push(Т=8,5×((100+0,02) /100)=8,5 мес.)
        } else {
            
        }
        return text.join('\n');
    }

    public calculate(): void {
        if (!this.objectRecord)
            throw new Error('Object record is ' + this.objectRecord);

        if (this.objectRecord.values_type !== 'single') {
            throw new Error('Object record should has values_type \'single\', but has ' + this.objectRecord.values_type);
        }
        
        if (!this.objectRecord.value)
            throw new Error('Object record should has value, but now value is ' + this.objectRecord.value); 

        const val = Number.parseFloat(this.objectRecord.value);

        //выбираем тип расчёта - интерполяция или экстраполяция
        if (this.objectRecord.value < this.objectRecord.values[0]) {
            this.method = 'Экстраполяции';
            this.extrapolation_value = Number.parseFloat(this.objectRecord.values[0]);
        } else if (this.objectRecord.value > this.objectRecord.values[this.objectRecord.values.length-1]) {
            this.method = 'Экстраполяции';
            this.extrapolation_value = Number.parseFloat(this.objectRecord.values[this.objectRecord.values.length-1]);
        } else {
            this.method = 'Интерполяции';
            for (let i = 0; i < this.objectRecord.values.length - 1; i++)  {
            blabla
            }
        }
        if (this.method === 'Экстраполяции') {
            this.power = this.power_extrapolation(val, this.extrapolation_value);
            if (this.power > 0) {
                this.power_behavior = 'Увеличение';
            } else {
                this.power_behavior = 'Уменьшение';
            }
            this.duration_norm = this.power * 0.3;
            this.duration = this.extrapolation_value*((100.0+this.duration_norm) /100.0);
        } else if (this.method === 'Интерполяции') {
            blabla
        }
        
    }

    /**
     * Расчёт измененения мощности, %
     * @param value пользовательское значение
     * @param extrapolation_value значение, относительно которого считем увеличение\уменьшение мощности
     * @returns увеличение\уменьшение мощности в %
     */
    private power_extrapolation(value: number, extrapolation_value: number): number {
        return ( (value-extrapolation_value) / extrapolation_value ) * 100;
    }
}
