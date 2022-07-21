import { Pipe, PipeTransform } from '@angular/core';
import { validFilters } from 'src/app/filters/filter.actions';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'todoFilter'
})
export class FilterPipePipe implements PipeTransform {

  transform(todos: Todo[], filter: validFilters) {
    //Depending on the filter we return a new array matching the filter condition (completed status)
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);

      case 'pending':
        return todos.filter(todo => !todo.completed);

      default:
        return todos;
    };
  }

}
