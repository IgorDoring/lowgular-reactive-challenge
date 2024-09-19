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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  userService: UserService = inject(UserService);
  sortOrder: WritableSignal<string> = signal('asc');
  sortBy: WritableSignal<string> = signal('email');
  users: Signal<UserModel[]> = computed(() => {
    return this.userService
      .getAllUsers()
      .sort((a: UserModel, b: UserModel) => {
        if (this.sortBy() === 'lastname') {
          return this.sortOrder() === 'asc'
            ? a.name.lastname.localeCompare(b.name.lastname)
            : b.name.lastname.localeCompare(a.name.lastname);
        }
        return this.sortOrder() === 'asc'
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      })
      .filter((user) => {
        if (this.search() !== '') {
          if (this.sortBy() === 'email') {
            return user.email.includes(this.search());
          }
          if (this.sortBy() === 'lastname') {
            return user.name.lastname.includes(this.search());
          }
        }
        return true
      });
  });
  selectedUser: WritableSignal<UserModel | undefined> = signal(undefined);
  search: WritableSignal<string> = signal('')

  showDetails(user: UserModel) {
    this.selectedUser.set(user);
  }

  hideDetails() {
    this.selectedUser.set(undefined);
  }

  changeOrder(order: 'asc' | 'desc') {
    this.sortOrder.set(order);
  }

  changeField(field: 'email' | 'lastname') {
    this.sortBy.set(field);
  }
}
