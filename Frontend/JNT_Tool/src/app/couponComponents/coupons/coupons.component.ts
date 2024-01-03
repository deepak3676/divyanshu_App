import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CouponsModel } from 'src/app/models/couponModels';
import { AddComponent } from '../add/add.component';
import { CouponService } from 'src/app/couponServices/coupon.service';
import { EditComponent } from '../edit/edit.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  showDeleteConfirmation = false;
  couponIdToDelete!: number;

  displayedColumns: string[] = ['couponCode', 'couponName', 'description', 'discount', 'startDate',
    'endDate', 'discountType', 'actions'];

  dataSource!: MatTableDataSource<CouponsModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageIndex = 0;
  totalItems = 0;
  constructor(
    private _dialog: MatDialog,
    private _couponService: CouponService,

  ) { }

  ngOnInit(): void {
    this.getCouponsList();
  }

  deleteCoupons(id: number) {
    // Use SweetAlert for confirmation
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms, proceed with deletion
        this.confirmDelete(id);
      }
    });
  }

  confirmDelete(id: number) {
    this._couponService.deleteCoupons(id).subscribe({
      next: () => {
        this.getCouponsList();
        // Check if the data source is empty, then clear the table
        if (this.dataSource.data.length === 1) {
          this.dataSource.data = [];
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        // Show success message using SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Delete Successful!',
          text: 'Coupon deleted successfully.',
        });
      },
      error: (error) => {
        console.log('Error deleting coupon:', error);
        // Show error message using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while deleting the coupon.',
        });
      },
    });
  }
  cancelDelete() {
    this.showDeleteConfirmation = false;
  }

  openAddForm() {
    const dialogRef = this._dialog.open(AddComponent);

    dialogRef.afterClosed().subscribe(async (val: CouponsModel) => {
      if (val) {
        await this.getCouponsList();
      }
    });
  }

  async getCouponsList() {
    try {
      const response = await this._couponService.getCouponsListForUser(this.pageSize, this.pageIndex + 1);
      response.subscribe({
        next: (res) => {
          this.totalItems = res.totalItems;
          this.dataSource = new MatTableDataSource(res as CouponsModel[]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          console.log('Error getting coupons:', error);
        },
      });
    } catch (error) {
      console.error('Error getting coupons:', error);
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getCouponsList();
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openEditForm(project: any): void {
    const dialogRef = this._dialog.open(EditComponent, {
      width: '600px',
      data: {
        data: project,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getCouponsList();
    });
  }


  breakWords(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      const words = text.split(' ');
      let currentLength = 0;
      let result = '';

      for (const word of words) {
        currentLength += word.length + 1;
        if (currentLength > maxLength) {
          result += '\n' + word + ' ';
          currentLength = word.length + 1;
        } else {
          result += word + ' ';
        }
      }
      // Remove trailing space
      return result.trim();
    } else {
      return text;
    }
  }
}

