import { Navigate } from "react-router";
import Loading from "../Components/Utils/Loading";
import useUser from "../Hooks/useUser";

const AdminRoute = ({ children }) => {
    const { userData, loading } = useUser();

    if (loading) return <Loading />;

    const user = userData?.user || userData;

    if (!user || user.role !== "admin") {
        return <Navigate to="/dashboard/my-participated" replace />;
    }

    return children;
};

export default AdminRoute;
