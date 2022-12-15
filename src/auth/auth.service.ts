import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private jwtService : JwtService


        ){}

    async validateUser(email:string,password:string):Promise<any>{
        // async getUserByEmail(email:string):Promise<User|unknown>{
        //     return User.findOne({where:{email}})
        // }

        const user = await this.userService.getUserByEmail(email)
        console.log(user,"============")

        // return user
        if(!user){
            console.log("bad request")
            throw new BadRequestException();
        }

        if(!(await bcrypt.compare(password,user.password) )){
            throw new UnauthorizedException();
        }
        return user;
        // const isMatch = await bcrypt.compare(user.password,password)

               
        // if(password !== user.password){
        //     console.log("satisfied")
            
        //     throw new UnauthorizedException();

        // }
        // if (user && user.password === password) {
        //     const { password, ...result } = user;
        //     return result;
        //   }
        // return null;

        // return user
        // if(!user){
        //     console.log("bad request")
        //     throw new BadRequestException();
        // }
        
        // if(password !== user.password){
        //     console.log("satisfied")
        //     alert("wrong password")

        //     throw new UnauthorizedException();

        // }
        // return user;
        

        
   





    }

    generateToken(user:any){
        const payload = {
            username: user.name,
            sub: user.id,
            role : user.role
           
        }
       
        return{
            access_token: this.jwtService.sign(payload),
        }
    }
}
