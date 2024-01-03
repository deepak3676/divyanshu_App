import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { CouponService } from 'src/app/couponServices/coupon.service';
import { CouponsModel } from 'src/app/models/couponModels';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  updateForm: FormGroup;
  submitted = false;
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    private fb: FormBuilder,
    private _router: Router,
    private serve: CouponService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateForm = this.fb.group({
      id: [0],
      couponCode: ['string'],
      couponName: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      discount: ['', [Validators.required, Validators.min(0), Validators.max(1000000)]],
      quantity: ['', [Validators.required, Validators.min(1), Validators.max(100000)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      discountType: ['', [Validators.required]],
      supabaseUserId: ['', [Validators.required]],
    }, {
      validators: [this.dateValidator.bind(this), this.maxDiscountValidator.bind(this)]
    });
  }
  ngOnInit() {
    this.populateForm();
     // Subscribe to router events
     this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // The navigation has ended, so reset the flag
        this.dialogRef.close(true);
      }
    });
  }

  // Fetch coupon details by ID and populate the form with the data
  populateForm() {
    this.serve.GetCouponById(this.data.data.id).subscribe((result: CouponsModel) => {
      this.updateForm.patchValue({
        id: result.id,
        couponCode: result.couponCode,
        couponName: result.couponName,
        description: result.description,
        discount: result.discount,
        quantity: result.quantity,
        startDate: this.formatDate(result.startDate),
        endDate: this.formatDate(result.endDate),
        discountType: result.discountType || '',
        supabaseUserId: result.supabaseUserId,
      });
    });
  }

  onUpdateClick(data1: CouponsModel) {
    this.submitted = true;
    Object.values(this.updateForm.controls).forEach(control => {
      control.markAsTouched();
    });

    if (this.updateForm.invalid) {
      return;
    }
    else {
      data1.id = this.data.data.id;
      this.serve.updateCoupon(data1).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  onCancelClick() {
    this.dialogRef.close(true);
  }

  maxDiscountValidator(form: FormGroup) {
    const discountType = form.get('discountType')?.value;
    const discountControl = form.get('discount');

    if (discountControl) {
      let maxAmount!: number;
      if (discountType === 'Percentage') {
        maxAmount = 100;
      } else if (discountType === 'Fixed Amount') {
        maxAmount = 100000;
      }
      if (discountControl.value > maxAmount) {
        discountControl.setErrors({ max: `Maximum  ${discountType} discount is ${maxAmount}` });
      } else if (discountControl.hasError('required')) {
        discountControl.setErrors({ required: 'Discount is required' });
      } else {
        discountControl.setErrors(null);
      }
    }
  }


  onDiscountTypeChange() {
    const discountControl = this.updateForm.get('discount');

    if (discountControl) {
      const currentDiscountValue = discountControl.value;
      discountControl.setErrors(null);
      if (this.updateForm.get('discountType')?.value === 'Percentage') {
        discountControl.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
      } else {
        discountControl.setValidators([Validators.required, Validators.min(0), Validators.max(100000)]);
      }

      discountControl.setValue(currentDiscountValue);
      discountControl.updateValueAndValidity();
      this.maxDiscountValidator(this.updateForm);
    }
  }

  // Helper method to format dates in 'YYYY-MM-DD' format
  private formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  dateValidator(form: FormGroup) {
    const startDateControl = form.get('startDate');
    const endDateControl = form.get('endDate');

    if (startDateControl && endDateControl) {
      const startDate = startDateControl.value;
      const endDate = endDateControl.value;

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const parsedStartDate = startDate ? new Date(startDate) : null;
      const parsedEndDate = endDate ? new Date(endDate) : null;

      if (!parsedStartDate) {
        startDateControl.setErrors({ required: 'Start date is required.' });
      } else {
        if (parsedStartDate < currentDate) {
          startDateControl.setErrors({ pastDateError: 'Please choose a date from today or later.' });
        } else {
          startDateControl.setErrors(null);
        }
      }

      if (!parsedEndDate) {
        endDateControl.setErrors({ required: 'End date is required.' });
      } else {
        if (parsedStartDate && parsedEndDate < parsedStartDate) {
          endDateControl.setErrors({ dateError: 'End date must be after the start date.' });
        } else {
          endDateControl.setErrors(null);
        }
      }
    }
  }
  handleMaxLengthError(control: AbstractControl, maxLength: number): void {
    if (control?.hasError('maxlength')) {
      control.markAsTouched();
    }
  }
}
