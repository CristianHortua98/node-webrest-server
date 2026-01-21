import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

// const todos = [
//     {id: 1, text: 'Buy milk1 ', completedAt: new Date()},
//     {id: 2, text: 'Buy milk 2', completedAt: null},
//     {id: 3, text: 'Buy milk 3', completedAt: new Date()},
// ];

export class TodosController {

    constructor(){}

    public getTodos = async (req: Request, res: Response) => {
        // return res.json(todos);
        const todos = await prisma.todo.findMany();

        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if(isNaN(id)) return res.status(400).json({error: `ID argument is not a number`});

        const todo = await prisma.todo.findFirst({
            where: {id}
        })

        if (!todo) {
            return res.status(404).json({
                error: `TODO with id: ${id} not found`
            });
        }

        return res.json(todo);

    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({error});

        const newLog = await prisma.todo.create({
            data: createTodoDto!
        });

        // todos.push(newTodo);

        res.json(newLog);

    }

    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if(error) return res.status(400).json({error});

        // const todo = todos.find(todo => todo.id === id);
        // if(!todo) return res.status(404).json({error: `Todo with id: ${id} not found`});

        const todo = await prisma.todo.findUnique({
            where: {id}
        })

        if (!todo) {
            return res.status(404).json({
                error: `TODO with id: ${id} not found`
            });
        }

        const todoUpdated = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values
        });

        return res.json(todoUpdated);

    }


    public deleteTodo = async (req: Request, res: Response) => {

        const id = +req.params.id;

        if(isNaN(id)) return res.status(400).json({error: `ID argument is not a number`});

        const todo = await prisma.todo.findUnique({
            where: {id}
        })

        if (!todo) {
            return res.status(404).json({
                error: `TODO with id: ${id} not found`
            });
        }
        
        // todos.splice(todos.indexOf(todo), 1);
        const deleteTodo = await prisma.todo.delete({
            where: {
                id: id
            }
        });

        if(deleteTodo){
            res.json(deleteTodo);
        }else{
            res.status(400).json({error: `Todo with id: ${id} not found`});
        }

    }



}