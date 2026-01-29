import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, CustomError, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

// const todos = [
//     {id: 1, text: 'Buy milk1 ', completedAt: new Date()},
//     {id: 2, text: 'Buy milk 2', completedAt: null},
//     {id: 3, text: 'Buy milk 3', completedAt: new Date()},
// ];

export class TodosController {

    //USANDO LOS CASOS DE USO

    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    private handleError = (res: Response, error: unknown) => {

        if(error instanceof CustomError){
            res.status(error.statusCode).json({error: error.message});
            return;
        }

        res.status(500).json({error: 'Internal server error - check logs'});

    }

    public getTodos = (req: Request, res: Response) => {
        // return res.json(todos);
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => this.handleError(res, error));
        
    }

    public getTodoById = (req: Request, res: Response) => {

        const id = +req.params.id;

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => this.handleError(res, error))


    }

    public createTodo = (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({error});

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.status(201).json(todo))
            .catch(error => this.handleError(res, error))

    }

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if(error) return res.status(400).json({error});

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => this.handleError(res, error))

    }


    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id;

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => this.handleError(res, error))
        

    }



}