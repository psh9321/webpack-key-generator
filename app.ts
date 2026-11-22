import "./css/index.css"
import { GeneratorModule } from "./modules/generator"
import { LanguageModule } from "./modules/language";

class KeyGeneratorApp {
    constructor() {
        new GeneratorModule();
        new LanguageModule();
    }    
}

export default new KeyGeneratorApp()