import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loggedInUserName: string | null = null;
  supabase = createClient(
    'https://lqviihvmwdkabqlpecxh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdmlpaHZtd2RrYWJxbHBlY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzMzgxNDAsImV4cCI6MjAxNDkxNDE0MH0.970stIqUsgdhPxejzbb-6R39pDOAx3J4rIGWz_c6ZAM'
  );
  constructor(private router: Router, private snackBar: MatSnackBar) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
 
 
  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const { data, error } = await this.supabase.auth.signInWithPassword({
          email: this.loginForm.value.email as string,
          password: this.loginForm.value.password as string,
        });
 
        if (error) {
          console.error('Login error:', error);
 
          // Check for specific error scenarios
          if (error.message === 'Invalid login credentials') {
            // Show SweetAlert2 error notification for invalid login credentials
            Swal.fire({
              icon: 'error',
              title: 'Invalid Login',
              text: 'Please check your email and password and try again.',
            });
          } else if (error.message === 'Email not confirmed') {
            // Show SweetAlert2 error notification for unconfirmed email
            Swal.fire({
              icon: 'error',
              title: 'Email not confirmed',
              text: 'Please confirm your email before logging in.',
            });
          } else {
            // Show SweetAlert2 error notification for other login errors
            Swal.fire({
              icon: 'error',
              title: 'Login error',
              text: 'An unexpected error occurred. Please try again later.',
            });
          }
 
          return;
        } else if (data) {
          const { data: userData, error: fetchError } = await this.supabase
            .from('usertable')
            .select('id, tenantName, firstName, userId, department')
            .eq('email', email)
            .single();
 
          if (fetchError) {
            console.error('Fetch user data error:', fetchError);
            return;
          } else if (userData) {
            const { id, tenantName, firstName, userId, department } = userData;
 
            // Store the user details in local storage
            localStorage.setItem('id', id);
            localStorage.setItem('tenantName', tenantName);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('userId', userId);
            localStorage.setItem('department', department);
            this.loggedInUserName = tenantName;
            console.log(this.loggedInUserName);
            localStorage.setItem('token', '6767676767');
 
            // Show SweetAlert2 success notification for valid login
            this.snackBar.open('Login Successful', '', { duration: 3000, horizontalPosition: 'right', panelClass: ["success-snackbar"] });
            // Redirect to a different route or perform other actions upon successful login
            this.router.navigate(['/mainpage'], { queryParams: { id: id } });
          }
        }
      } catch (error) {
        // Show SweetAlert2 error notification for unexpected error
        Swal.fire({
          icon: 'error',
          title: 'Unexpected error',
          text: 'Please try again later.',
        });
 
        console.error('Unexpected error:', error);
      }
    }
  }
 
}
 