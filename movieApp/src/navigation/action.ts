import { createNavigationContainerRef } from "@react-navigation/core";
import { RootStackParamList } from "./interfaces";
import { TRootRoutes } from "./routes";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const appNavigate = (routeName: TRootRoutes, routeParam?: {}) => {
    if(navigationRef.isReady()) {
        navigationRef.navigate(routeName as never, routeParam as never);
    }
}