import { Menu } from './menu.model';

export class Rol{

    constructor(
        public IdRol?: number,
        public NombreRol?: string,
        public Menus?: Menu[] 
    ){}

}