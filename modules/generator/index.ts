import { GeneratorController } from "./Controller";
import { GeneratorModel } from "./model";
import { GeneratorView } from "./View";


export class GeneratorModule {

    constructor() {

        const model = new GeneratorModel();
        const view = new GeneratorView();

        new GeneratorController(view, model);
    }
}