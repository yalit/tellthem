import DataProviderInterface from "./DataProviderInterface";
import {createTemplateData, TemplateData} from "../Helpers/TemplateData";
import {SlideBlock} from "../Helpers/SlideBlock";

const templates: TemplateData[] = [
    createTemplateData({name: 'Simple Text', description: "A simple Text template", blocks: [new SlideBlock()]})
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