import { IdentityLedgerService } from './../../identity-ledger.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-auth',
  templateUrl: 'add-auth.component.html'
})

export class AddAuthComponent implements OnInit {
  id;
  form: FormGroup;
  title = 'Add Memeber'
  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private service: IdentityLedgerService) { }
  // , Validators.max(43), Validators.min(41)
  ngOnInit() {
    this.buildForm();
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.id = params['id'];
    //   if (this.id != undefined) {
    //     console.log(this.id);
    //     this.title = 'Edit Memeber Data';
    //     this.getMemberDat(this.id); // Print the parameter to the console. 
    //   }
    // });
  }
  buildForm() {
    this.form = this.fb.group({

      name: [null, Validators.required],
      address: [null, Validators.required],

    });
  }

  // getMemberDat(id) {
  //   this.service.getMemberData(id).then(d => {
  //     console.log(d);
  //     this.form.setValue({
  //       name: d.name, address: d.address

  //     });

  //   })
  // }
  save() {
    const data = this.form.value;
    console.log('saved', data);

    this.service.addAuthMember(data.name, data.address)
      .then(s => {
        console.log(s);
        if (s) {
          this.router.navigate(['/members']);

        } else {
          window.alert('error in save');

        }
      }
      );
  }
}
