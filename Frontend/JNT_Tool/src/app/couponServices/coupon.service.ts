import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private _http: HttpClient, private supaService: SupabaseService) {}

  async addCoupon(data: any): Promise<Observable<any>> {
    try {
      const userDetails = await this.supaService.getUserDetails();
      const supabaseUserId = userDetails?.id;

      if (supabaseUserId) {
        data.SupabaseUserId = supabaseUserId;
        const response = await this._http.post('http://165.22.223.179:8080/api/Coupon/Create', data).toPromise();
        return new Observable(observer => {
          observer.next(response);
          observer.complete();
        });
      } else {
        throw new Error('Error adding coupon: User details not available');
      }
    } catch (error) {
      console.error('Error adding coupon:', error);
      throw error; 
    }
  }

  updateCoupon(data: any): Observable<any> {
    return this._http.put(`http://165.22.223.179:8080/api/Coupon/Update`, data);
  }

  getCouponsListForUser(pageSize: number, pageIndex: number): Observable<any> { 
    return new Observable(observer => {
      this.supaService.getUserDetails().then(userDetails => {
        const supabaseUserId = userDetails?.id;
  
        if (supabaseUserId) {
          const url = `http://165.22.223.179:8080/api/Coupon/${supabaseUserId}?pageSize=${pageSize}&pageIndex=${pageIndex}`;
          this._http.get(url).subscribe(response => {
            observer.next(response);
            observer.complete();
          });
        } else {
          observer.error('Error getting coupons: User details not available');
        }
      }).catch(error => {
        console.error('Error getting coupons:', error);
        observer.error(error);
      });
    });
  }
  
  GetCouponById(id: number): Observable<any> {
    return this._http.get(`http://165.22.223.179:8080/api/Coupon/GetBy/${id}`);
  }

  deleteCoupons(id: number): Observable<any> {
    return this._http.delete(`http://165.22.223.179:8080/api/Coupon/Delete/${id}`);
  }
}
