import { ProductNoteDetail } from './product-note-detail';
export interface Note {
  noteId: number;
  receivedBy: string;
  deliveredTo: string;
  created:Date;
  date:Date;
  observation: string;
  noteType: string;
  total: number;
  productNoteDetails:ProductNoteDetail[];
}
