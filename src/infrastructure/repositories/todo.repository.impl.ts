import { CreateTodoDto, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";
import { TodoDatasource } from '../../domain/datasources/todo.datasource';


export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDatasource
    ){}

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto);
    }

    getall(): Promise<TodoEntity[]> {
        return this.datasource.getall();
    }

    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id);
    }

    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateById(updateTodoDto);
    }

    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id);
    }

}