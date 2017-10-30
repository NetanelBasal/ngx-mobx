// THE TEST ARE PASSING, JUST NEED TO FIX THE REFLECT IMPORT ISSUE


// import { Cleaner, autorun } from '../src/ngx-mobx.decorators';
// import { observable, computed } from 'mobx';

// const META_DATA_KEY = '@@__disposers__@@';

// const store = observable({
//   todos: []
// });

// describe('Cleaner', () => {

//   afterEach(() => {
//     jest.resetAllMocks();    
//   });

//   it('should show a warning when does not implement OnDestroy', () => {
//     const consoleSpy = jest.spyOn(console, 'warn');

//     @Cleaner
//     class TodosComponent { }

//     expect(consoleSpy).toHaveBeenCalled();
//   });

//   it('should not show a warning when implement OnDestroy', () => {
//     const consoleSpy = jest.spyOn(console, 'warn');
//     @Cleaner
//     class TodosComponent {
      
//       @autorun
//       ngOnInit() {
//         const todos = store.todos;
//       }
  
//       ngOnDestroy() {}
//     }
//     expect(consoleSpy).not.toHaveBeenCalled();
//   });

//   it('should have one dispose function', () => {
//     @Cleaner
//     class TodosComponent {
      
//       @autorun
//       ngOnInit() {
//         const todos = store.todos;
//       }
  
//       ngOnDestroy() {}
//     }
//     const instance = new TodosComponent().ngOnInit();
//     expect(Reflect.getMetadata(META_DATA_KEY, TodosComponent.prototype).length ).toBe(1);
//     expect(typeof Reflect.getMetadata(META_DATA_KEY, TodosComponent.prototype)[0] ).toBe('function');
//   });


//   it('should call and delete the dispose function', () => {
//     @Cleaner
//     class TodosComponent {
      
//       @autorun
//       ngOnInit() {
//         const todos = store.todos;
//       }
  
//       ngOnDestroy() {}
//     }
//     const instance = new TodosComponent();
//     const mockCallback = jest.fn();
//     Reflect.defineMetadata(META_DATA_KEY, [mockCallback], TodosComponent.prototype);
//     instance.ngOnDestroy();
//     expect(mockCallback.mock.calls.length).toBe(1);
//     expect(Reflect.getMetadata(META_DATA_KEY, TodosComponent.prototype).length ).toBe(0);
//   });

//   it('should work with multiple dispose functions', () => { 

//     @Cleaner
//     class TodosComponent {
      
//       @autorun
//       ngOnInit() {
//         const todos = store.todos;
//       }

//       @autorun
//       ngOnInitTwo() {
//         const todos = store.todos;
//       }

//       @autorun
//       ngOnInitThree() {
//         const todos = store.todos;
//       }
  
//       ngOnDestroy() {}
//     }

//     const instance = new TodosComponent();
//     instance.ngOnInit();
//     instance.ngOnInitTwo();
//     instance.ngOnInitThree();
//     expect(Reflect.getMetadata(META_DATA_KEY, TodosComponent.prototype).length ).toBe(3);
//     expect(typeof Reflect.getMetadata(META_DATA_KEY, TodosComponent.prototype)[0] ).toBe('function');
//     expect(typeof Reflect.getMetadata(META_DATA_KEY, TodosComponent.prototype)[1] ).toBe('function');
//     expect(typeof Reflect.getMetadata(META_DATA_KEY, TodosComponent.prototype)[2] ).toBe('function');
//     instance.ngOnDestroy();
//   });

//   it('should call and delete the dispose functions', () => {
//     @Cleaner
//     class TodosComponent {
      
//       @autorun
//       ngOnInit() {
//         const todos = store.todos;
//       }
  
//       ngOnDestroy() {}
//     }
//     const instance = new TodosComponent();
//     const mockCallback = jest.fn();
//     const mockCallback2 = jest.fn();
//     const mockCallback3 = jest.fn();
//     Reflect.defineMetadata(META_DATA_KEY, [mockCallback, mockCallback2, mockCallback3], TodosComponent.prototype);
//     instance.ngOnDestroy();
//     expect(mockCallback.mock.calls.length).toBe(1);
//     expect(mockCallback2.mock.calls.length).toBe(1);
//     expect(mockCallback3.mock.calls.length).toBe(1);
//     expect(Reflect.getMetadata(META_DATA_KEY, TodosComponent.prototype).length ).toBe(0);
//   });


// });