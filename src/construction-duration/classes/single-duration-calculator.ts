import { AbstractDurationCalculator } from "./abstract-duration-calculator";

export class SingleDurationCalculator extends AbstractDurationCalculator {
    
    /**
     * Ррасчётная продолжительность строительства, мес.
     */
    duration: number = 0;
    duration_formula:string = '';
    method: 'Интерполяции' | 'Экстраполяции' | '' = '';
    power_behavior: 'Увеличение' | 'Уменьшение' | ''  = '';
    /**
     * Увеличение или уменьшение мощности при экстраполяции, %
     */
    power: number = 0;
    power_formula:string = '';
    /**
     * Увеличение или уменьшение нормы продолжительности строительства при экстраполяции, %
     */
    duration_norm: number = 0;
    duration_norm_formula:string = '';
    /**
     * Продолжительность строительства на единицу прироста мощности, мес
     */
    duration_by_power_unit: number = 0;
    duration_by_power_unit_formula: string = '';
    /**
     * Прирост мощности
     */
    power_gane: number = 0;
    power_gane_formula: string = '';

    get text(): string {
        let text:string[] = [];
        text.push(`Продолжительность строительства определена методом ${this.method.toLowerCase()}.`);
        if (this.method === 'Экстраполяции'){
            text.push(`${this.power_behavior} мощности составит:`);
            text.push(`${this.power_formula} = ${this.power}%.`);
            text.push(`${this.power_behavior} нормы продолжительности строительства составит:`);
            text.push(`${this.duration_norm_formula} = ${this.duration_norm}%,`);
            text.push('где: 0,3 -  коэффициент, показывающий, что на каждый процент изменения характеристики строящегося объекта продолжительность строительства изменяется на 0,3%.');
        } else {
            text.push(`Продолжительность строительства на единицу прироста мощности составляет:`);
            text.push(`${this.duration_by_power_unit_formula}=${this.duration_by_power_unit} мес.`);
            text.push(`Прирост мощности составляет:`);
            text.push(`${this.power_gane_formula}=${this.power_gane}${this.objectRecord.unit}`);
        }
        text.push(`Продолжительность строительства с учетом ${this.method.toLowerCase()} будет равна:`);
        text.push(`${this.duration_formula}=${this.duration} мес.`)
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
        let val_I:number | undefined;
        let val_next:number | undefined;
        let dur_I:number | undefined;
        let dur_next:number | undefined;
        let extrapolation_value: number = 0;
        
        //выбираем тип расчёта - интерполяция или экстраполяция
        if (this.objectRecord.value < this.objectRecord.values[0]) {
            this.method = 'Экстраполяции';
            extrapolation_value = Number.parseFloat(this.objectRecord.values[0]);
        } else if (this.objectRecord.value > this.objectRecord.values[this.objectRecord.values.length-1]) {
            this.method = 'Экстраполяции';
            extrapolation_value = Number.parseFloat(this.objectRecord.values[this.objectRecord.values.length-1]);
        } else {
            this.method = 'Интерполяции';
            for (let i = 0; i < this.objectRecord.values.length - 1; i++) {
                val_I = Number.parseFloat(this.objectRecord.values[i]);
                val_next = Number.parseFloat(this.objectRecord.values[i+1]);
                if (val >= val_I && val < val_next) {
                    dur_I = this.objectRecord.duration[i][0];
                    dur_next = this.objectRecord.duration[i+1][0];
                    break;
                }
                val_I = undefined;
                val_next = undefined;
            }
        }
        if (this.method === 'Экстраполяции') {
            //Увеличение/уменьшение мощности составит:
            this.power_formula = `((${val}-${extrapolation_value})/${extrapolation_value})×100`;
            this.power = this.power_extrapolation(val, extrapolation_value);
            if (this.power >= 0) {
                this.power_behavior = 'Увеличение';
            } else {
                this.power_behavior = 'Уменьшение';
            }
            //Увеличение/уменьшение нормы продолжительности строительства составит:
            this.duration_norm_formula = `${Math.abs(this.power)}×0,3`;
            this.duration_norm = this.power * 0.3;
            //Продолжительность строительства с учетом экстраполяции составляет:
            this.duration_formula=`Т=${extrapolation_value}×((100${this.duration_norm>=0?'+':''}${this.duration_norm}) /100)`;
            this.duration = extrapolation_value*((100.0+this.duration_norm) /100.0);
        } else if (this.method === 'Интерполяции') {
            if (!val_I || !val_next)
                throw new Error('Значения для интерполяции не найдены!');
        
            if (!dur_I || !dur_next)
                throw new Error('Значения продолжительностей строительства для интерполяции не найдены!');
            
            //Продолжительность строительства на единицу прироста мощности составляет:
            this.duration_by_power_unit_formula = `${Math.abs(dur_next)}-${Math.abs(dur_I)}/${Math.abs(val_next)}-${Math.abs(val_I)})`;
            this.duration_by_power_unit = Math.abs(dur_next - dur_I) / Math.abs(val_next - val_I);
            //Прирост мощности составляет:
            this.power_gane_formula = `${val}-${val_I}`;
            this.power_gane = val-val_I;
            //Продолжительность строительства с учетом интерполяции составляет:
            this.duration_formula=`Т=${this.duration_by_power_unit}×${this.power_gane}+${dur_I}`;
            this.duration=this.duration_by_power_unit*this.power_gane+dur_I;
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
