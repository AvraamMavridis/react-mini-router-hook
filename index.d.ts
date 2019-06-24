declare module 'react-mini-router-hook' {
    declare interface RouterProps {
        location?: string
    }

    declare interface RouteProps {
        path: string
        component?: React.Component<any, any, any> | React.FC | React.ReactElement | React.ClassType<any, any, any> 
        children?: React.ReactChild
    }

    const Router: React.FC<RouterProps> = props => {}
    const Route: React.FC<RouteProps> = props => {}
    const RouterContext: React.Context<{ path: string; setPath: (path: string) => void }>
    const Link: React.FC<{ to: string } & React.HTMLAttributes<HTMLAnchorElement>> = props => {}
}
