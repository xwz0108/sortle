// @dnd-kit drag types for Sortle
// Used by WordCard (draggable) and CategoryZone (droppable)

export const DND_ITEM_TYPE = 'WORD';

// Data attached to a dragged word
export interface DragData {
  type: typeof DND_ITEM_TYPE;
  wordId: string;
  text: string;
}
