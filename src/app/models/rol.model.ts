import { Menu } from './menu.model';

export class Rol{

    constructor(
        public idRol?: number,
        public nombreRol?: string,
        public menus?: Menu[] 
    ){}

}