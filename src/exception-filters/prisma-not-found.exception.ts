import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Prisma } from "@prisma/client"
import { Request, Response } from "express"

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaNotFoundException implements ExceptionFilter {
    catch(exception:Prisma.PrismaClientKnownRequestError, host:ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        if(exception.code === 'P2025'){
            response.status(404).json({
                statusCode:404,
                message:"Not Found",
                path:request.url
            });
        }else if(exception.code === 'P2002') {
            response.status(400).json({
                statusCode:400,
                message:"Duplicated data",
                path:request.url
            });
        }else{
            response.status(500).json({
                statusCode:500,
                message:exception.code,
                path:request.url
            });
        }
    }
}