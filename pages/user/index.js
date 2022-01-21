import protectedRoute from "../../components/auth/ProtectedRoute"

function Profile() {
    return (
        <div>
            profile
        </div>
    )
}


export default protectedRoute(Profile)