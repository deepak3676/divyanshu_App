import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { CouponService } from 'src/app/couponServices/coupon.service';
import { SupabaseService } from 'src/app/supabase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  couponForm: FormGroup;
  loading: boolean = false;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    private fb: FormBuilder,
    private serve: CouponService,
    private _supaService: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _router: Router
  ) {
    this.couponForm = this.fb.group({
      id: [0],
      couponCode: ['string'],
      couponName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      discount: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1), Validators.max(100000)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      discountType: ['', [Validators.required]],
      supabaseUserId: ['', [Validators.required]],
    }, {
      validators: [this.dateValidator.bind(this), this.maxDiscountValidator.bind(this)]
    });
  }

  async ngOnInit() {
    const userDetails = await this._supaService.getUserDetails();
    if (userDetails) {
      const userId = this._supaService.extractUserId(userDetails);
      this.couponForm.patchValue({
        supabaseUserId: userId,
      });
    }
    this.dialogRef.backdropClick().subscribe(() => {
      this.onCancelClick();
    });
    // Subscribe to router events
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // The navigation has ended, so reset the flag
        this.dialogRef.close(true);
      }
    });
  }

  async onSaveClick() {
    this.submitted = true;

    Object.values(this.couponForm.controls).forEach(control => {
      control.markAsTouched();
    });
    if (this.couponForm.invalid || (this.couponForm.get('discount')?.value ?? 0) < 0) {
      return;
    }

    try {
      const formData = this.couponForm.value;
      await this.serve.addCoupon(formData);
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Coupons added successfully',
      });
    } catch (error) {
      console.error('Error adding coupon:', error);
    } finally {
      this.dialogRef.close(this.couponForm);
      this.loading = false;

    }
  }

  maxDiscountValidator(form: FormGroup) {
    const discountType = form.get('discountType')?.value;
    const discountControl = form.get('discount');
    const quantityControl = form.get('quantity');

    if (discountControl) {
      let maxAmount!: number;

      if (discountType === 'Percentage') {
        maxAmount = 100;
      } else if (discountType === 'Fixed Amount') {
        maxAmount = 100000;
      }
      // Validate discount
      if (discountControl.value > maxAmount) {
        discountControl.setErrors({ max: `Maximum ${discountType} discount is ${maxAmount}` });
      } else if (discountControl.hasError('required')) {
        discountControl.setErrors({ required: 'Discount is required' });
      } else if (discountControl.value < 0) {
        discountControl.setErrors({ min: 'Discount cannot be less than 0' });
      } else {
        discountControl.setErrors(null);
      }
    }

    // Validate quantity
    if (quantityControl) {
      const maxQuantity = 100000;

      if (quantityControl.value > maxQuantity) {
        quantityControl.setErrors({ max: `Quantity should not exceed ${maxQuantity} units` });
      } else if (quantityControl.hasError('required')) {
        quantityControl.setErrors({ required: 'Quantity is required' });
      } else if (quantityControl.value < 0) {
        quantityControl.setErrors({ min: 'Quantity cannot be less than 0' });
      } else {
        quantityControl.setErrors(null);
      }
    }
  }

  onDiscountTypeChange() {
    const discountControl = this.couponForm.get('discount');

    if (discountControl) {
      const currentDiscountValue = discountControl.value;
      discountControl.setErrors(null);

      if (this.couponForm.get('discountType')?.value === 'Percentage') {
        discountControl.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
      } else {
        discountControl.setValidators([Validators.required, Validators.min(0), Validators.max(100000)]);
      }
      discountControl.setValue(currentDiscountValue);
      discountControl.updateValueAndValidity();
      this.maxDiscountValidator(this.couponForm);
    }
  }

  onCancelClick() {
    this.dialogRef.close(true);
  }

  isSaveButtonDisabled(): boolean {
    return this.couponForm.invalid;
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
