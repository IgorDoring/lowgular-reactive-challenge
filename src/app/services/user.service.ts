import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserModel } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private users: Signal<UserModel[]> = toSignal(
    this.http.get<UserModel[]>('https://fakestoreapi.com/users'),
    {
      initialValue: [],
    }
  );

  getAllUsers(){
    return this.users()
  }
}
