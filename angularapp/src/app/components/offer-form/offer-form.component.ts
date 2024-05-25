import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {


  @Input() offer: any;
  @Output() submitForm = new EventEmitter<any>();
  offerForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.offerForm = this.fb.group({
      offerId: [this.offer?.offerId || - 1],
      type: [this.offer?.type || '', Validators.required],
      access: [this.offer?.access || 0, [Validators.required, Validators.min(1)]],
      price: [this.offer?.price || 0, [Validators.required, Validators.min(0)]],
      description: [this.offer?.description || '', Validators.required]
    });
  }

  onSubmit() {
    if (this.offerForm.valid) {
      this.submitForm.emit(this.offerForm.value);
    }
  }
}


