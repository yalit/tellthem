import DataProviderInterface from "./DataProviderInterface";
import {createTemplateData, TemplateData} from "../Helpers/TemplateData";
import {Block} from "../libraries/Blockify/models/block";

const templates: TemplateData[] = [
    createTemplateData({name: 'Simple Text', description: "A simple Text template", blocks: [new Block()]})
]

class TemplateLocalProvider implements DataProviderInterface {

    get(itemId: string): TemplateData | undefined {
        const template = templates.filter(t => t.id === itemId)
        if (template.length > 0) return template[0]
        return undefined
    }

    all(): TemplateData[] {
        return templates;
    }
}

export default TemplateLocalProvider