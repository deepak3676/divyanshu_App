export interface CouponsModel {
    SrNo:number;
    id: number;
    couponCode: string;
    couponName: string;
    description: string;
    discount: number;
    quantity: number;
    startDate: Date;
    endDate: Date;
    discountType: RadioNodeList;
    supabaseUserId: string;
  }
  
  