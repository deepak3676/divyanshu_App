import { Injectable } from '@angular/core';
import { AuthChangeEvent, SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from './environment/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private userIdCounter: number = 0;
  private supabaseIDKey = 'supabaseID';
  private supabase_client!: SupabaseClient;
  private authState$: Subject<AuthChangeEvent | null> = new Subject<AuthChangeEvent | null>();

  constructor() {
    this.supabase_client = createClient(environment.supabase.url, environment.supabase.key);

    this.supabase_client.auth.onAuthStateChange((event) => {
      this.authState$.next(event);
    });
  }


  // async signUpAndInsertUserData(name: string, email: string, password: string) {
  //   try {
  //     // Check if the email is already registered
  //     const { data: existingUser } = await this.supabase_client
  //       .from('CMS')
  //       .select('id')
  //       .eq('email', email);
  
  //     if (existingUser && existingUser.length > 0) {       
  //       throw { message: 'Email is already registered' };
  //     }

  //     // Register the user
  //     this.userIdCounter++;
  //     const signUpResponse = await this.supabase_client.auth.signUp({ email, password });
  
  //     if (signUpResponse.error) {
  //       console.error('Error signing up:', signUpResponse.error.message);
  //       throw signUpResponse.error;
  //     }
  
  //     // Insert user data into CMS table
  //     const { error } = await this.supabase_client
  //       .from('CMS')
  //       .upsert([
  //         {
  //           id: this.userIdCounter,
  //           name,
  //           email,
  //           password,
  //         }
  //       ]);
  
  //     if (error) {
  //       console.error('Error inserting user data into CMS table:', error.message);
  //       throw error;
  //     }
  
  //     return signUpResponse;
  //   } catch (error) {
  //     console.error('Error during registration and data insertion:', (error as Error).message);
  //     throw error;
  //   }
  // }
  


  // Extract user ID
  extractUserId(user?: User | null): string | null {
    return user?.id ?? null;
  }
  //Extract Email
  extractemail(user?: User | null): string | null {
    return user?.email ?? null;
  }

  // Login
  signIn(email: string, password: string) {
    return this.supabase_client.auth.signInWithPassword({ email, password });
  }


async getUserDetails(): Promise<User | null> {
  try {
    const { data, error } = await this.supabase_client.auth.getUser();
    if (error) {
      console.error('Error fetching user details:', error.message);
      return null;
    }

    if (data) {
      return data.user as User;
    }

    return null;
  } catch (error) {
    console.error('Error fetching user details:', (error as Error).message);
    return null;
  }
}


  setSupabaseID(supabaseID: string): void { 
    localStorage.setItem(this.supabaseIDKey, supabaseID);
  }
  getSupabaseID(): string | null {
    return localStorage.getItem(this.supabaseIDKey);
  }
  clearSupabaseID(): void {
    localStorage.removeItem(this.supabaseIDKey);
  }
  signOut() {
    return this.supabase_client.auth.signOut();
  }
}
