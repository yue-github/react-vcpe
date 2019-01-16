import UserLayout from './UserLayout';

class OrganizationLayout extends UserLayout {
    getDescription() {
        const { description } = this.props;
        return description || '创投机构或基金管理人等可以在此「创建机构」后进行事务管理';
    }
}

export default OrganizationLayout;
