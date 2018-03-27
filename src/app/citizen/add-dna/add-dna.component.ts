import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-dna',
  templateUrl: 'add-dna.component.html'
})

export class AddDNAComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() { this.buildForm(); }
  buildForm() {
    this.form = this.fb.group({
      id: 0,
      _id: [null, Validators.required],
      fullName: null,
      contractAddress: [null, Validators.required],
      forensicAddress: [null, Validators.required],
      forensicDate: null,
      dnaPrint: [null, Validators.required],

    });
  }
  save() {
    console.log('saved')
  }
}
