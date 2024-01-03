import { Component, OnInit } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../environment/environment.development';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isSidebarOpen = false;
  userName: string | null = null;
  userId: string | null = null;
  showCouponDetailsFlag = false;
 
  supabase: SupabaseClient;
  loggedFirstName: string | null | undefined;
 
 
  constructor(private auth: SupabaseService, private router: Router) {
    const env = environment;
    this.supabase = createClient(env.supabase.url, env.supabase.key);
  }
 
  ngOnInit() {
    this.loadUserDetails();
    const storedFirstName = localStorage.getItem('tenantName');
    const storedName = localStorage.getItem('firstName');
 
    // Set the value to loggedInUserName if it exists
    if(storedName)
    {
      this.loggedFirstName = storedName;
    }
    if (storedFirstName) {
      this.loggedInUserName = storedFirstName;
    }
  }
 
  async loadUserDetails() {
    const userDetails = await this.auth.getUserDetails();
    if (userDetails) {
      this.userId = this.auth.extractUserId(userDetails);
    }
  }
 
  showCouponDetails() {
    this.showCouponDetailsFlag = true;
  }
 
  loggedInUserName: string = '';
 
  logOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
    Swal.fire({
      icon: 'success',
      title: 'Logout Successful!',
      text: 'User Logout successful',
    });
  }
 
  department = localStorage.getItem('department')
}