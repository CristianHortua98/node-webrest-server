import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
    main();
})();

function main(){

    // const server = new Server({port: envs.PORT, public_path: envs.PUBLIC_PATH, routes: AppRoutes.routes});
    // server.start();
    
    const user = {
        name: 'Juan',
        roles: ['admin']
    };

    function addRole(u: any, role: any) {
    u.roles.push(role);
    }

    addRole(user, 'editor');

    console.log(user)
}