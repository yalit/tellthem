import {Block, BlockData} from "../../../../Blocks/block";

export interface EditorProps {
    block: Block,
    onChange: (id: string, data: Partial<BlockData>) => void,
    onOpenSection: (sectionStatus: {[key: string]: boolean}) => void,
    sections: {[key: string]: boolean}
}