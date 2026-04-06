import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular_signal');
  protected readonly count = signal(0);
  protected readonly doubleCount = computed(() => this.count() * 2);
  protected readonly todos = signal([
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
  ]);
  protected readonly content = signal('');
  remaining = computed(() => this.todos().filter((todo) => !todo.completed).length);
  totalTodos = computed(() => this.todos().length);
  increment() {
    this.count.update((value) => value + 1);
  }
  decrease() {
    this.count.update((value) => value - 1);
  }
  reset() {
    this.count.set(0);
  }
  addTodo() {
    this.todos.update((value) => [
      ...value,
      { id: this.todos().length + 1, title: `Todo ${this.todos().length + 1}`, completed: false },
    ]);
  }
  deleteTodo(id: number) {
    this.todos.update((value) => value.filter((todo) => todo.id !== id));
  }
  constructor() {
    effect(() => {
      const text = this.content();
      if (text.length > 0) {
        localStorage.setItem('content', text);
      }
    });
  }
}
