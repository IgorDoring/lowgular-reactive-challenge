import {
  Component,
  computed,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { UserModel } from './model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  userService: UserService = inject(UserService);
  sortOrder: WritableSignal<string> = signal('asc');
  sortBy: WritableSignal<string> = signal('email');
  users: Signal<UserModel[]> = computed(() => {
    return this.userService.getAllUsers().sort((a: UserModel, b: UserModel) => {
      if (this.sortBy() === 'lastname') {
        return this.sortOrder() === 'asc'
          ? a.name.lastname.localeCompare(b.name.lastname)
          : b.name.lastname.localeCompare(a.name.lastname);
      }
      return this.sortOrder() === 'asc'
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    });
  });

  changeOrder(order: 'asc' | 'desc') {
    this.sortOrder.set(order);
  }

  changeField(field: 'email' | 'lastname') {
    this.sortBy.set(field);
  }
}
