import {Block} from "../../../Blocks/block";
import '../../../Styles/Slide.scss'


export const CanvasBlockDeleteConfirmation:React.FC<{block: Block, onConfirm: () => void, onClose: () => void}> = ({block, onConfirm, onClose}) => {
    return (
        <>
            <div className="modal-header">Delete confirmation</div>
            <div className="modal-content">
                Do you confirm the deletion of the block : <b>{block.id} | {block.displayName}</b>
            </div>
            <div className="modal-footer">
                <button onClick={onConfirm}>Confirm Deletion</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </>
    )
}