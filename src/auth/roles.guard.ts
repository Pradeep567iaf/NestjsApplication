import { CanActivate, ConsoleLogger, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/enum/role.enum";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private reflector : Reflector

    ){

    }
    canActivate(context: ExecutionContext): boolean  {
        const requireRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
            context.getHandler(),
            context.getClass(),
          ]);
          
           console.log("the required roles are",requireRoles)
           if(!requireRoles){
            return true
           }
           const {user} = context.switchToHttp().getRequest()
           console.log({user})


           return requireRoles.some((role)=> user.roles.includes(role))


        return true
        
    }
    
}