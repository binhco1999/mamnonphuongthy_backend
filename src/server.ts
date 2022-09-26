import 'dotenv/config';

import App from './app';
import AuthRoute from '~/modules/auth/auth.route';
import { IndexRoute } from '~/modules/index';
import ProfileRoute from '~/modules/profile/profile.route';
import UsersRoute from '~/modules/users/user.route';
import { validateEnv } from '~/core/utils';
import PostsRoute from '~/modules/posts/posts.route';
import BackgroundRoute from '~/modules/background/background.route';
import GroupsRoute from '~/modules/groups/groups.route';

validateEnv();

const routes = [
    new IndexRoute(),
    new UsersRoute(),
    new AuthRoute(),
    new ProfileRoute(),
    new PostsRoute(),
    new GroupsRoute(),
    new BackgroundRoute(),
];

const app = new App(routes);

app.listen();
