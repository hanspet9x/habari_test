import { useSelector } from "react-redux"
import { IGlobalState } from "../../interfaces/app"


export const getSessionId = () => {
    const user = useSelector((state: IGlobalState) => state.user);

    if (!user?.hasSession) {
        
    }
}


