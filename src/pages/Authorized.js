import React from 'react';
import Redirect from 'umi/redirect';
import RenderAuthorized from '../components/Authorized';
import { getPermissions } from '../services/user';

const Authorized = RenderAuthorized(getPermissions());

export default ({ children }) => (
    <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login" />}>
        {children}
    </Authorized>
);
