import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-note',
  templateUrl: './seller-note.component.html',
  styleUrls: ['./seller-note.component.css']
})
export class SellerNoteComponent implements OnInit {
  @Output() submitSellerNote = new EventEmitter<{}[]>();
  @Output() submitHistoryReport = new EventEmitter<ArrayBuffer>();

  sellerNoteForm: FormGroup = this.fb.group({
    titleStatus: ['', Validators.required],
    conditions: this.fb.group({
      wearOff: [''],
      exDamage: [''],
      inDamage: [''],
      storage: [''],
      rust: [''],
      usage: [''],
      service: ['']
    }),
    warranty: [''],
    maintenance: [''],
    modifications: this.fb.array([
      this.fb.group({
        name: [''],
        originalPrice: [''],
        sellingOrKeeping: [''],
        sellingPrice: ['']
      })
    ]),
    buyReason: [''],
    sellReason: [''],
    remoteSell: [''],
    sellingPoints: this.fb.array([
      this.fb.control('')
    ]),
    extraNote: ['']
  });

  reportFileBuffer: ArrayBuffer;
  reportFileRaw: string = '';

  step = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  addModification() {
    let currentMod = this.sellerNoteForm.controls['modifications'] as FormArray;
    currentMod.push(this.fb.group(
      {
        name: [''],
        originalPrice: [''],
        sellingOrKeeping: [''],
        sellingPrice: ['']
      }
    ));
    this.sellerNoteForm.controls['modifications'] = currentMod;
  }

  deleteCurrentMod(modIndex) {
    let currentMod = this.sellerNoteForm.controls['modifications'] as FormArray;
    // not a good or safe way     
    currentMod.removeAt(modIndex);
    this.sellerNoteForm.controls['modifications'] = currentMod;
  }

  addSellingPoint() {
    let currentPoint = this.sellerNoteForm.controls['sellingPoints'] as FormArray;
    currentPoint.push(this.fb.control(''));
    this.sellerNoteForm.controls['sellingPoints'] = currentPoint;
  }

  deleteSellingPoint(index) {
    let currentPoint = this.sellerNoteForm.controls['sellingPoints'] as FormArray
    currentPoint.removeAt(index);
    this.sellerNoteForm.controls['sellingPoints'] = currentPoint;
  }

  uploadReportFile(f) {
    let files = f.target.files;
    if (files) {
      let reader = new FileReader();
      reader.onload = (f: any) => {
        // console.log(f.target.result);
        this.reportFileBuffer = f.target.result;
        this.reportFileRaw = f.target.result;
        // console.log(this.reportFileRaw);

      }
      reader.readAsArrayBuffer(files[0]);
    }
  }

  goBackStep() {}

  onSubmit() {
    // console.log(this.sellerNoteForm.value);
    // console.log(this.sellerNoteForm.controls['modifications'].value)
    this.submitSellerNote.emit(this.sellerNoteForm.value);

    if (this.reportFileBuffer !== undefined) {
      this.submitHistoryReport.emit(this.reportFileBuffer);
    }
  }

}


/**
 * 
 * 
 * 
 * 
 * 
 * 
 */