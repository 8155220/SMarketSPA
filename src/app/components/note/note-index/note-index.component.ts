import { Component, OnInit } from "@angular/core";
import { SMarketService } from "../../../services/smarket.service";
import { Note } from "../../../models/note";
import { Router } from '@angular/router';

@Component({
  selector: "app-note-index",
  templateUrl: "./note-index.component.html",
  styleUrls: ["./note-index.component.css"]
})
export class NoteIndexComponent implements OnInit {
  notes: Note[] = [];
  constructor(public sMarketService: SMarketService,public router:Router) {
    
  }

  ngOnInit() {
    console.log('Here');
    
    this.sMarketService.getNotes().subscribe((e: Note[]) => {
      this.notes = e;
    });
  }

  onDelete(i: number) {
    let note:Note = this.notes[i];
    this.sMarketService.deleteNote(note.noteId).subscribe(e => {
      console.log(e);
      this.router.navigateByUrl('/notes');
      this.ngOnInit();
    });
  }

  onNew(){
    this.router.navigate(['notes/add']);
  }

  onSee(note: Note) {
    this.router.navigate(["notes/detail"], {
      queryParams: { noteId: note.noteId }
    });
  }
}
