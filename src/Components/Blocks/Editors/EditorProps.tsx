import {Block, BlockData} from "../block";

export interface EditorProps {
    block: Block,
    onChange: (id: string, data: Partial<BlockData>) => void
}