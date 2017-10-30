import { observable, action } from 'mobx';
import { fromMobx } from '../src/from-mobx';

class Todo {
  constructor(public todo: string) {}
}

class TodosStore {
  @observable todos: Todo[] = [new Todo('One')];
  
  @action addTodo(todo: Todo) {
    this.todos = [...this.todos, todo];
  }
}

describe('fromMobx', () => {
   let todosStore;

   beforeEach(() => {
     todosStore = new TodosStore();
   });

   it('should push the initial value', () => {
      fromMobx(() => todosStore.todos).subscribe(todos => {
         expect(todos.length).toEqual(1);
      });
   });

   it('should push the value on changes', () => {
      todosStore.addTodo('Two');
      fromMobx(() => todosStore.todos).subscribe(todos => {
        expect(todos.length).toEqual(2);
      });
   });

   it('should dispose on unsubscribe', () => {
      const spy = jest.fn();
      const sub = fromMobx(() => todosStore.todos).subscribe(spy);
      sub.unsubscribe();
      todosStore.addTodo('Two');
      expect(spy).toHaveBeenCalledTimes(1);
   });
   

});